'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: 'ISA 만기 전략 도우미',
  subtitle: '2가지만 선택하면 최적 만기 전략을 알려드려요',
  intro: (
    <p>ISA 만기 후 해지·연장·연금전환 중 뭐가 유리한지 상황별로 안내해요.</p>
  ),
  groups: [
    {
      key: 'balance',
      label: '만기 시 예상 잔액 (원금+수익)',
      options: [
        { value: '1000', text: '약 1,000만원' },
        { value: '3000', text: '약 3,000만원' },
        { value: '5000', text: '약 5,000만원' },
        { value: '8000', text: '8,000만원 이상' },
      ],
    },
    {
      key: 'plan',
      label: '만기 후 계획',
      options: [
        { value: 'cash', text: '목돈으로 쓸 예정' },
        { value: 'reinvest', text: '계속 투자할 예정' },
        { value: 'pension', text: '노후 연금으로 전환' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const balance = parseInt(sel.balance)
    const pensionCredit = Math.min(balance * 0.1, 300)
    const creditRate = 0.165
    const creditAmount = Math.round(pensionCredit * creditRate * 10) / 10

    if (sel.plan === 'cash') {
      return {
        pass: true,
        headline: '만기 해지 후 목돈 수령이 맞아요',
        detail: (
          <>만기 해지하면 비과세 혜택이 적용된 후 1~2영업일 내에 입금돼요. 해지 후 바로 새 ISA를 개설하면 한도가 리셋되니까, 쓸 돈만 빼고 나머지는 새 ISA에 넣으세요.</>
        ),
        badges: ['만기 해지', '비과세 적용', '1~2일 입금'],
        links: [
          { icon: '📋', title: 'ISA 가입 조건과 개설 방법', desc: '해지 후 재가입 절차', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
          { icon: '💰', title: 'ISA 절세 효과 확인', desc: '해지 시 절세액 계산', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
        ],
      }
    }

    if (sel.plan === 'reinvest') {
      return {
        pass: true,
        headline: '만기 연장이 가장 유리해요',
        detail: (
          <>만기 연장(최대 5년)하면 비과세 한도가 2배로 늘어나요. 서민형은 400만원 → 800만원, 일반형은 200만원 → 400만원이에요. 추가 납입도 가능하고 비과세 혜택이 커져요.</>
        ),
        badges: ['만기 연장', '비과세 2배', '최대 5년'],
        links: [
          { icon: '📊', title: 'ISA 납입한도 이월 규정', desc: '연장 후 납입 전략', href: '/w/ISA계좌-납입한도-연간-2000만원-이월-규정' },
          { icon: '💰', title: 'ISA 비과세 한도 확인', desc: '연장 시 비과세 한도 변화', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
        ],
      }
    }

    return {
      pass: true,
      headline: `연금전환하면 세액공제 ${creditAmount}만원 추가예요`,
      detail: (
        <>
          잔액 {balance.toLocaleString()}만원을 연금저축·IRP로 전환하면, 전환금액의 10%인 {pensionCredit.toLocaleString()}만원이 세액공제 대상이에요.
          총급여 5,500만원 이하 기준 16.5% 공제율로 약 {creditAmount}만원을 연말정산에서 돌려받아요.
          ISA 비과세 혜택에 더해서 연금 세액공제까지 이중 혜택이에요.
        </>
      ),
      amount: {
        value: `약 ${creditAmount}만원`,
        unit: '추가 세액공제',
        formula: `전환 ${pensionCredit.toLocaleString()}만원 x 16.5%`,
      },
      badges: ['연금전환', `공제 ${pensionCredit}만원`, `환급 ${creditAmount}만원`],
      links: [
        { icon: '📋', title: 'ISA 유형별 비과세 한도', desc: '전환 전 비과세 혜택 확인', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
        { icon: '📊', title: 'ISA 유형 선택 가이드', desc: '재가입 시 유형 재선택', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
      ],
    }
  },
}

export default function ISA만기Checker() {
  return <GenericChecker config={config} />
}
