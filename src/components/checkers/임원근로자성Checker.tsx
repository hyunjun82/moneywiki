'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '임원 근로자성 간편 체크',
  subtitle: '4가지만 선택하면 근로자성 인정 가능성을 확인할 수 있어요',
  intro: (
    <p>
      등기이사도 실질적으로 <strong>지휘·감독</strong>을 받으며 일했다면
      근로자로 인정받아 고용보험 가입과 실업급여 수급이 가능해요.
      아래에서 대략적인 가능성을 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'supervision',
      label: '대표이사 등의 지휘·감독을 받았나요?',
      options: [
        { value: 'yes', text: '구체적 업무 지시를 받았어요' },
        { value: 'partial', text: '큰 방향만 지시받았어요' },
        { value: 'no', text: '독립적으로 업무를 결정했어요' },
      ],
    },
    {
      key: 'commute',
      label: '출퇴근 의무가 있었나요?',
      options: [
        { value: 'fixed', text: '정해진 시간에 출퇴근했어요' },
        { value: 'flexible', text: '유연했지만 근태 관리를 받았어요' },
        { value: 'free', text: '자유 출퇴근이었어요' },
      ],
    },
    {
      key: 'pay',
      label: '보수는 어떤 형태였나요?',
      options: [
        { value: 'salary', text: '월급·상여금·연장수당을 받았어요' },
        { value: 'mixed', text: '월급은 있지만 이사 보수로 처리됐어요' },
        { value: 'board', text: '이사회 결의 보수만 받았어요' },
      ],
    },
    {
      key: 'rules',
      label: '취업규칙·인사규정이 적용됐나요?',
      options: [
        { value: 'yes', text: '일반 직원과 같은 규정이 적용됐어요' },
        { value: 'partial', text: '일부만 적용됐어요' },
        { value: 'no', text: '적용되지 않았어요' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    let score = 0

    if (sel.supervision === 'yes') score += 3
    else if (sel.supervision === 'partial') score += 1

    if (sel.commute === 'fixed') score += 2
    else if (sel.commute === 'flexible') score += 1

    if (sel.pay === 'salary') score += 2
    else if (sel.pay === 'mixed') score += 1

    if (sel.rules === 'yes') score += 2
    else if (sel.rules === 'partial') score += 1

    if (score >= 7) {
      return {
        pass: true,
        headline: '근로자성 인정 가능성이 높아요',
        detail: (
          <>지휘·감독, 출퇴근 의무, 보수 형태, 규정 적용 등 핵심 요소가 충족돼요.
          근로복지공단에 피보험자격 확인을 신청하면 고용보험 가입과 실업급여 수급이 가능해요.</>
        ),
        badges: ['근로자성 인정 가능', '고용보험 가입 대상'],
        links: [
          { icon: '📋', title: '실업급여 수급 조건 확인', desc: '피보험기간 180일·비자발적 이직 등', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
          { icon: '📄', title: '실업급여 신청 방법', desc: '고용24 온라인 신청 절차', href: '/w/실업급여-신청-방법-절차-준비서류' },
        ],
      }
    }

    if (score >= 4) {
      return {
        pass: true,
        headline: '근로자성 인정 가능성이 있지만 증빙이 필요해요',
        detail: (
          <>일부 요소가 충족되지만, 대법원은 모든 요소를 종합적으로 판단해요.
          출퇴근 기록, 업무지시 메일, 급여명세서 등 증빙자료를 충분히 확보하는 게 중요해요.</>
        ),
        badges: ['판단 필요', '증빙 확보 권장'],
        links: [
          { icon: '⚖️', title: '임원 실업급여 판례 확인', desc: '대법원 근로자성 인정 사례', href: '/w/임원-등기이사-실업급여-근로자성-판단' },
          { icon: '📞', title: '고용센터 상담', desc: '관할 고용센터에서 사전 상담', href: '/w/실업급여-고용센터-찾기-고용24-사용법' },
        ],
      }
    }

    return {
      pass: false,
      headline: '현재 조건으로는 인정이 어려울 수 있어요',
      detail: (
        <>독립적으로 업무를 수행하고 이사회 보수만 받은 경우, 위임 관계로 판단될 가능성이 높아요.
        다만 실질적 관계를 다시 확인해 보시고, 전문가 상담을 받아보시는 걸 권해드려요.</>
      ),
      badges: [],
      links: [
        { icon: '🔍', title: '공무원·특수직종 실업급여', desc: '근로형태별 수급 조건 비교', href: '/w/실업급여-공무원-외국인-특수직종-수급-조건' },
        { icon: '📋', title: '이의신청 절차', desc: '불인정 시 심사청구 방법', href: '/w/실업급여-이의신청-심사청구-재심사-불복-절차' },
      ],
    }
  },
}

export default function 임원근로자성Checker() {
  return <GenericChecker config={config} />
}
