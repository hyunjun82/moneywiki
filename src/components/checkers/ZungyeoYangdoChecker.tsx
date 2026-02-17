'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 증여세율 (상속세및증여세법 제26조) ── */
const GIFT_BRACKETS = [
  { limit: 10000, rate: 10, cum: 0 },
  { limit: 50000, rate: 20, cum: 1000 },
  { limit: 100000, rate: 30, cum: 6000 },
  { limit: 300000, rate: 40, cum: 16000 },
  { limit: Infinity, rate: 50, cum: 46000 },
]

/* ── 양도세 기본세율 (소득세법 제104조) ── */
const INCOME_BRACKETS = [
  { limit: 1400, rate: 6, cum: 0 },
  { limit: 5000, rate: 15, cum: 126 },
  { limit: 8800, rate: 24, cum: 576 },
  { limit: 15000, rate: 35, cum: 1544 },
  { limit: 30000, rate: 38, cum: 1994 },
  { limit: 50000, rate: 40, cum: 2594 },
  { limit: 100000, rate: 42, cum: 3594 },
  { limit: Infinity, rate: 45, cum: 6594 },
]

function calcTax(brackets: typeof GIFT_BRACKETS, taxable: number): number {
  const bracket = brackets.find(b => taxable <= b.limit) || brackets[brackets.length - 1]
  const idx = brackets.indexOf(bracket)
  const prev = idx > 0 ? brackets[idx - 1].limit : 0
  return bracket.cum + Math.round((taxable - prev) * bracket.rate / 100)
}

const config: CheckerConfig = {
  title: '증여 vs 양도 세금 직접 비교해 보기',
  subtitle: '주택 시가와 취득가를 선택하면 증여세와 양도세를 비교해 드려요',
  intro: (
    <p>
      다주택자가 자녀에게 넘길 때 <strong>증여가 유리할까, 양도가 유리할까</strong> —
      <a href="/w/양도세-중과-뜻-기본세율-중과세율-비교" className="text-[#4A7AB5] underline">양도세 중과 세율</a>과
      <a href="/w/다주택-매도-순서-전략-절세" className="text-[#4A7AB5] underline">매도 순서 전략</a>을
      참고해서, 시가와 취득가를 선택하면 바로 비교해 드려요.
    </p>
  ),
  groups: [
    {
      key: 'price',
      label: '주택 시가(시세)',
      options: [
        { value: '5', text: '5억원' },
        { value: '7', text: '7억원' },
        { value: '10', text: '10억원' },
        { value: '15', text: '15억원' },
      ],
    },
    {
      key: 'cost',
      label: '부모 취득가액',
      options: [
        { value: '2', text: '2억원' },
        { value: '3', text: '3억원' },
        { value: '5', text: '5억원' },
        { value: '7', text: '7억원' },
      ],
    },
    {
      key: 'debt',
      label: '대출(전세보증금 포함)',
      options: [
        { value: '0', text: '없음' },
        { value: '2', text: '2억원' },
        { value: '3', text: '3억원' },
        { value: '5', text: '5억원' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const price = parseInt(sel.price) * 10000
    const cost = parseInt(sel.cost) * 10000
    const debt = parseInt(sel.debt) * 10000
    const fmt = new Intl.NumberFormat('ko-KR')

    const giftDeduct = 5000 // 자녀 증여재산공제

    /* 1. 순수 증여 */
    const giftTaxable = Math.max(price - giftDeduct, 0)
    const giftTax = calcTax(GIFT_BRACKETS, giftTaxable)

    /* 2. 양도 (유예 기간 내 기본세율, 10년 보유 가정 장특공제 20%) */
    const gain = Math.max(price - cost, 0)
    const holdDeduct = Math.round(gain * 20 / 100)
    const yangdoTaxable = Math.max(gain - holdDeduct - 250, 0)
    const yangdoTax = Math.round(calcTax(INCOME_BRACKETS, yangdoTaxable) * 1.1)

    if (debt > 0 && debt < price) {
      /* 3. 부담부증여: 대출 부분은 부모 양도세, 나머지는 자녀 증여세 */
      const debtRatio = debt / price
      const parentGain = Math.max(debt - Math.round(cost * debtRatio), 0)
      const parentTaxable = Math.max(parentGain - 250, 0)
      const parentTax = Math.round(calcTax(INCOME_BRACKETS, parentTaxable) * 1.1)

      const childGiftAmount = price - debt
      const childTaxable = Math.max(childGiftAmount - giftDeduct, 0)
      const childTax = calcTax(GIFT_BRACKETS, childTaxable)

      const burdenTotal = parentTax + childTax
      const taxes = [
        { name: '양도(유예)', amount: yangdoTax },
        { name: '순수 증여', amount: giftTax },
        { name: '부담부증여', amount: burdenTotal },
      ]
      const best = taxes.reduce((a, b) => a.amount < b.amount ? a : b)

      return {
        pass: true,
        headline: `이 경우 ${best.name}가 가장 유리해요 (약 ${fmt.format(best.amount)}만원)`,
        detail: (
          <>
            <strong>양도(유예)</strong>: 양도세 약 {fmt.format(yangdoTax)}만원이에요.
            <strong> 순수 증여</strong>: 증여세 약 {fmt.format(giftTax)}만원이에요.
            <strong> 부담부증여</strong>: 부모 양도세 {fmt.format(parentTax)}만원 + 자녀 증여세 {fmt.format(childTax)}만원 = 총 {fmt.format(burdenTotal)}만원이에요.
            10년 보유, 장기보유특별공제 20% 가정 금액이에요.
          </>
        ),
        amount: {
          value: `약 ${fmt.format(best.amount)}만원`,
          unit: `${best.name} 예상 세액`,
          formula: `시가 ${sel.price}억 / 취득가 ${sel.cost}억 / 대출 ${sel.debt}억`,
        },
        badges: [
          `양도: ${fmt.format(yangdoTax)}만`,
          `증여: ${fmt.format(giftTax)}만`,
          `부담부: ${fmt.format(burdenTotal)}만`,
        ],
        links: [
          { icon: '📋', title: '매도 순서 절세 전략', desc: '어떤 집부터 팔면 세금을 아낄 수 있는지', href: '/w/다주택-매도-순서-전략-절세' },
          { icon: '🏠', title: '양도세 중과 전후 세액 비교', desc: '유예 vs 중과 실제 세금 차이', href: '/w/다주택-양도세-중과-전후-세액-비교' },
        ],
      }
    }

    /* 대출 없을 때: 증여 vs 양도만 비교 */
    const best = yangdoTax < giftTax
      ? { name: '양도(유예)', amount: yangdoTax }
      : { name: '증여', amount: giftTax }

    return {
      pass: true,
      headline: `이 경우 ${best.name}가 유리해요 (약 ${fmt.format(best.amount)}만원)`,
      detail: (
        <>
          <strong>양도(유예)</strong>: 양도세 약 {fmt.format(yangdoTax)}만원이에요.
          <strong> 순수 증여</strong>: 증여세 약 {fmt.format(giftTax)}만원이에요.
          대출이 없어서 부담부증여는 해당이 없어요.
          10년 보유, 장기보유특별공제 20% 가정 금액이에요.
        </>
      ),
      amount: {
        value: `약 ${fmt.format(best.amount)}만원`,
        unit: `${best.name} 예상 세액`,
        formula: `시가 ${sel.price}억 / 취득가 ${sel.cost}억`,
      },
      badges: [
        `양도: ${fmt.format(yangdoTax)}만`,
        `증여: ${fmt.format(giftTax)}만`,
        `대출 없음`,
      ],
      links: [
        { icon: '📋', title: '매도 순서 절세 전략', desc: '어떤 집부터 팔면 세금을 아낄 수 있는지', href: '/w/다주택-매도-순서-전략-절세' },
        { icon: '🏠', title: '양도세 중과 세율 비교', desc: '기본세율과 중과세율 차이 확인', href: '/w/양도세-중과-뜻-기본세율-중과세율-비교' },
      ],
    }
  },
}

export default function ZungyeoYangdoChecker() {
  return <GenericChecker config={config} />
}
