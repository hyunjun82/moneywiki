# 머니위키 (jjyu.co.kr)

Next.js 16 정적 export · Cloudflare Pages (main 푸시 → 자동 빌드 ~15분, 글 1개마다 빌드 금지)

## 절대 규칙

1. **계산기 54개**(`scripts/calc-protected-slugs.json`)와 **양식**(`src/app/forms/**`, 양식·HWP·다운로드 스크립트)은 건드리지 않는다
2. 리라이트는 기존 slug 그대로. 새 slug 생성 금지
3. WebSearch·WebFetch 금지 — 근거는 Playwright로 연 실제 페이지에서만
4. AdSense: 과장·확정 표현 금지. 광고 자리를 버튼처럼 보이게 하지 않는다

## 글

**정본은 `docs/moneywiki-article-template.html` 한 편이다.** 규칙 문서는 없다 — 그 파일의 블록과 주석이 전부다.
글은 `src/data/articles/<카테고리>.ts`(타입 `types.ts`, 렌더러 `src/components/article/ArticleShell.tsx`)에만 쓴다.

흐름 — 사용자가 주제 + 키워드 묶음(자동완성·연관검색어·지식iN 질문)을 준다:
1. 질문을 군집으로 묶어 타이틀 항목을 정한다. **타이틀이 약속한 항목 = 대제목(h2)**, 세부 질문은 소제목(h3)
2. `node scripts/collect-evidence.mjs <slug> --url <공식URL> --law "고용보험법:44,49"` — 조는 **숫자만**("제44조"로 주면 "제제44조조"가 되어 조용히 실패한다). 원문·표·캡처 PNG·JSON. **캡처는 Read로 눈으로 읽고 증거 JSON `capturesReviewed`에 장마다 한 줄 적는다** — 안 적으면 push가 막힌다. 다시 수집해도 이 기록은 보존된다
3. 글을 쓴다. 본문 숫자는 증거 JSON `quote`/`value` 안의 값만. 버튼 주소는 `.go.kr`·`.or.kr`의 "그 일을 하는 화면" — 넣기 전 Playwright로 연다
4. `npm run verify <slug>` 한 줄 — 숫자·화면·뜻·**누락**(인용한 조문의 항·호를 전수 대조) 넷이 순서대로 돈다. 검사기를 따로 부르지 않는다: `verify-rendered`를 `--base` 없이 부르면 **라이브를** 검사해 로컬 변경과 무관한 ✅가 뜬다
5. 렌더 캡처와 검사 결과를 사용자에게 보이고 채점을 받는다. 통과한 글이 다음 글의 기준이다

판단(질문 군집·이미지 속 숫자·버튼 화면)은 눈이 있는 세션이 하되 **흔적을 남긴다**(capturesReviewed·exampleNote). 흔적이 없으면 게이트가 막는다. "써야 했는데 안 썼나"는 사람 눈을 믿지 않고 누락 검사가 본다 — 사람이 "읽었다"고 적고 실제로는 안 읽은 일이 있었다.

게이트를 고치면 `npm run test:gates`(빠른 것) · `npm run test:gates:slow`(화면·뜻·누락까지) 로 **일부러 망가뜨린 입력을 잡는지** 확인한다. 조용히 통과하는 검사가 가장 위험하다 — CRLF 로 정규식이 0건을 돌려 '바뀐 글 없음'을 뱉은 적이 있다.

## 사이트 인프라

`verify-internal-links` · `build-category-redirects` · `build-ghost-redirects`(Cloudflare Bulk Redirects CSV) · pre-push 게이트(`scripts/git-hooks/pre-push`)
`_redirects`는 규칙 131개까지만 적용된다(실측) — 대량 301은 Bulk Redirects로.
