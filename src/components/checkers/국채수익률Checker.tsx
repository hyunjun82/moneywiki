'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '국채 투자 세후 수익 계산',
  subtitle: '투자 금액과 만기를 선택하면 세후 수익을 알려드려요',
  intro: (
    <p>
      개인투자용 국채는 <strong>복리 가산금리</strong>에 <strong>분리과세 15.4%</strong>만
      내면 돼요. 내 투자금으로 세후 얼마나 남는지 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'amount',
      label: '투자 금액',
      options: [
        { value: '1000', text: '1,000만원' },
        { value: '3000', text: '3,000만원' },
        { value: '5000', text: '5,000만원' },
        { value: '10000', text: '1억원' },
      ],
    },
    {
      key: 'maturity',
      label: '만기',
      options: [
        { value: '10', text: '10년물 (가산금리 1.0%p)' },
        { value: '20', text: '20년물 (가산금리 1.25%p)' },
      ],
    },
    {
      key: 'taxBracket',
      label: '종합소득세 구간',
      options: [
        { value: 'low', text: '이자소득 2,000만원 이하' },
        { value: 'mid', text: '이자소득 2,000~5,000만원' },
        { value: 'high', text: '이자소득 5,000만원 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const amount = parseInt(sel.amount) * 10000
    const fmt = new Intl.NumberFormat('ko-KR')

    /* 수익률 (2026년 기준) */
    const is10 = sel.maturity === '10'
    const baseRate = is10 ? 3.41 : 3.365
    const bonusRate = is10 ? 1.0 : 1.25
    const totalRate = baseRate + bonusRate
    const years = is10 ? 10 : 20

    /* 복리 세전 수익 */
    const grossTotal = Math.round(amount * Math.pow(1 + totalRate / 100, years))
    const grossInterest = grossTotal - amount

    /* 국채 분리과세 15.4% */
    const bondTax = Math.round(grossInterest * 0.154)
    const bondNet = grossInterest - bondTax

    /* 일반 예금 대비 (복리 3.5%, 종합과세) */
    const depositGross = Math.round(amount * Math.pow(1 + 0.035, years))
    const depositInterest = depositGross - amount
    const depositTaxRate = sel.taxBracket === 'high' ? 0.396 : sel.taxBracket === 'mid' ? 0.264 : 0.154
    const depositTax = Math.round(depositInterest * depositTaxRate)
    const depositNet = depositInterest - depositTax

    const advantage = bondNet - depositNet
    const taxSavingLabel = sel.taxBracket === 'low' ? '동일 (15.4%)' :
      sel.taxBracket === 'mid' ? '약 11%p 절세' : '약 24%p 절세'

    return {
      pass: true,
      headline: `세후 수익 약 ${fmt.format(bondNet)}원`,
      detail: (
        <>
          투자금 {sel.amount}만원을 {is10 ? '10' : '20'}년물에 넣으면, 복리
          {totalRate.toFixed(2)}%로 세전 이자 약 {fmt.format(grossInterest)}원이 생겨요.
          분리과세 15.4%를 내면 세후 약 {fmt.format(bondNet)}원이에요.
          {sel.taxBracket !== 'low' && ` 같은 금리의 일반 예금보다 약 ${fmt.format(advantage)}원 더 받아요. 종합과세 구간이면 절세 효과가 커요.`}
        </>
      ),
      amount: {
        value: `약 ${fmt.format(bondNet)}원`,
        unit: '세후 수익',
        formula: `${sel.amount}만원 x (1+${totalRate.toFixed(2)}%)^${years} - 세금 15.4%`,
      },
      badges: [
        `${is10 ? '10' : '20'}년물`,
        `복리 ${totalRate.toFixed(2)}%`,
        taxSavingLabel,
      ],
      links: [
        {
          icon: '📊',
          title: '국채 vs ETF 수익률 비교',
          desc: '어느 쪽이 더 유리한지 비교',
          href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
        },
        {
          icon: '📋',
          title: '국채 투자 조건 확인',
          desc: 'DC형·IRP 계좌 요건',
          href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
        },
      ],
    }
  },
}

export default function 국채수익률Checker() {
  return <GenericChecker config={config} />
}
