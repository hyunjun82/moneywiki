# Hub 템플릿 — 구조 레퍼런스

> 컴포넌트 API, 문체, 고유성, 금지, title 규칙 → hub-writer.md에 있음. 여기서 중복하지 않음.
> 이 파일 = **HubData 구조 + 섹션 배치 + 컴포넌트 조합 가이드**.

---

## 파일 구조

```tsx
import type { HubData } from './types'
import { HubTable, HubTipBox, HubWarnBox, HubFormula } from '@/components/hub/HubBlocks'
import { CalcLink } from '@/components/spoke/SpokeBlocks'

const data: HubData = {
  slug, meta, category, hero, toc, sections, faq,
  spokeGroups, sources, summary, source, chips,
  heroCTA, sticky, prevNext,
}
export default data
```

상세 필드: `src/data/hub/types.ts` 참조.

---

## 섹션 배치

| # | id | tag | 용도 | 필수? |
|---|-----|-----|------|-------|
| 1 | checker | CHECK | Checker (해당 주제 전용이 있을 때만) | 선택 |
| 2~5 | sec-xxx | 01~04 | H2 질문형 (keywords와 매칭) + sectionSpoke | 필수 4개 |
| 6 | sec-xxx | 05~06 | 추가 주제/신청 방법 | 선택 |

- Checker 없으면 → 1번을 Chips/RateCards/핵심요약으로 대체.
- sectionSpoke: 각 섹션 끝 관련 스포크 내부링크 카드 (/w/슬러그, 앵커 금지).
- chips: hero 아래 4칸, 반드시 스포크 내부링크 (/w/슬러그).

---

## 컴포넌트 조합 가이드

> 허브는 **가볍게** — 시각 컴포넌트 2~4개. 5개 이상 금지.

| 주제 유형 | 추천 조합 | 피할 것 |
|-----------|----------|---------|
| 복지/급여 종합 | HubTable + HubTipBox + HubFormula | 표만 3개 |
| 세금/재무 종합 | HubTable + HubFormula + HubWarnBox | 텍스트만 |
| 절차/신청 종합 | HubStepCards + HubTipBox | 스포크와 같은 Steps |
| 비교/선택 종합 | HubCompareCards + HubRateBars | 표로만 비교 |

**이 표는 예시. 주제 내용에 맞게 직접 구성하라.**

---

## title-first 파생 관계도

```
meta.title ──┬──→ keywords 4개 (title 핵심 단어 조합)
             ├──→ H2 4~5개 (keywords + 베이스키워드 + 질문형)
             ├──→ description (keywords 3개+ 자연 포함, 구어체 2문장)
             ├──→ hero.h1 (title 핵심, 타이틀형만! 질문형/금지어 금지)
             └──→ ogTitle (title + " | 머니위키")
```

---

## 허브 vs 스포크 차이

| 구분 | 허브 | 스포크 |
|------|------|--------|
| 역할 | 주제 개관 + 스포크 연결 지도 | 세부 주제 심층 해설 |
| 깊이 | 각 H2를 2~3단락 요약 | 각 H2를 5~8단락 상세 |
| CTA | sectionSpoke (→ 스포크로) | hubCTA (← 허브로) |
| 시각 | 가볍게 (2~4개) | 풍부하게 (4종+) |

---

## 빈출 오류 (quick reference)

| 오류 | 수정 |
|------|------|
| HubTimeline `date` | → `month` |
| HubTimeline `highlight: true` | → `status: 'warning'` |
| HubFlow `desc` | → `sub` |
| chips href에 `#앵커` | → `/w/스포크-슬러그` |
| sectionSpoke href에 `#앵커` | → `/w/스포크-슬러그` |
| hero.h1에 "총정리" | → 금지어 제거 |
| 시각 컴포넌트 5개+ | → 2~4개로 줄이기 |
