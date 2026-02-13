'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: 'ISA 납입한도 계산기',
  subtitle: '현재 납입 상황을 입력하면 남은 한도를 알려드려요',
  intro: (
    <p>올해 넣은 금액과 가입 연차를 선택하세요. 남은 연간 한도와 이월분까지 계산해요.</p>
  ),
  groups: [
    {
      key: 'year',
      label: '가입 연차',
      options: [
        { value: '1', text: '1년차 (올해 개설)' },
        { value: '2', text: '2년차' },
        { value: '3', text: '3년차' },
        { value: '4', text: '4년차 이상' },
      ],
    },
    {
      key: 'paid',
      label: '올해 납입한 금액',
      options: [
        { value: '0', text: '아직 안 넣음' },
        { value: '500', text: '약 500만원' },
        { value: '1000', text: '약 1,000만원' },
        { value: '2000', text: '2,000만원 (한도)' },
      ],
    },
    {
      key: 'lastYear',
      label: '작년 미사용 한도',
      options: [
        { value: '0', text: '없음 (한도 소진)' },
        { value: '500', text: '약 500만원' },
        { value: '1000', text: '약 1,000만원' },
        { value: '1500', text: '1,500만원 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const yearNum = parseInt(sel.year)
    const paid = parseInt(sel.paid)
    const carryOver = parseInt(sel.lastYear)
    const totalAvail = 2000 + carryOver
    const remaining = Math.max(0, totalAvail - paid)
    const cumMax = 10000
    const cumUsed = Math.min((yearNum - 1) * 2000 + paid, cumMax)
    const cumLeft = cumMax - cumUsed

    const monthlyRec = remaining > 0
      ? Math.ceil(remaining / Math.max(1, 12 - new Date().getMonth()))
      : 0

    return {
      pass: true,
      headline: remaining > 0
        ? `올해 ${remaining.toLocaleString()}만원 더 넣을 수 있어요`
        : '올해 납입한도를 다 채웠어요',
      detail: (
        <>
          <p>
            기본 한도 2,000만원에 이월분 {carryOver.toLocaleString()}만원을 더하면 올해 총 {totalAvail.toLocaleString()}만원까지 넣을 수 있어요.
            {remaining > 0 && ` 남은 ${remaining.toLocaleString()}만원을 채우려면 매달 약 ${monthlyRec.toLocaleString()}만원씩 넣으면 돼요.`}
            {cumLeft < 2000 && ` 누적 한도도 ${cumLeft.toLocaleString()}만원 남았으니 참고하세요.`}
          </p>
        </>
      ),
      amount: remaining > 0 ? {
        value: `${remaining.toLocaleString()}만원`,
        unit: '올해 남은 한도',
        formula: `기본 2,000만원 + 이월 ${carryOver.toLocaleString()}만원 − 납입 ${paid.toLocaleString()}만원`,
      } : undefined,
      badges: [
        `연간 ${totalAvail.toLocaleString()}만원`,
        `잔여 ${remaining.toLocaleString()}만원`,
        `누적 ${cumLeft.toLocaleString()}만원 남음`,
      ],
      links: [
        { icon: '📋', title: 'ISA 만기·연금전환 방법', desc: '만기 해지, 연장, 연금전환 비교', href: '/w/ISA계좌-만기-해지-중도인출-연금전환-방법' },
        { icon: '💰', title: 'ISA 절세 효과 계산', desc: '한도 채웠을 때 절세액', href: '/w/ISA계좌-비과세-한도-손익통산-절세-계산' },
      ],
    }
  },
}

export default function ISA납입Checker() {
  return <GenericChecker config={config} />
}
