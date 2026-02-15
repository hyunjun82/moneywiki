'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '국채 vs ETF, 뭐가 유리할까?',
  subtitle: '투자 성향에 맞는 선택을 확인해 보세요',
  intro: (
    <p>
      퇴직연금 안전자산 30%를 국채로 채울지, <strong>채권형 ETF</strong>로 채울지
      고민되시죠? 3가지만 선택하면 어느 쪽이 유리한지 알려드려요.
    </p>
  ),
  groups: [
    {
      key: 'horizon',
      label: '투자 기간',
      options: [
        { value: 'short', text: '5년 이내' },
        { value: 'mid', text: '5~10년' },
        { value: 'long', text: '10년 이상' },
      ],
    },
    {
      key: 'priority',
      label: '가장 중요한 기준',
      options: [
        { value: 'safety', text: '원금 보장 (안정성)' },
        { value: 'return', text: '높은 수익률' },
        { value: 'liquidity', text: '유동성 (언제든 매도)' },
      ],
    },
    {
      key: 'amount',
      label: '안전자산 투자 금액',
      options: [
        { value: '1000', text: '1,000만원' },
        { value: '3000', text: '3,000만원' },
        { value: '5000', text: '5,000만원' },
        { value: '10000', text: '1억원' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const amount = parseInt(sel.amount) * 10000
    const fmt = new Intl.NumberFormat('ko-KR')

    /* 국채 20년물 기준 연평균 7.3%, ETF 5.5% 가정 */
    const years = sel.horizon === 'short' ? 5 : sel.horizon === 'mid' ? 10 : 20
    const bondReturn = Math.round(amount * Math.pow(1.073, years)) - amount
    const etfReturn = Math.round(amount * Math.pow(1.055, years)) - amount
    const diff = bondReturn - etfReturn

    let winner: string
    let explanation: string

    if (sel.priority === 'liquidity') {
      winner = '채권형 ETF'
      explanation = `유동성이 중요하다면 ETF가 맞아요. 주식처럼 장중 매도가 가능해요. 국채는 만기 전 매도하면 가산금리와 비과세 혜택을 잃어요.`
    } else if (sel.priority === 'safety') {
      winner = '개인투자용 국채'
      explanation = `원금 보장이 최우선이라면 국채가 확실해요. 정부가 원금과 이자를 전액 보증하고, 예금자보호 5,000만원 한도도 없어요. ETF는 시장 가격 변동으로 원금 손실 가능성이 있어요.`
    } else if (sel.horizon === 'long') {
      winner = '개인투자용 국채'
      explanation = `10년 이상 장기 투자라면 국채 복리 가산금리의 효과가 극대화돼요. ${sel.amount}만원 기준 국채가 ETF보다 약 ${fmt.format(diff)}원 더 벌어요.`
    } else if (sel.horizon === 'short') {
      winner = '채권형 ETF'
      explanation = `5년 이내 단기라면 ETF가 유연해요. 국채 10년물은 만기가 길어서 중도환매 시 불이익이 있어요.`
    } else {
      winner = '개인투자용 국채'
      explanation = `수익률 기준으로 국채(연 7.3%)가 ETF(연 5~6%)보다 높아요. ${sel.amount}만원 기준 ${years}년 후 약 ${fmt.format(diff)}원 차이예요.`
    }

    const winnerReturn = winner === '개인투자용 국채' ? bondReturn : etfReturn

    return {
      pass: true,
      headline: `${winner}${winner === '채권형 ETF' ? '가' : '이'} 유리해요`,
      detail: (<>{explanation}</>),
      amount: {
        value: `${years}년 수익 약 ${fmt.format(winnerReturn)}원`,
        unit: '예상 수익',
        formula: winner === '개인투자용 국채'
          ? `${sel.amount}만원 x (1.073)^${years}`
          : `${sel.amount}만원 x (1.055)^${years}`,
      },
      badges: [
        winner === '개인투자용 국채' ? '원금보장' : '유동성',
        winner === '개인투자용 국채' ? '연 7.3%' : '연 5.5%',
        `${years}년 투자`,
      ],
      links: [
        {
          icon: '📋',
          title: '국채 투자 조건 확인',
          desc: 'DC형·IRP 계좌로 매수 방법',
          href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
        },
        {
          icon: '💰',
          title: '국채 수익률 상세 계산',
          desc: '복리 가산금리 + 세금 혜택',
          href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
        },
      ],
    }
  },
}

export default function 국채ETF비교Checker() {
  return <GenericChecker config={config} />
}
