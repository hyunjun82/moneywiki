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

## pasBridge (Q+A+B 카드) — 필수 숙지!

> 섹션 끝에 형제 스포크로 연결하는 큰 카드. question + answer + buttonText 3요소가 한 묶음.

### 구조

```tsx
pasBridge: {
  href: '/w/형제-스포크-슬러그',
  question: '독자 구체 상황 + 숫자 포함 질문',
  answer: (<>숫자·사실을 <strong>bold</strong>로 강조한 답변 2~3문장</>),
  buttonText: '도착 페이지 주제 6~8자 →',
}
```

### 실전 예시 6개 (Q+A+B 전체 구조 필독!)

**[1] 막막함 → 즉시 해결 → 신청 방법**
- Q: "갑자기 직장을 잃었는데, 당장 다음 달 생활비가 막막하시죠?"
- A: "긴급복지지원은 신청 즉시 선지급 후 조사해요. 생계급여와 별개로 최대 **월 71만원** 긴급생계지원 + 의료·주거 지원을 동시에 받을 수 있어요."
- B: "긴급복지지원 신청 방법 →"

**[2] 걱정+숫자 → 제도 변경 → 지원금 확인**
- Q: "월세가 밀려서 걱정이신가요? 서울 1인가구 최대 35만원 지원돼요."
- A: "주거급여는 부양의무자 기준이 완전 폐지됐어요. 중위소득 48% 이하면 임차료를 지원받아요. 서울 1인가구 기준 **최대 약 35만원**."
- B: "주거급여 지원금 확인 →"

**[3] 부담 → 0원 충격 → 차이 비교**
- Q: "매달 병원비가 부담되시나요? 의료급여 1종이면 본인부담 0원이에요."
- A: "MRI·입원비·수술비 포함 **본인부담 0원**에 가깝고, 건강보험료도 0원이에요."
- B: "의료급여 1종 2종 차이 보기 →"

**[4] 놀라움 → 구체 숫자 → 계산**
- Q: "전세금 1억, 자동차 있어도 수급자 될 수 있다는 거 아셨나요?"
- A: "서울 거주자라면 전세 **9,900만원까지 재산 0원 처리**돼요. 1,600cc 미만 차량도 조건부 인정."
- B: "재산 소득환산율 계산 →"

**[5] 구체 상황 → 공제 계산 → 상세**
- Q: "월 100만원 버는데 수급자가 될 수 있을까요?"
- A: "근로소득공제 30%를 적용하면 소득평가액이 **70만원**이에요. 1인가구 생계급여 기준(82만원)보다 낮아서 수급 가능성이 있어요."
- B: "근로소득공제 상세 계산 →"

**[6] 체커 유도 (→ 대신 ↓)**
- Q: "내가 수급자가 될 수 있을까? 조건이 복잡해서 헷갈리시나요?"
- A: "가구원 수, 소득, 재산 3가지만 선택하면 4가지 급여 중 내가 받을 수 있는 급여를 바로 확인할 수 있어요."
- B: "간편 자격 체크 ↓"

### question 3가지 패턴 (같은 글 내 반복 금지)
- 놀라움: "~아셨나요?" / "~라는 거 아시나요?"
- 공감: "~부담되시나요?" / "~걱정이시죠?" / "~막막하시죠?"
- 궁금증: "~될 수 있을까요?" / "~얼마를 받을 수 있을까?"

### buttonText 규칙
- 도착 페이지 핵심 주제 6~8자 + " →"
- GOOD: "주거급여 지원금 확인 →", "재산 소득환산율 계산 →", "국채 청약 신청 절차 →"
- BAD: "자세히 보기 →", "전체 가이드 →", "바로가기 →", 키워드 5개 나열

### href 대상
- 같은 허브 내 형제 스포크 (`/w/슬러그`)
- 부모 허브 (`/w/허브-슬러그`)
- 같은 글 체커 (`#checker`) — 이때 buttonText는 " ↓"
- 외부 URL 금지, 앵커(`#sec-xxx`) 금지 (`#checker`만 예외)

---

## hubCTA (3줄요약 아래 허브 연결 카드)

> hero.hubCTA → BridgeCTA 컴포넌트로 렌더. title은 hub.name 자동.

### 구조

```tsx
hubCTA: {
  badge: '도착 허브 핵심 주제 6~8자',   // → 버튼 텍스트 "{badge} →"
  desc: '허브 내용 구체 요약 1줄',       // "확인하세요", "총정리" 금지!
}
```

### 렌더 결과

```
┌──────────────────────────────────────────┐
│ [hub.name] ← title (자동, 수정 불가)       │
│ [hubCTA.desc] ← 설명                      │
│ [hubCTA.badge →] ← 버튼                   │
└──────────────────────────────────────────┘
```

### badge 규칙 (= 버튼 텍스트)
- pasBridge buttonText와 동일 패턴: 도착 페이지 핵심 주제 6~8자
- GOOD: "수급자 선정 기준 보기", "국채 투자 조건 비교", "실업급여 수급 조건 보기"
- BAD: "전체 가이드", "올인원", "안내", "정리" (너무 추상적), 키워드 5개 나열

### desc 규칙
- 허브에서 다루는 핵심 항목 2~3개를 구체적으로 나열
- GOOD: "선정 기준, 4가지 급여, 신청 방법까지 한눈에 정리돼 있어요"
- BAD: "전체 내용을 확인하세요", "모든 정보가 있어요"

---

## bridgeCTA (마지막 섹션 작은 카드)

> 마지막 본문 섹션에만 배치. pasBridge보다 간결한 링크 카드.

```tsx
bridgeCTA: {
  href: '/w/관련-스포크-슬러그',
  badge: '2~3글자 카테고리',
  title: '독자 궁금증 유발 질문 (20자 이내)',
  desc: '1줄 설명 (40자 이내)',
  icon: 'check' | 'calc' | 'clock' | 'info' | 'grid',
}
```

---

## stickyBar (하단 고정 바)

```tsx
// 기본: 다른 페이지로 이동 (href 사용, 이게 기본!)
stickyBar: {
  topLabel: '라벨',
  value: '핵심 수치',
  buttonText: '버튼 텍스트 →',
  href: '/w/이동할-슬러그',
}

// 예외: 같은 페이지 내 스크롤 (scrollTo, 특수한 경우만)
stickyBar: {
  topLabel: '라벨',
  value: '핵심 수치',
  buttonText: '버튼 텍스트 ↓',
  scrollTo: '#sec-xxx',
}
```

- **기본은 href** (내부 링크). scrollTo는 같은 페이지 체커/표로 이동할 때만.

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
