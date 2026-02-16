'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '양도세 중과 적용 여부 판정',
  subtitle: '잔금일과 지역 조건을 선택하면 중과 적용 여부를 확인할 수 있어요',
  intro: (
    <p>
      양도세 중과는 <strong>잔금일</strong>과 <strong>조정대상지역 여부</strong>,
      <strong>주택 수</strong>에 따라 달라져요. 2026년 5월 9일 중과유예 종료를 앞두고
      내 경우에 중과가 적용되는지 간편하게 확인해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'contractDate',
      label: '계약 체결 시점',
      options: [
        { value: 'before0509', text: '2026년 5월 9일 이전 계약' },
        { value: 'after0509', text: '2026년 5월 9일 이후 계약' },
      ],
    },
    {
      key: 'balanceDate',
      label: '잔금일(양도일) 시점',
      options: [
        { value: 'before0509', text: '2026년 5월 9일 이전' },
        { value: 'within4m', text: '5월 9일 이후 ~ 4개월 이내 (기존 조정지역)' },
        { value: 'within6m', text: '5월 9일 이후 ~ 6개월 이내 (신규 조정지역)' },
        { value: 'after', text: '유예 경과기간 이후' },
      ],
    },
    {
      key: 'area',
      label: '주택 소재 지역',
      options: [
        { value: 'existing', text: '기존 조정대상지역 (강남·서초·송파·용산)' },
        { value: 'new', text: '신규 조정대상지역 (서울 나머지·과천·성남·하남 등)' },
        { value: 'non', text: '비조정대상지역' },
      ],
    },
    {
      key: 'houseCount',
      label: '보유 주택 수',
      options: [
        { value: '1', text: '1주택' },
        { value: '2', text: '2주택' },
        { value: '3', text: '3주택 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const is1House = sel.houseCount === '1'
    const isNonArea = sel.area === 'non'

    /* 1주택자는 중과 대상 아님 */
    if (is1House) {
      return {
        pass: true,
        headline: '1주택자는 중과 대상이 아니에요',
        detail: (
          <>1세대 1주택자는 조정대상지역이라도 양도세 중과가 적용되지 않아요.
          2년 이상 보유(조정지역은 거주 포함)하면 <strong>비과세</strong>도 가능해요.</>
        ),
        badges: ['1주택', '중과 비적용'],
        links: [
          { icon: '🏠', title: '2주택자 양도세 비과세 조건', desc: '일시적 2주택 비과세 요건 확인', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
          { icon: '📋', title: '조정대상지역 목록', desc: '서울·경기 조정대상지역 현황', href: '/w/조정대상지역-목록-서울-경기' },
        ],
      }
    }

    /* 비조정대상지역은 중과 비적용 */
    if (isNonArea) {
      return {
        pass: true,
        headline: '비조정대상지역은 중과가 적용되지 않아요',
        detail: (
          <>비조정대상지역 주택은 다주택자라도 <strong>기본세율(6~45%)</strong>이 적용돼요.
          다만 장기보유특별공제 적용 여부는 보유·거주 기간을 별도로 확인해야 해요.</>
        ),
        badges: ['비조정지역', '기본세율'],
        links: [
          { icon: '📍', title: '조정대상지역 목록 확인', desc: '현재 지정된 조정대상지역 전체 목록', href: '/w/조정대상지역-목록-서울-경기' },
          { icon: '🧮', title: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 절세되는지', href: '/w/다주택-매도-순서-전략-절세' },
        ],
      }
    }

    /* 잔금일이 5월 9일 이전이면 유예 적용 */
    if (sel.balanceDate === 'before0509') {
      return {
        pass: true,
        headline: '중과유예 기간 내 양도 — 기본세율 적용',
        detail: (
          <>잔금일이 <strong>2026년 5월 9일 이전</strong>이면 중과유예가 적용돼서
          다주택자라도 기본세율(6~45%)로 신고할 수 있어요. 장기보유특별공제도 받을 수 있어요.</>
        ),
        amount: { value: '6~45%', unit: '기본세율 적용' },
        badges: ['중과유예 적용', '기본세율', '장특공제 가능'],
        links: [
          { icon: '📅', title: '중과 유예 연혁과 종료일', desc: '2022년부터 이어진 유예 제도 전체 흐름', href: '/w/중과-유예-연혁-종료일-확정' },
          { icon: '💡', title: '다주택 매도 순서 전략', desc: '유예 기간 내 최적 매도 순서', href: '/w/다주택-매도-순서-전략-절세' },
        ],
      }
    }

    /* 5월 9일 이전 계약 + 경과기간 내 잔금 → 중과 비적용 */
    if (sel.contractDate === 'before0509') {
      const isExisting = sel.area === 'existing'
      const graceOk = isExisting
        ? sel.balanceDate === 'within4m'
        : sel.balanceDate === 'within6m'

      if (graceOk) {
        const gracePeriod = isExisting ? '4개월' : '6개월'
        return {
          pass: true,
          headline: `유예 종료 전 계약 + ${gracePeriod} 내 잔금 — 중과 비적용`,
          detail: (
            <>2026년 5월 9일 이전에 계약하고, {isExisting ? '기존 조정대상지역(강남·서초·송파·용산)은 4개월' : '신규 조정대상지역은 6개월'} 이내에
            잔금을 치르면 <strong>중과가 적용되지 않아요</strong>. 계약서에 명시된 잔금일이 기준이에요.</>
          ),
          amount: { value: '6~45%', unit: '기본세율 적용' },
          badges: ['경과규정 적용', `${gracePeriod} 내 잔금`],
          links: [
            { icon: '📋', title: '중과 유예 종료 후 시장 전망', desc: '5월 9일 이후 부동산 시장 변화 전망', href: '/w/중과-유예-종료-부동산-시장-전망' },
            { icon: '🏠', title: '다주택 양도세 중과 전후 세액 비교', desc: '중과 전후 실제 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
          ],
        }
      }
    }

    /* 중과 적용 */
    const surcharge = sel.houseCount === '2' ? 20 : 30
    const rateRange = sel.houseCount === '2' ? '26~65%' : '36~75%'

    return {
      pass: false,
      headline: `중과세율 적용 가능성이 높아요 (기본세율 +${surcharge}%p)`,
      detail: (
        <>잔금일이 유예 종료 후이고, 경과규정 기간도 지났기 때문에 <strong>{sel.houseCount}주택 중과세율({rateRange})</strong>이
        적용될 가능성이 높아요. 장기보유특별공제도 배제돼요. 정확한 판단은 세무사 상담을 권해요.</>
      ),
      amount: { value: rateRange, unit: '중과세율 적용' },
      badges: [`${sel.houseCount}주택 중과`, `+${surcharge}%p`, '장특공제 배제'],
      links: [
        { icon: '🧮', title: '다주택 양도세 중과 전후 세액 비교', desc: '실제 사례로 보는 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
        { icon: '📋', title: '중과 배제 대상 주택 확인', desc: '수도권 밖 3억 이하 등 배제 대상', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
      ],
    }
  },
}

export default function YangdoseJangeumilChecker() {
  return <GenericChecker config={config} />
}
