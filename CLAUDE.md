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

### 3. Playwright로 근거를 뽑아 쓴다
```bash
npm run evidence <slug> -- --law <법령명>:<조,조> --url <공식URL>
```
→ `scripts/evidence/<slug>.json`(원문) + `<slug>/*.png`(스크린샷)
**본문의 모든 숫자는 이 JSON의 `quote`/`value` 안에 있는 값만.** WebSearch/WebFetch는 훅이 차단한다.
출처 사이트 목록: `.claude/rules/wiki-rules.md`

### 4. 템플릿·JSON과 대조한다
```bash
npm run verify:articles    # 템플릿 블록 + 키워드 + 출처 + 보호자산
npm run verify:evidence    # 본문 수치 ↔ 증거 JSON
```
ERROR면 템플릿을 다시 열어 대조하고 고쳐 쓴다. 통과할 때까지 반복.
검증기가 못 잡는 오해의 소지·과장·근거 없는 단언은 직접 걷어낸다.

## 빌드

`npm run build` ~15분. **글 1개마다 빌드 금지** — 50개 배치 단위. prebuild에 4단계 검증이 걸려 어긴 글은 빌드가 실패한다.
같은 slug의 `src/app/w/<slug>/`가 있으면 글이 가려진다 → 완료 후 삭제 (`scripts/conflict-map.json`).

훅 3종은 `.claude/settings.json` → `scripts/hooks/` (템플릿 주입 · 웹검색 차단 · 계산기·양식 보호).
