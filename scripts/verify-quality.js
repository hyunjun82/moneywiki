#!/usr/bin/env node

/**
 * 📋 머니위키 글 품질 검증 에이전트
 *
 * 사용법:
 *   node scripts/verify-quality.js          전체 검증
 *   node scripts/verify-quality.js 세금      특정 카테고리만
 *
 * prebuild에서 자동 실행 — 에러 있으면 빌드 중단
 *
 * ❌ 에러 (빌드 중단):
 *   - title ≠ h1
 *   - heroDescription 비어있음
 *   - FAQ ≠ 3개
 *   - sections < 4개
 *   - 필수 필드 누락 (slug, title, h1, metaDescription, description)
 *   - categorySlug 불일치
 *
 * ⚠️ 경고 (빌드 통과):
 *   - 섹션 제목이 템플릿 키워드 불일치
 *   - 문어체 사용 (합니다/입니다)
 *   - 섹션 본문 < 3문단
 *   - 출처(sources) 없음
 *   - Hub spokes 수 ≠ 실제 spoke 수
 */

const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = path.resolve(__dirname, "../src/data/articles");

// ─── 카테고리 → 템플릿 매핑 ──────────────────────

const TEMPLATE_MAP = {
  부동산: "product",
  근로: "policy",
  세금: "tax",
  금융: "product",
  실업급여: "policy",
  복지: "policy",
  법률: "legal",
  퇴직: "product",
  생활경제: "policy",
  보험: "product",
  교육: "policy",
  창업: "product",
};

// 템플릿별 기대 섹션 제목 키워드 (순서대로, 정규식 OR)
// 실제 글은 주제별로 유연하게 변형 가능 → 1번 섹션만 엄격 검사
const TEMPLATE_KEYWORDS = {
  policy: ["핵심|요약|개요|구조"],
  tax: ["개요|핵심|요약|구조|환급"],
  product: ["개요|핵심|요약|구조"],
  legal: ["개요|핵심|요약|구조"],
};

// 문어체 패턴
const FORMAL_PATTERNS = ["합니다", "입니다", "됩니다", "있습니다", "없습니다"];

// ─── 파서 유틸 ──────────────────────────────────

/** 문자열 리터럴 안을 무시하면서 매칭 괄호 위치 반환 */
function findMatchingBracket(text, startIdx, open, close) {
  let depth = 0,
    inStr = false,
    strCh = "",
    esc = false;
  for (let i = startIdx; i < text.length; i++) {
    const c = text[i];
    if (esc) {
      esc = false;
      continue;
    }
    if (c === "\\" && inStr) {
      esc = true;
      continue;
    }
    if (inStr) {
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = true;
      strCh = c;
      continue;
    }
    if (c === open) depth++;
    if (c === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** 텍스트 안의 최상위 {} 블록들을 배열로 분리 */
function splitTopObjects(text) {
  const objs = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === "{") {
      const end = findMatchingBracket(text, i, "{", "}");
      if (end === -1) break;
      objs.push(text.slice(i, end + 1));
      i = end + 1;
    } else {
      i++;
    }
  }
  return objs;
}

/** key: "value" 패턴에서 첫 매칭 문자열 값 추출 */
function getStr(text, key) {
  const re = new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`);
  const m = text.match(re);
  return m ? m[1] : null;
}

/** key: [...] 배열의 안쪽 내용 추출 */
function getArrayContent(text, key) {
  const re = new RegExp(`${key}:\\s*\\[`);
  const m = re.exec(text);
  if (!m) return null;
  const start = m.index + m[0].length - 1;
  const end = findMatchingBracket(text, start, "[", "]");
  if (end === -1) return null;
  return text.slice(start + 1, end);
}

// ─── 에러/경고 수집 ─────────────────────────────

let totalErrors = 0,
  totalWarns = 0;
const errList = [],
  warnList = [];
const catStats = {};

function err(cat, slug, msg) {
  errList.push({ cat, slug, msg });
  totalErrors++;
}
function wrn(cat, slug, msg) {
  warnList.push({ cat, slug, msg });
  totalWarns++;
}

// ─── 메인 검증 ──────────────────────────────────

const targetCategory = process.argv[2]; // 특정 카테고리만 검증

for (const [category, template] of Object.entries(TEMPLATE_MAP)) {
  if (targetCategory && category !== targetCategory) continue;

  const fp = path.join(ARTICLES_DIR, `${category}.ts`);
  if (!fs.existsSync(fp)) {
    catStats[category] = { spokes: 0, errors: 0, warns: 0 };
    continue;
  }

  const raw = fs.readFileSync(fp, "utf-8");
  let catErrors = 0,
    catWarns = 0;

  // ── Hub spokes 수 ──
  const hubPart = raw.split("const spokeList")[0] || "";
  const hubSpokesRaw = getArrayContent(hubPart, "spokes");
  const hubSpokeCount = hubSpokesRaw
    ? (hubSpokesRaw.match(/slug\s*:/g) || []).length
    : 0;

  // ── Spoke 파싱 ──
  const spokeIdx = raw.indexOf("const spokeList");
  if (spokeIdx === -1) {
    catStats[category] = { spokes: 0, errors: 0, warns: 0 };
    continue;
  }

  const spokeRaw = raw.slice(spokeIdx);
  // "= [" 패턴으로 찾아야 SpokeArticle[]의 []를 건너뜀
  const eqBracket = spokeRaw.indexOf("= [");
  const bracketStart = eqBracket === -1 ? -1 : eqBracket + 2;
  if (bracketStart === -1) {
    catStats[category] = { spokes: 0, errors: 0, warns: 0 };
    continue;
  }

  const bracketEnd = findMatchingBracket(spokeRaw, bracketStart, "[", "]");
  if (bracketEnd === -1) {
    catStats[category] = { spokes: 0, errors: 0, warns: 0 };
    continue;
  }

  const arrayInside = spokeRaw.slice(bracketStart + 1, bracketEnd);
  const articles = splitTopObjects(arrayInside);

  // Hub vs actual 불일치
  if (hubSpokeCount > 0 && hubSpokeCount !== articles.length) {
    wrn(category, "HUB", `Hub spokes ${hubSpokeCount}개 ≠ 실제 spoke ${articles.length}개`);
    catWarns++;
  }

  // ── 각 Spoke 글 검증 ──
  for (const block of articles) {
    const slug = getStr(block, "slug") || "(unknown)";

    // 1. 필수 필드
    const title = getStr(block, "title");
    const h1 = getStr(block, "h1");
    const heroDesc = getStr(block, "heroDescription");
    const metaDesc = getStr(block, "metaDescription");
    const desc = getStr(block, "description");
    const catSlug = getStr(block, "categorySlug");

    if (!title) { err(category, slug, "title 없음"); catErrors++; }
    if (!h1) { err(category, slug, "h1 없음"); catErrors++; }
    if (!heroDesc) { err(category, slug, "heroDescription 비어있음"); catErrors++; }
    if (!metaDesc) { err(category, slug, "metaDescription 없음"); catErrors++; }
    if (!desc) { err(category, slug, "description 없음"); catErrors++; }

    // 2. title === h1
    if (title && h1 && title !== h1) {
      err(category, slug, "title ≠ h1");
      catErrors++;
    }

    // 3. categorySlug 일치
    if (catSlug && catSlug !== category) {
      err(category, slug, `categorySlug "${catSlug}" ≠ 파일 "${category}"`);
      catErrors++;
    }

    // 4. FAQ 3개
    const faqRaw = getArrayContent(block, "faq");
    const faqCount = faqRaw ? (faqRaw.match(/question\s*:/g) || []).length : 0;
    if (faqCount !== 3) {
      err(category, slug, `FAQ ${faqCount}개 (3개 필요)`);
      catErrors++;
    }

    // 5. Sections
    const sectionsRaw = getArrayContent(block, "sections");
    if (!sectionsRaw) {
      err(category, slug, "sections 배열 없음");
      catErrors++;
      continue;
    }

    const sectionBlocks = splitTopObjects(sectionsRaw);

    if (sectionBlocks.length < 4) {
      err(category, slug, `섹션 ${sectionBlocks.length}개 (최소 4개)`);
      catErrors++;
    } else if (sectionBlocks.length > 7) {
      wrn(category, slug, `섹션 ${sectionBlocks.length}개 (7개 초과)`);
      catWarns++;
    }

    // 6. 섹션별 검사
    const keywords = TEMPLATE_KEYWORDS[template] || [];
    const allContentParts = [];

    for (let i = 0; i < sectionBlocks.length; i++) {
      const secTitle = getStr(sectionBlocks[i], "title") || "";
      const secContent = getStr(sectionBlocks[i], "content") || "";
      allContentParts.push(secContent);

      // 제목 패턴 (첫 5개만)
      if (i < keywords.length) {
        const pattern = new RegExp(keywords[i]);
        if (!pattern.test(secTitle)) {
          wrn(category, slug, `섹션${i + 1} "${secTitle}" — 기대 키워드: ${keywords[i]}`);
          catWarns++;
        }
      }

      // 문단 수 (\\n\\n 은 raw 텍스트에서의 이스케이프)
      const paragraphs = secContent.split("\\n\\n").filter((p) => p.trim());
      if (paragraphs.length < 3) {
        wrn(category, slug, `"${secTitle}" 문단 ${paragraphs.length}개 (최소 3개)`);
        catWarns++;
      }
    }

    // 7. 문어체 검사
    const allContent = allContentParts.join(" ");
    const foundFormal = FORMAL_PATTERNS.filter((p) => allContent.includes(p));
    if (foundFormal.length > 0) {
      wrn(category, slug, `문어체: ${foundFormal.join(", ")}`);
      catWarns++;
    }

    // 8. 출처 검사
    const sourcesRaw = getArrayContent(block, "sources");
    const sourceCount = sourcesRaw
      ? (sourcesRaw.match(/name\s*:/g) || []).length
      : 0;
    if (sourceCount === 0) {
      wrn(category, slug, "출처(sources) 없음");
      catWarns++;
    }
  }

  catStats[category] = {
    spokes: articles.length,
    errors: catErrors,
    warns: catWarns,
  };
}

// ─── 출력 ───────────────────────────────────────

console.log("");
console.log("📋 머니위키 글 품질 검증 결과");
console.log("═".repeat(55));

// 카테고리별 요약
let totalSpokes = 0;
console.log("");
console.log("  카테고리        글 수   에러   경고   템플릿");
console.log("  " + "─".repeat(50));

for (const [cat, stats] of Object.entries(catStats)) {
  totalSpokes += stats.spokes;
  const template = TEMPLATE_MAP[cat];
  const status =
    stats.errors > 0 ? "❌" : stats.warns > 0 ? "⚠️ " : stats.spokes > 0 ? "✅" : "  ";
  console.log(
    `  ${status} ${cat.padEnd(10)} ${String(stats.spokes).padStart(4)}개  ${String(stats.errors).padStart(4)}   ${String(stats.warns).padStart(4)}   ${template}`
  );
}

console.log("  " + "─".repeat(50));
console.log(`  총 ${totalSpokes}개 spoke 글\n`);

// 에러 상세
if (errList.length > 0) {
  console.log(`❌ 에러 ${totalErrors}개:\n`);
  for (const e of errList) {
    console.log(`  ❌ [${e.cat}/${e.slug}] ${e.msg}`);
  }
  console.log("");
}

// 경고 상세
if (warnList.length > 0) {
  console.log(`⚠️  경고 ${totalWarns}개:\n`);
  for (const w of warnList) {
    console.log(`  ⚠️  [${w.cat}/${w.slug}] ${w.msg}`);
  }
  console.log("");
}

// 최종
if (totalErrors === 0 && totalWarns === 0 && totalSpokes > 0) {
  console.log("✅ 모든 글이 품질 기준을 통과했습니다!\n");
}

console.log(`결과: 에러 ${totalErrors}개 | 경고 ${totalWarns}개`);
console.log("═".repeat(55));

if (totalErrors > 0) {
  console.log("\n💡 에러를 수정한 후 다시 빌드하세요.\n");
  process.exit(1);
} else if (totalWarns > 0) {
  console.log("\n⚠️  경고가 있지만 빌드는 진행됩니다.\n");
} else {
  console.log("");
}
