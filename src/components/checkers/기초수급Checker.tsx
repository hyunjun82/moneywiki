'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

/* ── 급여별 선정기준 (2026) ── */
const STD: Record<number, { s: number; m: number; h: number; e: number }> = {
  1: { s: 820556, m: 1025695, h: 1230834, e: 1282119 },
  2: { s: 1343773, m: 1679717, h: 2015660, e: 2099646 },
  3: { s: 1714892, m: 2143614, h: 2572337, e: 2679518 },
  4: { s: 2078316, m: 2597895, h: 3117474, e: 3247369 },
  5: { s: 2418150, m: 3022688, h: 3627225, e: 3778360 },
}

const INC_MAP: Record<string, number> = {
  '50': 35, '100': 70, '150': 105, '200': 140, '300': 250,
}

const BENEFIT_LINKS = {
  s: { icon: '💰', title: '생계급여 실수령액 — 내가 받을 금액은?', desc: '소득인정액별 실수령액 예시', href: '#sec-amount' },
  m: { icon: '🏥', title: '의료급여 1종 2종 차이 — 병원비 0원 조건', desc: '본인부담금·건강보험료 면제 기준', href: '#' },
  h: { icon: '🏠', title: '주거급여 임차료 지원금 — 최대 35만원', desc: '서울·경기·지방 기준임대료', href: '#' },
  e: { icon: '📚', title: '교육급여 지원 항목 — 교육활동지원비', desc: '교과서 지원 · 교육활동지원비', href: '#' },
}

const FAIL_LINKS = [
  { icon: '🛡️', title: '차상위계층 조건 — 소득 조금 넘어도 혜택받는 법', desc: '중위소득 50% 이하', href: '#' },
  { icon: '🆘', title: '긴급복지지원 신청 — 선지급 후 조사, 최대 71만원', desc: '즉시 지원', href: '#' },
]

const config: CheckerConfig = {
  title: '수급자격 간편 체크',
  subtitle: '결과에서 해당 급여별 상세 글도 확인하세요',
  intro: (
    <p>
      소득인정액은 <strong>실제소득(근로소득 30% 공제 적용)</strong>에 재산을 월 소득으로 환산한 금액을 합산한 겁니다.
      아래 4가지를 선택하면 대략적인 수급 가능성을 바로 확인할 수 있어요.
    </p>
  ),
  groups: [
    {
      key: 'size',
      label: '가구원 수 (본인 포함)',
      options: [
        { value: '1', text: '1인' },
        { value: '2', text: '2인' },
        { value: '3', text: '3인' },
        { value: '4', text: '4인' },
        { value: '5', text: '5인 이상' },
      ],
    },
    {
      key: 'income',
      label: '월 소득 (세전, 가구 합산)',
      options: [
        { value: '50', text: '50만원 이하' },
        { value: '100', text: '50~100만원' },
        { value: '150', text: '100~150만원' },
        { value: '200', text: '150~200만원' },
        { value: '300', text: '200만원 초과' },
      ],
    },
    {
      key: 'asset',
      label: '재산 (부동산+자동차+예금)',
      options: [
        { value: 'low', text: '5천만원 이하' },
        { value: 'mid', text: '5천만~1억' },
        { value: 'high', text: '1억 초과' },
      ],
    },
    {
      key: 'family',
      label: '부양의무자 (부모 또는 자녀)',
      options: [
        { value: 'none', text: '없음' },
        { value: 'low', text: '있음 (소득 낮음)' },
        { value: 'high', text: '있음 (고소득)' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const sz = Math.min(parseInt(sel.size), 5)
    const std = STD[sz]
    const incEst = INC_MAP[sel.income] || 250
    const astAdd = sel.asset === 'low' ? 0 : sel.asset === 'mid' ? 12 : 45
    const tot = (incEst + astAdd) * 10000

    const badges: string[] = []
    const links: typeof FAIL_LINKS = []

    if (tot <= std.s) { badges.push('생계급여'); links.push(BENEFIT_LINKS.s) }
    if (tot <= std.m) { badges.push('의료급여'); links.push(BENEFIT_LINKS.m) }
    if (tot <= std.h) { badges.push('주거급여'); links.push(BENEFIT_LINKS.h) }
    if (tot <= std.e) { badges.push('교육급여'); links.push(BENEFIT_LINKS.e) }

    let medNote = ''
    if (badges.includes('의료급여') && sel.family === 'high') {
      medNote = ' 단, 의료급여는 부양의무자(고소득) 기준으로 제외될 수 있어요.'
    }

    const pass = badges.length > 0
    const benefit = tot <= std.s ? std.s - tot : null

    return {
      pass,
      headline: pass ? '수급 가능성이 높아요' : '잠깐, 아직 포기하지 마세요',
      detail: pass
        ? <>추정 소득인정액 약 {Math.round(tot / 10000)}만원 기준이에요.{medNote}</>
        : <>추정 소득인정액이 교육급여 기준({sz}인 가구 {Math.round(std.e / 10000)}만원)을 초과하지만, 공제 항목에 따라 달라져요. <strong>차상위계층</strong>이나 <strong>긴급복지</strong>로 비슷한 혜택을 받을 수 있어요.</>,
      amount: pass && benefit !== null ? {
        value: `약 ${Math.round(benefit / 10000).toLocaleString()}만원`,
        unit: '매월',
        formula: `선정기준 ${Math.round(std.s / 10000)}만원 − 추정 소득인정액 ${Math.round(tot / 10000)}만원 = ${Math.round(benefit / 10000)}만원`,
      } : undefined,
      badges,
      links: pass ? links : FAIL_LINKS,
    }
  },
}

export default function 기초수급Checker() {
  return <GenericChecker config={config} />
}
