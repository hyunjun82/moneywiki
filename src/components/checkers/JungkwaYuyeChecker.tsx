'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 중과 유예 종료 판정 기준 (2026.02.12 정부 발표) ── */
const DEADLINE = '2026.5.9'

const config: CheckerConfig = {
  title: '중과 유예 적용 여부 간편 체크',
  subtitle: '잔금일, 주택 수, 조정대상지역 여부로 확인해 보세요',
  intro: (
    <p>
      2026년 5월 9일 중과 유예 종료가 확정됐어요.
      <strong>잔금일</strong>과 <strong>조정대상지역 유형</strong>에 따라 중과 적용 여부가 달라져요.
    </p>
  ),
  groups: [
    {
      key: 'contract',
      label: '매매계약 체결 시기',
      options: [
        { value: 'before', text: '2026년 5월 9일 이전 계약' },
        { value: 'after', text: '2026년 5월 10일 이후 계약' },
        { value: 'none', text: '아직 계약 전' },
      ],
    },
    {
      key: 'balance',
      label: '잔금일(양도일) 예상 시기',
      options: [
        { value: 'before509', text: '2026년 5월 9일 이전' },
        { value: 'within4m', text: '5월 10일~9월 8일 (계약 후 4개월 내)' },
        { value: 'within6m', text: '5월 10일~11월 8일 (계약 후 6개월 내)' },
        { value: 'after6m', text: '2026년 11월 이후' },
      ],
    },
    {
      key: 'area',
      label: '주택 소재지 조정대상지역 유형',
      options: [
        { value: 'old4', text: '기존 4구 (강남/서초/송파/용산)' },
        { value: 'new', text: '신규 조정대상지역 (2025.10.16 이후 지정)' },
        { value: 'none', text: '조정대상지역 아님 (비규제)' },
      ],
    },
    {
      key: 'houses',
      label: '보유 주택 수',
      options: [
        { value: '1', text: '1주택' },
        { value: '2', text: '2주택' },
        { value: '3plus', text: '3주택 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const { contract, balance, area, houses } = sel

    /* 1주택자는 중과 대상 아님 */
    if (houses === '1') {
      return {
        pass: true,
        headline: '1주택자는 중과 대상이 아니에요',
        detail: (
          <>1세대 1주택자는 양도세 중과 대상에 해당하지 않아요.
          2년 이상 보유(조정대상지역은 2년 거주 포함) 시 비과세도 가능해요.</>
        ),
        badges: ['1주택', '중과 비대상'],
        links: [
          { icon: '🏠', title: '1주택 양도세 비과세 조건', desc: '보유·거주 요건 확인', href: '/w/2주택자-양도세-비과세-조건-세율-계산' },
          { icon: '📋', title: '조정대상지역 목록', desc: '서울·경기 지정 현황', href: '/w/조정대상지역-목록-서울-경기' },
        ],
      }
    }

    /* 조정대상지역 아닌 경우 */
    if (area === 'none') {
      return {
        pass: true,
        headline: '비규제지역은 중과 대상이 아니에요',
        detail: (
          <>조정대상지역이 아닌 주택은 다주택이라도 중과가 적용되지 않아요.
          기본세율(6~45%)로 양도세를 내면 돼요.</>
        ),
        badges: ['비규제지역', '기본세율'],
        links: [
          { icon: '📍', title: '조정대상지역 목록 확인', desc: '2026년 지정 현황', href: '/w/조정대상지역-목록-서울-경기' },
          { icon: '🧮', title: '양도세 중과 전후 세액 비교', desc: '기본세율 vs 중과세율 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
        ],
      }
    }

    /* 5월 9일 이전 잔금 → 무조건 유예 적용 */
    if (balance === 'before509') {
      const surcharge = houses === '3plus' ? '30%p' : '20%p'
      return {
        pass: true,
        headline: '유예 기간 내 양도, 기본세율 적용돼요',
        detail: (
          <>{DEADLINE}까지 잔금을 받으면 중과세율(+{surcharge}) 대신
          기본세율(6~45%)이 적용돼요. 장기보유특별공제도 받을 수 있어요.</>
        ),
        amount: { value: '기본세율 6~45%', unit: '적용 세율' },
        badges: ['유예 적용', '기본세율', '장특공제 가능'],
        links: [
          { icon: '📊', title: '중과 전후 세액 비교', desc: '유예 중 vs 중과 재개 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
          { icon: '📋', title: '매도 순서 전략', desc: '어떤 집부터 팔아야 절세가 되는지', href: '/w/다주택-매도-순서-전략-절세' },
        ],
      }
    }

    /* 5월 10일 이후 잔금 + 계약 시기별 판정 */
    if (contract === 'after' || contract === 'none') {
      const surcharge = houses === '3plus' ? '30%p' : '20%p'
      return {
        pass: false,
        headline: '중과세율이 적용될 가능성이 높아요',
        detail: (
          <>5월 9일 이후 계약이거나 아직 계약 전이라면, 잔금일이 유예 기간을 넘길 경우
          기본세율 +{surcharge} 중과가 적용돼요. 장기보유특별공제도 배제돼요.</>
        ),
        amount: { value: `기본세율 +${surcharge}`, unit: '중과세율' },
        badges: ['중과 적용', surcharge + ' 추가', '장특공제 배제'],
        links: [
          { icon: '📊', title: '중과 전후 세액 비교', desc: '세금이 얼마나 늘어나는지 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
          { icon: '📋', title: '중과 배제 대상 주택', desc: '중과가 안 되는 주택 유형', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
        ],
      }
    }

    /* 5월 9일 이전 계약 + 5월 10일 이후 잔금 → 지역 유형별 판정 */
    if (area === 'old4') {
      /* 기존 4구: 계약일로부터 4개월 내 잔금 */
      if (balance === 'within4m') {
        return {
          pass: true,
          headline: '보완조치 적용, 기본세율 가능해요',
          detail: (
            <>기존 조정대상지역(강남/서초/송파/용산) 주택은
            5월 9일 전 계약 + 계약일로부터 <strong>4개월 내 잔금</strong>이면
            중과가 유예돼요. 장기보유특별공제도 적용받을 수 있어요.</>
          ),
          amount: { value: '기본세율 6~45%', unit: '보완조치 적용' },
          badges: ['기존 4구', '4개월 유예', '기본세율'],
          links: [
            { icon: '⏰', title: '잔금일 기준 양도 시기', desc: '잔금일 계산과 주의사항', href: '/w/양도세-잔금일-기준-계약일-판단' },
            { icon: '📋', title: '매도 순서 전략', desc: '유예 기간 내 절세 매도 순서', href: '/w/다주택-매도-순서-전략-절세' },
          ],
        }
      } else {
        const surcharge = houses === '3plus' ? '30%p' : '20%p'
        return {
          pass: false,
          headline: '4개월 초과, 중과세율 적용돼요',
          detail: (
            <>기존 조정대상지역(강남/서초/송파/용산)은 계약일로부터 4개월 내에 잔금을 받아야 해요.
            4개월을 넘기면 기본세율 +{surcharge} 중과가 적용돼요.</>
          ),
          amount: { value: `기본세율 +${surcharge}`, unit: '중과세율' },
          badges: ['4개월 초과', '중과 적용'],
          links: [
            { icon: '📊', title: '중과 전후 세액 비교', desc: '세금 차이 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
            { icon: '📋', title: '중과 배제 대상 주택', desc: '중과 안 되는 예외 확인', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
          ],
        }
      }
    }

    /* 신규 조정대상지역: 계약일로부터 6개월 내 잔금 */
    if (area === 'new') {
      if (balance === 'within4m' || balance === 'within6m') {
        return {
          pass: true,
          headline: '보완조치 적용, 기본세율 가능해요',
          detail: (
            <>신규 조정대상지역(2025.10.16 이후 지정) 주택은
            5월 9일 전 계약 + 계약일로부터 <strong>6개월 내 잔금</strong>이면
            중과가 유예돼요. 기존 4구보다 2개월 여유가 더 있어요.</>
          ),
          amount: { value: '기본세율 6~45%', unit: '보완조치 적용' },
          badges: ['신규 지역', '6개월 유예', '기본세율'],
          links: [
            { icon: '⏰', title: '잔금일 기준 양도 시기', desc: '잔금일 계산과 주의사항', href: '/w/양도세-잔금일-기준-계약일-판단' },
            { icon: '📍', title: '조정대상지역 목록', desc: '2026년 지정 현황 확인', href: '/w/조정대상지역-목록-서울-경기' },
          ],
        }
      } else {
        const surcharge = houses === '3plus' ? '30%p' : '20%p'
        return {
          pass: false,
          headline: '6개월 초과, 중과세율 적용돼요',
          detail: (
            <>신규 조정대상지역은 계약일로부터 6개월 내에 잔금을 받아야 해요.
            6개월을 넘기면 기본세율 +{surcharge} 중과가 적용돼요.</>
          ),
          amount: { value: `기본세율 +${surcharge}`, unit: '중과세율' },
          badges: ['6개월 초과', '중과 적용'],
          links: [
            { icon: '📊', title: '중과 전후 세액 비교', desc: '세금 차이 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
            { icon: '📋', title: '중과 배제 대상 주택', desc: '중과 안 되는 예외 확인', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
          ],
        }
      }
    }

    /* fallback */
    return {
      pass: false,
      headline: '입력 조건을 다시 확인해 주세요',
      detail: <>조건을 모두 선택하면 중과 적용 여부를 판정할 수 있어요.</>,
      badges: [],
      links: [],
    }
  },
}

export default function JungkwaYuyeChecker() {
  return <GenericChecker config={config} />
}
