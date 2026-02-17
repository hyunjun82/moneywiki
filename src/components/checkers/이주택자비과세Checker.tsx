'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '2주택자 양도세 비과세 가능 여부 체크',
  subtitle: '종전주택 보유·거주 요건과 처분 기한을 입력하면 비과세 여부를 바로 알려드려요',
  intro: (
    <p>
      2주택자도 <strong>일시적 2주택 특례</strong>를 충족하면 양도세 없이 종전주택을 팔 수 있어요.
      세 가지 요건을 모두 충족해야 비과세가 적용되니, 내 상황을 체크해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'holdBefore',
      label: '신규주택 취득 전 종전주택 보유기간',
      options: [
        { value: 'over1y', text: '종전주택을 1년 이상 보유한 뒤 신규주택 취득' },
        { value: 'under1y', text: '종전주택 취득 후 1년 미만에 신규주택 취득' },
      ],
    },
    {
      key: 'residency',
      label: '종전주택 보유·거주 요건',
      options: [
        { value: 'adj-both', text: '조정대상지역: 2년 보유 + 2년 거주 모두 충족' },
        { value: 'adj-no-live', text: '조정대상지역: 2년 보유했지만 거주 2년 미충족' },
        { value: 'non-adj-ok', text: '비조정대상지역: 2년 이상 보유 충족' },
        { value: 'non-adj-fail', text: '비조정대상지역: 2년 보유 미충족' },
      ],
    },
    {
      key: 'disposal',
      label: '신규주택 취득 후 종전주택 처분 계획',
      options: [
        { value: 'within3y', text: '신규주택 취득일부터 3년 이내 처분 가능' },
        { value: 'over3y', text: '3년 초과 예정 또는 처분 계획 없음' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const holdOk = sel.holdBefore === 'over1y'
    const residencyOk = sel.residency === 'adj-both' || sel.residency === 'non-adj-ok'
    const disposalOk = sel.disposal === 'within3y'

    const allPass = holdOk && residencyOk && disposalOk

    if (allPass) {
      return {
        pass: true,
        headline: '일시적 2주택 비과세 요건을 충족해요',
        detail: (
          <>
            세 가지 요건을 모두 충족했어요. 종전주택 양도 시 <strong>양도세 0원(12억원 이하)</strong>이 적용돼요.
            <a href="/w/일시적-2주택-양도세-비과세-기간-처분" className="text-[#4A7AB5] underline ml-1">처분 기한 요건</a>과
            <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline ml-1">조정대상지역 여부</a>를 꼭 확인하세요.
          </>
        ),
        amount: { value: '0원', unit: '양도세 (양도가액 12억원 이하)' },
        badges: ['비과세 대상', '3년 내 처분', '양도세 면제'],
        links: [
          { icon: '📋', title: '2주택자 세율 전체 확인', desc: '비과세 외 일반세율 구간 비교', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
          { icon: '📅', title: '일시적 2주택 처분 기한', desc: '3년 처분 기한 상세 조건 확인', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
        ],
      }
    }

    if (!holdOk) {
      return {
        pass: false,
        headline: '종전주택 1년 미만 보유 — 비과세 특례 불가',
        detail: (
          <>
            일시적 2주택 특례는 <strong>종전주택을 1년 이상 보유한 후</strong> 신규주택을 취득한 경우에만 적용돼요.
            보유기간이 1년 미만이면 특례 자체를 받을 수 없어요.
            이 경우 <a href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-[#4A7AB5] underline">중과 유예 기간</a> 내 매도로 기본세율을 적용받는 방법을 검토해 보세요.
          </>
        ),
        badges: ['보유기간 미충족', '1년 이상 필요', '특례 불가'],
        links: [
          { icon: '🏠', title: '비과세 요건 상세 확인', desc: '일시적 2주택 5가지 요건', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
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
            조정대상지역 종전주택은 <strong>2년 보유 + 2년 거주</strong>가 모두 필요해요.
            거주 요건을 채우지 못하면 비과세를 받을 수 없어요.
            <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역 목록</a>에서 해당 여부를 먼저 확인하세요.
          </>
        ),
        badges: ['거주요건 미충족', '2년 거주 필요', '비과세 불가'],
        links: [
          { icon: '📍', title: '조정대상지역 목록 확인', desc: '2026년 서울·경기 조정대상지역', href: '/w/조정대상지역-목록-서울-경기' },
          { icon: '📋', title: '2주택자 세율 확인', desc: '비과세 미충족 시 적용 세율', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
        ],
      }
    }

    return {
      pass: false,
      headline: '3년 처분 기한 초과 — 일반세율 과세',
      detail: (
        <>
          신규주택 취득일부터 <strong>3년 이내</strong>에 잔금을 수령해야 비과세가 적용돼요.
          기한을 넘기면 기본세율(6~45%)로 과세돼요.
          <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서 전략</a>을 참고해서 유예 기간 안에 처분을 검토해 보세요.
        </>
      ),
      badges: ['처분기한 초과', '기본세율 과세', '장특공제 활용 가능'],
      links: [
        { icon: '📊', title: '중과 유예 세율 비교', desc: '유예 기간 중 기본세율 확인', href: '/w/다주택양도세-중과유예-세율-절세-전략' },
        { icon: '🧮', title: '장특공제 절세 계산', desc: '보유기간별 공제율 확인', href: '/w/장특공-뜻-일반공제-1주택-차이' },
      ],
    }
  },
}

export default function 이주택자비과세Checker() {
  return <GenericChecker config={config} />
}
