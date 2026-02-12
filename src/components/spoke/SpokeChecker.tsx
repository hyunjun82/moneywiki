'use client'

import { useState } from 'react'
import Link from 'next/link'

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

interface CheckerGroup {
  key: string
  label: string
  options: { value: string; text: string }[]
}

const GROUPS: CheckerGroup[] = [
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
]

interface SpokeLink {
  icon: string
  title: string
  desc: string
  href: string
}

const BENEFIT_SPOKES: Record<string, SpokeLink> = {
  s: { icon: '💰', title: '생계급여 실수령액 — 내가 받을 금액은?', desc: '소득인정액별 실수령액 예시', href: '#sec-amount' },
  m: { icon: '🏥', title: '의료급여 1종 2종 차이 — 병원비 0원 조건', desc: '본인부담금·건강보험료 면제 기준', href: '#' },
  h: { icon: '🏠', title: '주거급여 임차료 지원금 — 최대 35만원', desc: '서울·경기·지방 기준임대료', href: '#' },
  e: { icon: '📚', title: '교육급여 지원 항목 — 교육활동지원비', desc: '교과서 지원 · 교육활동지원비', href: '#' },
}

const FAIL_SPOKES: SpokeLink[] = [
  { icon: '🛡️', title: '차상위계층 조건 — 소득 조금 넘어도 혜택받는 법', desc: '중위소득 50% 이하', href: '#' },
  { icon: '🆘', title: '긴급복지지원 신청 — 선지급 후 조사, 최대 71만원', desc: '즉시 지원', href: '#' },
]

export default function SpokeChecker() {
  const [sel, setSel] = useState<Record<string, string>>({})

  const handleSelect = (groupKey: string, value: string) => {
    setSel(prev => ({ ...prev, [groupKey]: value }))
  }

  const allSelected = sel.size && sel.income && sel.asset && sel.family
  let result: null | {
    pass: boolean
    tot: number
    sz: number
    badges: string[]
    benefit: number | null
    spokes: SpokeLink[]
    medNote: string
  } = null

  if (allSelected) {
    const sz = Math.min(parseInt(sel.size), 5)
    const std = STD[sz]
    const incEst = INC_MAP[sel.income] || 250
    const astAdd = sel.asset === 'low' ? 0 : sel.asset === 'mid' ? 12 : 45
    const tot = (incEst + astAdd) * 10000

    const badges: string[] = []
    const spokes: SpokeLink[] = []

    if (tot <= std.s) { badges.push('생계급여'); spokes.push(BENEFIT_SPOKES.s) }
    if (tot <= std.m) { badges.push('의료급여'); spokes.push(BENEFIT_SPOKES.m) }
    if (tot <= std.h) { badges.push('주거급여'); spokes.push(BENEFIT_SPOKES.h) }
    if (tot <= std.e) { badges.push('교육급여'); spokes.push(BENEFIT_SPOKES.e) }

    let medNote = ''
    if (badges.includes('의료급여') && sel.family === 'high') {
      medNote = ' 단, 의료급여는 부양의무자(고소득) 기준으로 제외될 수 있어요.'
    }

    const benefit = tot <= std.s ? std.s - tot : null

    result = {
      pass: badges.length > 0,
      tot,
      sz,
      badges,
      benefit,
      spokes: badges.length > 0 ? spokes : FAIL_SPOKES,
      medNote,
    }
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden my-6">
      <div className="bg-[#1E3A5F] p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center text-lg">✔</div>
        <div>
          <h3 className="text-white text-[15px] font-bold m-0">수급자격 간편 체크</h3>
          <p className="text-white/70 text-xs mt-0.5 m-0">결과에서 해당 급여별 상세 글도 확인하세요</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[13.5px] text-neutral-500 leading-relaxed mb-[18px] pb-[14px] border-b border-neutral-200">
          소득인정액은 <strong className="text-neutral-800 font-bold">실제소득(근로소득 30% 공제 적용)</strong>에 재산을 월 소득으로 환산한 금액을 합산한 겁니다. 아래 4가지를 선택하면 대략적인 수급 가능성을 바로 확인할 수 있어요.
        </p>

        {GROUPS.map((group, gi) => (
          <div key={group.key} className={gi < GROUPS.length - 1 ? 'mb-[18px]' : ''}>
            <div className="flex items-center gap-[7px] text-[13px] font-bold text-neutral-700 mb-2">
              <span className="w-5 h-5 bg-[#1E3A5F] text-white rounded-[5px] flex items-center justify-center text-[10px] font-extrabold">
                {gi + 1}
              </span>
              {group.label}
            </div>
            <div className="flex gap-[5px] flex-wrap">
              {group.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(group.key, opt.value)}
                  className={`px-[13px] py-2 border-[1.5px] rounded-lg text-[12.5px] font-medium cursor-pointer transition-all font-[inherit] whitespace-nowrap ${
                    sel[group.key] === opt.value
                      ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white font-bold'
                      : 'border-neutral-200 bg-white text-neutral-500 hover:border-[#4A7AB5] hover:text-[#1E3A5F] hover:bg-[#EDF2F8]'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}

        {result && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              result.pass
                ? 'bg-[#EDF2F8] border border-[#1E3A5F]/10'
                : 'bg-red-50 border border-red-500/10'
            }`}
          >
            {result.pass ? (
              <>
                <div className="text-[15px] font-extrabold text-[#1E3A5F] flex items-center gap-[7px] mb-1">
                  ✅ 수급 가능성이 높아요
                </div>
                {result.benefit !== null && (
                  <>
                    <div className="text-[22px] font-black text-[#1E3A5F] my-2">
                      매월 약 {Math.round(result.benefit / 10000).toLocaleString()}만원
                      <span className="text-[12px] text-neutral-500 font-normal ml-1">수급 가능 (생계급여 기준)</span>
                    </div>
                    <div className="text-[12px] text-neutral-500 mb-1">
                      산식: 선정기준 {Math.round(STD[result.sz].s / 10000)}만원 − 추정 소득인정액 {Math.round(result.tot / 10000)}만원 = <strong>{Math.round(result.benefit / 10000)}만원</strong>
                    </div>
                  </>
                )}
                <div className="text-[13px] text-neutral-500 leading-relaxed">
                  추정 소득인정액 약 {Math.round(result.tot / 10000)}만원 기준이에요.{result.medNote}
                </div>
                <div className="flex gap-[5px] mt-2 flex-wrap">
                  {result.badges.map(b => (
                    <span key={b} className="text-[11px] font-bold py-[3px] px-[9px] rounded bg-[#1E3A5F] text-white">{b}</span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="text-[15px] font-extrabold text-red-600 flex items-center gap-[7px] mb-1">
                  잠깐, 아직 포기하지 마세요
                </div>
                <div className="text-[13px] text-neutral-500 leading-relaxed">
                  추정 소득인정액이 교육급여 기준({result.sz}인 가구 {Math.round(STD[result.sz].e / 10000)}만원)을 초과하지만, 공제 항목에 따라 달라져요. <strong>차상위계층</strong>이나 <strong>긴급복지</strong>로 비슷한 혜택을 받을 수 있어요.
                </div>
              </>
            )}

            <div className={`mt-3 pt-3 border-t ${result.pass ? 'border-[#1E3A5F]/[0.08]' : 'border-red-500/[0.08]'}`}>
              <div className="text-[12px] font-bold text-neutral-800 mb-[6px]">
                📖 {result.pass ? '해당 급여 상세 가이드 — 다음 단계로 넘어가세요' : '다른 방법을 확인해 보세요'}
              </div>
              {result.spokes.map((sp, i) => (
                <Link
                  key={i}
                  href={sp.href}
                  className="flex items-center justify-between py-2 text-[13px] text-[#1E3A5F] font-semibold no-underline border-b border-[#1E3A5F]/[0.06] last:border-b-0 hover:text-[#4A7AB5]"
                >
                  <span>{sp.icon} {sp.title}</span>
                  <span className="text-[11px] text-neutral-400">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
