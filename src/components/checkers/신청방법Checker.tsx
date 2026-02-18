'use client'
import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '지금 실업급여 신청 가능한지 확인하기',
  subtitle: '퇴사 사유·피보험기간·신청 기한 3가지만 선택하면 바로 알 수 있어요',
  intro: (
    <p className="text-sm text-neutral-600 leading-relaxed">
      실업급여는{' '}
      <a href="/w/실업급여-수급-조건-자격-요건-완벽정리" className="text-[#4A7AB5] underline">비자발적 이직</a>
      {' '}+{' '}
      <a href="/w/실업급여-피보험기간-180일-계산-합산-방법" className="text-[#4A7AB5] underline">피보험기간 180일 이상</a>
      {' '}+ 퇴사 후 12개월 이내 신청, 세 가지를 모두 충족해야 받을 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'reason',
      label: '퇴사 사유',
      options: [
        { value: 'involuntary', text: '비자발적 이직 (권고사직·계약만료·폐업 등)' },
        { value: 'voluntary', text: '자발적 퇴사 (개인 사정·이직 등)' },
      ],
    },
    {
      key: 'period',
      label: '피보험기간 (고용보험 가입 기간)',
      options: [
        { value: 'ok', text: '이직일 이전 18개월 내 180일 이상' },
        { value: 'short', text: '180일 미만' },
      ],
    },
    {
      key: 'deadline',
      label: '퇴사 후 경과 기간',
      options: [
        { value: 'within', text: '퇴사일 다음 날부터 12개월 이내' },
        { value: 'over', text: '12개월 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const isInvoluntary = sel.reason === 'involuntary'
    const hasPeriod = sel.period === 'ok'
    const inDeadline = sel.deadline === 'within'

    if (isInvoluntary && hasPeriod && inDeadline) {
      return {
        pass: true,
        headline: '신청 가능해요',
        detail: '3가지 조건을 모두 충족했어요. 워크넷 구직등록 후 관할 고용센터에 이직확인서·신분증·통장사본을 지참해 방문하세요.',
        badges: ['비자발적 이직 ✓', '피보험기간 180일 ✓', '신청 기한 이내 ✓'],
        links: [
          { label: '실업인정 구직활동 방법', href: '/w/실업급여-실업인정-구직활동-방법' },
          { label: '내 기초일액 계산하기', href: '/w/실업급여-기초일액' },
        ],
      }
    }

    const reasons: string[] = []
    if (!isInvoluntary) reasons.push('자발적 퇴사는 원칙상 수급 불가예요 (부당한 근로조건 등 예외 사유 있으면 가능해요)')
    if (!hasPeriod) reasons.push('피보험기간 180일 미충족이에요')
    if (!inDeadline) reasons.push('신청 기한 12개월이 지나 수급 자격이 소멸됐어요')

    return {
      pass: false,
      headline: '현재 조건으로는 신청이 어려워요',
      detail: reasons.join(' / '),
      badges: reasons.map(() => '미충족'),
      links: [
        { label: '자발적 퇴사 예외 사유', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-사유' },
        { label: '피보험기간 180일 계산', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
      ],
    }
  },
}

export default function 신청방법Checker() {
  return <GenericChecker config={config} />
}
