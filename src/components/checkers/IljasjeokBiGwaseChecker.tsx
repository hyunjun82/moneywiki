'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '일시적 2주택 비과세 자격 판단',
  subtitle: '조건을 선택하면 비과세 여부를 바로 확인할 수 있어요',
  intro: (
    <p>
      새 집을 샀는데 기존 집 양도세가 걱정되시나요?
      아래 조건을 선택하면 <strong>일시적 2주택 비과세</strong> 여부를 바로 알 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'oldHold',
      label: '종전주택 보유기간',
      options: [
        { value: 'less1', text: '1년 미만' },
        { value: 'more1', text: '1년 이상' },
      ],
    },
    {
      key: 'residence',
      label: '종전주택 거주 여부 (조정대상지역인 경우)',
      options: [
        { value: 'yes2', text: '2년 이상 거주' },
        { value: 'no', text: '거주 안 함 (또는 비조정지역)' },
      ],
    },
    {
      key: 'disposal',
      label: '신규주택 취득 후 종전주택 매도 기한',
      options: [
        { value: 'within3', text: '3년 이내 매도 예정' },
        { value: 'over3', text: '3년 초과 예정' },
      ],
    },
    {
      key: 'price',
      label: '종전주택 예상 양도가액',
      options: [
        { value: 'under12', text: '12억원 이하' },
        { value: 'over12', text: '12억원 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const oldHoldOk = sel.oldHold === 'more1'
    const disposalOk = sel.disposal === 'within3'
    const priceLabel = sel.price === 'over12' ? '고가주택 — 초과분 과세' : '전액 비과세 가능'

    const reasons: string[] = []
    if (!oldHoldOk) reasons.push('종전주택을 1년 이상 보유한 뒤 신규주택을 취득해야 해요')
    if (!disposalOk) reasons.push('신규주택 취득일로부터 3년 이내에 종전주택을 팔아야 해요')

    const isAdjusted = sel.residence === 'yes2'
    const residenceNote = sel.residence === 'no'
      ? '비조정대상지역이거나 거주요건 미충족 — 보유 2년만 필요해요'
      : '조정대상지역 2년 거주 충족'

    if (oldHoldOk && disposalOk) {
      return {
        pass: true,
        headline: '일시적 2주택 비과세 요건을 충족해요',
        detail: (
          <>
            종전주택 1년 이상 보유 후 취득, 3년 이내 매도 조건을 갖췄어요.
            {sel.price === 'over12'
              ? <> 단, 양도가액 12억원 초과분은 과세돼요 (<strong>고가주택 기준 적용</strong>).</>
              : <> 양도가액 12억원 이하라서 <strong>전액 비과세</strong>가 가능해요.</>
            }
            {!isAdjusted && <> 비조정대상지역이면 거주 요건 없이 보유 2년만 충족하면 돼요.</>}
          </>
        ),
        amount: {
          value: sel.price === 'over12' ? '초과분 과세' : '세금 0원',
          unit: priceLabel,
          formula: `종전주택 1년+ 보유 → 신규 취득 → 3년 내 매도`,
        },
        badges: [
          '비과세 요건 충족',
          `${priceLabel}`,
          residenceNote,
        ],
        links: [
          { icon: '📋', title: '일시적 2주택 비과세 기간·처분 조건', desc: '3년 기한 계산법과 거주 요건 상세', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
          { icon: '🏠', title: '다주택 양도세 중과 유예 전략', desc: '전체 절세 가이드', href: '/w/다주택양도세-중과유예-세율-절세-전략' },
        ],
      }
    }

    return {
      pass: false,
      headline: '현재 조건으로는 비과세를 받기 어려워요',
      detail: (
        <>
          {reasons.map((r, i) => <p key={i}>{r}</p>)}
          조건을 충족하지 못한 경우에는 양도차익에 기본세율(6~45%)이 적용돼요.
          2026년 5월 9일까지 중과 유예 중이라 중과세율은 안 붙어요.
        </>
      ),
      badges: reasons.map(r => r.slice(0, 20) + '…'),
      links: [
        { icon: '📊', title: '2주택자 양도세 세율 계산', desc: '비과세 안 되면 세금이 얼마인지 확인', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
        { icon: '🏠', title: '다주택자 양도세 중과 유예 전략', desc: '유예 기간 절세 방법', href: '/w/다주택양도세-중과유예-세율-절세-전략' },
      ],
    }
  },
}

export default function IljasjeokBiGwaseChecker() {
  return <GenericChecker config={config} />
}
