'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '기초수급자 실업급여 동시수급 영향 체크',
  subtitle: '3가지만 선택하면 생계급여 감액 여부를 확인할 수 있어요',
  intro: (
    <p>
      기초수급자가 실업급여를 받으면 <strong>소득인정액</strong>이 올라가서
      생계급여가 줄어들 수 있어요. 아래에서 내 상황을 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'household',
      label: '가구원 수',
      options: [
        { value: '1', text: '1인가구' },
        { value: '2', text: '2인가구' },
        { value: '3', text: '3인가구' },
        { value: '4', text: '4인가구' },
      ],
    },
    {
      key: 'ui_daily',
      label: '실업급여 1일 수급액',
      options: [
        { value: '66048', text: '66,048원 (하한액)' },
        { value: '67000', text: '약 67,000원' },
        { value: '68100', text: '68,100원 (상한액)' },
      ],
    },
    {
      key: 'other_income',
      label: '실업급여 외 다른 소득',
      options: [
        { value: '0', text: '없음' },
        { value: '200000', text: '약 20만원' },
        { value: '500000', text: '약 50만원' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const standards: Record<string, number> = {
      '1': 820556, '2': 1343773, '3': 1714892, '4': 2078316,
    }
    const medicalStandards: Record<string, number> = {
      '1': 1025695, '2': 1679717, '3': 2143614, '4': 2597895,
    }

    const standard = standards[sel.household] || 820556
    const medStandard = medicalStandards[sel.household] || 1025695
    const dailyUI = parseInt(sel.ui_daily)
    const monthlyUI = dailyUI * 30
    const otherIncome = parseInt(sel.other_income)
    const totalIncome = monthlyUI + otherIncome

    const livelihoodBenefit = Math.max(0, standard - totalIncome)
    const medicalOk = totalIncome <= medStandard

    const fmt = new Intl.NumberFormat('ko-KR')
    const householdLabel = sel.household + '인가구'

    if (livelihoodBenefit > 0) {
      return {
        pass: true,
        headline: '생계급여가 감액되지만 유지돼요',
        detail: (
          <>실업급여 월 약 {fmt.format(monthlyUI)}원이 소득인정액에 100% 반영돼요.
          {householdLabel} 생계급여 기준 {fmt.format(standard)}원에서 차감하면
          월 약 {fmt.format(livelihoodBenefit)}원을 받을 수 있어요.
          의료급여는 {medicalOk ? '유지' : '탈락 가능'}해요.</>
        ),
        amount: {
          value: `월 약 ${fmt.format(livelihoodBenefit)}원`,
          unit: '예상 생계급여',
          formula: `${fmt.format(standard)} - ${fmt.format(totalIncome)}`,
        },
        badges: ['생계급여 감액', medicalOk ? '의료급여 유지' : '의료급여 확인'],
        links: [
          { icon: '📊', title: '소득인정액 계산법 상세', desc: '근로소득공제·재산환산 포함 정밀 계산', href: '/w/기초생활수급자-1인가구-생계급여-조건-소득인정액' },
          { icon: '📋', title: '실업급여 신청 절차', desc: '고용센터 방문 전 필요 서류', href: '/w/실업급여-신청-방법-절차-준비서류' },
        ],
      }
    }

    return {
      pass: false,
      headline: '생계급여가 중단될 수 있어요',
      detail: (
        <>실업급여 월 약 {fmt.format(monthlyUI)}원이 {householdLabel} 생계급여 기준
        {fmt.format(standard)}원을 초과해요. 생계급여는 0원이 되지만,
        의료급여(기준 {fmt.format(medStandard)}원)는 {medicalOk ? '유지될 수 있어요' : '탈락 가능해요'}.
        실업급여 종료 후 주민센터에 변동신고하면 생계급여를 다시 받을 수 있어요.</>
      ),
      badges: ['생계급여 중단', medicalOk ? '의료급여 유지' : '의료급여 확인'],
      links: [
        { icon: '🏥', title: '의료급여 선정기준 확인', desc: '1종·2종 본인부담 0원 조건', href: '/w/의료급여-1종-2종-차이' },
        { icon: '🔄', title: '생계급여 복원 절차', desc: '변동신고 후 재개 방법', href: '/w/기초생활수급자-1인가구-생계급여-조건-소득인정액' },
      ],
    }
  },
}

export default function 동시수급Checker() {
  return <GenericChecker config={config} />
}
