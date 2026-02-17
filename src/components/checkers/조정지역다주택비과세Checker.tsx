'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '조정대상지역 1주택 비과세 요건 확인',
  subtitle: '조건 3가지를 선택하면 비과세 가능 여부를 알려드려요',
  intro: (
    <p>
      <a href="/w/조정대상지역-목록-서울-경기" className="text-[#4A7AB5] underline">조정대상지역</a> 주택은 비과세를 받으려면 2년 보유뿐 아니라 2년 실거주까지 필요해요.
      <a href="/w/다주택양도세-중과유예-세율-절세-전략" className="text-[#4A7AB5] underline">다주택자 절세 전략</a>과 함께 내 주택이 요건을 충족하는지 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'ownership',
      label: '현재 보유 주택 수',
      options: [
        { value: 'one', text: '1주택 (세대 전체 기준)' },
        { value: 'temp2', text: '일시적 2주택 (신규 취득 후 3년 이내)' },
        { value: 'multi', text: '2주택 이상 (일시적 2주택 아님)' },
      ],
    },
    {
      key: 'holding',
      label: '해당 주택 보유기간',
      options: [
        { value: 'over2', text: '2년 이상 보유' },
        { value: 'under2', text: '2년 미만 보유' },
      ],
    },
    {
      key: 'residence',
      label: '해당 주택 실거주기간',
      options: [
        { value: 'over2', text: '2년 이상 실거주 (전입신고 기준)' },
        { value: 'under2', text: '2년 미만 실거주' },
        { value: 'none', text: '거주 없음 (임대 또는 공실)' },
      ],
    },
    {
      key: 'price',
      label: '양도 예상 금액',
      options: [
        { value: 'under12', text: '12억원 이하' },
        { value: 'over12', text: '12억원 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const isOneHouse = sel.ownership === 'one'
    const isTemp2 = sel.ownership === 'temp2'
    const isMulti = sel.ownership === 'multi'
    const holdingOk = sel.holding === 'over2'
    const residenceOk = sel.residence === 'over2'
    const priceOk = sel.price === 'under12'

    // 다주택자 — 비과세 불가
    if (isMulti) {
      return {
        pass: false,
        headline: '2주택 이상이라 비과세를 받기 어려워요',
        detail: (
          <>
            조정대상지역에서 2주택 이상을 보유한 상태로 양도하면 비과세가 아니라
            <strong> 중과세율(기본세율 +20~30%p)</strong>이 적용될 수 있어요.
            다만 현재 <strong>2026년 5월 9일까지 중과가 유예</strong>되어 기본세율(6~45%)이 적용돼요.
            비과세를 받으려면 먼저 다른 주택을 처분해 1주택 상태로 만들어야 해요.
          </>
        ),
        badges: ['비과세 불가', '중과 유예 중', '1주택 전환 필요'],
        links: [
          { icon: '📋', title: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 절세가 되는지', href: '/w/다주택-매도-순서-전략-절세' },
          { icon: '📊', title: '중과 유예 종료일 확인', desc: '2026년 5월 9일 이후 세율 변화', href: '/w/중과-유예-연혁-종료일-확정' },
        ],
      }
    }

    // 일시적 2주택 — 추가 조건 확인
    if (isTemp2) {
      if (holdingOk && residenceOk) {
        return {
          pass: true,
          headline: '일시적 2주택 비과세 요건을 충족할 수 있어요',
          detail: (
            <>
              종전주택에 <strong>2년 보유 + 2년 거주</strong> 요건을 충족했다면,
              신규주택 취득 후 <strong>3년 이내</strong>에 종전주택을 양도하면 비과세를 받을 수 있어요.
              12억원 초과분은 과세되니 양도가액도 확인하세요.
            </>
          ),
          badges: ['일시적 2주택 특례', '3년 내 처분 필수'],
          links: [
            { icon: '📋', title: '일시적 2주택 비과세 기간', desc: '3년 처분 기한과 요건 상세', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
          ],
        }
      } else {
        return {
          pass: false,
          headline: '일시적 2주택 비과세 요건이 부족해요',
          detail: (
            <>
              일시적 2주택 특례를 받으려면 종전주택에서 <strong>2년 보유 + 2년 거주</strong>가 모두 필요해요.
              조정대상지역은 거주 요건을 반드시 충족해야 해요.
            </>
          ),
          badges: ['요건 미충족', '거주기간 확인 필요'],
          links: [
            { icon: '📋', title: '일시적 2주택 비과세 조건', desc: '요건 상세 확인', href: '/w/일시적-2주택-양도세-비과세-기간-처분' },
          ],
        }
      }
    }

    // 1주택
    if (!holdingOk) {
      return {
        pass: false,
        headline: '보유기간 2년을 채우지 못했어요',
        detail: (
          <>
            1세대 1주택 비과세를 받으려면 최소 <strong>2년 이상 보유</strong>해야 해요.
            2년을 채운 후 양도를 검토하세요.
          </>
        ),
        badges: ['보유기간 미충족', '2년 후 재확인'],
        links: [],
      }
    }

    if (!residenceOk) {
      return {
        pass: false,
        headline: '조정대상지역이라 거주 2년도 필요해요',
        detail: (
          <>
            조정대상지역은 보유 2년만으로 부족하고 <strong>실거주 2년</strong>이 추가로 필요해요.
            거주 요건을 갖추지 못하면 비과세를 받을 수 없어요.
            비조정지역은 거주 요건이 없으니, 지역 재지정 여부도 확인하세요.
          </>
        ),
        badges: ['거주요건 미충족', '조정지역 2년 실거주 필요'],
        links: [
          { icon: '📋', title: '조정대상지역 서울 경기 목록', desc: '현재 조정지역 확인', href: '/w/조정대상지역-목록-서울-경기' },
        ],
      }
    }

    // 보유 + 거주 모두 충족
    if (!priceOk) {
      return {
        pass: true,
        headline: '비과세 요건 충족 — 12억 초과분은 과세돼요',
        detail: (
          <>
            1주택 비과세 요건(2년 보유 + 2년 거주)을 충족했지만,
            양도가액이 <strong>12억원을 초과</strong>하면 초과분에 대해서는 양도세가 부과돼요.
            12억원 이하 부분은 비과세예요.
          </>
        ),
        badges: ['부분 비과세', '12억 초과분 과세', '장기보유특별공제 활용 가능'],
        links: [
          { icon: '📊', title: '고가주택 12억 초과 장특공 계산', desc: '초과분 세금 줄이는 방법', href: '/w/고가주택-12억-초과-장특공-계산' },
        ],
      }
    }

    return {
      pass: true,
      headline: '1주택 비과세 요건을 모두 충족해요',
      detail: (
        <>
          <strong>2년 보유 + 2년 거주 + 12억 이하</strong> 요건을 모두 충족했어요.
          양도세 비과세를 받을 수 있어요.
          양도일 기준으로 1세대 1주택인지 최종 확인 후 신고하세요.
        </>
      ),
      badges: ['비과세 가능', '1세대 1주택', '2년 보유·거주 충족'],
      links: [
        { icon: '📋', title: '다주택자 장기보유특별공제 조건', desc: '비과세 외 절세 방법', href: '/w/다주택자-장기보유특별공제-적용-조건-공제율-계산' },
      ],
    }
  },
}

export default function 조정지역다주택비과세Checker() {
  return <GenericChecker config={config} />
}
