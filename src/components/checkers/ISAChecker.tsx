'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: 'ISA 절세 계산기',
  subtitle: '2가지만 선택하면 일반 계좌 대비 절세액을 알려드려요',
  intro: (
    <p>ISA 유형과 연간 배당·이자 수익을 선택하세요. 3년 누적 기준으로 일반 계좌보다 얼마나 절세되는지 바로 계산해요.</p>
  ),
  groups: [
    {
      key: 'type',
      label: 'ISA 유형',
      options: [
        { value: 'seomin', text: '서민형 (비과세 400만원)' },
        { value: 'general', text: '일반형 (비과세 200만원)' },
      ],
    },
    {
      key: 'income',
      label: '연간 배당·이자 수익',
      options: [
        { value: '500000', text: '약 50만원' },
        { value: '1000000', text: '약 100만원' },
        { value: '2000000', text: '약 200만원' },
        { value: '3000000', text: '약 300만원' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const exemptLimit = sel.type === 'seomin' ? 4_000_000 : 2_000_000
    const annual = Number(sel.income)
    const total3y = annual * 3
    const normalTax = Math.round(total3y * 0.154)
    const isaTaxable = Math.max(0, total3y - exemptLimit)
    const isaTax = Math.round(isaTaxable * 0.099)
    const savings = normalTax - isaTax
    const typeName = sel.type === 'seomin' ? '서민형' : '일반형'
    const fmtW = (n: number) => `${(n / 10000).toFixed(1)}만원`

    return {
      pass: true,
      headline: `일반 계좌보다 ${fmtW(savings)} 절세돼요`,
      detail: (
        <>
          <p>
            연간 배당·이자 {fmtW(annual)}이면 3년 누적 {fmtW(total3y)}이에요.
            일반 계좌는 15.4% 세금으로 {fmtW(normalTax)}을 내지만,
            ISA {typeName}은 비과세 {fmtW(exemptLimit)} 적용 후 {fmtW(isaTax)}만 내면 돼요.
          </p>
        </>
      ),
      amount: {
        value: `약 ${fmtW(savings)}`,
        unit: '3년 절세액',
        formula: `일반 계좌 세금 ${fmtW(normalTax)} − ISA 세금 ${fmtW(isaTax)}`,
      },
      badges: [typeName, `비과세 ${fmtW(exemptLimit)}`, '초과분 9.9%'],
      links: [
        { icon: '📋', title: 'ISA 유형별 차이 확인', desc: '중개형·서민형·일반형 상세 비교', href: '/w/ISA계좌-중개형-서민형-일반형-유형-선택-기준' },
        { icon: '📝', title: 'ISA 개설하러 가기', desc: '5분 비대면 개설 절차', href: '/w/ISA계좌-가입-조건-개설-방법-필요-서류' },
      ],
    }
  },
}

export default function ISAChecker() {
  return <GenericChecker config={config} />
}
