# Hub 템플릿 — 구조 규칙 + 컴포넌트 선택 가이드

> **이 파일은 "구조 규칙"이다. 특정 글의 완성본이 아니다.**
> 허브는 주제 개관 + 스포크 연결 지도 역할.
> 주제에 맞게 Checker/표/시각화를 직접 판단해서 구성하라.
> 최종 업데이트: 2026-02-15

---

## 핵심 원칙

1. **템플릿 = 뼈대 규칙**. 어떤 필드가 필요하고, 어떤 순서로 배치하는지만 정한다
2. **허브는 스포크의 요약/연결 지도** — 스포크 본문을 복사하지 마라
3. **Checker, 표, 시각 컴포넌트는 주제에 맞게 에이전트가 판단**한다
4. **다른 허브와 시각 조합/구조가 똑같으면 FAIL** — AI 찍어내기 방지
5. 참고용 골든 예시: `src/data/hub/기초생활수급자-조건-총정리.tsx` (구조만 참고, 내용/컴포넌트 복사 금지)

---

## 허브 vs 스포크 — 역할 차이

| 구분 | 허브 (Hub) | 스포크 (Spoke) |
|------|-----------|---------------|
| 역할 | 주제 개관 + 스포크 연결 지도 | 세부 주제 심층 해설 |
| 깊이 | 각 H2를 2~3단락으로 요약 | 각 H2를 5~8단락으로 상세 |
| 핵심 CTA | 스포크 카드 (sectionSpoke, spokeGroups) | 허브 복귀 카드 (hubCTA) |
| 내부링크 | → 스포크로 보냄 | ← 허브로 돌려보냄 |
| 시각 컴포넌트 | 가볍게 (2~4개) | 풍부하게 (4종+ 필수) |
| Checker | 1번 섹션 (진입 즉시 노출) | STEP 01 |

---

## 파일 위치·등록

```
src/data/hub/[슬러그].tsx     <- 허브 파일 위치
src/data/hub/registry.ts     <- 여기에 import + 등록
src/data/hub/types.ts        <- HubData 타입 정의
```

---

## 파일 구조 (위에서 아래로)

```tsx
import type { HubData } from './types'
// 주제에 필요한 컴포넌트만 import (전부 가져오지 마라)
import { HubTable, HubTipBox, HubWarnBox, HubFormula } from '@/components/hub/HubBlocks'
import { CalcLink } from '@/components/spoke/SpokeBlocks'
// Checker가 필요한 주제만: import XxxChecker from '@/components/checkers/XxxChecker'

const data: HubData = {
  slug: '슬러그',
  meta: { ... },
  category: '카테고리',
  hero: { ... },
  toc: [...],
  sections: [...],       // Checker 1번 + 본문 4~5개
  faq: [...],            // FAQ (3~6개)
  spokeGroups: [...],    // 스포크 그룹 (하단)
  sources: [...],        // 출처 (2개+)
  summary: [...],        // 3줄 요약
  source: { ... },       // 출처 바
  chips: [...],          // 4칸 네비게이션 (내부링크!)
  heroCTA: { ... },      // 체커 유도 버튼
  sticky: { ... },       // 하단 스티키 바
  prevNext: { ... },     // 이전글/다음글
}

export default data
```

---

## 각 필드 규칙

### meta

```tsx
meta: {
  title: '핵심 키워드 + 혜택 | 보조 키워드/질문',  // 60자 이내, | 필수
  description: '구어체 2문장 100~150자. 키워드 3개+ 자연 포함',
  keywords: ['키워드1', '키워드2', '키워드3', '키워드4'],  // 정확히 4개
  ogTitle: '타이틀 | 머니위키',
  ogDescription: '30~50자 행동유도',
}
```

**타이틀 규칙 (스포크와 동일):**
- 구분자: `|` (파이프). `-`, `—`, `:` 금지
- 금지어: 총정리, 완벽정리, 가이드, 완벽 가이드
- 예시: `2026 기초생활수급자 조건과 급여 | 소득인정액 계산부터 신청까지`

**description 황금 공식 (스포크와 동일):**
- 100~150자, 구어체 2문장 (~이에요/~해요)
- **구조: [궁금증 유발 1문장] + [해결+행동유도 1문장]**
- 키워드 4개 중 3개+ 자연 포함
- 마무리: ~알려드려요/~확인해 보세요/~체크하세요 (행동유도 필수)
- 금지: ~알아봅니다/~총정리/~살펴보겠/키워드 나열
- 3가지 패턴 순환

### hero

```tsx
hero: {
  badge: '2026년 최신 · 기관명',
  tags: ['카테고리', '종합 가이드'],
  h1: (<>2026 <em>핵심키워드</em> 제목</>),   // 금지어: 총정리/완벽정리/가이드/완벽 가이드
  subtitle: '한줄 설명 (~요체)',
}
```

**h1 금지어 (meta.title과 동일):** 총정리, 완벽정리, 가이드, 완벽 가이드 → 검증 훅에서 ERROR 처리

### sections 구성 (핵심!)

**Checker → 본문 4~5개 순서 — 주제에 따라 유동적:**

| # | id | tag | 용도 | 필수? |
|---|-----|-----|------|-------|
| 1 | checker | CHECK | Checker (해당 주제에 전용 Checker가 있을 때만) | 선택 |
| 2~5 | sec-xxx | 01~04 | H2 질문형 (keywords와 매칭) + sectionSpoke | 필수 4개 |
| 6 | sec-xxx | 05~06 | 추가 주제/신청 방법 | 선택 |

**Checker 규칙 (스포크와 동일):**
- Checker는 **해당 주제 전용 컴포넌트가 `src/components/checkers/`에 존재할 때만** 사용
- 없는 Checker를 import하면 빌드 에러남
- Checker가 없는 주제는 1번 섹션을 핵심 요약/Chips 등으로 대체
- **절대 다른 주제의 Checker를 가져다 쓰지 마라**

**Checker가 반드시 1번!** 독자 진입 시 바로 체커 노출 → 시선 확보 + 체류시간 증가.

### sections 각 항목 구조

```tsx
{
  id: 'sec-xxx',
  tag: '01 개요',
  heading: '베이스키워드 + 질문형?',  // H2 = keywords와 매칭
  subtitle: '한줄 부제목',
  content: (<> ... </>),             // 주제에 맞는 시각 컴포넌트 선택
  sectionSpoke: [                    // 선택: 관련 스포크 내부링크 카드
    { icon: '...', title: '스포크 제목', desc: '한줄 설명', href: '/w/스포크-슬러그' },
  ],
  bridgeCTA: {                       // 선택: 섹션 간 연결
    href: '/w/관련-스포크-슬러그',   // 반드시 /w/ 시작! 앵커(#) 절대 금지!
    badge: '키워드',
    title: '독자 질문?',
    desc: '행동 유도 설명',
  },
}
```

**sectionSpoke 규칙 (중요!):**
- 목차(앵커)가 아니라 **내부링크** → 다른 스포크 URL(`/w/슬러그`)로 이동
- 각 섹션 끝에 관련 스포크 1~4개 배치
- `SectionSpoke` 컴포넌트가 `Link`로 렌더링 (이미 구현됨)

### chips (4칸 네비게이션)

```tsx
chips: [
  { icon: '...', label: '주제1', value: '핵심값', href: '/w/스포크-슬러그' },
  { icon: '...', label: '주제2', value: '핵심값', href: '/w/스포크-슬러그' },
  ...
]
```

**chips 규칙:**
- **내부링크!** 앵커(`#`)가 아니라 스포크 URL(`/w/슬러그`)로 이동
- 네비게이션 역할 — 독자가 관심 있는 하위 주제의 스포크로 바로 이동
- 4개 고정

### heroCTA (체커 유도 버튼)

```tsx
heroCTA: {
  href: '#checker',
  question: '자연스러운 질문?',
  answer: <>구체적 답변 + <strong>강조</strong></>,
  buttonText: '30초 자격 체크 →',
}
```

**heroCTA 규칙:**
- `href: '#checker'`로 체커 섹션으로 이동
- Checker가 없는 허브: heroCTA의 href를 핵심 섹션 앵커로 변경
- question: 독자 관점의 자연스러운 질문
- buttonText: 행동 + 시간 (예: "30초 자격 체크 →")

### prevNext (이전글/다음글)

```tsx
prevNext: {
  prev: { title: '이전 허브/스포크 제목', href: '/w/슬러그' },
  next: { title: '다음 허브/스포크 제목', href: '/w/슬러그' },
}
```

**모든 허브에 prevNext 필수!**

### spokeGroups (하단 스포크 목록)

```tsx
spokeGroups: [
  {
    title: '그룹 제목 (이모지 금지)',
    spokes: [
      { slug: '슬러그', title: '제목', desc: '설명', badge: '키워드' },
    ],
  },
]
```

- 모든 하위 스포크를 빠짐없이 포함
- 그룹 제목에 이모지 금지 (텍스트만)

---

## 허브 전용 컴포넌트 (HubBlocks.tsx)

| 컴포넌트 | 용도 | props |
|---------|------|-------|
| `HubTable` | 비교표, 금액표 | `id?, title?, subtitle?, headers, rows, highlightCol?, warnCol?` |
| `HubTipBox` | 핵심 팁 | `title, children(JSX)` |
| `HubWarnBox` | 주의/경고 | `title, children(JSX)` |
| `HubFormula` | 계산 공식 | `text, sub?[]` |
| `HubInfoBox` | 정보 박스 | `title, children(JSX)` |
| `HubFlow` | 흐름도 | `steps[{icon, label, sub?}]` |
| `HubTimeline` | 타임라인 | `events[{month, title, desc, status?, tag?}]` |
| `HubStepCards` | 단계 카드 | `steps[{title, desc, tip?}]` |
| `HubCompareCards` | A vs B | `cards[{title, subtitle, items, recommended?, recLabel?}]` |
| `HubRateBars` | 비율 막대 | `bars[{label, rate, width}]` |
| `HubCTA` | 외부링크 버튼 | `buttons[{href, label, title, variant}]` |
| `HubBridgeCTA` | 섹션 연결 | `href, badge, title, desc` |
| `HubSpokeLink` | 인라인 스포크 | `href, badge, title, desc` |

**스포크 컴포넌트도 사용 가능:**
- `CalcLink` — 외부 계산기 링크 (복지로 등)
- `SectionSpoke` — 섹션 내 스포크 카드 (허브 types.ts의 sectionSpoke로 자동 렌더링)

### 컴포넌트 선택 — 주제별 판단!

> 허브는 **가볍게** — 시각 컴포넌트 2~4개. 스포크처럼 풍부하게 넣지 마라.
> 다른 허브와 같은 조합이면 FAIL.

| 주제 유형 | 추천 조합 | 쓰면 안 되는 것 |
|-----------|----------|----------------|
| 복지/급여 종합 | HubTable + HubTipBox + HubFormula | 표만 3개 |
| 세금/재무 종합 | HubTable + HubFormula + HubWarnBox | 텍스트만 |
| 절차/신청 종합 | HubStepCards + HubTipBox | 스포크와 같은 Steps |
| 비교/선택 종합 | HubCompareCards + HubRateBars | 표로만 비교 |

**이 표는 예시일 뿐! 주제의 실제 내용에 맞게 조합을 직접 구성하라.**

---

## 글별 고유성 규칙 (AI 찍어내기 방지!)

### 1. 시각 조합 고유성
```
다른 허브와 시각 컴포넌트 조합이 동일하면 FAIL
- 허브A = [HubTable, HubTipBox, HubFormula]
- 허브B = 최소 1종류 이상 다르게 구성
```

### 2. 표 구조 고유성
```
- 표의 headers가 다른 허브와 동일하면 FAIL
- 행 수가 같고 구조가 같으면 AI 티 = FAIL
```

### 3. Checker 고유성
```
- 각 Checker는 해당 주제 전용 (src/components/checkers/에 존재하는 것만)
- 다른 주제의 Checker import 금지
- Checker가 없는 주제: heroCTA href를 핵심 섹션 앵커로 변경
```

### 4. 본문 내용 고유성
```
- 스포크 본문을 허브에 복사하면 FAIL
- 같은 데이터라도 허브는 "요약 관점", 스포크는 "상세 관점"으로 다르게 작성
- 각 허브는 해당 주제의 독자 관점에서 새로 작성
```

---

## H2 규칙 (스포크와 동일)

```
모든 H2에 베이스 키워드 포함!
H2는 질문형 (?)

BAD:  "급여별 선정기준은 얼마인가요?"
GOOD: "기초생활수급자 급여별 선정기준은 얼마인가요?"
```

허브 H2 = 4~5개 (스포크의 4개보다 약간 많을 수 있음)

---

## 금지 사항

### 공통 금지
- 다른 허브/스포크 파일을 복사해서 텍스트만 교체하는 행위 (= AI 찍어내기)
- 이모지: spokeGroups title에서 금지 (chips의 icon은 허용)
- ~습니다/~합니다 → ~이에요/~해요
- H2에 숫자 (`## 1. 제목`) 금지
- 타이틀에 "총정리", "완벽정리", "가이드" 금지
- 타이틀 구분자 `-`, `—`, `:` 금지 → `|` 사용
- 출처 없는 숫자 생성 금지

### 허브 전용 금지
- `BridgeCTA` (스포크 전용) 대신 `bridgeCTA` (data 속성) 사용
- 스포크 본문 복사 금지 (동일 문장 금지)
- 시각 컴포넌트 5개 이상 금지 (허브는 가볍게)
- chips href에 앵커(`#`) 금지 → 반드시 스포크 내부링크(`/w/`)
- sectionSpoke href에 앵커(`#`) 금지 → 반드시 스포크 내부링크(`/w/`)
- 존재하지 않는 Checker import 금지

---

## 최종 체크리스트

```
□ Checker가 sections 1번인가? (없으면 대체 요소?)
□ 모든 H2에 베이스 키워드 포함?
□ H2가 질문형(?)인가?
□ chips 4개의 href가 스포크 내부링크(/w/)인가?
□ sectionSpoke의 href가 스포크 내부링크(/w/)인가?
□ heroCTA가 #checker 또는 핵심 섹션으로 연결되는가?
□ prevNext 있음?
□ spokeGroups에 하위 스포크 전부 포함?
□ meta.title에 | 구분자?
□ meta.description 100~150자, 구어체 2문장?
□ meta.keywords 4개?
□ ~예요체 필수? (FAQ answer 포함)
□ 시각 컴포넌트 4개 이하?
□ sources 2개+ (정부/공식)?
□ spokeGroups title에 이모지 없음?
□ registry.ts 등록?
□ 다른 허브와 시각 조합이 겹치지 않는가?
□ 스포크 본문을 복사하지 않았는가?
```
