'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 가구규모별 생계지원 금액 (2026) ── */
const AMOUNT: Record<number, number> = {
  1: 713102,
  2: 1178435,
  3: 1508690,
  4: 1833572,
  5: 2142635,
  6: 2437878,
}

/* ── 소득기준: 중위소득 75% (2026) ── */
const INCOME_75: Record<number, number> = {
  1: 1538234,
  2: 2538679,
  3: 3243337,
  4: 3933748,
  5: 4581225,
  6: 5190690,
}

const config: CheckerConfig = {
  title: '긴급복지 생계지원 자격 간편 체크',
  subtitle: '4가지만 선택하면 지원 가능성을 바로 확인할 수 있어요',
  intro: (
    <p>
      긴급복지 생계지원은 <strong>위기사유</strong>, <strong>소득</strong>,
      <strong>재산</strong> 기준을 함께 봐요.
      다만 긴급한 상황이면 <strong>선지원 후심사</strong>로 먼저 지급돼요.
    </p>
  ),
  groups: [
    {
      key: 'crisis',
      label: '위기사유',
      options: [
        { value: 'death', text: '주소득자 사망·가출·행방불명' },
        { value: 'illness', text: '주소득자 중한 질병·부상' },
        { value: 'violence', text: '가정폭력·성폭력' },
        { value: 'disaster', text: '화재·자연재해' },
        { value: 'jobless', text: '실직·사업 실패' },
        { value: 'none', text: '해당 없음' },
      ],
    },
    {
      key: 'size',
      label: '가구원 수 (본인 포함)',
      options: [
        { value: '1', text: '1인' },
        { value: '2', text: '2인' },
        { value: '3', text: '3인' },
        { value: '4', text: '4인' },
        { value: '5', text: '5인' },
        { value: '6', text: '6인 이상' },
      ],
    },
    {
      key: 'income',
      label: '월 소득 (가구 합산, 세전)',
      options: [
        { value: 'low', text: '100만원 이하' },
        { value: 'mid', text: '100~200만원' },
        { value: 'high', text: '200~300만원' },
        { value: 'over', text: '300만원 초과' },
      ],
    },
    {
      key: 'asset',
      label: '재산 (부동산+자동차+예금)',
      options: [
        { value: 'low', text: '1억 이하' },
        { value: 'mid', text: '1~2억' },
        { value: 'high', text: '2억 초과' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const sz = Math.min(parseInt(sel.size), 6)
    const amount = AMOUNT[sz]
    const incomeLimit = INCOME_75[sz]
    const fmt = new Intl.NumberFormat('ko-KR').format(amount)

    /* 위기사유 판정 */
    const crisisOk = sel.crisis !== 'none'

    /* 소득 판정 (대략적 추정) */
    const incomeEst: Record<string, number> = {
      low: 800000, mid: 1500000, high: 2500000, over: 3500000,
    }
    const myIncome = incomeEst[sel.income] || 3500000
    const incomeOk = myIncome <= incomeLimit

    /* 재산 판정 (대도시 기준 2억4,100만원) */
    const assetOk = sel.asset !== 'high'

    const pass = crisisOk && (incomeOk || assetOk)

    if (!crisisOk) {
      return {
        pass: false,
        headline: '위기사유에 해당하지 않아요',
        detail: (
          <>긴급복지지원은 갑작스러운 위기 상황이 전제조건이에요.
          만성적인 저소득이라면 <strong>기초생활보장</strong>이나 <strong>차상위계층</strong> 지원이 맞아요.</>
        ),
        badges: [],
        links: [
          { icon: '🛡️', title: '기초생활수급자 조건 확인', desc: '소득인정액 기준 4가지 급여', href: '/w/기초생활수급자-조건-총정리' },
          { icon: '📋', title: '차상위계층 혜택', desc: '중위소득 50% 이하 지원', href: '/w/차상위계층-혜택-리스트-및-증명서-발급-방법' },
        ],
      }
    }

    if (pass) {
      return {
        pass: true,
        headline: '긴급복지 생계지원 가능성이 높아요',
        detail: (
          <>위기사유가 인정되고 소득·재산 기준을 충족해요.
          선지원 후심사 원칙에 따라 129에 전화하면 48시간 내 현장 확인 후 바로 지급돼요.</>
        ),
        amount: {
          value: `월 ${fmt}원`,
          unit: `${sz}인가구 생계지원금`,
          formula: `기초생활보장 생계급여 기준 연동`,
        },
        badges: ['생계지원', '선지원 후심사', `${sz}인가구`],
        links: [
          { icon: '📞', title: '129 전화 신청', desc: '24시간 접수, 서류 불필요', href: 'tel:129' },
          { icon: '🏠', title: '주거지원도 함께 신청', desc: '대도시 월 66만원까지 별도 지원', href: '/w/주거급여-신청' },
        ],
      }
    }

    return {
      pass: false,
      headline: '소득·재산 기준 초과 가능성이 있어요',
      detail: (
        <>다만 긴급한 상황이면 선지원 후심사로 먼저 지급될 수 있어요.
        일단 129에 전화해서 상담받아 보세요. 정확한 판정은 현장 확인 후 결정돼요.</>
      ),
      badges: ['상담 권장'],
      links: [
        { icon: '📞', title: '129 전화 상담', desc: '24시간 무료 상담', href: 'tel:129' },
        { icon: '🛡️', title: '기초생활수급자 조건 확인', desc: '소득인정액 기준 4가지 급여', href: '/w/기초생활수급자-조건-총정리' },
      ],
    }
  },
}

export default function 긴급복지Checker() {
  return <GenericChecker config={config} />
}
