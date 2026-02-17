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

/* 적용 기본세율 구간 반환 */
function getRate(taxableWon: number): number {
  const bracket = BRACKETS.find(b => taxableWon <= b.limit) || BRACKETS[BRACKETS.length - 1]
  return bracket.rate
}

/* 장기보유특별공제율 (보유기간별) */
function getHoldDeductRate(years: number): number {
  if (years >= 15) return 30
  if (years >= 14) return 28
  if (years >= 13) return 26
  if (years >= 12) return 24
  if (years >= 11) return 22
  if (years >= 10) return 20
  if (years >= 9) return 18
  if (years >= 8) return 16
  if (years >= 7) return 14
  if (years >= 6) return 12
  if (years >= 5) return 10
  if (years >= 4) return 8
  if (years >= 3) return 6
  return 0
}

const config: CheckerConfig = {
  title: '내 양도세 중과 전후 세액 비교',
  subtitle: '양도차익과 보유 조건을 선택하면 유예 vs 중과 세금을 바로 비교해요',
  intro: (
    <p>
      중과 유예 기간에 팔면 세금이 얼마이고, 유예 종료 후에는 얼마가 되는지
      <strong> 실제 세액 차이</strong>를 한눈에 비교해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'houses',
      label: '보유 주택 수',
      options: [
        { value: '2', text: '2주택' },
        { value: '3', text: '3주택 이상' },
      ],
    },
    {
      key: 'gain',
      label: '양도차익 (매도가 - 취득가 - 필요경비)',
      options: [
        { value: '2', text: '2억원' },
        { value: '3', text: '3억원' },
        { value: '5', text: '5억원' },
        { value: '7', text: '7억원' },
        { value: '10', text: '10억원' },
      ],
    },
    {
      key: 'hold',
      label: '보유기간',
      options: [
        { value: '2', text: '3년 미만' },
        { value: '5', text: '3~5년' },
        { value: '10', text: '5~10년' },
        { value: '15', text: '10~15년' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const houses = parseInt(sel.houses)
    const gainBil = parseInt(sel.gain)
    const gain = gainBil * 10000 // 만원 단위
    const holdYears = parseInt(sel.hold)
    const addRate = houses >= 3 ? 30 : 20

    /* 유예 시 (기본세율 + 장특공제 적용) */
    const holdDeductRate = getHoldDeductRate(holdYears)
    const deductAmount = Math.round(gain * holdDeductRate / 100)
    const taxableBasic = Math.max(gain - deductAmount - 250, 0)
    const basicTax = calcBasicTax(taxableBasic)
    const basicRate = getRate(taxableBasic)

    /* 중과 시 (기본세율 + 추가세율, 장특공제 배제) */
    const taxableJungkwa = Math.max(gain - 250, 0)
    const jungkwaBasicTax = calcBasicTax(taxableJungkwa)
    const jungkwaRate = getRate(taxableJungkwa)
    const jungkwaAddTax = Math.round(taxableJungkwa * addRate / 100)
    const jungkwaTotalTax = jungkwaBasicTax + jungkwaAddTax
    const totalJungkwaRate = jungkwaRate + addRate

    const diff = jungkwaTotalTax - basicTax
    const fmt = new Intl.NumberFormat('ko-KR')

    /* 지방소득세 포함 */
    const basicWithLocal = Math.round(basicTax * 1.1)
    const jungkwaWithLocal = Math.round(jungkwaTotalTax * 1.1)
    const diffWithLocal = jungkwaWithLocal - basicWithLocal

    const savingRate = Math.round(diff / jungkwaTotalTax * 100)

    return {
      pass: true,
      headline: `유예 기간에 팔면 약 ${fmt.format(diff)}만원 절세돼요`,
      detail: (
        <>
          유예 중(기본세율 {basicRate}%)이면 산출세액 약 {fmt.format(basicTax)}만원,
          중과 적용({totalJungkwaRate}%)이면 약 {fmt.format(jungkwaTotalTax)}만원이에요.
          지방소득세(10%) 포함 시 유예 약 {fmt.format(basicWithLocal)}만원 vs 중과 약 {fmt.format(jungkwaWithLocal)}만원으로,
          실납부 차이는 <strong>약 {fmt.format(diffWithLocal)}만원</strong>이에요.
        </>
      ),
      amount: {
        value: `약 ${fmt.format(diffWithLocal)}만원`,
        unit: '지방소득세 포함 절세액',
        formula: `유예 ${fmt.format(basicWithLocal)}만원 vs 중과 ${fmt.format(jungkwaWithLocal)}만원`,
      },
      badges: [
        `${houses}주택 +${addRate}%p`,
        `장특공제 ${holdDeductRate}% → 0%`,
        `절세율 약 ${savingRate}%`,
      ],
      links: [
        { icon: '📋', title: '다주택 매도 순서 전략', desc: '어떤 집부터 팔면 세금을 아낄 수 있는지', href: '/w/다주택-매도-순서-전략-절세' },
        { icon: '🏠', title: '조정대상지역 목록 확인', desc: '내 주택이 조정대상지역인지 체크', href: '/w/조정대상지역-목록-서울-경기' },
      ],
    }
  },
}

export default function SeaekBigyoChecker() {
  return <GenericChecker config={config} />
}
