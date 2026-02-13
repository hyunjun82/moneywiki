'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: 'ISA 유형 선택 도우미',
  subtitle: '2가지만 선택하면 나한테 맞는 유형을 알려드려요',
  intro: (
    <p>소득 수준과 투자 성향을 선택하세요. 운용방식(중개형·신탁형)과 소득기준(서민형·일반형) 최적 조합을 안내해요.</p>
  ),
  groups: [
    {
      key: 'income',
      label: '작년 총급여 (세전)',
      options: [
        { value: 'under3800', text: '3,800만원 이하' },
        { value: 'under5000', text: '3,800~5,000만원' },
        { value: 'over5000', text: '5,000만원 초과' },
      ],
    },
    {
      key: 'style',
      label: '투자 성향',
      options: [
        { value: 'direct', text: '주식·ETF 직접 거래' },
        { value: 'fund', text: '펀드에 맡기고 싶어요' },
        { value: 'auto', text: '전문가한테 위임' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const incomeType = sel.income === 'over5000' ? '일반형' : '서민형'
    const exemptLimit = sel.income === 'over5000' ? 200 : 400
    const methodMap: Record<string, string> = {
      direct: '중개형', fund: '신탁형', auto: '일임형',
    }
    const method = methodMap[sel.style]
    const feeMap: Record<string, string> = {
      direct: '0.003~0.01%', fund: '0.3~0.5%', auto: '0.5~1.0%',
    }
    const fee = feeMap[sel.style]

    return {
      pass: true,
      headline: `${method} + ${incomeType} 조합이 맞아요`,
      detail: (
        <>
          <p>
            {method}은 수수료 {fee}이고, {incomeType}은 비과세 한도 {exemptLimit}만원이에요.
            {sel.style === 'direct' && ' 수수료가 가장 낮아서 장기 투자에 유리해요.'}
            {sel.style === 'fund' && ' 은행에서 펀드를 골라주니까 편하지만 수수료가 높아요.'}
            {sel.style === 'auto' && ' 전문가가 운용하지만 수수료가 비싸서 실수익률이 낮을 수 있어요.'}
          </p>
        </>
      ),
      badges: [method, incomeType, `비과세 ${exemptLimit}만원`],
      links: [
        { icon: '📋', title: 'ISA 가입 조건과 개설 방법', desc: '비대면 5분 개설 절차', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
        { icon: '💰', title: 'ISA 비과세 한도와 절세 계산', desc: '수익별 절세액 비교', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
      ],
    }
  },
}

export default function ISA유형Checker() {
  return <GenericChecker config={config} />
}
