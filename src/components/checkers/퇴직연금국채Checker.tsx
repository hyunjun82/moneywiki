'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '퇴직연금으로 국채 투자 가능할까?',
  subtitle: '3가지만 선택하면 내 계좌로 국채를 살 수 있는지 확인해요',
  intro: (
    <p>
      2026년 9월부터 <strong>DC형</strong>과 <strong>IRP</strong> 계좌로 개인투자용 국채를
      직접 살 수 있어요. 내 퇴직연금 계좌가 조건에 맞는지 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'account',
      label: '퇴직연금 계좌 유형',
      options: [
        { value: 'dc', text: 'DC형 (확정기여형)' },
        { value: 'irp', text: 'IRP (개인형 퇴직연금)' },
        { value: 'db', text: 'DB형 (확정급여형)' },
        { value: 'none', text: '퇴직연금 없음' },
      ],
    },
    {
      key: 'institution',
      label: '금융기관 투자중개업 인가',
      options: [
        { value: 'yes', text: '인가 보유 (증권사 7곳·은행 2곳)' },
        { value: 'no', text: '인가 미보유' },
        { value: 'unknown', text: '잘 모르겠음' },
      ],
    },
    {
      key: 'timing',
      label: '투자 시기',
      options: [
        { value: 'after', text: '2026년 9월 이후' },
        { value: 'before', text: '2026년 9월 이전 (지금)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const accountOk = sel.account === 'dc' || sel.account === 'irp'
    const institutionOk = sel.institution !== 'no'
    const timingOk = sel.timing === 'after'
    const pass = accountOk && institutionOk && timingOk

    if (pass) {
      const accountName = sel.account === 'dc' ? 'DC형' : 'IRP'
      return {
        pass: true,
        headline: `${accountName} 계좌로 국채 투자 가능해요`,
        detail: (
          <>
            {accountName} 계좌와 인가 금융기관 조건을 충족해요. 2026년 9월 제도 시행 후
            10년물·20년물 국채를 직접 청약할 수 있어요. 전용계좌 없이 기존 퇴직연금
            계좌에서 바로 매수 가능해요.
          </>
        ),
        amount: {
          value: '10년물·20년물',
          unit: '투자 가능 국채',
        },
        badges: [`${accountName} 가능`, '2026.9 시행'],
        links: [
          {
            icon: '📋',
            title: '국채 신청 방법 4단계',
            desc: '전용계좌 개설부터 청약까지',
            href: '/w/연금형-개인투자용-국채-신청-방법-10년물-20년물',
          },
          {
            icon: '💰',
            title: '국채 수익률과 세금 혜택',
            desc: '복리 가산금리 + 비과세 조건',
            href: '/w/개인투자용-국채-수익률-세금-혜택-복리-비과세',
          },
        ],
      }
    }

    const reasons: string[] = []
    if (!accountOk) {
      if (sel.account === 'db') {
        reasons.push('DB형은 회사가 운용하므로 개인 직접 투자 불가 (IRP 추가 개설 필요)')
      } else {
        reasons.push('퇴직연금 계좌가 없으면 DC형 또는 IRP 먼저 개설 필요')
      }
    }
    if (!institutionOk) reasons.push('금융기관에 투자중개업 인가가 없으면 국채 청약 불가')
    if (!timingOk) reasons.push('제도 시행은 2026년 9월부터, 현재는 아직 불가')

    return {
      pass: false,
      headline: '지금은 바로 투자가 어려워요',
      detail: (
        <>
          해당 사유: {reasons.join('. ')}.
          {sel.account === 'db' &&
            ' DB형만 있다면 IRP를 추가로 개설하면 국채 투자가 가능해요. 회사를 옮기거나 자영업자도 IRP를 만들 수 있어요.'}
        </>
      ),
      badges: [],
      links: [
        {
          icon: '🔄',
          title: 'IRP 계좌 개설 조건',
          desc: 'DC형 없어도 IRP로 가능',
          href: '/w/퇴직연금-DC형-IRP-국채-투자-조건-금융기관',
        },
        {
          icon: '📊',
          title: '국채 vs ETF 비교',
          desc: '대안으로 채권형 ETF도 확인',
          href: '/w/퇴직연금-국채-vs-ETF-비교-안정성-수익률',
        },
      ],
    }
  },
}

export default function 퇴직연금국채Checker() {
  return <GenericChecker config={config} />
}
