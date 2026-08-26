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
  if (ev.facts.some((f) => norm(f.value || "").includes(t) || norm(f.quote || "").includes(t))) return true;
  // facts 는 숫자가 든 문장만 추린 것이라 표·사례 안의 값이 빠진다.
  // 재정경제부 사례표의 "배우자 9억원 / 합계 11억원"이 원문에 있는데도 근거 없음으로 몰렸다.
  // 같은 페이지에서 뜯어온 원문(raws)까지 본다 — 출처는 동일하다.
  return (ev.raws || []).some((r) => norm(r.text || "").includes(t));
}

/** 원문에 그 문장이 실제로 있는가 — 조사·공백 차이를 무시하고 본다 */
function quoteInEvidence(ev, quote) {
  const norm = (x) => String(x || "").replace(/[\s,.·「」“”"'()]/g, "");
  const q = norm(quote);
  if (q.length < 12) return true; // 너무 짧으면 우연히 겹치므로 검사하지 않는다
  const hay = norm((ev.raws || []).map((r) => r.text).join(" ") + (ev.facts || []).map((f) => f.quote).join(" "));
  if (hay.includes(q)) return true;
  // 원문을 통째로 옮기지 않고 앞뒤를 다듬는 경우가 있다. 가운데 토막이 그대로면 인정한다.
  for (let len = Math.floor(q.length * 0.6); len >= 20; len -= 10) {
    for (let i = 0; i + len <= q.length; i += 5) {
      if (hay.includes(q.slice(i, i + len))) return true;
    }
  }
  return false;
}

/** 본문에서 "원문을 그대로 옮겼다"고 주장하는 자리 — sourceQuote 와 「」 인용 */
function claimedQuotes(body) {
  const out = [];
  const EXCERPT = new RegExp('excerpt:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"', "g");
  for (const m of body.matchAll(EXCERPT)) out.push(m[1]);
  // 「」 는 인용부호이자 법령·서류 제목 표기다. 제목까지 원문 대조를 걸면
  // "「연금보험료 등 소득·세액공제 확인서」" 같은 서류 이름이 전부 걸린다.
  // 원문을 옮겼다고 선언한 자리(sourceQuote.excerpt)만 검사한다.
  return [...new Set(out.map((q) => q.replace(/\\n/g, " ")))];
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
    }

    // 인용문 대조 — 숫자만 보던 구멍을 막는다.
    //   "협회는 왜곡현상이라 적고 있습니다" 처럼 출처를 붙여 원문에 없는 말을 하는 것이
    //   지금까지 기계 검사를 그냥 통과했다. 숫자가 맞아도 이게 제일 위험하다.
    const badQuotes = claimedQuotes(art.body).filter((q) => !quoteInEvidence(ev, q));
    if (badQuotes.length) {
      const lines = badQuotes.map((q) => `      "${q.slice(0, 70)}…"`).join("\n");
      console.error(`❌ [${art.slug}] 원문에 없는 인용 ${badQuotes.length}건:\n${lines}`);
      fail++;
    }

    if (!unproven.length && !badQuotes.length && !missingShots.length) {
      console.log(`✅ [${art.slug}] 수치·인용 전부 증거 매칭 (fact ${ev.facts.length}개, verifiedAt ${ev.verifiedAt})`);
    }
  }
}

if (!checked) { console.log("검사 대상 글 없음"); process.exit(0); }
if (fail) { console.error(`\n실패 ${fail}건 — 증거 없는 수치를 지우거나 collect-evidence.mjs로 근거를 확보하세요.`); process.exit(1); }
console.log(`\n통과 — 글 ${checked}편`);
