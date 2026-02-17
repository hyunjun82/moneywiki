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

/* 장기보유특별공제율 (일반, 보유기간별, 유예 기간 적용) */
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
  title: '3주택자 양도세 직접 계산해 보기',
  subtitle: '양도차익과 보유기간을 선택하면 유예 기간과 중과 적용 시 세금을 계산해드려요',
  intro: (
    <p>
      3주택자는 조정대상지역 주택을 팔면 <strong>기본세율 +30%p</strong>가 붙어요.
      유예 기간(2026.5.9까지)에 팔았을 때와 유예 종료 후를 비교해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'gain',
      label: '양도차익 (매도가 - 취득가 - 필요경비)',
      options: [
        { value: '1', text: '1억원' },
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
        { value: '15', text: '10년 이상' },
      ],
    },
    {
      key: 'timing',
      label: '매도 시기',
      options: [
        { value: 'before', text: '2026.5.9 이전 (유예 기간)' },
        { value: 'after', text: '2026.5.10 이후 (중과 적용)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const gainBil = parseInt(sel.gain)
    const gain = gainBil * 10000 // 만원 단위
    const holdYears = parseInt(sel.hold)
    const isYuye = sel.timing === 'before'

    const fmt = new Intl.NumberFormat('ko-KR')

    if (isYuye) {
      /* 유예 기간: 기본세율 + 장특공제 적용 */
      const holdDeductRate = getHoldDeductRate(holdYears)
      const deductAmount = Math.round(gain * holdDeductRate / 100)
      const taxable = Math.max(gain - deductAmount - 250, 0)
      const tax = calcBasicTax(taxable)
      const rate = getRate(taxable)
      const withLocal = Math.round(tax * 1.1)

      return {
        pass: true,
        headline: `유예 기간 매도 시 양도세 약 ${fmt.format(withLocal)}만원이에요`,
        detail: (
          <>
            기본세율 {rate}% 적용, 장기보유특별공제 {holdDeductRate}% 반영해요.
            산출세액 약 {fmt.format(tax)}만원에 지방소득세(10%) 포함하면
            실납부 세액은 <strong>약 {fmt.format(withLocal)}만원</strong>이에요.
            2026년 5월 9일까지 잔금을 치르면 유예 혜택을 받을 수 있어요.
          </>
        ),
        amount: {
          value: `약 ${fmt.format(withLocal)}만원`,
          unit: '지방소득세 포함 예상 세액',
          formula: `양도차익 ${fmt.format(gain)}만원 × 기본세율 ${rate}% - 장특공제 ${holdDeductRate}%`,
        },
        badges: [
          `기본세율 ${rate}%`,
          `장특공제 ${holdDeductRate}%`,
          `지방소득세 포함`,
        ],
        links: [
          { icon: '📋', title: '다주택 매도 순서 전략', desc: '어떤 집부터 팔면 세금을 아낄 수 있는지', href: '/w/다주택-매도-순서-전략-절세' },
          { icon: '🏠', title: '3주택자 비과세 조건', desc: '주택 수 제외 대상 확인하기', href: '/w/3주택자-양도세-중과세율-계산-비과세' },
        ],
      }
    } else {
      /* 중과 적용: 기본세율 +30%p, 장특공제 배제 */
      const taxable = Math.max(gain - 250, 0)
      const basicTax = calcBasicTax(taxable)
      const rate = getRate(taxable)
      const addTax = Math.round(taxable * 30 / 100)
      const totalTax = basicTax + addTax
      const totalRate = rate + 30
      const withLocal = Math.round(totalTax * 1.1)

      /* 유예와 비교 */
      const holdDeductRate = getHoldDeductRate(holdYears)
      const deductAmount = Math.round(gain * holdDeductRate / 100)
      const yuyeTaxable = Math.max(gain - deductAmount - 250, 0)
      const yuyeTax = Math.round(calcBasicTax(yuyeTaxable) * 1.1)
      const diff = withLocal - yuyeTax

      return {
        pass: true,
        headline: `중과 적용 시 양도세 약 ${fmt.format(withLocal)}만원이에요`,
        detail: (
          <>
            중과세율 {totalRate}% 적용, 장기보유특별공제 없이 계산돼요.
            산출세액 약 {fmt.format(totalTax)}만원에 지방소득세(10%) 포함하면
            <strong> 약 {fmt.format(withLocal)}만원</strong>이에요.
            유예 기간에 팔았을 때보다 약 {fmt.format(diff)}만원 더 내야 해요.
          </>
        ),
        amount: {
          value: `약 ${fmt.format(withLocal)}만원`,
          unit: '지방소득세 포함 예상 세액',
          formula: `양도차익 ${fmt.format(gain)}만원 × 중과세율 ${totalRate}% (장특공제 배제)`,
        },
        badges: [
          `중과세율 ${totalRate}%`,
          `장특공제 0%`,
          `유예 대비 +${fmt.format(diff)}만원`,
        ],
        links: [
          { icon: '📅', title: '중과 유예 기간 체크', desc: '2026.5.9 전에 팔면 얼마나 아끼는지', href: '/w/다주택-양도세-중과-전후-세액-비교' },
          { icon: '🏠', title: '중과 배제 대상 주택', desc: '중과에서 빠지는 주택 종류 확인', href: '/w/다주택자-양도세-중과-배제-대상-주택-신고' },
        ],
      }
    }
  },
}

export default function SanjutaekYangdoseChecker() {
  return <GenericChecker config={config} />
}
