import Link from 'next/link'
import type { SpokeIconName } from '@/data/spoke/types'

// --- SVG Icons ---
const ICONS: Record<SpokeIconName, React.ReactNode> = {
  check: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M20 6L9 17l-5-5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  calc: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M9 7h6m-6 4h6m-6 4h4M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>,
  clock: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2" /><path d="M12 6v6l4 2" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>,
  info: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="white" strokeWidth="2" /><path d="M12 16v-4m0-4h.01" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>,
  grid: <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M4 4h16v16H4z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" /><path d="M8 8h2m4 0h2M8 12h8M8 16h2m4 0h2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>,
}

export function getIcon(name: SpokeIconName) {
  return ICONS[name]
}

// ═══ PAS 브릿지 (큰 카드 — 질문 + 답변 + 버튼) ═══
export function PASBridge({ href, question, answer, buttonText }: {
  href: string
  question: string
  answer: React.ReactNode
  buttonText: string
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl p-[18px_20px] my-4 bg-white border-[1.5px] border-neutral-200 no-underline transition-all relative overflow-hidden
        before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#1E3A5F]
        hover:border-[#4A7AB5] hover:shadow-[0_4px_16px_rgba(30,58,95,0.08)] hover:-translate-y-px"
    >
      <div className="text-[15px] font-extrabold text-neutral-900 leading-[1.4] mb-2">{question}</div>
      <div className="text-[13.5px] text-neutral-500 leading-relaxed mb-3">{answer}</div>
      <span className="inline-flex items-center gap-1 bg-[#1E3A5F] text-white text-[12.5px] font-bold py-2 px-4 rounded-md transition-colors group-hover:bg-[#2B5280]">
        {buttonText}
      </span>
    </Link>
  )
}

// ═══════════════════════════════════════════
// BridgeCTA (PAS 스타일 — 왼쪽 navy 보더 + 질문 + 답변 + 버튼)
// 골든 HTML: .br-pas
// ═══════════════════════════════════════════
export function BridgeCTA({ href, badge, title, desc, icon, primary }: {
  href: string
  badge: string
  title: string
  desc: string | React.ReactNode
  icon?: SpokeIconName | string
  primary?: boolean
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl p-[18px_20px] my-4 bg-white border-[1.5px] border-neutral-200 no-underline transition-all relative overflow-hidden
        before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#1E3A5F]
        hover:border-[#4A7AB5] hover:shadow-[0_4px_16px_rgba(30,58,95,0.08)] hover:-translate-y-px"
    >
      <div className="text-[15px] font-extrabold text-neutral-900 leading-[1.4] mb-2">{title}</div>
      <div className="text-[13.5px] text-neutral-500 leading-relaxed mb-3 [&_strong]:text-[#1E3A5F] [&_strong]:font-bold">{desc}</div>
      <span className="inline-flex items-center gap-1 bg-[#1E3A5F] text-white text-[12.5px] font-bold py-2 px-4 rounded-md transition-colors group-hover:bg-[#2B5280]">
        {badge} →
      </span>
    </Link>
  )
}

// ═══ TipBox ═══
export function TipBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#EDF2F8] border border-[#1E3A5F]/[0.08] rounded-lg py-3 px-[14px] my-[10px] flex gap-[9px] text-[12.5px] leading-relaxed text-[#1E3A5F]">
      <span className="shrink-0 text-[15px] mt-px">💡</span>
      <div>
        <strong className="font-bold">{title}</strong>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  )
}

// ═══ WarnBox ═══
export function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg py-3 px-[14px] my-[10px] flex gap-[9px] text-[12.5px] leading-relaxed text-amber-800">
      <span className="shrink-0 text-[15px] mt-px">⚠️</span>
      <div>{children}</div>
    </div>
  )
}

// ═══ FormulaBox ★ 검정→연파란 ═══
export function FormulaBox({ lines }: { lines: { text: string; numbered?: boolean; comment?: boolean }[] }) {
  return (
    <div className="bg-[#EDF2F8] border border-[#1E3A5F]/[0.08] rounded-lg px-4 py-[14px] my-3 text-center">
      {lines.map((line, i) => (
        <div key={i}>
          {line.comment ? (
            <div className="text-[13.5px] text-neutral-500 mb-[6px]">{line.text}</div>
          ) : (
            <div className={`text-[13px] leading-relaxed ${line.numbered ? 'text-left' : ''}`}>
              {line.numbered ? (
                (() => {
                  const idx = line.text.indexOf('.')
                  return (
                    <>
                      <span className="text-[#1E3A5F] font-bold">{line.text.slice(0, idx + 1)}</span>
                      <span className="text-neutral-600"> {line.text.slice(idx + 1).trim()}</span>
                    </>
                  )
                })()
              ) : (
                <span className="text-[15px] font-extrabold text-[#1E3A5F]">{line.text}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ═══ SpokeTable ═══
export function SpokeTable({ id, title, subtitle, headers, rows, highlightCol }: {
  id: string
  title: string
  subtitle: string
  headers: string[]
  rows: string[][]
  highlightCol?: number
}) {
  return (
    <div id={id} className="my-[10px]">
      <div className="text-[14px] font-extrabold text-neutral-900 mb-[6px] flex items-center gap-[6px]">
        <span className="text-base">📊</span> {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px] min-w-[480px]">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className={`px-2 py-[9px] font-bold text-[#1E3A5F] bg-[#EDF2F8] border-b-2 border-[#1E3A5F] whitespace-nowrap ${i === 0 ? 'text-left' : 'text-center'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-[#F5F8FB]">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-2 py-2 border-b border-neutral-200 whitespace-nowrap ${
                      ci === 0 ? 'text-left font-semibold text-neutral-900' : 'text-center text-neutral-600'
                    } ${highlightCol !== undefined && ci === highlightCol ? 'text-[#1E3A5F] font-semibold' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[11.5px] text-neutral-400 mt-1 leading-relaxed">※ {subtitle}</div>
    </div>
  )
}

// ═══ DetailBox ═══
export function DetailBox({ title, items }: {
  title: string
  items: { heading: string; desc: string }[]
}) {
  return (
    <div className="bg-[#F5F8FB] border border-neutral-200 rounded-lg my-3 overflow-hidden">
      <div className="px-4 py-[11px] text-[13.5px] font-bold text-neutral-900 border-b border-neutral-200 bg-white flex items-center gap-[7px]">
        💡 {title}
      </div>
      {items.map((item, i) => (
        <div key={i} className="px-4 py-3 border-b border-neutral-200 last:border-b-0 flex gap-3">
          <div className="w-[22px] h-[22px] bg-[#1E3A5F] text-white rounded-md flex items-center justify-center text-[10px] font-extrabold shrink-0">
            {i + 1}
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-neutral-900 mb-px">{item.heading}</h4>
            <p className="text-[12px] text-neutral-500 leading-relaxed m-0">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ═══ Chips ═══
export function Chips({ items }: {
  items: { icon: string; label: string; value: string; href?: string }[]
}) {
  return (
    <div className="grid grid-cols-4 gap-2 my-3">
      {items.map((item, i) => {
        const inner = (
          <>
            <div className="text-xl mb-[3px]">{item.icon}</div>
            <div className="text-[10.5px] text-neutral-400 mb-[2px]">{item.label}</div>
            <div className="text-[12px] font-extrabold text-[#1E3A5F] leading-tight">{item.value}</div>
          </>
        )
        return item.href ? (
          <Link key={i} href={item.href} className="bg-white border border-neutral-200 rounded-lg px-[6px] py-3 text-center no-underline transition-all hover:border-[#4A7AB5] hover:shadow-md hover:-translate-y-0.5">
            {inner}
          </Link>
        ) : (
          <div key={i} className="bg-white border border-neutral-200 rounded-lg px-[6px] py-3 text-center">
            {inner}
          </div>
        )
      })}
    </div>
  )
}

// ═══ SpokeLinks (세로 리스트) ═══
export function SpokeLinks({ title, items }: {
  title: string
  items: { num: string; heading: string; desc: string; href: string }[]
}) {
  return (
    <div className="my-5">
      <div className="text-[14px] font-extrabold text-neutral-900 mb-[10px] flex items-center gap-[6px]">
        📖 {title}
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 p-[13px_15px] bg-white border border-neutral-200 rounded-lg no-underline transition-all hover:border-[#4A7AB5] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)] hover:-translate-y-px"
          >
            <span className="text-[11px] font-extrabold text-[#1E3A5F] bg-[#EDF2F8] w-[26px] h-[26px] rounded-md flex items-center justify-center shrink-0">
              {item.num}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold text-neutral-900 leading-snug">{item.heading}</div>
              <div className="text-[11px] text-neutral-400 mt-px">{item.desc}</div>
            </div>
            <span className="text-[13px] text-neutral-400 shrink-0">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ═══ Steps ═══
export function Steps({ items }: {
  items: { title: string; desc: string }[]
}) {
  return (
    <div className="my-[14px]">
      {items.map((item, i) => (
        <div key={i} className="flex gap-[14px] py-[14px] border-b border-neutral-200 last:border-b-0">
          <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0">
            {i + 1}
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-neutral-900 mb-[2px] m-0">{item.title}</h4>
            <p className="text-[13px] text-neutral-500 leading-relaxed m-0">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ═══ SourceBar ═══
export function SourceBar({ badge, name, date }: {
  badge: string
  name: string
  date: string
}) {
  return (
    <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg py-[11px] px-[14px] my-2">
      <div className="flex items-center gap-2">
        <span className="bg-[#1E3A5F] text-white text-[10.5px] font-bold py-[2px] px-[7px] rounded-[3px]">{badge}</span>
        <span className="text-[13.5px] font-bold text-neutral-900">{name}</span>
      </div>
      <span className="text-[12px] text-neutral-400">{date}</span>
    </div>
  )
}

// ═══ Summary3 ═══
export function Summary3({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden my-[10px]">
      <div className="px-[18px] py-3 bg-[#F5F8FB] border-b border-neutral-200 text-[13px] font-bold text-[#1E3A5F] flex items-center gap-[6px]">
        📋 3줄 요약
      </div>
      <div className="px-[18px] py-[14px]">
        <ul className="list-none m-0 p-0">
          {items.map((item, i) => (
            <li key={i} className="text-[14px] text-neutral-700 py-[5px] pl-[18px] relative leading-relaxed">
              <span className="absolute left-px top-3 w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ═══ PrevNext ═══
export function PrevNext({ prev, next }: {
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}) {
  return (
    <div className="grid grid-cols-2 gap-[10px] my-5">
      {prev ? (
        <Link href={prev.href} className="flex flex-col p-[14px_16px] bg-white border border-neutral-200 rounded-lg no-underline transition-all hover:border-[#4A7AB5] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)]">
          <div className="text-[11px] text-neutral-400 mb-1">← 이전 글</div>
          <div className="text-[13px] font-bold text-[#1E3A5F] leading-snug">{prev.title}</div>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={next.href} className="flex flex-col p-[14px_16px] bg-white border border-neutral-200 rounded-lg no-underline text-right transition-all hover:border-[#4A7AB5] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)]">
          <div className="text-[11px] text-neutral-400 mb-1">다음 글 →</div>
          <div className="text-[13px] font-bold text-[#1E3A5F] leading-snug">{next.title}</div>
        </Link>
      ) : <div />}
    </div>
  )
}

// ═══ StickyBar — re-exported from client component ═══
export { StickyBar } from './SpokeBlocksClient'

// ═══ 기존 컴포넌트 유지 (하위 호환) ═══

export function QuickAnswer({ title, body, hook }: {
  title: string; body: React.ReactNode; hook?: string
}) {
  return (
    <div className="bg-[#1E3A5F]/[0.04] border border-[#1E3A5F]/20 rounded-xl p-5 my-4">
      <h4 className="text-sm font-bold text-[#1E3A5F] mb-2">{title}</h4>
      <div className="text-[13px] text-neutral-700 leading-relaxed">{body}</div>
      {hook && <div className="text-xs text-[#1E3A5F] mt-2 font-medium">{hook}</div>}
    </div>
  )
}

export function SpokeWarnBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-orange-500/15 rounded-xl py-5 px-6 my-5 text-[13px] text-neutral-600">
      <h4 className="text-sm font-bold text-orange-500 mb-2">{title}</h4>
      {children}
    </div>
  )
}

export function RateCards({ cards }: {
  cards: { value: string; label: string; lines: string[]; highlight?: string; highlightColor?: 'orange' | 'navy'; active?: boolean }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
      {cards.map((card, i) => (
        <div key={i} className={`border rounded-xl p-5 text-center ${card.active ? 'border-[#1E3A5F] bg-[#1E3A5F]/[0.03]' : 'border-neutral-200'}`}>
          <div className="text-[28px] font-extrabold text-[#1E3A5F] mb-1">{card.value}</div>
          <div className="text-xs font-semibold text-neutral-500 mb-2">{card.label}</div>
          <div className="text-xs text-neutral-500 leading-relaxed">
            {card.lines.map((line, li) => (<span key={li}>{li > 0 && <br />}{line}</span>))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SpokeTimeline({ events }: {
  events: { month: string; title: string; desc: string; status?: 'normal' | 'current' | 'warning'; tag?: string }[]
}) {
  return (
    <div className="relative pl-7 my-4">
      <div className="absolute left-[6px] top-[6px] bottom-[6px] w-0.5 bg-neutral-200" />
      {events.map((event, i) => {
        const dotClass = event.status === 'current' ? 'border-[#1E3A5F] bg-[#1E3A5F]' : event.status === 'warning' ? 'border-orange-500 bg-orange-500' : 'border-neutral-300 bg-white'
        return (
          <div key={i} className="relative pb-5 last:pb-0">
            <div className={`absolute -left-7 top-[5px] w-3.5 h-3.5 rounded-full border-2 ${dotClass}`} />
            <div className="text-[11px] font-semibold text-neutral-400">{event.month}</div>
            <div className="text-sm font-semibold">{event.title}</div>
            <div className="text-xs text-neutral-500">{event.desc}</div>
          </div>
        )
      })}
    </div>
  )
}

export function SpokeStepCards({ steps }: { steps: { title: string; desc: string; tip?: string }[] }) {
  return (
    <div className="my-4">
      {steps.map((step, i) => (
        <div key={i} className="relative pl-14 py-4 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-2">
          <div className="absolute left-3.5 top-3.5 w-[30px] h-[30px] rounded-full bg-[#1E3A5F] text-white text-sm font-bold flex items-center justify-center">{i + 1}</div>
          <div className="text-sm font-semibold text-neutral-800">{step.title}</div>
          <div className="text-xs text-neutral-500 mt-0.5">{step.desc}</div>
          {step.tip && <div className="text-[11px] text-[#1E3A5F] mt-1 font-medium">{step.tip}</div>}
        </div>
      ))}
    </div>
  )
}

export function SpokeCompareCards({ cards }: {
  cards: { title: string; subtitle: string; items: string[]; recommended?: boolean; recLabel?: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {cards.map((card, i) => (
        <div key={i} className={`border rounded-xl p-5 ${card.recommended ? 'border-[#1E3A5F] bg-[#1E3A5F]/[0.02]' : 'border-neutral-200'}`}>
          {card.recommended && card.recLabel && <span className="inline-block text-[10px] font-bold py-0.5 px-2 bg-[#1E3A5F]/10 text-[#1E3A5F] rounded mb-2">{card.recLabel}</span>}
          <h4 className="text-sm font-bold mb-0.5">{card.title}</h4>
          <div className="text-[11px] text-neutral-500 mb-2.5">{card.subtitle}</div>
          <ul className="list-none m-0 p-0">
            {card.items.map((item, j) => (<li key={j} className="text-xs text-neutral-600 py-0.5 pl-3.5 relative before:content-['·'] before:absolute before:left-0">{item}</li>))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function SpokeRateBars({ bars }: { bars: { label: string; rate: string; width: string }[] }) {
  return (
    <div className="my-5">
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-3 mb-2.5">
          <span className="w-20 text-xs font-semibold text-neutral-600 text-right shrink-0">{bar.label}</span>
          <div className="flex-1 h-6 bg-neutral-100 rounded-xl overflow-hidden">
            <div className="h-full bg-[#1E3A5F] rounded-xl flex items-center pl-2.5 text-[11px] font-bold text-white" style={{ width: bar.width }}>{bar.rate}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SpokeFlow({ steps }: { steps: { icon: string; label: string; sub?: string }[] }) {
  return (
    <div className="flex items-center justify-center gap-0 my-6 flex-wrap">
      {steps.map((step, i) => (
        <div key={i} className="contents">
          {i > 0 && <span className="text-neutral-300 px-2 shrink-0 text-base">&rarr;</span>}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-[18px] py-[14px] text-center min-w-[100px]">
            <div className="text-2xl mb-1">{step.icon}</div>
            <div className="text-xs font-semibold text-neutral-700">{step.label}</div>
            {step.sub && <div className="text-[10px] text-neutral-400 mt-0.5">{step.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SpokeChecklist({ items }: { items: { text: string; done?: boolean; note?: string }[] }) {
  return (
    <div className="my-4 border border-neutral-200 rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className={`flex items-start gap-3 px-5 py-3 ${i > 0 ? 'border-t border-neutral-100' : ''}`}>
          <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${item.done ? 'bg-[#1E3A5F]' : 'border-2 border-neutral-300'}`}>
            {item.done && <svg viewBox="0 0 24 24" className="w-3 h-3"><path d="M20 6L9 17l-5-5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-sm ${item.done ? 'text-neutral-800 font-medium' : 'text-neutral-500'}`}>{item.text}</div>
            {item.note && <div className="text-[11px] text-[#1E3A5F] mt-0.5">{item.note}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SectionSpoke({ items }: { items: { icon: string; title: string; desc: string; href: string }[] }) {
  return (
    <div className="my-[14px] flex flex-col gap-1">
      {items.map((item, i) => (
        <Link key={i} href={item.href} className="flex items-center gap-3 p-[12px_14px] bg-white border border-neutral-200 rounded-lg no-underline transition-all hover:border-[#4A7AB5] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)] hover:-translate-y-px">
          <span className="shrink-0 text-base">{item.icon}</span>
          <span className="flex-1 min-w-0">
            <span className="text-[13px] font-bold text-[#1E3A5F] block leading-snug">{item.title}</span>
            <span className="text-[11px] text-neutral-400 block mt-px">{item.desc}</span>
          </span>
          <span className="shrink-0 text-xs text-neutral-400">→</span>
        </Link>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════
// 별칭 (골든 예시 호환)
// ═══════════════════════════════════════════
export { TipBox as SpokeTip }
export { WarnBox as SpokeWarning }
export { Steps as SpokeSteps }
export { SourceBar as SpokeSourceBadge }

// ═══════════════════════════════════════════
// CalcLink (외부 계산기 링크 — 복지로 등)
// 골든 HTML: bg:#F5F8FB + 🧮 + navy title + gray desc + →
// ═══════════════════════════════════════════
export function CalcLink({ href, icon, title, desc }: {
  href: string
  icon?: string
  title: string
  desc?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-[14px_16px] bg-[#F5F8FB] border border-neutral-200 rounded-lg no-underline transition-all my-[10px] hover:border-[#4A7AB5] hover:bg-[#EDF2F8]"
    >
      <span className="text-[22px] shrink-0">{icon || '🧮'}</span>
      <span className="flex-1">
        <span className="text-[13.5px] font-bold text-[#1E3A5F] block">{title}</span>
        {desc && <span className="text-[11.5px] text-neutral-400 block mt-px">{desc}</span>}
      </span>
      <span className="text-[14px] text-neutral-400 shrink-0">→</span>
    </a>
  )
}

export function HubChecker({ title, subtitle, intro }: {
  title: string; subtitle: string; intro: React.ReactNode; benefits?: any; spokeLinks?: any
}) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden my-3">
      <div className="bg-[#1E3A5F] p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center text-lg">✔</div>
        <div>
          <h3 className="text-white text-[15px] font-bold m-0">{title}</h3>
          <p className="text-white/70 text-xs mt-0.5 m-0">{subtitle}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="text-[13px] text-neutral-500 leading-relaxed mb-4 pb-3 border-b border-neutral-200">{intro}</div>
        <div className="text-[13px] text-neutral-500">[체커 UI — checkerConfig로 GenericChecker 사용]</div>
      </div>
    </div>
  )
}
