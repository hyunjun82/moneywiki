---
name: write
description: 머니위키 글 한 편 — 사용자가 준 키워드 묶음으로 정본 템플릿 구조의 글을 쓰고 숫자·화면·뜻을 검사해 채점받을 상태까지 간다. 리라이트·신규 모두. "/write <slug>" 또는 사용자가 주제+키워드를 던질 때.
---

# /write <slug>

한 편을 처음부터 끝까지. 판단(질문 군집·이미지 속 숫자·버튼 화면)은 여기서 내가 한다.
스크립트는 수집·대조·렌더만 한다. 순서를 바꾸지 않고, 단계 사이는 파일로만 넘긴다.

## 0. 정본을 연다
`docs/moneywiki-article-template.html` 을 Read. 이 파일의 블록과 주석이 규칙 전부다.
어긋나는 옛 기억이 있으면 템플릿이 이긴다.

## 1. 입력 → 질문 군집 → 타이틀
- 사용자가 준 묶음을 `scripts/inputs/<slug>.txt` 에 저장 → `npm run input -- <slug>`
  (네이버를 직접 긁으려면 `npm run keywords -- <slug> --q "..."` 를 더한다)
- `scripts/keywords/<slug>.json` 의 자동완성·연관·지식iN 질문을 **군집 2~4개**로 묶는다. 군집 = 검색자가 정말 알고 싶은 것.
- **타이틀 = 메인키워드 + 군집 이름을 중점(·)으로 + 총정리 (연도)**. 이 군집이 곧 대제목(h2)이다. 1:1.
- 각 군집 안의 세부 질문 = 소제목(h3), 검색자 문장 그대로 "~나요". 6~9개.
- 기존 slug 리라이트면 slug 그대로. 같은 주제 글이 여럿이면 대표 slug 하나에 다 흡수하고 나머지는 301 후보로 적어 둔다.

## 2. 근거를 모은다 — Playwright 로 연 화면만
- `npm run evidence -- <slug> --law <법령명>:<조,조> --url <공식URL> [--url ...]`
  → `scripts/evidence/<slug>.json` (quote/value) + `scripts/evidence/<slug>/*.png`
- **PNG 를 Read 로 열어 눈으로 읽는다.** 표·상한액·요율은 이미지에 있는 경우가 많다.
- 본문에 쓸 숫자는 JSON `quote`/`value` 안에 있는 것만. 없으면 안 쓴다. 기억으로 채우지 않는다.
- 버튼(CTA) 주소는 `.go.kr`·`.or.kr` 의 **그 일을 하는 화면**. 넣기 전 Playwright 로 열어 본다. 기관 홈 금지.
- 즉답 위젯 상수(하한·상한·일수표)는 같은 증거에서 온다. `heroWidget.params` 에 넣고 코드에 박지 않는다.

## 3. 쓴다 — `src/data/articles/<카테고리>.ts`
템플릿 블록 순서대로 `ArticleData` 를 채운다 (`types.ts` 주석이 필드 설명):
```
meta.title / meta.description(리드: 결론 한 문장, 굵은 숫자 하나) / verify{note,date}
heroWidget(계산 주제만) / heroStats(핵심 숫자 2개)
keyFacts 7~9행 (대제목 순서대로)
mainSections[군집 수] — eyebrow · heading("~나요") · answer(한 줄 답) · 비주얼(decide/flow/compareTable/stepbar/timeline/checklist) · body · cta · quote
  └ subsections[] — heading · answer · 비주얼 · body · cta · quote
context.faqList 4~6 (본문에서 답한 것만 다시 묻기 — 새 주장 금지)
summary[군집 수] — 항목마다 행동 또는 숫자 하나
sources[] group: 법령 / 행정규칙·안내 / 정부 도구 / 검증 방법
```
- 어미 해요체. 타이틀은 명사형. 대시(—) 금지. 표는 caption·footnote 필수, 열 4개↑면 `cards: true`.
- 숫자가 있는 섹션엔 `quote` (조문 원문 한 줄) 반드시.
- 사례 인물·숫자는 moneydoc 등 다른 사이트와 다르게 — 문장 복제 금지.

## 4. 검사한다 — 통과할 때까지
`npm run verify -- <slug>` (dev 서버 자동 기동)
- 숫자 근거 ✗ → 그 숫자를 증거에서 찾거나 문장을 뺀다
- 화면 ✗ → 검사기가 말한 블록·색·한 줄 답·CTA 를 고친다
- 뜻 ✗ → 훅↔버튼·소제목↔본문·근거 초과 단언·의도 누락을 고친다
검사기를 고치지 않는다. 글을 고친다.

## 5. 보이고 채점받는다
- `verify-rendered` 가 남긴 캡처 또는 dev 화면 캡처 + 검사 3종 결과를 사용자에게 보인다
- 사용자 채점(예/아니오 5문항: 궁금증 해결·타이틀=본문·숫자 근거·읽힘·오해 소지 없음)
- 통과한 글은 다음 글의 기준이 된다. 규칙을 더하지 않는다.

## 하지 않는 것
- 계산기 54개·양식(`src/app/forms/**`)·`src/app/w/<slug>/` 직접 작성
- WebSearch·WebFetch · 새 slug · 헤드리스 모델에 초안 맡기기 · 검사기 통과를 위한 문장 조작
