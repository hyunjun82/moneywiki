'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* 50세 이상 소정급여일수 (고용보험법 제50조 별표1) */
const DAYS_OVER50: Record<string, number> = {
  under1: 120, '1to3': 180, '3to5': 210, '5to10': 240, over10: 270,
}
const DAYS_UNDER50: Record<string, number> = {
  under1: 120, '1to3': 150, '3to5': 180, '5to10': 210, over10: 240,
}
const DAILY_MAX = 68_100

const config: CheckerConfig = {
  title: '50세 이상 실업급여 수급기간 확인',
  subtitle: '나이와 가입기간을 선택하면 수급일수를 알 수 있어요',
  intro: (
    <p>
      50세 이상이면 같은 피보험기간이라도 소정급여일수가 <strong>30일 더 길어요</strong>.
      아래에서 내 예상 수급기간과 최대 수령액을 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'age',
      label: '이직일 기준 나이',
      options: [
        { value: 'under50', text: '50세 미만' },
        { value: 'over50', text: '50세 이상' },
        { value: 'disabled', text: '장애인 (나이 무관)' },
      ],
    },
    {
      key: 'period',
      label: '피보험기간 (고용보험 가입기간)',
      options: [
        { value: 'under1', text: '1년 미만' },
        { value: '1to3', text: '1년~3년' },
        { value: '3to5', text: '3년~5년' },
        { value: '5to10', text: '5년~10년' },
        { value: 'over10', text: '10년 이상' },
      ],
    },
    {
      key: 'reason',
      label: '퇴직 사유',
      options: [
        { value: 'retire', text: '정년퇴직' },
        { value: 'fired', text: '권고사직/해고' },
        { value: 'contract', text: '계약만료' },
        { value: 'voluntary', text: '자발적 퇴사' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const isOver50 = sel.age === 'over50' || sel.age === 'disabled'
    const daysMap = isOver50 ? DAYS_OVER50 : DAYS_UNDER50
    const days = daysMap[sel.period] || 120
    const reasonOk = sel.reason !== 'voluntary'
    const totalMax = days * DAILY_MAX

    const fmt = new Intl.NumberFormat('ko-KR').format(totalMax)
    const ageLabel = sel.age === 'disabled' ? '장애인' : sel.age === 'over50' ? '50세 이상' : '50세 미만'

    if (!reasonOk) {
      return {
        pass: false,
        headline: '자발적 퇴사는 원칙적으로 수급이 어려워요',
        detail: (
          <>자발적 퇴사라도 임금체불, 근로조건 변경, 직장 내 괴롭힘 등 정당한 사유가 있으면 비자발적 이직으로 인정될 수 있어요. 고용보험법 시행규칙 별표2를 확인해 보세요.</>
        ),
        badges: [],
        links: [
          { icon: '📋', title: '자진퇴사 실업급여 예외 조건', desc: '정당한 이직 사유 7가지', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
          { icon: '🔄', title: '이직확인서 정정 방법', desc: '퇴직 사유 변경 절차', href: '/w/실업급여-신청-방법-절차-준비서류' },
        ],
      }
    }

    const bonus = isOver50 ? days - (DAYS_UNDER50[sel.period] || 120) : 0

    return {
      pass: true,
      headline: `${ageLabel} 기준 소정급여일수 ${days}일`,
      detail: (
        <>{ageLabel} + 피보험기간 기준으로 최대 {days}일간 구직급여를 받을 수 있어요.
        {bonus > 0 && <> 50세 미만 대비 <strong>{bonus}일 우대</strong>가 적용돼요.</>}
        {sel.reason === 'retire' && <> 정년퇴직은 비자발적 이직으로 인정되므로 수급 자격이 있어요.</>}</>
      ),
      amount: {
        value: `최대 약 ${Math.round(totalMax / 10000).toLocaleString()}만원`,
        unit: `${days}일 x 일 상한액 68,100원`,
        formula: `${days}일 x 68,100원 = ${fmt}원`,
      },
      badges: [`${days}일 수급`, ...(bonus > 0 ? [`+${bonus}일 우대`] : [])],
      links: [
        { icon: '💰', title: '실업급여 금액 계산', desc: '연봉별 예상 수령액', href: '/w/실업급여-금액-계산-연봉별-수령액' },
        { icon: '📝', title: '실업급여 신청 절차', desc: '고용24 온라인 신청 방법', href: '/w/실업급여-신청-방법-절차-준비서류' },
      ],
    }
  },
}

export default function 수급기간Checker() {
  return <GenericChecker config={config} />
}
