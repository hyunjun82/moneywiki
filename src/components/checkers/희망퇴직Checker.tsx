'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '희망퇴직 실업급여 수급 간편 체크',
  subtitle: '3가지만 선택하면 수급 가능성을 확인할 수 있어요',
  intro: (
    <p>
      희망퇴직·명예퇴직은 <strong>회사 주도 구조조정</strong>이면 비자발적 이직으로
      인정받아 실업급여를 받을 수 있어요. 아래에서 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'reason',
      label: '퇴직 배경',
      options: [
        { value: 'restructure', text: '회사 구조조정·인원 감축 모집' },
        { value: 'recommend', text: '사업주 권고·희망퇴직 제안' },
        { value: 'merger', text: '양도·인수·합병에 따른 퇴직' },
        { value: 'self', text: '본인이 먼저 퇴직 희망' },
      ],
    },
    {
      key: 'period',
      label: '고용보험 가입기간',
      options: [
        { value: 'under6', text: '6개월 미만' },
        { value: '6to12', text: '6개월~1년' },
        { value: '1to3', text: '1~3년' },
        { value: '3to5', text: '3~5년' },
        { value: '5to10', text: '5~10년' },
        { value: 'over10', text: '10년 이상' },
      ],
    },
    {
      key: 'intent',
      label: '재취업 의사',
      options: [
        { value: 'yes', text: '있음 (구직활동 가능)' },
        { value: 'no', text: '없음 (은퇴·전업 등)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const reasonOk = sel.reason !== 'self'
    const periodOk = sel.period !== 'under6'
    const intentOk = sel.intent === 'yes'
    const pass = reasonOk && periodOk && intentOk

    const dayMap: Record<string, string> = {
      '6to12': '120~150일',
      '1to3': '150~180일',
      '3to5': '180~210일',
      '5to10': '210~240일',
      'over10': '240~270일',
    }
    const days = dayMap[sel.period] || '0일'

    if (pass) {
      return {
        pass: true,
        headline: '실업급여 수급 가능성이 높아요',
        detail: (
          <>회사 주도 퇴직으로 비자발적 이직이 인정되고, 고용보험 가입기간과
          재취업 의사 조건도 충족해요. 2026년 기준 1일 상한액 68,100원, 하한액 66,048원이에요.</>
        ),
        amount: { value: days, unit: '예상 수급기간' },
        badges: ['비자발적 이직 인정', '실업급여 대상'],
        links: [
          { icon: '💰', title: '실업급여 금액 계산', desc: '연봉별 예상 수급액 확인', href: '/w/실업급여-금액-계산-연봉별-수령액' },
          { icon: '📋', title: '실업급여 신청 방법', desc: '고용센터 신청 절차 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
        ],
      }
    }

    const reasons: string[] = []
    if (!reasonOk) reasons.push('본인 희망 퇴직은 자발적 이직으로 분류돼요')
    if (!periodOk) reasons.push('피보험기간 180일(6개월) 미만이에요')
    if (!intentOk) reasons.push('재취업 의사가 없으면 수급 불가예요')

    return {
      pass: false,
      headline: '현재 조건으로는 수급이 어려워요',
      detail: (
        <>해당 사유: {reasons.join(', ')}.
        {!reasonOk && ' 다만 본인이 먼저 신청했더라도 회사의 고용조정계획이 먼저 있었다면 비자발적 이직으로 인정될 수 있어요.'}</>
      ),
      badges: [],
      links: [
        { icon: '🔄', title: '자진퇴사 실업급여 예외', desc: '정당한 이직 사유 7가지', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
        { icon: '📞', title: '실업급여 이의신청', desc: '거부 시 심사청구 방법', href: '/w/실업급여-이의신청-심사청구-재심사-방법' },
      ],
    }
  },
}

export default function 희망퇴직Checker() {
  return <GenericChecker config={config} />
}
