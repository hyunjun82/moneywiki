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

## heroCTA (Q+A+B 카드) — 허브 전용

> hero 영역 하단, summary3 아래에 표시. 스포크의 pasBridge에 대응하는 허브용 CTA.
> "이 허브의 핵심 스포크로 유도"가 목적.

### 구조

```tsx
heroCTA: {
  href: '/w/핵심-스포크-슬러그',
  question: '독자 구체 상황 + 숫자 포함 질문',
  answer: (<>숫자·사실을 <strong>bold</strong>로 강조한 답변 1~2문장</>),
  buttonText: '도착 스포크 핵심 주제 6~8자 →',
}
```

### 실전 예시 4개

**[1] 놀라움 → 제도 소개 → 핵심 스포크**
- Q: "퇴직연금으로 국채를 직접 살 수 있다는 거 아시나요?"
- A: "2026년 9월부터 DC형·IRP 계좌로 개인투자용 국채를 <strong>직접 매수</strong>할 수 있어요."
- B: "DC형 IRP 투자 조건 보기 →"

**[2] 공감 → 숫자 해결 → 조건 스포크**
- Q: "기초생활수급자 조건이 너무 복잡해서 막막하시죠?"
- A: "가구원 수와 소득만 입력하면 <strong>4가지 급여</strong> 수급 가능 여부를 바로 알 수 있어요."
- B: "수급자 선정 기준 보기 →"

**[3] 궁금증 → 비교 → 비교 스포크**
- Q: "실업급여를 받으면서 알바를 할 수 있을까요?"
- A: "월 60시간 미만, 급여 상한선 이내면 <strong>취업 중에도 실업급여</strong>를 받을 수 있어요."
- B: "취업 중 실업급여 조건 →"

**[4] 숫자 → 혜택 → 수익률 스포크**
- Q: "연 7.3% 복리 수익, 세금도 안 내도 된다면요?"
- A: "개인투자용 국채 20년물은 만기 수익 <strong>147%</strong>, 2억까지 이자소득 비과세예요."
- B: "국채 수익률 세금 혜택 →"

### question 패턴 (스포크 pasBridge와 동일)
- 놀라움: "~아셨나요?" / "~라는 거 아시나요?"
- 공감: "~막막하시죠?" / "~걱정이시죠?"
- 궁금증: "~할 수 있을까요?" / "~얼마를 받을 수 있을까?"

### buttonText 규칙
- 도착 스포크 핵심 주제 6~8자 + " →"
- GOOD: "DC형 IRP 투자 조건 보기 →", "수급자 선정 기준 보기 →"
- BAD: "자세히 보기 →", "전체 가이드 →", "확인하기 →", "바로가기 →"

### href 대상
- 허브의 핵심 스포크 1개 (`/w/스포크-슬러그`)
- 외부 URL 금지, 앵커(`#sec-xxx`) 금지

---

## sticky (하단 고정 바)

> 허브 하단에 고정 표시. 가장 중요한 핵심 수치 + 행동 유도.

### 구조

```tsx
sticky: {
  label: '짧은 라벨 (시행일, 기준 등)',
  value: '핵심 수치 또는 키워드',
  ctaText: '버튼 텍스트 ↓',
  ctaTarget: '#sec-xxx',   // 같은 허브 내 앵커 (허브는 앵커 이동이 기본)
}
```

### 규칙
- **허브 sticky는 같은 페이지 앵커 이동이 기본** (스포크와 다름!)
- 허브 = 개관 페이지 → 핵심 섹션으로 스크롤 유도가 자연스러움
- ctaTarget: `#sec-xxx` (허브 내 섹션 id) 또는 `#checker`
- ctaText: "~보기 ↓", "~비교 ↓" 등 하향 화살표(↓) 사용
- "확인하세요", "확인하기" 금지

### 실전 예시

```tsx
// 퇴직연금 국채 허브
sticky: {
  label: '2026.9 시행',
  value: 'DC형·IRP 국채 투자',
  ctaText: '참여기관 보기 ↓',
  ctaTarget: '#sec-institutions',
}

// 기초생활수급자 허브
sticky: {
  label: '2026년 기준',
  value: '1인가구 생계급여 82만원',
  ctaText: '선정 기준 보기 ↓',
  ctaTarget: '#sec-criteria',
}
```

---

## spokeGroups (스포크 그리드)

> 허브 하단, FAQ 위에 표시. 스포크들을 2~3개 그룹으로 분류.

### 구조

```tsx
spokeGroups: [
  {
    title: '그룹 제목 (주제 카테고리)',
    spokes: [
      {
        slug: '스포크-슬러그',
        title: '스포크 제목 (짧게)',
        desc: '1줄 설명 (구체적, 30자 이내)',
        badge: '2~3글자 카테고리',
      },
    ],
  },
]
```

### badge 규칙
- 2~3글자 (신청, 조건, 수익, 비교, 계산, 절차 등)
- 같은 그룹 내 badge 중복 금지
- GOOD: "신청", "조건", "수익", "비교", "절차", "세금"
- BAD: "정보", "안내", "가이드", "기타"

### desc 규칙
- 30자 이내, 구체적 내용 1줄
- 해당 스포크의 핵심 차별점을 드러내야 함
- GOOD: "10년물 vs 20년물 차이와 청약 절차", "복리 가산금리와 비과세 조건"
- BAD: "자세한 내용", "전체 정보", "관련 내용 정리"

---

## chips (히어로 아래 4칸)

> hero 바로 아래 4칸 격자. 각 칸이 스포크로 이동.

### 구조

```tsx
chips: [
  { icon: '📋', label: '짧은 라벨', value: '핵심 수치', href: '/w/스포크-슬러그' },
]
```

### 규칙
- 정확히 4개 (스포크 4개와 1:1)
- icon: 이모지 1개 (각 칸 구분용, 중복 금지)
- label: 스포크 핵심 주제 3~5자
- value: 핵심 수치 또는 포인트 (짧게)
- href: `/w/스포크-슬러그` (앵커 금지)

### 실전 예시

```tsx
chips: [
  { icon: '📋', label: '신청 방법', value: '10년물·20년물', href: '/w/신청-스포크' },
  { icon: '✅', label: 'DC형 IRP 조건', value: '참여기관 9곳', href: '/w/조건-스포크' },
  { icon: '💰', label: '수익률 세금', value: '복리 비과세', href: '/w/수익률-스포크' },
  { icon: '⚖️', label: '국채 vs ETF', value: '안정성 비교', href: '/w/비교-스포크' },
]
```

---

## sectionSpoke (섹션 끝 스포크 카드)

> 각 섹션 content 끝에 관련 스포크 내부링크 카드 1~4개.

### 구조

```tsx
sectionSpoke: [
  { icon: '📋', title: '스포크 제목', desc: '1줄 설명', href: '/w/스포크-슬러그' },
]
```

### 규칙
- 섹션당 1~2개 (3개 이상이면 산만)
- icon: 이모지 1개
- title: 스포크 실제 주제 (짧게)
- desc: 해당 섹션과 연관된 설명 (스포크 전체가 아닌, 이 섹션 맥락에서)
- href: `/w/스포크-슬러그` (앵커 금지!)
- desc에 "확인", "총정리" 금지
- GOOD desc: "10년물 vs 20년물 비교와 청약 절차", "기관별 가입 조건과 계좌 이전 방법"
- BAD desc: "자세히 확인하기", "전체 내용 보기"

---

## bridgeCTA (섹션 끝 작은 카드 — 허브용)

> 허브에서도 sectionSpoke와 별개로 bridgeCTA 배치 가능. 1~2개 섹션에만.

### 구조

```tsx
bridgeCTA: {
  href: '/w/스포크-슬러그',
  badge: '2~3글자 카테고리',
  title: '독자 궁금증 유발 질문 (20자 이내)',
  desc: '1줄 설명 (40자 이내)',
}
```

### 규칙
- 허브에서는 icon 없음 (스포크 bridgeCTA와 다름!)
- title: 독자 입장 질문 ("내 퇴직연금으로 국채를 살 수 있을까요?")
- desc: 구체적 답변 힌트 ("DC형·IRP 가입 조건과 참여 기관 9곳")
- desc에 "확인", "총정리" 금지
- 같은 허브 내 heroCTA와 동일 스포크로 중복 연결 가능 (허브는 핵심 스포크 강조)

---

## ogDescription 규칙

> `meta.ogDescription` — SNS/카카오톡 공유 시 표시되는 설명.

### 금지 표현
- "확인하세요", "확인해 보세요", "계산해 보세요" (CTA 명령형)
- "총정리", "완벽정리", "올인원"
- "자세히 알아보세요"

### 패턴
- 핵심 정보 + 구어체 마무리
- GOOD: "DC형·IRP로 국채 직접 투자, 참여기관 9곳과 수익률을 정리했어요"
- BAD: "DC형·IRP로 국채 직접 투자, 참여기관 9곳 확인하세요"

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
| ogDescription "확인하세요" | → "정리했어요" 등으로 교체 |
| heroCTA buttonText "확인하기 →" | → 구체 주제 6~8자 + " →" |
| sticky ctaText "확인 →" | → "보기 ↓" |
| sectionSpoke desc "확인" | → 구체적 설명으로 교체 |
