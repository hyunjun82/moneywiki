# Checker Patterns — 5가지 유형 가이드

> writer 에이전트가 체커 컴포넌트 작성 시 참조.
> 가장 가까운 유형의 코드를 복사 → 주제에 맞게 수치/라벨 변경.

## RSC-Safe 패턴 (필수!)

> **중요**: checkerConfig를 스포크 데이터 파일에서 export하면 안 됨!
> evaluate 함수가 RSC 경계를 넘어가면 500 에러 발생.
> 반드시 `src/components/checkers/` 폴더에 `'use client'` 컴포넌트로 분리.

### 체커 컴포넌트 생성 (src/components/checkers/)

```tsx
// src/components/checkers/{Name}Checker.tsx
'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '...',
  subtitle: '...',
  intro: (<p>...</p>),
  groups: [/* ... */],
  evaluate: (sel): CheckerResult => {
    // 로직 구현
    return { pass, headline, detail, amount?, badges, links }
  },
}

export default function NameChecker() {
  return <GenericChecker config={config} />
}
```

### 스포크에서 사용 (spoke TSX 파일)

```tsx
import NameChecker from '@/components/checkers/NameChecker'

// sections 배열 첫 번째에 체커 섹션 추가:
{
  id: 'checker',
  number: 'CHECK',
  heading: '체커 질문형 제목',
  subtitle: '간단한 설명',
  content: <NameChecker />,
},
```

### 허브에서 사용 (hub TSX 파일)

```tsx
import NameChecker from '@/components/checkers/NameChecker'

// sections 내 content에서:
{
  id: 'checker',
  tag: 'CHECK',
  heading: '...',
  subtitle: '...',
  content: (<><NameChecker /></>),
},
```

### 금지 패턴 (500 에러 발생!)

```tsx
// ❌ 절대 하면 안 됨 — RSC 직렬화 실패
export const checkerConfig: CheckerConfig = { evaluate: () => {...} }
import GenericChecker from '@/components/GenericChecker'
<GenericChecker config={checkerConfig} />
```

---

## 유형 A: 자격판정형 — "나도 받을 수 있을까?"

**적합**: 실업급여, 기초생활수급자, 청년도약계좌, 국민취업지원제도
**패턴**: 여러 조건 입력 → 전부 충족 시 pass, 하나라도 미충족 시 fail + 사유 표시

```tsx
// src/components/checkers/실업급여Checker.tsx
'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '실업급여 자격 간편 체크',
  subtitle: '3가지만 선택하면 수급 가능성을 확인할 수 있어요',
  intro: (
    <p>
      실업급여는 <strong>고용보험 가입기간</strong>, <strong>퇴직 사유</strong>,
      <strong>재취업 의사</strong> 3가지 조건을 모두 충족해야 해요.
    </p>
  ),
  groups: [
    {
      key: 'period',
      label: '고용보험 가입기간',
      options: [
        { value: 'under6', text: '6개월 미만' },
        { value: '6to12', text: '6개월~1년' },
        { value: '1to3', text: '1~3년' },
        { value: '3to5', text: '3~5년' },
        { value: 'over5', text: '5년 이상' },
      ],
    },
    {
      key: 'reason',
      label: '퇴직 사유',
      options: [
        { value: 'fired', text: '권고사직·해고' },
        { value: 'contract', text: '계약만료' },
        { value: 'voluntary', text: '자발적 퇴사' },
        { value: 'force', text: '사업장 폐업·이전' },
      ],
    },
    {
      key: 'intent',
      label: '재취업 의사',
      options: [
        { value: 'yes', text: '있음 (구직활동 가능)' },
        { value: 'no', text: '없음 (은퇴·전업 등)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const periodOk = sel.period !== 'under6'
    const reasonOk = sel.reason !== 'voluntary'
    const intentOk = sel.intent === 'yes'
    const pass = periodOk && reasonOk && intentOk

    /* 수급일수 매핑 (가입기간별) */
    const dayMap: Record<string, number> = {
      '6to12': 120, '1to3': 150, '3to5': 180, 'over5': 210,
    }
    const days = dayMap[sel.period] || 0

    if (pass) {
      return {
        pass: true,
        headline: '실업급여 수급 가능성이 높아요',
        detail: (
          <>고용보험 가입기간, 퇴직 사유, 구직 의사 3가지 조건을 충족해요.
          정확한 금액은 퇴직 전 3개월 평균임금의 60%로 산정돼요.</>
        ),
        amount: { value: `최대 ${days}일`, unit: '수급기간' },
        badges: ['실업급여 대상'],
        links: [
          { icon: '💰', title: '실업급여 수급액 계산', desc: '퇴직 전 급여 기준 예상 수급액', href: '/w/실업급여-수급액-계산' },
          { icon: '📋', title: '실업급여 신청 방법', desc: '워크넷 신청 절차 안내', href: '/w/실업급여-신청-방법' },
        ],
      }
    }

    /* fail: 미충족 사유 나열 */
    const reasons: string[] = []
    if (!periodOk) reasons.push('고용보험 가입기간 6개월 미만')
    if (!reasonOk) reasons.push('자발적 퇴사는 원칙적 수급 불가')
    if (!intentOk) reasons.push('재취업 의사 없음')

    return {
      pass: false,
      headline: '현재 조건으로는 수급이 어려워요',
      detail: (
        <>해당 사유: {reasons.join(', ')}.
        {!reasonOk && ' 다만 임금체불·직장 내 괴롭힘 등 정당한 사유가 있으면 자발적 퇴사도 수급 가능해요.'}</>
      ),
      badges: [],
      links: [
        { icon: '🔄', title: '자발적 퇴사 실업급여 조건', desc: '정당한 이직 사유 7가지', href: '/w/자발적-퇴사-실업급여-조건' },
        { icon: '🆘', title: '긴급복지지원 신청', desc: '선지급 후 조사, 최대 71만원', href: '/w/긴급복지지원-신청방법' },
      ],
    }
  },
}

export default function 실업급여Checker() {
  return <GenericChecker config={config} />
}
```

### 자격판정형 커스터마이징 포인트
- `groups[]`: 조건 그룹 2~4개 (자격 요건별)
- `evaluate`: 각 조건 boolean 판정 → `&&`로 합산
- fail 시 `reasons[]`에 미충족 사유 추가
- `links`: pass → 다음 단계, fail → 대안 제도

---

## 유형 B: 계산형 — "얼마나 받을까?"

**적합**: 퇴직금, 실업급여 수급액, 연말정산 환급, 양육수당
**패턴**: 금액/기간 입력 → 공식 적용 → 결과 금액 표시 (항상 pass)

```tsx
// src/components/checkers/퇴직금Checker.tsx
'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '퇴직금 간편 계산',
  subtitle: '근속연수와 월급으로 예상 퇴직금을 확인하세요',
  intro: (
    <p>
      퇴직금은 <strong>1일 평균임금 x 30일 x 근속연수</strong>로 계산해요.
      아래에서 대략적인 금액을 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'years',
      label: '근속연수',
      options: [
        { value: '1', text: '1년' },
        { value: '3', text: '3년' },
        { value: '5', text: '5년' },
        { value: '10', text: '10년' },
        { value: '20', text: '20년 이상' },
      ],
    },
    {
      key: 'salary',
      label: '최근 3개월 월 평균 급여 (세전)',
      options: [
        { value: '200', text: '200만원' },
        { value: '300', text: '300만원' },
        { value: '400', text: '400만원' },
        { value: '500', text: '500만원' },
        { value: '600', text: '600만원 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const years = parseInt(sel.years)
    const salary = parseInt(sel.salary) * 10000
    const severance = salary * years
    const fmt = new Intl.NumberFormat('ko-KR').format(severance)

    return {
      pass: true,
      headline: `예상 퇴직금 약 ${fmt}원`,
      detail: (
        <>월 평균임금 {sel.salary}만원 x {years}년 기준이에요.
        실제 금액은 퇴직 전 3개월 평균임금과 상여금·수당을 포함해 정확히 계산돼요.</>
      ),
      amount: {
        value: `약 ${(severance / 10000).toLocaleString()}만원`,
        unit: '예상 퇴직금',
        formula: `${sel.salary}만원 x ${years}년`,
      },
      badges: ['퇴직금', `${years}년 근속`],
      links: [
        { icon: '🧮', title: '퇴직금 정확 계산', desc: '상여금·수당 포함 정밀 계산', href: '/w/퇴직금-정확-계산' },
        { icon: '⏰', title: '퇴직금 지급기한과 지연이자', desc: '14일 이내 미지급 시 연 20%', href: '/w/퇴직금-지급기한-지연이자' },
      ],
    }
  },
}

export default function 퇴직금Checker() {
  return <GenericChecker config={config} />
}
```

### 계산형 커스터마이징 포인트
- `groups[]`: 계산에 필요한 입력값 (금액, 기간, 비율 등)
- `evaluate`: 항상 `pass: true` (계산 결과를 보여주는 것이므로)
- `amount`: 핵심 결과 금액 + formula(산식) 표시
- `Intl.NumberFormat('ko-KR')`: 한국 숫자 포맷팅

---

## 유형 C: 비교형 — "뭐가 더 유리할까?"

**적합**: K-Pass vs 기후동행, 전세 vs 월세, 국민연금 vs 개인연금, ISA vs 연금저축
**패턴**: 이용 패턴 입력 → 양쪽 계산 → 승자 판정

```tsx
// src/components/checkers/교통카드Checker.tsx
'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 비교 기준 데이터 ── */
const CARDS = {
  kpass:    { name: 'K-Pass',      rate: 0.20, youth: 0.30, low: 0.53 },
  climate:  { name: '기후동행카드', monthly: 65000 },
}

const config: CheckerConfig = {
  title: '교통카드 비교 — 뭐가 유리할까?',
  subtitle: '이용 패턴에 맞는 카드를 찾아보세요',
  intro: (
    <p>교통비 절약 카드가 여러 가지인데, 내 이용 패턴에 따라 유리한 카드가 달라요.</p>
  ),
  groups: [
    {
      key: 'region',
      label: '주 이동 지역',
      options: [
        { value: 'seoul', text: '서울 시내' },
        { value: 'metro', text: '서울-경기 광역' },
        { value: 'province', text: '지방 도시' },
      ],
    },
    {
      key: 'usage',
      label: '월 교통비',
      options: [
        { value: '3', text: '3만원 이하' },
        { value: '5', text: '3~5만원' },
        { value: '8', text: '5~8만원' },
        { value: '10', text: '8만원 이상' },
      ],
    },
    {
      key: 'age',
      label: '연령대',
      options: [
        { value: 'youth', text: '19~34세 (청년)' },
        { value: 'adult', text: '35~64세' },
        { value: 'low', text: '저소득층' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const monthly = parseInt(sel.usage) * 10000
    const rate = sel.age === 'youth' ? CARDS.kpass.youth
               : sel.age === 'low' ? CARDS.kpass.low
               : CARDS.kpass.rate
    const kpassSave = Math.round(monthly * rate)
    const climateSave = monthly > CARDS.climate.monthly ? monthly - CARDS.climate.monthly : 0

    let winner: string
    let explanation: string

    if (sel.region === 'province') {
      winner = 'K-Pass'
      explanation = '지방은 기후동행카드 사용 불가. K-Pass로 환급받는 게 유일한 방법이에요.'
    } else if (sel.region === 'seoul' && climateSave > kpassSave) {
      winner = '기후동행카드'
      explanation = `서울 시내 이용이 많고 월 ${sel.usage}만원 이상 쓴다면 기후동행카드(월 6.5만원 정액)가 유리해요.`
    } else {
      winner = 'K-Pass'
      explanation = `월 ${sel.usage}만원 기준 K-Pass 환급(${(rate * 100).toFixed(0)}%)이 더 유리해요.`
    }

    const savingAmount = winner === '기후동행카드' ? climateSave : kpassSave

    return {
      pass: true,
      headline: `${winner}가 유리해요`,
      detail: (<>{explanation}</>),
      amount: {
        value: `월 약 ${(savingAmount / 10000).toFixed(1)}만원 절약`,
        unit: '예상 절약액',
        formula: winner === '기후동행카드'
          ? `${sel.usage}만원 - 6.5만원`
          : `${sel.usage}만원 x ${(rate * 100).toFixed(0)}%`,
      },
      badges: [winner, `${(rate * 100).toFixed(0)}% 환급`],
      links: [
        { icon: '🚌', title: `${winner} 신청 방법`, desc: '카드 발급·등록 절차', href: `/w/${winner === 'K-Pass' ? 'K패스-신청-방법' : '기후동행카드-신청'}` },
        { icon: '📊', title: '교통카드 전체 비교표', desc: '5종 카드 할인율 비교', href: '/w/교통카드-비교' },
      ],
    }
  },
}

export default function 교통카드Checker() {
  return <GenericChecker config={config} />
}
```

### 비교형 커스터마이징 포인트
- `groups[]`: 비교에 영향 주는 조건 (지역, 금액, 유형)
- 파일 상단에 **비교 기준 데이터** 객체 분리 (수치 변경 용이)
- `evaluate`: 양쪽 계산 → 조건별 분기로 승자 결정
- `headline`: "X가 유리해요" 패턴
- 항상 `pass: true` (비교 결과이므로)

---

## 유형 D: 세금/공제형 — "세금이 얼마나 줄까?"

**적합**: 장기보유특별공제, 양도소득세, 연말정산 세액공제, 종합소득세 절세
**패턴**: 보유기간/금액 입력 → 공제율 적용 → 공제액/절세액 산출

```tsx
// src/components/checkers/장특공제Checker.tsx
'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 공제율 테이블 ── */
const HOLD_RATE: Record<number, number> = { 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 9: 36, 10: 40 }
const LIVE_RATE: Record<number, number> = { 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 9: 36, 10: 40 }

const config: CheckerConfig = {
  title: '장기보유특별공제율 확인',
  subtitle: '보유·거주 기간으로 공제율을 확인하세요',
  intro: (
    <p>
      1세대 1주택은 보유기간·거주기간 각각 공제율이 적용돼요.
      최대 <strong>80%</strong>까지 공제받을 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'hold',
      label: '보유기간',
      options: [
        { value: '3', text: '3~4년' },
        { value: '5', text: '5~6년' },
        { value: '7', text: '7~8년' },
        { value: '10', text: '10년 이상' },
      ],
    },
    {
      key: 'live',
      label: '실거주기간',
      options: [
        { value: '0', text: '거주 안 함' },
        { value: '2', text: '2~3년' },
        { value: '5', text: '5~6년' },
        { value: '10', text: '10년 이상' },
      ],
    },
    {
      key: 'gain',
      label: '양도차익 (매도가 - 취득가)',
      options: [
        { value: '1', text: '1억 이하' },
        { value: '3', text: '1~3억' },
        { value: '5', text: '3~5억' },
        { value: '10', text: '5억 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const holdYears = parseInt(sel.hold)
    const liveYears = parseInt(sel.live)
    const gainBil = parseInt(sel.gain)
    const gain = gainBil * 100000000

    /* 공제율 산출 (보유 연4% 최대40% + 거주 연4% 최대40%) */
    const holdPct = Math.min(holdYears * 4, 40)
    const livePct = liveYears === 0 ? 0 : Math.min(liveYears * 4, 40)
    const totalPct = holdPct + livePct

    const deduction = Math.round(gain * totalPct / 100)
    const fmt = new Intl.NumberFormat('ko-KR').format(deduction)

    return {
      pass: true,
      headline: `공제율 ${totalPct}% (보유 ${holdPct}% + 거주 ${livePct}%)`,
      detail: (
        <>양도차익 {gainBil}억원 기준, 약 {fmt}원이 공제돼요.
        {liveYears === 0 && ' 실거주기간이 없으면 거주 공제를 못 받아요. 2년 이상 거주하면 공제율이 크게 올라가요.'}</>
      ),
      amount: {
        value: `약 ${(deduction / 100000000).toFixed(1)}억원 공제`,
        unit: '장특공제액',
        formula: `${gainBil}억 x ${totalPct}%`,
      },
      badges: [`보유 ${holdPct}%`, `거주 ${livePct}%`],
      links: [
        { icon: '🏠', title: '장기보유특별공제 상세 조건', desc: '보유기간별 공제율 표', href: '/w/장기보유특별공제-조건' },
        { icon: '🧮', title: '양도소득세 전체 계산', desc: '공제 후 실제 세액 계산', href: '/w/양도소득세-계산' },
      ],
    }
  },
}

export default function 장특공제Checker() {
  return <GenericChecker config={config} />
}
```

### 세금/공제형 커스터마이징 포인트
- 파일 상단에 **세율/공제율 테이블** 분리 (법 개정 시 수치만 수정)
- `evaluate`: 기간/금액 → 공제율 계산 → 절세액 산출
- `amount.formula`: 산식을 보여줘서 신뢰감 확보
- `badges`: 각 구성요소별 공제율 표시 (보유 X% + 거주 Y%)
- 조건부 안내: "거주 안 하면 거주공제 못 받아요" 등 추가 팁

---

## 유형 E: 구간판정형 — "나는 어디에 해당하나?"

**적합**: 종합소득세 세율 구간, 건강보험료 등급, 국민연금 예상수령액, 종합부동산세 구간
**패턴**: 입력값 → 구간 테이블에서 매칭 → 해당 구간/등급 표시

```tsx
// src/components/checkers/종소세Checker.tsx
'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 세율 구간 테이블 (2026년) ── */
const BRACKETS = [
  { limit: 1400,  rate: 6,  cum: 0,      label: '1구간' },
  { limit: 5000,  rate: 15, cum: 126,    label: '2구간' },
  { limit: 8800,  rate: 24, cum: 576,    label: '3구간' },
  { limit: 15000, rate: 35, cum: 1544,   label: '4구간' },
  { limit: 30000, rate: 38, cum: 1994,   label: '5구간' },
  { limit: 50000, rate: 40, cum: 2594,   label: '6구간' },
  { limit: 100000,rate: 42, cum: 3594,   label: '7구간' },
  { limit: Infinity, rate: 45, cum: 6594, label: '8구간' },
]

const config: CheckerConfig = {
  title: '종합소득세 세율 구간 확인',
  subtitle: '과세표준으로 적용 세율을 확인하세요',
  intro: (
    <p>
      종합소득세는 <strong>누진세율</strong>이에요. 소득이 높을수록 높은 세율이 적용되지만,
      전체 소득에 최고세율이 적용되는 건 아니에요.
    </p>
  ),
  groups: [
    {
      key: 'income',
      label: '연간 과세표준 (소득 - 공제)',
      options: [
        { value: '1200', text: '1,200만원' },
        { value: '3000', text: '3,000만원' },
        { value: '5000', text: '5,000만원' },
        { value: '8000', text: '8,000만원' },
        { value: '15000', text: '1.5억원' },
        { value: '30000', text: '3억원 이상' },
      ],
    },
    {
      key: 'type',
      label: '소득 유형',
      options: [
        { value: 'salary', text: '근로소득 (직장인)' },
        { value: 'biz', text: '사업소득 (자영업)' },
        { value: 'mixed', text: '근로+사업 (겸업)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const incomeWon = parseInt(sel.income) /* 만원 단위 */

    /* 구간 찾기 */
    const bracket = BRACKETS.find(b => incomeWon <= b.limit) || BRACKETS[BRACKETS.length - 1]
    const idx = BRACKETS.indexOf(bracket)
    const prevLimit = idx > 0 ? BRACKETS[idx - 1].limit : 0

    /* 산출세액 계산 (만원 단위) */
    const tax = bracket.cum + Math.round((incomeWon - prevLimit) * bracket.rate / 100)
    const effectiveRate = ((tax / incomeWon) * 100).toFixed(1)
    const taxFmt = new Intl.NumberFormat('ko-KR').format(tax)

    return {
      pass: true,
      headline: `세율 ${bracket.rate}% 구간 (${bracket.label})`,
      detail: (
        <>과세표준 {sel.income}만원은 {bracket.label}({bracket.rate}%)에 해당해요.
        실효세율은 약 {effectiveRate}%예요. 누진공제를 적용하면 산출세액은 약 {taxFmt}만원이에요.
        {sel.type !== 'salary' && ' 사업소득은 필요경비를 빼고 남은 금액이 과세표준이에요.'}</>
      ),
      amount: {
        value: `약 ${taxFmt}만원`,
        unit: '예상 산출세액',
        formula: `${sel.income}만원 x ${bracket.rate}% - 누진공제 ${bracket.cum > 0 ? bracket.cum + '만원' : '없음'}`,
      },
      badges: [`${bracket.label}`, `세율 ${bracket.rate}%`, `실효 ${effectiveRate}%`],
      links: [
        { icon: '🧮', title: '종합소득세 정확 계산', desc: '소득공제·세액공제 반영 정밀 계산', href: '/w/종합소득세-계산' },
        { icon: '💡', title: '종합소득세 절세 방법', desc: '합법적 절세 전략 7가지', href: '/w/종합소득세-절세' },
      ],
    }
  },
}

export default function 종소세Checker() {
  return <GenericChecker config={config} />
}
```

### 구간판정형 커스터마이징 포인트
- 파일 상단에 **BRACKETS 테이블** 분리 (구간/세율/누진공제)
- `evaluate`: `find()`로 해당 구간 매칭 → 세액/등급 산출
- `badges`: 구간명 + 세율 + 실효세율 (3개) → 한눈에 파악
- 조건부 안내: 소득 유형별 추가 팁
- 산출세액 공식: `formula`에 누진공제 포함

---

## 유형 선택 가이드 (architect가 blueprint 작성 시 참조)

| 독자 질문 | 유형 | 예시 |
|-----------|------|------|
| "나도 받을 수 있어?" | **A 자격판정** | 실업급여, 기초생활수급자, 청년도약계좌 |
| "얼마나 받아/내?" | **B 계산** | 퇴직금, 연말정산 환급, 양육수당 |
| "뭐가 더 유리해?" | **C 비교** | K-Pass vs 기후동행, 전세 vs 월세 |
| "세금 얼마나 줄어?" | **D 세금/공제** | 장특공제, 양도세, 종합소득세 절세 |
| "나는 어디 해당?" | **E 구간판정** | 세율 구간, 보험료 등급, 연금 예상액 |

### 체커 불필요 (건너뛰기)
- 순수 정보 전달 글 (역사, 제도 설명)
- 단순 절차 안내 (신청 방법만 설명하는 글)
- 체커 수: 모든 스포크에 1개씩 (각자 독립 컴포넌트, `src/components/checkers/`)
