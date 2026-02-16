# Spoke 템플릿 — 구조 규칙 + 컴포넌트 선택 가이드

> **이 파일은 "구조 규칙"이다. 특정 글의 완성본이 아니다.**
> 주제에 맞게 Checker/표/시각화를 직접 판단해서 구성하라.
> 다른 스포크와 시각 조합이 겹치면 FAIL.
> 최종 업데이트: 2026-02-15

---

## 핵심 원칙

1. **템플릿 = 뼈대 규칙**. 어떤 필드가 필요하고, 어떤 순서로 배치하는지만 정한다
2. **Checker, 표, 시각 컴포넌트는 주제에 맞게 에이전트가 판단**한다
3. **같은 허브 내 스포크끼리 시각 조합이 겹치면 FAIL** — AI 찍어내기 방지
4. 참고용 골든 예시: `src/data/spoke/기초생활수급자-1인가구-생계급여-조건-소득인정액.tsx` (구조만 참고, 내용/컴포넌트 복사 금지)

---

## 파일 구조 (위에서 아래로)

```tsx
import type { SpokeData } from '@/data/spoke/types'
// 주제에 필요한 컴포넌트만 import (전부 가져오지 마라)
import { SpokeTable, FormulaBox, TipBox, ... } from '@/components/spoke/SpokeBlocks'
// Checker가 필요한 주제만: import XxxChecker from '@/components/checkers/XxxChecker'

const data: SpokeData = {
  slug: '슬러그',
  meta: { ... },
  hub: { ... },
  breadcrumb: [...],
  summary3: [...],       // 3줄 요약
  sourceBar: { ... },    // 공식 출처 바
  prevNext: { ... },     // 이전/다음 글
  stickyBar: { ... },    // 하단 스티키 바
  hero: { ... },         // 히어로 영역
  toc: [...],            // 목차
  sections: [...],       // 본문 섹션 (5~7개)
  faq: [...],            // FAQ (2개+)
  relatedSpokes: [...],  // 관련 글 (2~5개)
  sources: [...],        // 출처 (2개+)
}

export default data
```

---

## 각 필드 규칙

### meta

```tsx
meta: {
  // ── title 규칙 (keywords.md 기준) ──
  // 구조: "[메인 롱테일, 자연어] | [추가 롱테일/질문]"
  // 60자 이내, | 필수, 키워드 나열 금지 → 자연스러운 문장!
  // GOOD: '청년미래적금 대상, 가입 조건 | 청년도약계좌와의 차이점은?'
  // GOOD: '2026 기초생활수급자 1인가구 생계급여 조건 | 소득인정액 계산 방법'
  // BAD:  '문화누리카드 신청 방법 자격 조건 | 자동재충전 발급 기간 2026' ← 키워드 나열
  title: '메인 롱테일, 자연어 배치 | 보조 롱테일 또는 질문형',  // 60자 이내
  description: '구어체 2문장 100~150자. 키워드 3개+ 자연 포함',
  keywords: ['키워드1', '키워드2', '키워드3', '키워드4'],  // 정확히 4개
  ogTitle: '타이틀 | 머니위키',
  ogDescription: '30~50자 행동유도',
}
```

**타이틀 규칙:**
- 구분자: `|` (파이프). `-`, `—`, `:` 금지
- 금지어: 총정리, 완벽정리, 가이드, 완벽 가이드
- 예시: `청년미래적금 대상, 가입 조건 | 청년도약계좌와의 차이점은?`

**description 황금 공식 (CTR 극대화):**
- 100~150자, 구어체 2문장 (~이에요/~해요)
- **구조: [궁금증 유발 1문장] + [해결+행동유도 1문장]**
- 키워드 4개 중 3개+ 자연 포함
- 마무리: ~알려드려요/~확인해 보세요/~체크하세요 (행동유도 필수)
- 금지: ~알아봅니다/~총정리/~살펴보겠/키워드 나열

3가지 패턴 순환 (같은 허브 내 중복 금지):
- A. 놀라움형: "[구체 사실]~라는 거 아시나요? [키워드] 알려드려요"
- B. 문제해결형: "[고민] 고민이시죠? [키워드] 방법을 알려드려요"
- C. 숫자형: "[숫자]~라는 사실, 알고 계셨나요? [키워드] 정리해드려요"

**검증 훅이 자동 검사하는 항목:**
- DESC-001: 100~150자 범위
- DESC-002: 마무리가 행동유도인지
- DESC-003: 궁금증 유발 패턴 포함 여부
- DESC-004: 금지 표현 (알아봅니다/총정리 등)

### hero

```tsx
hero: {
  badge: '2026년 최신',           // 태그
  h1: (<>타이틀 <span className="text-[#1E3A5F]">강조 부분</span> 나머지</>),
  intro: (<p className="text-base text-neutral-500 leading-relaxed">구어체 설명</p>),
  hubCTA: { badge: '전체 가이드', desc: '허브 페이지 한줄 설명' },
}
```

**h1 필수 규칙:**
- **타이틀형만 허용. 질문형(~인가요?/~될까요?/~있나요?) 절대 금지!**
- H2가 질문형이지 h1은 아님. 혼동하지 마라.
- `✅ 퇴직연금 DC형 IRP 국채 투자 조건` (타이틀형)
- `❌ 퇴직연금 DC형 IRP로 국채 투자, 어떤 조건이 필요한가요?` (질문형 = FAIL)

### sections (핵심!)

**섹션 5~7개 구성 — 주제에 따라 유동적:**

| # | id | number | 용도 | 필수? |
|---|-----|--------|------|-------|
| 1 | checker | CHECK | Checker (모든 스포크에 1개 필수! checker-patterns.md 참조) | **필수** |
| 2~5 | sec-xxx | SECTION 02~05 | H2 질문형 (keywords와 1:1 매칭) | 필수 4개 |
| 6 | sec-apply | STEP 0x | 신청/절차 (해당 시) | 선택 |
| 7 | sec-faq | 07 | FAQ (content: null) | 필수 |

**Checker 규칙:**
- Checker는 **해당 주제 전용 컴포넌트가 `src/components/checkers/`에 존재할 때만** 사용
- 없는 Checker를 import하면 빌드 에러남
- Checker가 없는 주제는 1번 섹션을 핵심 요약/RateCards 등으로 대체
- **절대 다른 주제의 Checker를 가져다 쓰지 마라**

**각 섹션 필수 구조:**
```tsx
{
  id: 'sec-xxx',
  number: 'SECTION 02',
  heading: '베이스키워드 + 질문형?',    // H2 = keywords와 1:1 매칭
  subtitle: '한줄 부제목',
  content: (
    <>
      <p>텍스트 4문장 이상 (구어체)</p>
      {/* 시각 컴포넌트 — 주제에 맞게 선택 (아래 가이드 참고) */}
    </>
  ),
  pasBridge: {                         // 섹션 끝에 PAS 브릿지
    href: '/w/관련-스포크-슬러그',
    question: '독자가 궁금해할 질문?',
    answer: <>핵심 답변 + <strong>강조</strong></>,
    buttonText: '행동 유도 →',
  },
}
```

**마지막 본문 섹션만 bridgeCTA 사용 (pasBridge 대신):**
```tsx
bridgeCTA: {
  href: '/w/관련-글',
  badge: '키워드',
  title: '다음 단계 질문?',
  desc: '행동 유도 설명',
  icon: 'info',    // calc | clock | info | grid | check
}
```

---

## 컴포넌트 선택 가이드 (주제별 판단!)

> **이 내용을 독자가 가장 빨리 이해하려면 어떤 형태가 좋을까?** 를 기준으로 선택한다.
> 같은 허브 내 스포크끼리 같은 조합이면 FAIL.

### 주제 유형별 추천 조합 (예시)

| 주제 유형 | 추천 컴포넌트 조합 | 쓰면 안 되는 것 |
|-----------|-------------------|----------------|
| 금액/기준표 (복지, 세금) | SpokeTable + FormulaBox + TipBox + DetailBox | 표만 4개 나열 |
| 절차/신청 방법 | Steps + SpokeChecklist + TipBox + WarnBox | 표로 절차 나열 |
| A vs B 비교 | SpokeCompareCards + SpokeRateBars + TipBox + Chips | 텍스트로만 비교 |
| 계산 방법 | FormulaBox + SpokeTable + RateCards + TipBox | 공식만 3개 |
| 시간순 변경사항 | SpokeTimeline + SpokeTable + TipBox + WarnBox | 텍스트로 나열 |
| 조건/자격 확인 | Chips + DetailBox + WarnBox + SpokeChecklist | 표 하나에 전부 |

**이 표는 예시일 뿐! 주제의 실제 내용에 맞게 조합을 직접 구성하라.**

### 전체 컴포넌트 목록 + props

| 컴포넌트 | 용도 | props |
|---------|------|-------|
| `SpokeTable` | 비교표, 금액표 | `id, title, subtitle, headers, rows, highlightCol?` |
| `FormulaBox` | 계산 공식 | `lines[{text, numbered?, comment?}]` |
| `TipBox` | 꿀팁, 핵심 정보 | `title, children(JSX)` |
| `WarnBox` | 주의/경고 | `children(JSX)` |
| `SpokeWarnBox` | 주의 (제목 포함) | `title, children(JSX)` |
| `DetailBox` | 번호+제목+설명 리스트 | `title, items[{heading, desc}]` |
| `Steps` | 절차/단계 | `items[{title, desc}]` |
| `Chips` | 4칸 그리드 (상태 비교) | `items[{icon, label, value, href?}]` — **icon은 이모지 필수!** `'✅'`, `'📋'`, `'🏦'`, `'💰'` 등. 영어(`'check'`, `'info'`) 넣으면 화면에 영어가 그대로 출력됨 |
| `SpokeLinks` | 섹션 내 관련 글 그리드 | `title, items[{num, heading, desc, href}]` |
| `CalcLink` | 외부 계산기 링크 | `href, icon?, title, desc?` |
| `SpokeChecklist` | 서류/조건 체크리스트 | `items[{text, done?, note?}]` |
| `RateCards` | 숫자 카드 | `cards[{value, label, lines, highlight?, highlightColor?('orange'\|'navy'), active?}]` |
| `SpokeTimeline` | 시간순 이벤트 | `events[{month, title, desc, status?('normal'\|'current'\|'warning'), tag?}]` |
| `SpokeStepCards` | 단계별 카드 | `steps[{title, desc, tip?}]` |
| `SpokeCompareCards` | A vs B 비교 | `cards[{title, subtitle, items, recommended?, recLabel?}]` |
| `SpokeRateBars` | 비율 막대 | `bars[{label, rate, width}]` |
| `SpokeFlow` | 프로세스 흐름 | `steps[{icon, label, sub?}]` |

### 컴포넌트 선택 필수 규칙

1. **섹션당 시각 요소 최소 1개**
2. **글 전체에서 4종류 이상 사용**
3. **텍스트(4문장+) 먼저 → 시각 요소 뒤에**
4. **SpokeTable은 글 전체 2개 이하**
5. **같은 컴포넌트 연속 사용 금지** (Table → Table 안 됨)
6. **TipBox는 전체 시각요소의 40% 이하**
7. **같은 허브 내 형제 스포크와 시각 조합이 겹치면 FAIL**

---

## 글별 고유성 규칙 (AI 찍어내기 방지!)

> 이 규칙이 가장 중요하다. 모든 글이 같은 구조로 보이면 독자가 이탈한다.

### 1. 시각 조합 고유성

```
같은 허브 내 스포크끼리 시각 조합 비교:
- 형제A = [SpokeTable, TipBox, FormulaBox, RateCards]
- 형제B = [Steps, WarnBox, SpokeChecklist, Chips]
- 새 글 = 최소 2종류 이상 다르게 구성

확인법: 기존 형제 스포크 파일의 import문 확인
```

### 2. 표 구조 고유성

```
같은 허브 내 스포크끼리:
- 표의 headers가 동일하면 FAIL
- 표의 행 수가 같으면 FAIL (5행 표가 3개 글에 반복 = AI 티)
- 해결: 주제에 맞게 headers/행 수를 다르게 구성
```

### 3. Checker 필수 + 고유성

```
- 모든 스포크에 Checker 1개 필수! 건너뛰기 금지!
- 각 Checker는 해당 주제 전용으로 새로 생성 (src/components/checkers/)
- 다른 주제의 Checker를 import하면 FAIL
- checker-patterns.md의 5가지 유형(A~E) 중 주제에 맞는 것 선택
- 유형 선택 기준: "나도 받을 수 있어?"→A, "얼마나?"→B, "뭐가 유리?"→C, "세금?"→D, "어디 해당?"→E
```

### 4. 서론/전환 고유성

```
- hero.intro 1줄째(독자 상황)가 형제 스포크와 같은 감정이면 FAIL
- 섹션 전환 문장 패턴이 형제 스포크와 같은 순서면 FAIL
- spoke-rules.md의 도입부 5유형(A~E) 순환 필수
```

### 5. 본문 내용 고유성

```
- 다른 스포크의 문장을 그대로 가져오면 FAIL
- 같은 데이터(예: 기준중위소득 표)라도 설명 텍스트는 다르게
- 각 글은 해당 주제의 독자 관점에서 새로 작성
```

---

## 빈출 오류 (절대 하지 마라)

| 오류 | 수정 |
|------|------|
| `SpokeTimeline`에서 `date` 사용 | `month`로 변경 |
| `SpokeTimeline`에서 `title` 누락 | `month + title + desc` 3개 모두 필수 |
| `SpokeTimeline`에서 `highlight: true` | `status: 'warning'`으로 변경 |
| `SpokeFlow`에서 `desc` 사용 | `sub`로 변경 |
| `TipBox`에서 `items` prop 사용 | `children`으로 JSX 전달 |
| `RateCards`에서 `highlightColor: 'neutral'` | `'orange'` 또는 `'navy'`만 허용 |
| 다른 주제의 Checker import | 해당 주제 전용 Checker만 사용 |
| 형제 스포크와 같은 시각 조합 | 최소 2종류 이상 다르게 구성 |
| 기존 글 복사 후 텍스트만 교체 | 주제에 맞게 컴포넌트 조합부터 새로 설계 |
| `Chips`의 `icon`에 영어(`'check'`, `'info'`) | 이모지만 허용 (`'✅'`, `'📋'`, `'🏦'`) |
| `h1`을 질문형으로 작성 (~인가요?/~될까요?) | h1은 타이틀형만. 질문형은 H2에만 사용 |
| Checker 섹션 생략 | 모든 스포크에 Checker 1개 필수. 건너뛰기 금지 |

---

## 금지 사항

- 다른 스포크 파일을 복사해서 텍스트만 교체하는 행위 (= AI 찍어내기)
- 이모지 사용 금지
- ~습니다/~합니다 → ~이에요/~해요
- SpokeTable 3개 이상 사용 금지
- H2에 숫자 (`## 1. 제목`) 금지
- 타이틀에 "총정리", "완벽정리", "가이드" 금지
- 타이틀 구분자 `-`, `—`, `:` 금지 → `|` 사용
- 본문에 FAQ 섹션 금지 (faq[]에만)
- 출처 없는 숫자 생성 금지
- TipBox가 전체 시각요소의 40% 초과 금지
- 존재하지 않는 Checker import 금지
