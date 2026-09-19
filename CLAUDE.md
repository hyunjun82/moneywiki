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

**파이프라인이 쓴다** (`scripts/article.mjs`, 2026-09-16 새로 씀). 사용자는 **타이틀·소제목**을 준다. 두 모드:

```
# 대화창 모드 (기본 — 사용자가 진행을 본다. 2026-09-16 "안 보이면 불편하다")
npm run article -- <slug> --title "…" --headings "A / B / C" --category 금융 --url … --prompt-only   # ① 수집 (Bash 출력에 페이지·캡처가 보인다)
#   ② Claude 가 대화창에서 scripts/reports/logs/<slug>/prompt.txt 와 캡처 PNG 를 Read 로 읽고 초안 JSON 을 …/draft-chat.json 에 Write
npm run article -- <slug> --title "…" --headings "A / B / C" --draft scripts/reports/logs/<slug>/draft-chat.json   # ③ 삽입·검사·고치기·보고서
# 묶음 모드 (사용자 터미널에서 — 브라우저 창과 진행 줄이 보인다. 대화창 안에서 돌리면 창이 안 뜬다)
npm run article -- --batch scripts/batch.txt [--parallel 3]   # 줄마다: slug | 타이틀 | 소제목 A / B / C | 카테고리 | 조문(고용보험법:40,45; 민법:840) | URL
```

수집(`collect-evidence`, Playwright) → 작성(`claude -p` 1회, 캡처 PNG 는 Read 로 직접 봄) → 삽입·옛 TSX 삭제 → tsc·숫자·가려짐·내부링크·화면 검사 → 떨어지면 실패 출력을 넣어 **고치기 1회** → 다시 검사 → 끝. 그래도 떨어지면 **그 글은 버리고** 파일을 원래대로 되돌린다. 되풀이 루프·설계 단계·뜻 판정은 없다(2026-09-16, 다섯 겹 루프가 시간·사용량만 먹어서 걷어냄).
조문·URL 을 비우면 타이틀·소제목을 보고 고르는 짧은 호출이 하나 붙는다. 주는 쪽이 낫다. `ANTHROPIC_API_KEY`가 있으면 시작하지 않는다(API 과금 금지). 사람이 보는 것은 `scripts/reports/<slug>.md` 한 장과 렌더 캡처 — 채점 뒤 `git push`.
**돌아가는 것이 보인다**: 브라우저 창이 떠서 수집·검색·화면 검사가 보이고(끄려면 `--headless`), 모델 호출은 도구 사용 한 줄(`→ Read evidence-….png`)과 쓴 글자 수가 30초마다 찍힌다. 별도 콘솔 창에서 돌리면 대화창과 상관없이 볼 수 있다.

- 파이프라인이 떨어지면 **검사기를 고치지 않는다.** 지시문(`scripts/lib/prompts.mjs`)을 고친다. 검사 규칙은 원본 검사기(`verify-evidence`·`verify-rendered`)와 함께 바꾼다
- 검사기·루프를 **덧붙이지 않는다.** 틀리면 지시문을 고치거나 그 글을 버린다
- 손으로 만질 때만: 카테고리 파일(CRLF)을 직접 고치고 `npm run verify <slug>`(숫자·화면). `verify-rendered`를 `--base` 없이 부르면 **라이브를** 검사해 로컬 변경과 무관한 ✅가 뜬다. 수집을 손으로 부를 때 조는 **숫자만**(`--law "고용보험법:44,49"`)

게이트를 고치면 `npm run test:gates`(빠른 것) · `npm run test:gates:slow`(화면까지) 로 **일부러 망가뜨린 입력을 잡는지** 확인한다. 조용히 통과하는 검사가 가장 위험하다 — CRLF 로 정규식이 0건을 돌려 '바뀐 글 없음'을 뱉은 적이 있다.

## 사이트 인프라

`verify-internal-links` · `build-category-redirects` · `build-ghost-redirects`(Cloudflare Bulk Redirects CSV) · pre-push 게이트(`scripts/git-hooks/pre-push`)
`_redirects`는 규칙 131개까지만 적용된다(실측) — 대량 301은 Bulk Redirects로.

## 금시세·환율 (`docs/gold-fx-implementation-spec.md`, 허브 목업 `docs/gold-hub-mockup-v2.html`)

- 시세는 `price-data` 브랜치 JSON을 브라우저가 읽는다. main 에 시세를 커밋하지 않는다. **금 화면은 gold.json**(`scripts/gold/build-gold-json.mjs` = kgx-quotes.json + price.json + Yahoo 기준가, PC 수집기와 Actions 양쪽에서 생성), 환율은 fx.json
- /gold 허브(`HubView.tsx`)는 `docs/gold-hub-mockup-v2.html` 구조 그대로. 살 때·팔 때·계산기는 `usePrice`가 gold.json 을 옛 PriceData 모양으로 바꿔 준다(`goldData.priceLikeFromGold`)
- 살 때 값은 **부가세 포함**이 규격(`retail.vatIncludedBuy`). 옛 규격이 오면 `priceData.ts`의 `normalizePrice`가 ×1.1 한다. 화면·기사에서 다시 ×1.1 하지 않는다
- 등락은 **전일 종가 대비**(`prevClose`). Yahoo `chartPreviousClose`는 쓰지 않는다(요청 기간 직전 종가라 5거래일 전 값이 된다)
- 한국금거래소 API는 해외 IP 403 → `scripts/gold/collect-kgx.ps1`을 **PC 예약 작업**으로(평일 09:30~18:30 30분, 등록 명령은 파일 머리말). GitHub Actions 에 올리지 않는다
- 기사는 **PC 수집기가 평일 10:00 고시 직후 main 에 발행**한다(`collect-kgx.ps1` → `Publish-News`, 2026-09-20). GitHub cron 은 이 저장소에서 4시간씩 늦게 떠서(10:15 예약이 14:53 실행) 예비 1개(10:20)만 남겼다. 당일 고시가 없으면 발행하지 않는다(`--require-today` exit 3). 기사 형식은 `generate-news.mjs` v3(1년 이력 통계·그래프·요인·FAQ, 제목에 그날 사실 하나) — 언론사 금시세 기사보다 많아야 한다
- KGX 예약 작업은 `run-hidden.vbs` 로 감싼다(powershell 직접 띄우면 30분마다 창이 깜빡임). 클론이 깨지면 스크립트가 `*.broken-*` 으로 치우고 새로 받는다
- 수출입은행·KRX OpenAPI 키는 사용자가 발급한다(6절·5절 도매). 키 전까지 그 부분만 보류
