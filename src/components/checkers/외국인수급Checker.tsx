'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '외국인 실업급여 수급 가능성 체크',
  subtitle: '3가지만 선택하면 수급 가능 여부를 확인할 수 있어요',
  intro: (
    <p>
      외국인 근로자도 <strong>체류자격</strong>에 맞게 고용보험에 가입되어 있고,
      <strong>피보험기간 180일 이상</strong>이면 실업급여를 받을 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'visa',
      label: '현재 체류자격(비자)',
      options: [
        { value: 'f2f5f6', text: 'F-2(거주) / F-5(영주) / F-6(결혼이민)' },
        { value: 'e9h2', text: 'E-9(비전문취업) / H-2(방문취업)' },
        { value: 'f4', text: 'F-4(재외동포)' },
        { value: 'd789', text: 'D-7(주재) / D-8(기업투자) / D-9(무역경영)' },
        { value: 'other', text: 'D-4(연수) / E-2(회화지도) / 기타' },
      ],
    },
    {
      key: 'period',
      label: '고용보험 가입기간',
      options: [
        { value: 'none', text: '미가입 상태' },
        { value: 'under6', text: '6개월 미만' },
        { value: '6to12', text: '6개월~1년' },
        { value: '1to3', text: '1~3년' },
        { value: 'over3', text: '3년 이상' },
      ],
    },
    {
      key: 'reason',
      label: '퇴직 사유',
      options: [
        { value: 'contract', text: '계약만료' },
        { value: 'fired', text: '해고 / 권고사직' },
        { value: 'close', text: '사업장 폐업 / 도산' },
        { value: 'voluntary', text: '자진 퇴사' },
        { value: 'visa', text: '체류자격 만료 / 출국' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const visaOk = sel.visa !== 'other'
    const periodOk = sel.period !== 'none' && sel.period !== 'under6'
    const reasonOk = sel.reason !== 'voluntary' && sel.reason !== 'visa'

    const isReciprocity = sel.visa === 'd789'
    const isOptional = sel.visa === 'e9h2' || sel.visa === 'f4'
    const pass = visaOk && periodOk && reasonOk

    const dayMap: Record<string, string> = {
      '6to12': '120일', '1to3': '150~180일', 'over3': '180~270일',
    }
    const days = dayMap[sel.period] || '-'

    if (pass) {
      let extra = ''
      if (isReciprocity) {
        extra = ' 다만 D-7/D-8/D-9 비자는 상호주의 적용 대상이라 본국법 확인이 필요해요.'
      } else if (isOptional) {
        extra = ' 임의가입 비자이므로, 고용보험에 가입 신청을 했는지 다시 확인해 보세요.'
      }

      return {
        pass: true,
        headline: '실업급여 수급 가능성이 높아요',
        detail: (
          <>체류자격, 가입기간, 퇴직 사유 모두 수급 요건에 부합해요.
          예상 수급기간은 {days}이에요.{extra}</>
        ),
        amount: { value: days, unit: '예상 수급기간' },
        badges: ['수급 가능'],
        links: [
          { icon: '📋', title: '실업급여 신청 방법', desc: '고용24 신청 절차 5단계', href: '/w/실업급여-신청-방법-절차-준비서류' },
          { icon: '💰', title: '실업급여 금액 계산', desc: '연봉별 예상 수령액 확인', href: '/w/실업급여-금액-계산-연봉별-수령액' },
        ],
      }
    }

    const reasons: string[] = []
    if (!visaOk) reasons.push('D-4/E-2 등 체류자격은 고용보험 적용 제외')
    if (sel.period === 'none') reasons.push('고용보험 미가입 상태')
    else if (sel.period === 'under6') reasons.push('피보험기간 180일(6개월) 미만')
    if (sel.reason === 'voluntary') reasons.push('자진 퇴사는 원칙적 수급 불가')
    if (sel.reason === 'visa') reasons.push('체류자격 만료·출국 시 수급 불가')

    return {
      pass: false,
      headline: '현재 조건으로는 수급이 어려워요',
      detail: (
        <>해당 사유: {reasons.join(', ')}.
        {sel.reason === 'voluntary' && ' 다만 임금체불·직장 내 괴롭힘 등 정당한 사유가 있다면 자발적 퇴사도 수급 가능해요.'}
        {sel.period === 'none' && isOptional && ' E-9/H-2 비자는 임의가입이 가능하니, 다음 직장에서는 가입을 신청해 보세요.'}</>
      ),
      badges: [],
      links: [
        { icon: '🔄', title: '자발적 퇴사 실업급여 조건', desc: '정당한 이직 사유 7가지', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-조건' },
        { icon: '📞', title: '고용노동부 외국어 상담', desc: '1350 (영어/중국어/베트남어)', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
      ],
    }
  },
}

export default function 외국인수급Checker() {
  return <GenericChecker config={config} />
}
