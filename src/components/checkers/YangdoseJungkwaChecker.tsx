'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 기본세율 구간 (2026년, 소득세법 제104조) ── */
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

const config: CheckerConfig = {
  title: '양도세 기본세율 vs 중과세율 비교',
  subtitle: '주택 수와 양도차익을 선택하면 세금 차이를 바로 확인할 수 있어요',
  intro: (
    <p>
      <strong>기본세율</strong>과 <strong>중과세율</strong>이 적용될 때 세금이 얼마나 차이 나는지
      비교해 보세요. 장기보유특별공제 배제 효과까지 반영돼요.
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
        { value: '1', text: '1억원' },
        { value: '3', text: '3억원' },
        { value: '5', text: '5억원' },
        { value: '10', text: '10억원' },
      ],
    },
    {
      key: 'hold',
      label: '보유기간',
      options: [
        { value: '3', text: '3년 미만' },
        { value: '5', text: '3~5년' },
        { value: '10', text: '5~10년' },
        { value: '15', text: '10년 이상' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const houses = parseInt(sel.houses)
    const gainBil = parseInt(sel.gain)
    const gain = gainBil * 10000 // 만원 단위
    const holdYears = parseInt(sel.hold)
    const addRate = houses >= 3 ? 30 : 20

    /* 유예 시 (기본세율 적용) - 장특공제 반영 */
    const holdDeductRate = holdYears >= 10 ? 30 : holdYears >= 5 ? 20 : holdYears >= 3 ? 12 : 0
    const taxableBasic = Math.round(gain * (100 - holdDeductRate) / 100) - 250
    const basicTax = calcBasicTax(Math.max(taxableBasic, 0))
    const basicRate = getRate(Math.max(taxableBasic, 0))

    /* 중과 시 (기본세율 + 추가세율, 장특공제 배제) */
    const taxableJungkwa = gain - 250
    const jungkwaBasicTax = calcBasicTax(Math.max(taxableJungkwa, 0))
    const jungkwaRate = getRate(Math.max(taxableJungkwa, 0))
    const jungkwaAddTax = Math.round(Math.max(taxableJungkwa, 0) * addRate / 100)
    const jungkwaTotalTax = jungkwaBasicTax + jungkwaAddTax
    const totalJungkwaRate = jungkwaRate + addRate

    const diff = jungkwaTotalTax - basicTax
    const fmt = new Intl.NumberFormat('ko-KR')

    return {
      pass: true,
      headline: `중과 시 세금이 약 ${fmt.format(diff)}만원 더 나와요`,
      detail: (
        <>
          유예 기간(기본세율 {basicRate}%)이면 약 {fmt.format(basicTax)}만원,
          중과 적용(세율 {totalJungkwaRate}%)이면 약 {fmt.format(jungkwaTotalTax)}만원이에요.
          장기보유특별공제 배제까지 합치면 약 <strong>{fmt.format(diff)}만원</strong> 차이가 나요.
        </>
      ),
      amount: {
        value: `약 ${fmt.format(diff)}만원 차이`,
        unit: '기본세율 vs 중과세율',
        formula: `유예 ${fmt.format(basicTax)}만원 vs 중과 ${fmt.format(jungkwaTotalTax)}만원`,
      },
      badges: [
        `${houses}주택 +${addRate}%p`,
        `유예 시 ${basicRate}%`,
        `중과 시 ${totalJungkwaRate}%`,
      ],
      links: [
        { icon: '🧮', title: '중과 전후 세액 비교 상세', desc: '실제 사례별 세금 차이 계산', href: '/w/다주택-양도세-중과-전후-세액-비교' },
        { icon: '📋', title: '다주택 매도 순서 전략', desc: '어떤 집부터 팔아야 절세가 되는지', href: '/w/다주택-매도-순서-전략-절세' },
      ],
    }
  },
}

export default function YangdoseJungkwaChecker() {
  return <GenericChecker config={config} />
}
