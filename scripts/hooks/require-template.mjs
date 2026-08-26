#!/usr/bin/env node
/**
 * UserPromptSubmit 훅 — 글 요청이 들어오면 정본 템플릿을 놓칠 수 없게 강제 주입한다.
 *
 * 사용자가 주제/타이틀을 던지는 순간 이 훅이 먼저 실행되어
 * docs/moneywiki-article-template.html 의 블록 순서를 컨텍스트에 밀어 넣는다.
 * 훅이 실패해도 세션을 막지 않는다(항상 exit 0).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const TEMPLATE = path.join(ROOT, "docs", "moneywiki-article-template.html");

// 글 작성/리라이트 의도로 읽히는 신호. 놓치는 쪽보다 과하게 잡는 쪽을 택한다.
const TRIGGER =
  /(글|기사|아티클|포스팅|타이틀|제목|주제|키워드|작성|써줘|쓸|쓰자|리라이트|재작성|다시\s*써|초안|본문|서론|소제목|핵심콕콕|목차)/;

function main() {
  let raw = "";
  try {
    raw = fs.readFileSync(0, "utf8");
  } catch {
    return;
  }

  let prompt = "";
  try {
    prompt = JSON.parse(raw).prompt ?? "";
  } catch {
    prompt = raw;
  }

  if (!TRIGGER.test(prompt)) return;
  if (!fs.existsSync(TEMPLATE)) return;

  const context = `
[머니위키 글 작성 강제 절차 — 이 요청은 글 작성으로 판정됨]

STEP 0 (건너뛰기 금지). 아래 정본 템플릿을 Read로 먼저 열어라. 열기 전에는 타이틀도 본문도 쓰지 않는다.
  ${path.relative(ROOT, TEMPLATE).replace(/\\/g, "/")}
규칙과 템플릿이 다르면 언제나 템플릿이 이긴다.

STEP 1. 검색어 조사 먼저. Playwright로 네이버를 열어 실제 검색어를 수집한다.
  node scripts/collect-keywords.mjs <slug> --q "메인키워드" [--q "..."]
  → scripts/keywords/<slug>.json 이 없으면 verify-articles가 FAIL이다.
  타이틀 = 수집된 검색어 반영 + 세부(행동)키워드 나열 + 후킹. 감으로 짓지 않는다.

STEP 2. 본문 블록을 이 순서 그대로 채운다. 순서 변경·블록 누락 금지.
  1) lead        — 타이틀이 나열한 항목을 결론부터 한 문단으로 편다
  2) heroHook    — 왜 미루면 손해인지 + 마지막 문장은 행동 유도
  3) heroCta     — 대형 CTA 1개. 공식 사이트(.go.kr / .or.kr)만
  4) toc         — 목차 (섹션 수와 일치)
  5) keyFacts    — 📌 핵심콕콕 7~9행
  6) 소제목      — 개수는 타이틀이 나열한 항목 수와 같다. 3개를 나열했으면 3개다.
                   8개는 상한이지 목표가 아니다. 타이틀에 없는 항목은 소제목이 될 수 없다.
                   소제목은 검색자 질문형. q1은 반드시 행동(신청 방법).
                   각 섹션 첫 문장이 결론. 비주얼(체크리스트/통계/표/스텝) 먼저, 해설 뒤.
  7) faqList     — FAQ 아코디언
  8) summary     — 정확히 3줄
  9) 스포크 사이드바
톤: 합니다체.

STEP 3. 근거는 Playwright로 연 실제 페이지에서만 얻는다. WebSearch/WebFetch는 차단되어 있다.
  npm run evidence <slug> -- --law <법령명>:<조,조> --url <공식URL>
  증거 JSON의 quote/value 안에 있는 숫자만 본문에 쓴다.
  CTA는 넣기 전에 반드시 그 주소를 Playwright로 열어 눈으로 확인한다. 복사 금지.
  버튼 3개 이상이 같은 주소면 verify-articles가 FAIL이다 — 섹션 성격대로 나눈다.

STEP 4. 출력 위치는 src/data/articles/<카테고리>.ts 뿐이다.
  계산기 54개(scripts/calc-protected-slugs.json)와 src/app/forms/** 는 절대 건드리지 않는다.

STEP 5. 검증 후 재작성 루프.
  npm run verify:articles && npm run verify:evidence && npx tsx scripts/verify-links.ts
  실패하면 템플릿을 다시 열어 대조하고 고쳐 쓴다. 통과할 때까지 반복한다.
  push하면 pre-push 훅이 위 3종을 다시 강제한다 — 로컬에서 미리 통과시켜 둔다.
`.trim();

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext: context,
      },
    })
  );
}

try {
  main();
} catch {
  /* 훅은 절대 세션을 막지 않는다 */
}
process.exit(0);
