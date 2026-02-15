'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* 만기별 데이터 (2026년 기준) */
const MATURITY = {
  y10: { name: '10년물', rate: 3.41, bonus: 1.0, totalReturn: 54, monthly: 4.41 },
  y20: { name: '20년물', rate: 3.365, bonus: 1.25, totalReturn: 147, monthly: 4.615 },
}

const config: CheckerConfig = {
  title: '10년물 vs 20년물, 뭐가 유리할까?',
  subtitle: '투자 목적과 금액으로 맞는 만기를 찾아보세요',
  intro: (
    <p>
      개인투자용 국채 10년물과 20년물은 가산금리와 만기 수익률이 달라요.
      내 투자 상황에 맞는 만기를 확인해 보세요.
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
      key: 'purpose',
      label: '투자 목적',
      options: [
        { value: 'retire', text: '은퇴 자금 (장기)' },
        { value: 'education', text: '자녀 교육비 (중기)' },
        { value: 'spare', text: '여유자금 운용' },
      ],
    },
    {
      key: 'liquidity',
      label: '중도환매 가능성',
      options: [
        { value: 'no', text: '만기까지 보유 가능' },
        { value: 'maybe', text: '중간에 팔 수도 있음' },
        { value: 'yes', text: '5년 내 필요할 수 있음' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const amount = parseInt(sel.amount) * 10000
    const fmt = new Intl.NumberFormat('ko-KR')

    /* 10년물 세후 수익 */
    const y10Interest = Math.round(amount * MATURITY.y10.totalReturn / 100)
    const y10Tax = Math.round(y10Interest * 0.154)
    const y10Net = y10Interest - y10Tax

    /* 20년물 세후 수익 */
    const y20Interest = Math.round(amount * MATURITY.y20.totalReturn / 100)
    const y20Tax = Math.round(y20Interest * 0.154)
    const y20Net = y20Interest - y20Tax

    let winner: string
    let explanation: string

    if (sel.liquidity === 'yes') {
      winner = '10년물'
      explanation = `5년 내 자금이 필요할 수 있다면 만기가 짧은 10년물이 안전해요. 중도환매 시 가산금리와 비과세 혜택을 잃게 되거든요.`
    } else if (sel.purpose === 'retire' && sel.liquidity === 'no') {
      winner = '20년물'
      explanation = `은퇴 자금처럼 장기로 묻어둘 수 있다면 20년물이 유리해요. 가산금리가 1.25%p로 10년물(1.0%p)보다 높고, 복리 효과로 수익률 차이가 커져요.`
    } else if (sel.purpose === 'education') {
      winner = '10년물'
      explanation = `자녀 교육비는 10~15년 뒤 필요한 경우가 많아서 10년물이 시기적으로 맞아요. 만기 시 원금+이자를 한 번에 받을 수 있어요.`
    } else {
      winner = sel.liquidity === 'no' ? '20년물' : '10년물'
      explanation = sel.liquidity === 'no'
        ? `만기까지 보유 가능하다면 20년물의 높은 가산금리(1.25%p)가 유리해요.`
        : `중도환매 가능성이 있다면 10년물이 리스크가 적어요.`
    }

    const winnerData = winner === '10년물' ? MATURITY.y10 : MATURITY.y20
    const winnerNet = winner === '10년물' ? y10Net : y20Net

    return {
      pass: true,
      headline: `${winner}이 유리해요`,
      detail: (
        <>
          {explanation} 투자금 {sel.amount}만원 기준, {winner} 세후 수익은 약{' '}
          {fmt.format(winnerNet)}원이에요. 가산금리 {winnerData.bonus}%p가 복리로 쌓여요.
        </>
      ),
      amount: {
        value: `세후 약 ${fmt.format(winnerNet)}원`,
        unit: `${winner} 만기 수익`,
        formula: `${sel.amount}만원 x ${winnerData.totalReturn}% - 세금 15.4%`,
      },
      badges: [winner, `가산금리 ${winnerData.bonus}%p`, `수익률 ${winnerData.totalReturn}%`],
      links: [
        {
          icon: '📋',
          title: '국채 신청 방법 4단계',
          desc: '전용계좌 개설부터 청약까지',
          href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
        },
        {
          icon: '💰',
          title: '수익률 세금 상세 계산',
          desc: '복리 효과와 분리과세 절세',
          href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        },
      ],
    }
  },
}

export default function 국채만기선택Checker() {
  return <GenericChecker config={config} />
}
