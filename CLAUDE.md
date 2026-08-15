# 머니위키 (jjyu.co.kr)

Next.js 16 · Cloudflare Pages (main 푸시 → 자동 빌드 ~15분)

## 절대 규칙

1. **계산기 54개**(`scripts/calc-protected-slugs.json`)와 **양식 다운로드**(`src/app/forms/**`)는 건드리지 않는다 — 훅이 차단한다
2. **리라이트는 기존 slug 그대로.** 새 slug 생성 금지
3. 글은 `src/data/articles/<카테고리>.ts`에만 쓴다 (타입 `types.ts`, 렌더러 `ArticleShell.tsx`)
4. AdSense: 과장("축하해요", "확정 지급") 금지, 광고를 CTA처럼 위장 금지

## 글쓰기 4단계

### 1. 템플릿 구조를 본다
`docs/moneywiki-article-template.html`을 Read로 **먼저 연다.** 규칙과 템플릿이 다르면 템플릿이 이긴다.

### 2. 타이틀·본문을 구성한다
타이틀 = `메인키워드 + 세부(행동)키워드 나열 + 후킹`
(세부: 신청방법/언제/사용처/조회/조건/서류 · 후킹: "~부터 ~까지", "~은?", "~될까?")

본문 블록 순서 (변경·누락 금지):
```
lead      타이틀이 나열한 항목을 결론부터 편다
heroHook  왜 미루면 손해인지 + 마지막 문장은 행동 유도
heroCta   대형 CTA 1개 — 공식 사이트(.go.kr/.or.kr)만
목차 → keyFacts(핵심콕콕 7~9행)
q1~q8     소제목 = 검색자 질문형. q1은 반드시 행동(신청).
          각 섹션 첫 문장이 결론. 비주얼(체크리스트/통계/표/스텝) 먼저, 해설 뒤
FAQ → summary(정확히 3줄) → 스포크 사이드바
```
톤: 합니다체.

**딥링크 찾는 법** — 기관 홈에서 메뉴를 뒤지지 않는다. 헤매다 엉뚱한 페이지를 걸게 된다.
구글에 `주제 키워드 + 행동어`를 검색해 나오는 `.go.kr`·`.or.kr` 공식 페이지가 곧 딥링크다.
```
"실업급여 신청"        → gov.kr/portal/rcvfvrSvc/dtlEx/SD0000015536
"에너지바우처 사용처"   → energyv.or.kr/info/use_info.do
"실손보험 가입내역 조회" → fss.or.kr/main/prc/is/sub/is006.jsp?menuNo=900395
```
넣기 전에 그 페이지를 열어 **글 주제와 맞는 화면인지** 눈으로 확인한다.
(보험 글에 신용조회 페이지를 걸어 발행한 사고가 있었다.)

### 3. Playwright로 근거를 뽑아 쓴다
```bash
npm run evidence <slug> -- --law <법령명>:<조,조> --url <공식URL>
```
→ `scripts/evidence/<slug>.json`(원문) + `<slug>/*.png`(스크린샷)
**본문의 모든 숫자는 이 JSON의 `quote`/`value` 안에 있는 값만.** WebSearch/WebFetch는 훅이 차단한다.
출처 사이트 목록: `.claude/rules/wiki-rules.md`

### 4. 템플릿·JSON과 대조한다
```bash
npm run verify:articles    # 템플릿 프로필 대조 + 키워드 + 출처 + 보호자산
npm run verify:evidence    # 본문 수치 ↔ 증거 JSON + 증거 신선도(30일)
npm run verify:rendered -- <slug>   # Playwright로 실제 화면을 열어 대조 (푸시 전 필수)
```

**푸시 전에 `verify:rendered`를 반드시 돌린다.** 데이터 검증은 "값이 있는가"만 본다.
화면이 어떻게 나오는지는 모른다. 실제로 이 구멍으로 두 번 사고가 났다 —
표 헤더가 옛 CSS에 덮여 남색으로 나온 것, 보험 글 CTA가 신용조회로 간 것.

이 검사기는 화면을 열어 블록 렌더링·비주얼 연속·표 색상·라벨을 보고,
**CTA 링크를 실제로 따라가** 그 페이지가 주제에 맞는 신청·조회 화면인지 확인한다.
안내·점검 페이지이거나 행동 요소가 없으면 실패시킨다.
ERROR면 템플릿을 다시 열어 대조하고 고쳐 쓴다. 통과할 때까지 반복.
검증기가 못 잡는 오해의 소지·과장·근거 없는 단언은 직접 걷어낸다.

**기준은 템플릿에서 자동으로 나온다.** `scripts/template-profile.mjs`가 정본 HTML을
파싱해 섹션 수·비주얼 종류·라벨 길이·핵심콕콕 행수 등을 산출하고 검증기가 그걸 쓴다.
숫자를 코드에 손으로 박지 않는다 — 템플릿을 고치면 기준이 따라온다.

강제되는 것: 전 섹션 비주얼 보유 · 같은 비주얼 연속 금지 · eyebrow 라벨(소제목 재탕 금지)
· 내부 링크 2개 이상 + 유도 문장 필수 · 증거 30일 이내.

## 빌드

`npm run build` ~15분. **글 1개마다 빌드 금지** — 50개 배치 단위. prebuild에 4단계 검증이 걸려 어긴 글은 빌드가 실패한다.
같은 slug의 `src/app/w/<slug>/`가 있으면 글이 가려진다 → 완료 후 삭제 (`scripts/conflict-map.json`).

훅 3종은 `.claude/settings.json` → `scripts/hooks/` (템플릿 주입 · 웹검색 차단 · 계산기·양식 보호).
