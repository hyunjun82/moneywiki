'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '단시간·파견직 피보험기간 간편 체크',
  subtitle: '3가지만 선택하면 수급 가능성을 확인할 수 있어요',
  intro: (
    <p>
      단시간 근로자는 <strong>주 소정근로시간</strong>에 따라 고용보험 가입 기준이 달라요.
      아래에서 내 근무 조건으로 실업급여 수급 가능성을 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'hours',
      label: '주 소정근로시간',
      options: [
        { value: 'over15', text: '15시간 이상' },
        { value: 'under15_3m', text: '15시간 미만 (3개월 이상 근무)' },
        { value: 'under15_short', text: '15시간 미만 (3개월 미만 근무)' },
      ],
    },
    {
      key: 'period',
      label: '총 근무 기간 (피보험단위기간)',
      options: [
        { value: 'under180', text: '180일 미만' },
        { value: '180to365', text: '180일~1년' },
        { value: '1to3', text: '1~3년' },
        { value: '3to5', text: '3~5년' },
        { value: 'over5', text: '5년 이상' },
      ],
    },
    {
      key: 'type',
      label: '고용 형태',
      options: [
        { value: 'parttime', text: '단시간 직접고용' },
        { value: 'dispatch', text: '파견직 (파견사업주 소속)' },
        { value: 'multi', text: '복수사업장 근무' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const insured = sel.hours !== 'under15_short'
    const periodOk = sel.period !== 'under180'

    const dayMap: Record<string, string> = {
      '180to365': '120일',
      '1to3': '150일',
      '3to5': '180일',
      'over5': '210일',
    }
    const days = dayMap[sel.period] || '0일'

    if (!insured) {
      return {
        pass: false,
        headline: '고용보험 가입 대상이 아닐 수 있어요',
        detail: (
          <>주 15시간 미만이면서 3개월 미만 근무한 경우 고용보험 가입 대상이 아니에요.
          3개월 이상 계속 근무하면 초단시간 근로자로 가입 대상이 돼요.</>
        ),
        badges: [],
        links: [
          { icon: '📋', title: '고용보험 가입 기준 상세', desc: '주 15시간 미만 근로자 특례 안내', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
          { icon: '🔄', title: '소급가입으로 피보험기간 확보', desc: '미가입 기간 소급 신청 방법', href: '/w/고용보험-미가입-소급가입-실업급여-수급' },
        ],
      }
    }

    if (!periodOk) {
      return {
        pass: false,
        headline: '피보험단위기간이 부족해요',
        detail: (
          <>실업급여를 받으려면 피보험단위기간이 180일 이상이어야 해요.
          이전 직장에서 실업급여를 받지 않았다면 3년 이내 피보험기간을 합산할 수 있어요.</>
        ),
        badges: ['기간 부족'],
        links: [
          { icon: '🧮', title: '피보험기간 180일 계산법', desc: '여러 직장 합산 가능 여부 확인', href: '/w/실업급여-피보험기간-180일-계산-합산-방법' },
          { icon: '📝', title: '고용보험 가입 이력 조회', desc: '고용24에서 내 피보험기간 확인', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
        ],
      }
    }

    const isUltraShort = sel.hours === 'under15_3m'
    const baseNote = isUltraShort
      ? '초단시간 근로자는 기준기간이 24개월로 확대 적용돼요.'
      : '일반 단시간 근로자로 18개월 기준기간이 적용돼요.'

    const dispatchNote = sel.type === 'dispatch'
      ? ' 파견직은 파견사업주에게 이직확인서를 발급받아야 해요.'
      : sel.type === 'multi'
      ? ' 복수사업장의 경우 마지막 퇴사한 사업장 기준으로 신청해요.'
      : ''

    return {
      pass: true,
      headline: '실업급여 수급 가능성이 높아요',
      detail: (
        <>{baseNote} 예상 소정급여일수는 {days}이에요.{dispatchNote}
        정확한 금액은 퇴직 전 3개월 평균임금의 60%로 산정돼요.</>
      ),
      amount: { value: `최대 ${days}`, unit: '소정급여일수' },
      badges: [
        isUltraShort ? '초단시간 근로자' : '단시간 근로자',
        '수급 가능',
      ],
      links: [
        { icon: '💰', title: '실업급여 금액 계산', desc: '연봉별 예상 수령액 확인', href: '/w/실업급여-금액-계산-연봉별-수령액' },
        { icon: '📋', title: '실업급여 신청 방법', desc: '고용센터 방문 절차 안내', href: '/w/실업급여-신청-방법-절차-준비서류' },
      ],
    }
  },
}

export default function 단시간피보험Checker() {
  return <GenericChecker config={config} />
}
