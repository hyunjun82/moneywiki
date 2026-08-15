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
  // 글 단위 분리 — ArticleData는 slug 다음 줄이 반드시 category다 (types.ts).
  // 들여쓰기 깊이에 의존하지 않으므로 카테고리 파일 구조가 바뀌어도 안전하고,
  // link.slug / relatedQuestions.slug 같은 하위 slug와도 섞이지 않는다.
  const re = /^[ \t]*slug:\s*["']([^"']+)["'],\s*\r?\n[ \t]*category:/gm;
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

    // 증거 신선도 — 2년 된 도메인이라 예전 글의 수치가 지금과 다를 수 있다.
    // 오래된 증거 JSON을 재사용하면 낡은 값이 그대로 통과하므로 막는다.
    const days = (Date.now() - new Date(ev.verifiedAt).getTime()) / 86_400_000;
    if (!ev.verifiedAt || Number.isNaN(days)) {
      console.error(`❌ [${art.slug}] 증거 JSON에 verifiedAt이 없음`);
      fail++;
      continue;
    }
    if (days > 30) {
      console.error(
        `❌ [${art.slug}] 증거가 ${Math.floor(days)}일 전 수집분 (${ev.verifiedAt}) — ` +
          `npm run evidence 로 다시 수집하세요. 낡은 수치가 그대로 실릴 수 있습니다.`
      );
      fail++;
      continue;
    }

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
