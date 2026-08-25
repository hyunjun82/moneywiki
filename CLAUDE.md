# 머니위키 (jjyu.co.kr)

Next.js 16 · Cloudflare Pages (main 푸시 → 자동 빌드 ~15분)

## 절대 규칙

1. **계산기 54개**(`scripts/calc-protected-slugs.json`)와 **양식**(`src/app/forms/**`)은 건드리지 않는다
2. **리라이트는 기존 slug 그대로.** 새 slug 생성 금지
3. 글은 `src/data/articles/<카테고리>.ts`에만 (타입 `types.ts`, 렌더러 `ArticleShell.tsx`)
4. AdSense: 과장·확정 표현 금지, 광고를 CTA처럼 위장 금지

## 글쓰기

**0. 정본 템플릿을 먼저 연다** — `docs/moneywiki-article-template.html`.
규칙과 템플릿이 다르면 템플릿이 이긴다. 검증 기준도 이 파일에서 자동 산출된다.

**1. 검색어를 모은다** — `node scripts/collect-keywords.mjs <slug> --q "..." --q "..."`
질의는 4개 이상. 자동완성 + 연관검색어("함께 많이 찾는")가 모두 잡혀야 한다.

**2. 타이틀** = `메인키워드 + 세부(행동)키워드 2~3개 나열 + 후킹`
정본 예: `어린이집 방과후 보육료 지원 대상·지원금액·신청방법 총정리 (2026)`
중점(·)으로 묶는다 · 대시(—) 금지 · "요" 어미 금지 · 후킹 형태는 매번 바꾼다
**타이틀이 나열한 항목은 소제목이 답한다.** 타이틀만 갈아 끼우면 리라이트가 아니다.

**3. 본문 블록** (순서 고정, 톤은 합니다체)
```
lead → heroHook(마지막 문장은 아래 버튼을 누를 이유) → heroCta(대형 버튼 1개)
목차 → keyFacts 7~9행 → q1~q8 → FAQ → summary 3줄 → 스포크
q1은 행동 섹션. 각 섹션 첫 문장이 결론, 비주얼 먼저 해설 뒤.
```

**4. 버튼(CTA)** — 문구는 사용자가 할 **행동 그대로**.
`가입 자격 확인하기` `소득확인증명서 발급하기` `수수료 비교하기` `해지 신청하기`
"보기 / 열기 / 펼쳐 보기 / 요약표 확인" 같은 열람형 문구는 버튼이 아니다.
주소는 `.go.kr`·`.or.kr`의 **그 일을 하는 화면**. 기관 홈 금지, 넣기 전 Playwright로 연다.

**5. 근거** — `npm run evidence <slug> -- --url <공식URL>`
본문 숫자는 증거 JSON의 `quote`/`value` 안에 있는 값만. WebSearch·WebFetch는 훅이 차단한다.
표·수식은 이미지로 실리는 경우가 많다 → 캡처 PNG를 Read로 열어 본다.
출처 목록: `.claude/rules/wiki-rules.md`

## 검증 (통과할 때까지 반복)

```bash
npm run verify:articles     # 타이틀 공식·키워드·CTA·템플릿 프로필
npm run verify:evidence     # 본문 수치 ↔ 증거 JSON (30일 신선도)
npm run verify:repetition   # 상투구·복사 문장·판박이 배치
npm run verify:claims       # 과장 표현·출처 대조
npm run verify:rendered -- <slug>   # 실제 화면 + CTA 실접속 (푸시 전 필수)
npm run verify:meaning -- <slug>    # 뜻 검사 — 훅↔버튼·소제목↔본문·근거 초과 단언
```

위 넷은 형태를 본다. `verify:meaning`만 뜻을 본다 — 글·증거 JSON·검색어 JSON을
헤드리스 판정자(`claude -p`)에게 함께 던져 다섯 가지를 묻는다.
hook-cta(훅이 부른 행동과 버튼이 같은 일인가) · heading-answer(첫 문장이 소제목을 답하는가) ·
overclaim(증거 quote 밖 단언·오해의 소지) · keyfacts-fit(핵심콕콕이 타이틀 항목을 답하는가) ·
intent-coverage(검색어가 드러낸 궁금증 중 안 답한 것). ERROR면 pre-push가 막는다.
판정은 글 내용 해시로 캐시되니 안 고친 글은 다시 묻지 않는다. `--all` `--images` `--fresh`.

데이터 검증은 "값이 있는가"만 본다. 화면은 `verify:rendered`가 본다 — 이 구멍으로
표 헤더가 남색으로 나가고, 보험 글 CTA가 신용조회로 간 사고가 났다.
검증기가 못 잡는 오해의 소지·근거 없는 단언은 직접 걷어낸다.

## 빌드

`npm run build` ~15분. **글 1개마다 빌드 금지** — 50개 배치.
같은 slug의 `src/app/w/<slug>/`가 있으면 새 글이 가려진다 → 완료 후 삭제.
훅 3종: `.claude/settings.json` → `scripts/hooks/`
