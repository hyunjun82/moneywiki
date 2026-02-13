'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CheckerConfig } from '@/data/checker-types'

export default function GenericChecker({ config }: { config: CheckerConfig }) {
  const [sel, setSel] = useState<Record<string, string>>({})

  const handleSelect = (groupKey: string, value: string) => {
    setSel(prev => ({ ...prev, [groupKey]: value }))
  }

  const allSelected = config.groups.every(g => sel[g.key])
  const result = allSelected ? config.evaluate(sel) : null

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden my-6">
      {/* ── Navy 헤더 ── */}
      <div className="bg-[#1E3A5F] p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center text-lg">✔</div>
        <div>
          <h3 className="!text-white !text-[15px] !font-bold !m-0 !pl-0 !border-l-0 !mt-0 !leading-normal">
            {config.title}
          </h3>
          <p className="!text-white/70 text-xs !mt-0.5 !m-0">{config.subtitle}</p>
        </div>
      </div>

      <div className="p-5">
        {/* ── Intro 텍스트 ── */}
        <div className="text-[13.5px] text-neutral-500 leading-relaxed mb-[18px] pb-[14px] border-b border-neutral-200 [&_strong]:text-neutral-800 [&_strong]:font-bold">
          {config.intro}
        </div>

        {/* ── 질문 그룹들 ── */}
        {config.groups.map((group, gi) => (
          <div key={group.key} className={gi < config.groups.length - 1 ? 'mb-[18px]' : ''}>
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

        {/* ── 결과 영역 ── */}
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
                  {result.headline}
                </div>
                {result.amount && (
                  <>
                    <div className="text-[22px] font-black text-[#1E3A5F] my-2">
                      {result.amount.unit} {result.amount.value}
                      <span className="text-[12px] text-neutral-500 font-normal ml-1">{result.amount.formula ? '' : '추정'}</span>
                    </div>
                    {result.amount.formula && (
                      <div className="text-[12px] text-neutral-500 mb-1">
                        산식: {result.amount.formula}
                      </div>
                    )}
                  </>
                )}
                <div className="text-[13px] text-neutral-500 leading-relaxed">
                  {result.detail}
                </div>
                {result.badges.length > 0 && (
                  <div className="flex gap-[5px] mt-2 flex-wrap">
                    {result.badges.map(b => (
                      <span key={b} className="text-[11px] font-bold py-[3px] px-[9px] rounded bg-[#1E3A5F] text-white">{b}</span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-[15px] font-extrabold text-red-600 flex items-center gap-[7px] mb-1">
                  {result.headline}
                </div>
                <div className="text-[13px] text-neutral-500 leading-relaxed">
                  {result.detail}
                </div>
              </>
            )}

            {/* ── 결과 링크 ── */}
            {result.links.length > 0 && (
              <div className={`mt-3 pt-3 border-t ${result.pass ? 'border-[#1E3A5F]/[0.08]' : 'border-red-500/[0.08]'}`}>
                <div className="text-[12px] font-bold text-neutral-800 mb-[6px]">
                  {result.pass ? '해당 가이드 — 다음 단계로 넘어가세요' : '다른 방법을 확인해 보세요'}
                </div>
                {result.links.map((sp, i) => (
                  <Link
                    key={i}
                    href={sp.href}
                    className="flex items-center justify-between py-2 text-[13px] text-[#1E3A5F] font-semibold no-underline border-b border-[#1E3A5F]/[0.06] last:border-b-0 hover:text-[#4A7AB5]"
                  >
                    <span>{sp.icon} {sp.title}</span>
                    <span className="text-[11px] text-neutral-400">&rarr;</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
