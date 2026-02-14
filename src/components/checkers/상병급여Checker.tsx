'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '상병급여 전환 가능 여부 체크',
  subtitle: '3가지만 선택하면 상병급여 전환 가능성을 확인할 수 있어요',
  intro: (
    <p>
      상병급여는 구직급여 수급 중 <strong>질병·부상·출산</strong>으로 취업이
      불가능할 때 구직급여 대신 받는 급여예요. 아래에서 전환 가능 여부를
      확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'status',
      label: '현재 수급 상태',
      options: [
        { value: 'active', text: '구직급여 수급 중 (실업 신고 완료)' },
        { value: 'before', text: '아직 실업 신고 전' },
        { value: 'stopped', text: '수급정지 상태' },
        { value: 'ended', text: '소정급여일수 소진' },
      ],
    },
    {
      key: 'reason',
      label: '취업 불가능 사유',
      options: [
        { value: 'disease7', text: '질병·부상 7일 이상 (의사 진단)' },
        { value: 'disease_short', text: '질병·부상 7일 미만' },
        { value: 'birth', text: '출산' },
        { value: 'care', text: '가족 간병 (동거친족)' },
      ],
    },
    {
      key: 'overlap',
      label: '다른 보상 수급 여부',
      options: [
        { value: 'none', text: '다른 보상 없음' },
        { value: 'industrial', text: '산재보험 휴업급여 수급 중' },
        { value: 'labor', text: '근로기준법 휴업보상 수급 중' },
        { value: 'other', text: '국가배상법 등 기타 보상 수급 중' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const statusOk = sel.status === 'active'
    const reasonOk = sel.reason === 'disease7' || sel.reason === 'birth'
    const overlapOk = sel.overlap === 'none'
    const pass = statusOk && reasonOk && overlapOk

    if (pass) {
      const isBirth = sel.reason === 'birth'
      return {
        pass: true,
        headline: '상병급여 전환 가능성이 높아요',
        detail: (
          <>
            {isBirth
              ? '출산일로부터 45일간 상병급여를 받을 수 있어요. 출산 증명서를 준비하세요.'
              : '7일 이상 질병·부상으로 취업이 불가능하다면 의사 증명서를 첨부해서 청구할 수 있어요.'}
            {' '}금액은 구직급여일액과 동일해요.
          </>
        ),
        amount: {
          value: isBirth ? '최대 45일' : '잔여일수',
          unit: '상병급여 지급 범위',
        },
        badges: ['상병급여 대상', isBirth ? '출산' : '질병·부상'],
        links: [
          { icon: '📋', title: '상병급여 신청 절차와 서류', desc: '청구 기한 14일 이내, 필요 서류 안내', href: '#s3' },
          { icon: '💰', title: '상병급여 금액과 지급기간', desc: '구직급여일액과 동일한 금액', href: '#s4' },
        ],
      }
    }

    const reasons: string[] = []
    if (!statusOk) {
      if (sel.status === 'before') reasons.push('실업 신고를 먼저 완료해야 해요')
      if (sel.status === 'stopped') reasons.push('수급정지 기간에는 상병급여도 받을 수 없어요')
      if (sel.status === 'ended') reasons.push('소정급여일수가 모두 소진된 상태예요')
    }
    if (!reasonOk) {
      if (sel.reason === 'disease_short') reasons.push('7일 미만 질병·부상은 상병급여 대상이 아니에요')
      if (sel.reason === 'care') reasons.push('가족 간병은 상병급여 대상이 아니에요 (수급기간 연장 사유는 가능)')
    }
    if (!overlapOk) reasons.push('산재보험·근로기준법 등 다른 보상과 중복 수급이 불가해요')

    return {
      pass: false,
      headline: '현재 조건으로는 상병급여 전환이 어려워요',
      detail: (
        <>
          해당 사유: {reasons.join('. ')}.
          {sel.reason === 'care' && ' 다만 동거친족 간병은 실업인정 기준기간 연장 사유로 인정받을 수 있어요.'}
          {sel.reason === 'disease_short' && ' 7일 미만이라도 실업인정일에 출석이 어려우면 고용센터에 미리 연락하세요.'}
        </>
      ),
      badges: [],
      links: [
        { icon: '🔄', title: '실업급여 수급정지 사유와 대처법', desc: '6가지 중단 사유 확인', href: '/w/실업급여-중단-거부-수급정지-사유-대처' },
        { icon: '📞', title: '실업급여 수급 조건 자격 요건', desc: '기본 수급 자격 다시 확인', href: '/w/실업급여-수급-조건-자격-요건-완벽정리' },
      ],
    }
  },
}

export default function 상병급여Checker() {
  return <GenericChecker config={config} />
}
