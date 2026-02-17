'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '일시적 2주택 비과세 요건 체크',
  subtitle: '종전주택 처분 기한과 요건을 입력하면 비과세 가능 여부를 알려드려요',
  intro: (
    <p>
      일시적 2주택 비과세는 <strong>처분 기한(3년)</strong>과 <strong>보유·거주 요건</strong>을
      모두 충족해야 받을 수 있어요. 내 상황이 비과세 요건에 해당하는지 바로 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'holdPeriod',
      label: '신규주택 취득 전 종전주택 보유기간',
      options: [
        { value: 'less1', text: '1년 미만 보유 후 신규주택 취득' },
        { value: 'over1', text: '1년 이상 보유 후 신규주택 취득' },
      ],
    },
    {
      key: 'residency',
      label: '종전주택 보유·거주 요건',
      options: [
        { value: 'adjusted-ok', text: '조정대상지역: 2년 이상 보유 + 2년 이상 거주' },
        { value: 'adjusted-fail', text: '조정대상지역: 2년 거주 미충족' },
        { value: 'non-ok', text: '비조정지역: 2년 이상 보유' },
        { value: 'non-fail', text: '비조정지역: 2년 보유 미충족' },
      ],
    },
    {
      key: 'disposalPeriod',
      label: '신규주택 취득 후 종전주택 처분 기한',
      options: [
        { value: 'within3y', text: '신규주택 취득일로부터 3년 이내 처분 예정' },
        { value: 'over3y', text: '3년 초과 (또는 아직 미처분)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const holdOk = sel.holdPeriod === 'over1'
    const residencyOk = sel.residency === 'adjusted-ok' || sel.residency === 'non-ok'
    const disposalOk = sel.disposalPeriod === 'within3y'

    const allPass = holdOk && residencyOk && disposalOk

    if (allPass) {
      return {
        pass: true,
        headline: '일시적 2주택 비과세 요건을 충족해요',
        detail: (
          <>
            3가지 요건을 모두 충족했어요. 종전주택 양도 시 <strong>양도세 0원(12억 이하)</strong>이 적용돼요.
            신규주택 취득일부터 3년 내 잔금일을 맞추면 비과세가 확정돼요.
          </>
        ),
        amount: { value: '0원', unit: '양도세 (12억 이하)' },
        badges: ['비과세 대상', '3년 내 처분', '전액 면제'],
        links: [
          { icon: '📅', title: '처분 기한 변천 확인', desc: '2018년부터 현재까지 처분 기한 변화', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
          { icon: '📊', title: '2주택자 양도세 전체 가이드', desc: '비과세 외 세율·공제 총정리', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
        ],
      }
    }

    /* 요건 미충족 사유 분기 */
    if (!holdOk) {
      return {
        pass: false,
        headline: '종전주택 1년 미만 보유 — 비과세 불가',
        detail: (
          <>
            일시적 2주택 특례를 받으려면 <strong>종전주택을 1년 이상 보유한 뒤</strong> 신규주택을 취득해야 해요.
            종전주택 취득일부터 신규주택 취득일까지의 기간이 1년 미만이면 특례 자체가 적용되지 않아요.
          </>
        ),
        badges: ['보유기간 미충족', '1년 이상 필요'],
        links: [
          { icon: '🏠', title: '일시적 2주택 처분 조건 확인', desc: '5가지 요건 체크리스트 전체 보기', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
          { icon: '📊', title: '다주택자 절세 전략', desc: '비과세 외 절세 방법 확인', href: '/w/다주택양도세-중과유예-세율-절세-전략' },
        ],
      }
    }

    if (!residencyOk) {
      return {
        pass: false,
        headline: '보유·거주 요건 미충족 — 비과세 불가',
        detail: (
          <>
            조정대상지역 주택은 <strong>2년 보유 + 2년 거주</strong>가 모두 필요해요.
            거주 요건을 채우지 못하면 일시적 2주택 특례를 받을 수 없어요.
            비조정지역은 2년 보유만으로 충분해요.
          </>
        ),
        badges: ['거주요건 미충족', '2년 거주 필요'],
        links: [
          { icon: '📍', title: '조정대상지역 목록 확인', desc: '현재 조정대상지역 서울·경기 현황', href: '/w/조정대상지역-목록-서울-경기' },
          { icon: '🏠', title: '일시적 2주택 요건 전체 확인', desc: '5가지 비과세 요건 체크', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
        ],
      }
    }

    /* 처분 기한 초과 */
    return {
      pass: false,
      headline: '3년 처분 기한 초과 — 일반 양도세 과세',
      detail: (
        <>
          신규주택 취득일부터 <strong>3년 이내</strong>에 잔금을 받아야 비과세 적용이 돼요.
          기한을 넘기면 기본세율(6~45%)이 적용돼요. 단, 장기보유특별공제로 세금을 줄일 수 있어요.
        </>
      ),
      badges: ['처분기한 초과', '일반세율 적용', '장특공제 활용 가능'],
      links: [
        { icon: '🧮', title: '장기보유특별공제 계산', desc: '보유기간별 공제율 확인', href: '/w/장특공-뜻-일반공제-1주택-차이' },
        { icon: '📊', title: '다주택 매도 순서 전략', desc: '절세를 위한 매도 순서', href: '/w/다주택-매도-순서-전략-절세' },
      ],
    }
  },
}

export default function 일시적2주택Checker() {
  return <GenericChecker config={config} />
}
