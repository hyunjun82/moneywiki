'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* 2026년 기준 상한·하한 */
const UPPER = 68100
const LOWER = 66048

const config: CheckerConfig = {
  title: '실업급여 예상 금액 계산',
  subtitle: '월급과 근속기간만 선택하면 예상 수령액을 확인할 수 있어요',
  intro: (
    <p>
      실업급여는 <strong>퇴직 전 3개월 평균임금의 60%</strong>로 계산하되,
      2026년 기준 하루 <strong>상한액 68,100원</strong>, <strong>하한액 66,048원</strong>이 적용돼요.
    </p>
  ),
  groups: [
    {
      key: 'salary',
      label: '퇴직 전 월 평균 급여 (세전)',
      options: [
        { value: '200', text: '200만원' },
        { value: '250', text: '250만원' },
        { value: '300', text: '300만원' },
        { value: '350', text: '350만원' },
        { value: '400', text: '400만원 이상' },
      ],
    },
    {
      key: 'period',
      label: '고용보험 가입기간 + 나이',
      options: [
        { value: '120', text: '1년 이상~3년 미만 (50세 미만)' },
        { value: '150', text: '3년 이상~5년 미만 (50세 미만)' },
        { value: '180', text: '5년 이상~10년 미만 (50세 미만)' },
        { value: '210', text: '10년 이상 (50세 미만)' },
        { value: '240', text: '10년 이상 (50세 이상)' },
        { value: '270', text: '10년 이상 (장애인)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const salaryWon = parseInt(sel.salary) * 10000
    const days = parseInt(sel.period)

    /* 평균임금 (3개월 기준, 91일) */
    const avgDaily = Math.round((salaryWon * 3) / 91)
    const raw60 = Math.round(avgDaily * 0.6)

    /* 상한·하한 적용 */
    let dailyAmount: number
    let appliedLabel: string

    if (raw60 >= UPPER) {
      dailyAmount = UPPER
      appliedLabel = '상한액 적용'
    } else if (raw60 <= LOWER) {
      dailyAmount = LOWER
      appliedLabel = '하한액 적용'
    } else {
      dailyAmount = raw60
      appliedLabel = '평균임금 60% 적용'
    }

    const monthlyAmount = dailyAmount * 30
    const totalAmount = dailyAmount * days
    const fmt = new Intl.NumberFormat('ko-KR')

    return {
      pass: true,
      headline: `하루 ${fmt.format(dailyAmount)}원, 총 약 ${fmt.format(totalAmount)}원 예상`,
      detail: (
        <>
          월급 {sel.salary}만원 기준 평균임금의 60%는 {fmt.format(raw60)}원이고,
          {appliedLabel}으로 하루 {fmt.format(dailyAmount)}원이에요.
          소정급여일수 {days}일 동안 총 약 {fmt.format(totalAmount)}원을 받을 수 있어요.
        </>
      ),
      amount: {
        value: `월 약 ${fmt.format(monthlyAmount)}원`,
        unit: '예상 월 수령액',
        formula: `${fmt.format(dailyAmount)}원 x 30일`,
      },
      badges: [appliedLabel, `${days}일 수급`],
      links: [
        { icon: '📋', title: '실업급여 수급 조건 확인', desc: '4가지 자격 요건 체크', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
        { icon: '📅', title: '수급기간 소정급여일수', desc: '연령·가입기간별 기간표', href: '/w/실업급여-수급기간-소정급여일수-기준' },
      ],
    }
  },
}

export default function 실업급여금액Checker() {
  return <GenericChecker config={config} />
}
