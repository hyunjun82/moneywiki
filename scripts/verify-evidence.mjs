#!/usr/bin/env node
/**
 * 증거 대조기 — 글 본문의 모든 숫자가 증거 JSON에 실제로 있는지 기계 대조.
 * 근거 없는 숫자가 하나라도 있으면 FAIL(exit 1). 빌드 전 게이트로 사용.
 *
 * 사용법:
 *   node scripts/verify-evidence.mjs            # articles 전체
 *   node scripts/verify-evidence.mjs 주민세      # 특정 slug
 */
import fs from "node:fs";
import path from "node:path";

const ART_DIR = path.join("src", "data", "articles");
const EV_DIR = path.join("scripts", "evidence");
const only = process.argv[2];

/** ArticleData의 사람이 읽는 텍스트 필드만 뽑아낸다 (TS 파싱 없이 문자열 리터럴 스캔) */
function articlesInFile(src) {
  const out = [];
  // slug: "..." 를 기준으로 글 단위 분리 (최상위 4칸 들여쓰기 slug만)
  const re = /^ {4}slug:\s*["']([^"']+)["']/gm;
  const marks = [...src.matchAll(re)];
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].index;
    const end = i + 1 < marks.length ? marks[i + 1].index : src.length;
    out.push({ slug: marks[i][1], body: src.slice(start, end) });
  }
  return out;
}

/** 본문에서 검증 대상 숫자 토큰 추출 (URL·날짜메타·인덱스 제외) */
const NUM_TOKEN = /\d[\d,]*(?:\.\d+)?\s*(?:원|만원|천원|억원|억|%|퍼센트|일|개월|년|주|회|세|시간|배)/g;
function numbersIn(text) {
  return [...new Set((text.match(NUM_TOKEN) || []).map((s) => s.replace(/\s+/g, "")))];
}

/** 증거에 그 숫자가 있는가 — 콤마/공백 무시 비교 */
function evidenceHas(ev, token) {
  const norm = (s) => s.replace(/[,\s]/g, "");
  const t = norm(token);
  if ((ev.exampleValues || []).some((e) => norm(e) === t)) return true; // 예시 계산값(글쓴이 선언)
  return ev.facts.some((f) => norm(f.value || "").includes(t) || norm(f.quote || "").includes(t));
}

/** 검증 제외: 연도 표기(2026년)는 서술 맥락이라 대조 대상에서 뺀다 */
const IGNORE = /^(19|20)\d{2}년$/;

let fail = 0, checked = 0;

for (const file of fs.readdirSync(ART_DIR).filter((f) => f.endsWith(".ts") && f !== "types.ts")) {
  const src = fs.readFileSync(path.join(ART_DIR, file), "utf8");
  for (const art of articlesInFile(src)) {
    if (only && art.slug !== only) continue;
    checked++;
    const evPath = path.join(EV_DIR, `${art.slug}.json`);
    if (!fs.existsSync(evPath)) {
      console.error(`❌ [${art.slug}] 증거 JSON 없음 → ${evPath}`);
      fail++;
      continue;
    }
    const ev = JSON.parse(fs.readFileSync(evPath, "utf8"));

    // 스크린샷 실존 확인
    const missingShots = [...new Set(ev.facts.map((f) => f.screenshot).filter(Boolean))]
      .filter((s) => !fs.existsSync(path.join(EV_DIR, art.slug, s)));
    if (missingShots.length) {
      console.error(`❌ [${art.slug}] 스크린샷 누락: ${missingShots.join(", ")}`);
      fail++;
    }

    // url/날짜/스키마 필드를 제외한 본문 문자열만 대조 대상으로
    const prose = art.body
      .replace(/https?:\/\/\S+/g, "")
      .replace(/^\s*(lastVerified|verifiedAt|publishedAt|effectiveDate|sourceIndex|slug|ogImage)\s*:.*$/gm, "");

    const unproven = numbersIn(prose).filter((n) => !IGNORE.test(n) && !evidenceHas(ev, n));
    if (unproven.length) {
      console.error(`❌ [${art.slug}] 증거 없는 수치 ${unproven.length}개: ${unproven.join(", ")}`);
      fail++;
    } else if (!missingShots.length) {
      console.log(`✅ [${art.slug}] 수치 전부 증거 매칭 (fact ${ev.facts.length}개, verifiedAt ${ev.verifiedAt})`);
    }
  }
}

if (!checked) { console.log("검사 대상 글 없음"); process.exit(0); }
if (fail) { console.error(`\n실패 ${fail}건 — 증거 없는 수치를 지우거나 collect-evidence.mjs로 근거를 확보하세요.`); process.exit(1); }
console.log(`\n통과 — 글 ${checked}편`);
