'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '학생 알바 실업급여 수급 간편 체크',
  subtitle: '4가지만 선택하면 수급 가능성을 확인할 수 있어요',
  intro: (
    <p>
      대학원생이든 대학생이든, 아르바이트로 <strong>고용보험에 가입</strong>돼 있었고
      <strong>비자발적으로 퇴직</strong>했다면 실업급여를 받을 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'hours',
      label: '주당 근로시간',
      options: [
        { value: 'under15', text: '15시간 미만' },
        { value: '15to20', text: '15~20시간' },
        { value: '20to30', text: '20~30시간' },
        { value: 'over30', text: '30시간 이상' },
      ],
    },
    {
      key: 'period',
      label: '고용보험 가입 기간 (합산)',
      options: [
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
        { value: 'contract', text: '계약 만료' },
        { value: 'fired', text: '권고사직/해고' },
        { value: 'voluntary', text: '본인 자발적 퇴사' },
        { value: 'closure', text: '사업장 폐업/이전' },
      ],
    },
    {
      key: 'intent',
      label: '재취업 의사',
      options: [
        { value: 'yes', text: '있음 (구직활동 가능)' },
        { value: 'no', text: '없음 (학업 전념 등)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const hoursOk = sel.hours !== 'under15'
    const periodOk = sel.period !== 'under6'
    const reasonOk = sel.reason !== 'voluntary'
    const intentOk = sel.intent === 'yes'
    const pass = hoursOk && periodOk && reasonOk && intentOk

    const dayMap: Record<string, number> = {
      '6to12': 120, '1to3': 150, 'over3': 180,
    }
    const days = dayMap[sel.period] || 0

    if (pass) {
      return {
        pass: true,
        headline: '실업급여 수급 가능성이 높아요',
        detail: (
          <>고용보험 가입 조건, 피보험기간, 퇴직 사유, 구직 의사를 모두 충족해요.
          1일 수급액은 퇴직 전 3개월 평균임금의 60%이고, 상한액은 68,100원이에요.</>
        ),
        amount: days > 0 ? { value: `최대 ${days}일`, unit: '수급기간' } : undefined,
        badges: ['실업급여 대상', '학생 신분 무관'],
        links: [
          { icon: '💰', title: '실업급여 금액 계산', desc: '연봉별 예상 수령액 확인', href: '/w/실업급여-금액-계산-연봉별-수령액' },
          { icon: '📋', title: '실업급여 신청 방법', desc: '워크넷 신청 절차 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
        ],
      }
    }

    const reasons: string[] = []
    if (!hoursOk) reasons.push('주 15시간 미만은 원칙적 적용 제외 (3개월 이상 근무 시 예외)')
    if (!periodOk) reasons.push('피보험기간 180일(약 6개월) 미만')
    if (!reasonOk) reasons.push('자발적 퇴사는 원칙적 수급 불가')
    if (!intentOk) reasons.push('재취업 의사 없음')

    return {
      pass: false,
      headline: '현재 조건으로는 수급이 어려워요',
      detail: (
        <>미충족 사유: {reasons.join(', ')}.
        {!reasonOk && ' 다만 임금체불, 직장 내 괴롭힘 등 정당한 사유가 있으면 자발적 퇴사도 수급 가능해요.'}
        {!hoursOk && ' 주 15시간 미만이라도 3개월 이상 계속 근무했다면 초단시간 근로자 특례로 가입될 수 있어요.'}</>
      ),
      badges: [],
      links: [
        { icon: '🔄', title: '자발적 퇴사 실업급여 예외', desc: '정당한 이직 사유 7가지', href: '/w/자진퇴사-자발적-퇴사-실업급여-예외-인정-사유' },
        { icon: '⏱️', title: '단시간 근로자 피보험기간', desc: '초단시간 근로자 특례 안내', href: '/w/단시간-파견직-실업급여-피보험기간-계산' },
      ],
    }
  },
}

export default function 학생알바Checker() {
  return <GenericChecker config={config} />
}
