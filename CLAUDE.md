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

**글은 대화창에서 쓰지 않는다. 파이프라인이 쓴다** (`scripts/article.mjs`, 2026-09-06). 사용자는 주제 + 키워드 자료만 준다:

```
npm run article -- <slug> --topic "주제 한 줄" [--category 고용] [--keywords scripts/keywords/<파일>.json] [--rewrite] [--commit]
npm run article -- --batch scripts/batch.txt        # 줄마다: slug | 주제 | 카테고리 | 키워드파일(생략 가능)
```

계획(타이틀·군집·조문·URL·CTA, 타이틀 항목 수 = 대제목 수를 기계가 셈) → `collect-evidence`(Playwright) → 캡처 PNG를 Read로 읽어 `capturesReviewed` 기록 → ArticleData 작성 → 사전 검사 → 카테고리 파일 삽입·옛 TSX 삭제 → tsc·숫자·가려짐·내부링크·화면 검사 → 실패면 실패 출력을 넣어 고쳐 쓰기(최대 2회) → 통과만 남기고 실패는 파일을 되돌린다 → `scripts/reports/<slug>.md` + 렌더 캡처 PNG.
판단이 필요한 세 단계(계획·캡처 읽기·작성)는 **`claude -p`(구독 로그인)**가 한다. `ANTHROPIC_API_KEY`가 있으면 시작하지 않는다(API 과금 금지). 사람이 보는 것은 보고서 한 장과 캡처 — 채점 뒤 `git push`.
입력: `scripts/keywords/<slug>.json`(엑셀·텍스트 → `npm run input`) 또는 `--keywords`로 같은 주제의 큰 키워드 파일.

- 파이프라인이 떨어지면 **검사기를 고치지 않는다.** 지시문(`scripts/lib/prompts.mjs`)이나 사전 검사(`scripts/lib/check-draft.mjs`)를 고친다. 검사 규칙은 원본 검사기(`verify-evidence`·`verify-rendered`)와 함께 바꾼다
- 뜻·누락 검사(LLM 판정)는 파이프라인과 pre-push에서 뺐다 — 돌릴 때마다 결과가 달라 글 한 편에 7바퀴를 돌게 했다. `npm run audit <slug>`로 따로 읽는다(경고)
- 손으로 만질 때만: 카테고리 파일(CRLF)을 직접 고치고 `npm run verify <slug>`(숫자·화면). `verify-rendered`를 `--base` 없이 부르면 **라이브를** 검사해 로컬 변경과 무관한 ✅가 뜬다. 수집을 손으로 부를 때 조는 **숫자만**(`--law "고용보험법:44,49"`)

게이트를 고치면 `npm run test:gates`(빠른 것) · `npm run test:gates:slow`(화면·뜻·누락까지) 로 **일부러 망가뜨린 입력을 잡는지** 확인한다. 조용히 통과하는 검사가 가장 위험하다 — CRLF 로 정규식이 0건을 돌려 '바뀐 글 없음'을 뱉은 적이 있다.

## 사이트 인프라

`verify-internal-links` · `build-category-redirects` · `build-ghost-redirects`(Cloudflare Bulk Redirects CSV) · pre-push 게이트(`scripts/git-hooks/pre-push`)
`_redirects`는 규칙 131개까지만 적용된다(실측) — 대량 301은 Bulk Redirects로.

## 금시세·환율 (`docs/gold-fx-implementation-spec.md`, 허브 목업 `docs/gold-hub-mockup-v2.html`)

- 시세는 `price-data` 브랜치 JSON(price.json·fx.json·kgx-quotes.json)을 브라우저가 읽는다. main 에 시세를 커밋하지 않는다
- 살 때 값은 **부가세 포함**이 규격(`retail.vatIncludedBuy`). 옛 규격이 오면 `priceData.ts`의 `normalizePrice`가 ×1.1 한다. 화면·기사에서 다시 ×1.1 하지 않는다
- 등락은 **전일 종가 대비**(`prevClose`). Yahoo `chartPreviousClose`는 쓰지 않는다(요청 기간 직전 종가라 5거래일 전 값이 된다)
- 한국금거래소 API는 해외 IP 403 → `scripts/gold/collect-kgx.ps1`을 **PC 예약 작업**으로(평일 09:30~18:30 30분, 등록 명령은 파일 머리말). GitHub Actions 에 올리지 않는다
- 기사는 평일 10:15 KST. 당일 고시가 없으면 발행하지 않는다(`--require-today` exit 3, 10:45·11:15 재시도, 11시 이후 실패 알림)
- 수출입은행·KRX OpenAPI 키는 사용자가 발급한다(6절·5절 도매). 키 전까지 그 부분만 보류
