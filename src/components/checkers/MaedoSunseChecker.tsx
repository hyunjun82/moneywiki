'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 기본세율 누진세 구간 (2026년, 소득세법 제104조) ── */
const BRACKETS = [
  { limit: 1400, rate: 6, cum: 0 },
  { limit: 5000, rate: 15, cum: 126 },
  { limit: 8800, rate: 24, cum: 576 },
  { limit: 15000, rate: 35, cum: 1544 },
  { limit: 30000, rate: 38, cum: 1994 },
  { limit: 50000, rate: 40, cum: 2594 },
  { limit: 100000, rate: 42, cum: 3594 },
  { limit: Infinity, rate: 45, cum: 6594 },
]

/* 기본 산출세액 계산 (만원 단위) */
function calcBasicTax(taxableWon: number): number {
  const bracket = BRACKETS.find(b => taxableWon <= b.limit) || BRACKETS[BRACKETS.length - 1]
  const idx = BRACKETS.indexOf(bracket)
  const prevLimit = idx > 0 ? BRACKETS[idx - 1].limit : 0
  return bracket.cum + Math.round((taxableWon - prevLimit) * bracket.rate / 100)
}

const config: CheckerConfig = {
  title: '매도 순서별 절세 효과 직접 비교해 보기',
  subtitle: '주택 2채의 양도차익을 선택하면 매도 순서에 따른 세금 차이를 계산해 드려요',
  intro: (
    <p>
      다주택자는 <strong>양도차익이 큰 주택을 먼저</strong> 파는 게 절세의 핵심이에요.
      <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">중과세율</a>과
      <a href="/w/다주택-양도세-중과-전후-세액-비교" className="text-[#4A7AB5] underline">세액 차이</a>를
      확인한 뒤, 양도차익 규모를 선택하면 순서별 세금 차이를 바로 확인할 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'gain1',
      label: 'A주택 양도차익 (큰 쪽)',
      options: [
        { value: '3', text: '3억원' },
        { value: '5', text: '5억원' },
        { value: '7', text: '7억원' },
        { value: '10', text: '10억원' },
      ],
    },
    {
      key: 'gain2',
      label: 'B주택 양도차익 (작은 쪽)',
      options: [
        { value: '1', text: '1억원' },
        { value: '2', text: '2억원' },
        { value: '3', text: '3억원' },
        { value: '5', text: '5억원' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const g1 = parseInt(sel.gain1) * 10000 // 만원 단위
    const g2 = parseInt(sel.gain2) * 10000
    const fmt = new Intl.NumberFormat('ko-KR')

    /* 유예 기간 내 매도: 기본세율 + 장특공제 20%(10년 보유 가정) */
    const yuyeTax = (gain: number) => {
      const deduct = Math.round(gain * 20 / 100)
      const taxable = Math.max(gain - deduct - 250, 0)
      return Math.round(calcBasicTax(taxable) * 1.1)
    }

    /* 중과 매도: 기본세율 +20%p, 장특공제 배제 (2주택 기준) */
    const jungkwaTax = (gain: number) => {
      const taxable = Math.max(gain - 250, 0)
      const basic = calcBasicTax(taxable)
      const add = Math.round(taxable * 20 / 100)
      return Math.round((basic + add) * 1.1)
    }

    /* 순서A: A(큰 것) 유예 내 매도 + B(작은 것) 중과 */
    const orderA = yuyeTax(g1) + jungkwaTax(g2)
    /* 순서B: B(작은 것) 유예 내 매도 + A(큰 것) 중과 */
    const orderB = yuyeTax(g2) + jungkwaTax(g1)
    const diff = orderB - orderA

    return {
      pass: true,
      headline: `양도차익 ${g1 / 10000}억 주택을 먼저 팔면 약 ${fmt.format(diff)}만원 절세돼요`,
      detail: (
        <>
          양도차익이 큰 A주택({g1 / 10000}억)을 유예 기간에 먼저 팔면 총 세금 약 {fmt.format(orderA)}만원이에요.
          반대로 B주택({g2 / 10000}억)을 먼저 팔면 총 세금 약 {fmt.format(orderB)}만원이에요.
          순서 하나로 <strong>약 {fmt.format(diff)}만원</strong> 차이가 나요.
          10년 보유, 장기보유특별공제 20% 가정이고 지방소득세 10%를 포함한 금액이에요.
        </>
      ),
      amount: {
        value: `약 ${fmt.format(diff)}만원 절세`,
        unit: '매도 순서 차이로 생기는 세금 차이',
        formula: `A먼저 ${fmt.format(orderA)}만 vs B먼저 ${fmt.format(orderB)}만`,
      },
      badges: [
        `큰 차익 먼저: ${fmt.format(orderA)}만`,
        `작은 차익 먼저: ${fmt.format(orderB)}만`,
        `차이: ${fmt.format(diff)}만원`,
      ],
      links: [
        { icon: '📋', title: '양도세 잔금일 기준 판단', desc: '잔금일 하루 차이로 세금이 달라지는 이유', href: '/w/양도세-잔금일-기준-계약일-판단' },
        { icon: '🏠', title: '중과 전후 세액 비교', desc: '유예 vs 중과 실제 세금 차이 확인', href: '/w/다주택-양도세-중과-전후-세액-비교' },
      ],
    }
  },
}

export default function MaedoSunseChecker() {
  return <GenericChecker config={config} />
}
