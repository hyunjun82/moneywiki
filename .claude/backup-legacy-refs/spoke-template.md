# Spoke 템플릿 — 구조 레퍼런스

> 컴포넌트 API, 문체, 고유성, 금지 규칙 → writer.md에 있음. 여기서 중복하지 않음.
> title 형식 → keywords.md 타이틀 황금 규칙 참조.
> 이 파일 = **SpokeData 구조 + 섹션 배치 + 컴포넌트 조합 가이드**.

---

## 파일 구조

```tsx
import type { SpokeData } from '@/data/spoke/types'
import { SpokeTable, FormulaBox, TipBox, ... } from '@/components/spoke/SpokeBlocks'

const data: SpokeData = {
  slug, meta, hub, breadcrumb, summary3, sourceBar,
  prevNext, stickyBar, hero, toc, sections, faq,
  relatedSpokes, sources,
}
export default data
```

상세 필드: `src/data/spoke/types.ts` 참조.

---

## 섹션 배치

| # | id | number | 용도 | 필수? |
|---|-----|--------|------|-------|
| 1 | checker | CHECK | Checker (checker-patterns.md 5유형 중 선택) | **필수** |
| 2~5 | sec-xxx | SECTION 02~05 | H2 질문형 (keywords 4개와 1:1 매칭) | 필수 4개 |
| 6 | sec-apply | STEP 0x | 신청/절차 (해당 시) | 선택 |
| 7 | sec-faq | 07 | FAQ (content: null) | 필수 |

- Checker: `src/components/checkers/`에 해당 주제 전용이 있을 때만. 없으면 RateCards/Chips 등으로 대체.
- 섹션 2~5: pasBridge 또는 bridgeCTA로 연결. 마지막 본문만 bridgeCTA.
- SpokeLinks: 본문 4개 중 최소 2개에 배치.

---

## 컴포넌트 조합 가이드

> "이 내용을 독자가 가장 빨리 이해하려면 어떤 형태?"

| 주제 유형 | 추천 조합 | 피할 것 |
|-----------|----------|---------|
| 금액/기준표 | SpokeTable + FormulaBox + TipBox + DetailBox | 표만 4개 |
| 절차/신청 | Steps + SpokeChecklist + TipBox + WarnBox | 표로 절차 나열 |
| A vs B 비교 | SpokeCompareCards + SpokeRateBars + TipBox + Chips | 텍스트로만 비교 |
| 계산 방법 | FormulaBox + SpokeTable + RateCards + TipBox | 공식만 3개 |
| 시간순 변경 | SpokeTimeline + SpokeTable + TipBox + WarnBox | 텍스트로 나열 |
| 조건/자격 | Chips + DetailBox + WarnBox + SpokeChecklist | 표 하나에 전부 |

**이 표는 예시. 주제 내용에 맞게 직접 구성하라.**

---

## title-first 파생 관계도

```
meta.title ──┬──→ keywords 4개 (title 핵심 단어 조합)
             ├──→ H2 4개 (keywords + 베이스키워드 + 질문형)
             ├──→ description (keywords 3개+ 자연 포함, 구어체 2문장)
             ├──→ hero.h1 (title 전체 그대로! | 포함! 질문형 금지)
             └──→ ogTitle (title + " | 머니위키")
```

---

## 빈출 오류 (quick reference)

| 오류 | 수정 |
|------|------|
| SpokeTimeline `date` | → `month` |
| SpokeTimeline `highlight: true` | → `status: 'warning'` |
| SpokeFlow `desc` | → `sub` |
| TipBox `items` prop | → `children` JSX |
| RateCards `highlightColor: 'neutral'` | → `'orange'` 또는 `'navy'` |
| Chips `icon`에 영어 | → 이모지만 (`'✅'`, `'📋'`) |
| h1 질문형 | → 타이틀형만 |
