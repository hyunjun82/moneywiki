# Checker Patterns — 5가지 유형

> 가장 가까운 유형의 코드를 복사 → 주제에 맞게 수치/라벨 변경.

## RSC-Safe 패턴 (필수!)

> checkerConfig를 스포크 데이터 파일에서 export하면 500 에러!
> 반드시 `src/components/checkers/`에 `'use client'` 컴포넌트로 분리.

```tsx
// src/components/checkers/{Name}Checker.tsx
'use client'
import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '...',
  subtitle: '...',
  intro: (<p>...</p>),
  groups: [{ key: 'xxx', label: '...', options: [{ value: 'a', text: '...' }] }],
  evaluate: (sel): CheckerResult => {
    return { pass, headline, detail, amount?, badges, links }
  },
}
export default function NameChecker() {
  return <GenericChecker config={config} />
}
```

스포크에서 사용:
```tsx
import NameChecker from '@/components/checkers/NameChecker'
// sections 첫 번째:
{ id: 'checker', number: 'CHECK', heading: '...', subtitle: '...', content: <NameChecker /> }
```

금지: `export const checkerConfig`, 스포크에서 `GenericChecker` 직접 import

---

## 유형 A: 자격판정형 — "나도 받을 수 있을까?"

**적합**: 실업급여, 기초생활수급자, 청년도약계좌
**패턴**: 조건 2~4개 입력 → 전부 충족 시 pass, 하나라도 미충족 시 fail + 사유
**evaluate 핵심**: 각 조건 boolean → `&&` 합산, fail 시 `reasons[]`에 미충족 사유
**links**: pass → 다음 단계, fail → 대안 제도

---

## 유형 B: 계산형 — "얼마나 받을까?"

**적합**: 퇴직금, 실업급여 수급액, 연말정산 환급
**패턴**: 금액/기간 입력 → 공식 적용 → 결과 금액 (항상 pass: true)
**evaluate 핵심**: `Intl.NumberFormat('ko-KR')` 포맷팅, `amount.formula`에 산식 표시

---

## 유형 C: 비교형 — "뭐가 더 유리할까?"

**적합**: K-Pass vs 기후동행, 전세 vs 월세, ISA vs 연금저축
**패턴**: 이용 패턴 입력 → 양쪽 계산 → 승자 판정 (항상 pass: true)
**evaluate 핵심**: 파일 상단에 비교 기준 데이터 객체 분리, 조건별 분기로 승자 결정
**headline**: "X가 유리해요" 패턴

---

## 유형 D: 세금/공제형 — "세금이 얼마나 줄까?"

**적합**: 장기보유특별공제, 양도소득세, 연말정산 세액공제
**패턴**: 보유기간/금액 → 공제율 적용 → 공제액 산출 (항상 pass: true)
**evaluate 핵심**: 상단에 세율/공제율 테이블 분리, `amount.formula`에 산식, 조건부 추가 팁

---

## 유형 E: 구간판정형 — "나는 어디에 해당하나?"

**적합**: 종합소득세 세율 구간, 건강보험료 등급, 종합부동산세 구간
**패턴**: 입력값 → 구간 테이블에서 `find()` 매칭 → 해당 구간 표시 (항상 pass: true)
**evaluate 핵심**: `BRACKETS[]` 배열 분리, 실효세율 계산, badges에 구간명+세율+실효세율

---

## 유형 선택 가이드

| 독자 질문 | 유형 |
|-----------|------|
| "나도 받을 수 있어?" | A 자격판정 |
| "얼마나 받아/내?" | B 계산 |
| "뭐가 더 유리해?" | C 비교 |
| "세금 얼마나 줄어?" | D 세금/공제 |
| "나는 어디 해당?" | E 구간판정 |

체커 불필요: 순수 정보 전달 글, 단순 절차 안내 → Checker 섹션을 RateCards/Chips 등으로 대체.

---

## 전체 코드 예시

유형별 전체 코드가 필요하면 기존 체커 파일 참조:
```
src/components/checkers/*.tsx
```
