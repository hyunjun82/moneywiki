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

// --- BridgeCTA ---
export function BridgeCTA({ href, badge, title, desc, icon, primary }: {
  href: string
  badge: string
  title: string
  desc: string
  icon: SpokeIconName
  primary?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 mt-8 p-[18px] bg-white border rounded-[14px] no-underline transition-all hover:border-emerald-600 hover:shadow-md hover:-translate-y-px ${
        primary
          ? 'border-emerald-600/30 bg-gradient-to-r from-emerald-600/[0.02] to-emerald-600/[0.05]'
          : 'border-neutral-200'
      }`}
    >
      <div className="shrink-0 w-[42px] h-[42px] rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center">
        {ICONS[icon]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-600/[0.08] px-2 py-0.5 rounded-full mb-1 tracking-wide">{badge}</div>
        <div className="text-[15px] font-bold text-neutral-800 leading-snug">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{desc}</div>
      </div>
      <span className="shrink-0 text-lg text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">&rarr;</span>
    </Link>
  )
}

// --- TipBox ---
export function TipBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-emerald-600/[0.04] border-l-[3px] border-emerald-600 py-4 px-5 rounded-r-lg my-6 text-[13px] text-neutral-600">
      <h4 className="text-[13px] font-bold text-emerald-600 mb-1.5">{title}</h4>
      {children}
    </div>
  )
}

// --- FormulaBox ---
export function FormulaBox({ lines }: { lines: { text: string; numbered?: boolean; comment?: boolean }[] }) {
  return (
    <div className="bg-neutral-800 text-neutral-300 px-6 py-5 rounded-xl my-4 text-sm font-mono leading-relaxed overflow-x-auto">
      {lines.map((line, i) => (
        <span key={i}>
          {line.comment ? (
            <span className="text-neutral-500">{line.text}</span>
          ) : line.numbered ? (
            (() => { const idx = line.text.indexOf('.'); return <><span className="text-emerald-400 font-bold">{line.text.slice(0, idx + 1)}</span> {line.text.slice(idx + 1)}</> })()
          ) : (
            line.text
          )}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </div>
  )
}

// --- SpokeTable ---
export function SpokeTable({ id, title, subtitle, headers, rows, highlightCol }: {
  id: string
  title: string
  subtitle: string
  headers: string[]
  rows: string[][]
  highlightCol?: number
}) {
  return (
    <>
      <h3 id={id} data-toc-text={title} className="text-[17px] font-bold text-neutral-800 mt-6 mb-0 leading-snug tracking-tight scroll-mt-20">
        {title}
        <small className="inline-block text-[11px] font-medium text-neutral-500 ml-2 px-2 py-0.5 bg-neutral-100 rounded align-middle tracking-normal">{subtitle}</small>
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse my-2 text-[13px]" aria-labelledby={id}>
          <thead>
            <tr className="bg-neutral-50">
              {headers.map((h, i) => (
                <th key={i} className="px-3 py-2.5 text-left font-semibold text-xs text-neutral-500 border-b-2 border-neutral-200">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-neutral-50">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-3 py-2.5 border-b border-neutral-100 ${
                      highlightCol !== undefined && ci === highlightCol ? 'text-emerald-600 font-semibold' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// --- RateCards ---
export function RateCards({ cards }: {
  cards: { value: string; label: string; lines: string[]; highlight?: string; highlightColor?: 'orange' | 'emerald'; active?: boolean }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`border rounded-xl p-5 text-center ${
            card.active ? 'border-emerald-600 bg-emerald-600/[0.03]' : 'border-neutral-200'
          }`}
        >
          <div className="text-[28px] font-extrabold text-emerald-600 mb-1">{card.value}</div>
          <div className="text-xs font-semibold text-neutral-500 mb-2">{card.label}</div>
          <div className="text-xs text-neutral-500 leading-relaxed">
            {card.lines.map((line, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {card.highlight && line.includes(card.highlight) ? (
                  <>
                    {line.split(card.highlight)[0]}
                    <strong className={card.highlightColor === 'orange' ? 'text-orange-600' : 'text-emerald-600'}>{card.highlight}</strong>
                    {line.split(card.highlight)[1]}
                  </>
                ) : line}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// --- SpokeTimeline ---
export function SpokeTimeline({ events }: {
  events: { month: string; title: string; desc: string; status?: 'normal' | 'current' | 'warning'; tag?: string }[]
}) {
  return (
    <div className="relative pl-7 my-4">
      <div className="absolute left-[6px] top-[6px] bottom-[6px] w-0.5 bg-neutral-200" />
      {events.map((event, i) => {
        const dotClass =
          event.status === 'current' ? 'border-emerald-600 bg-emerald-600 shadow-[0_0_0_3px_rgba(5,150,105,0.15)]' :
          event.status === 'warning' ? 'border-orange-500 bg-orange-500' :
          'border-neutral-300 bg-white'
        const tagClass =
          event.status === 'warning' ? 'bg-orange-500/[0.08] text-orange-500' : 'bg-emerald-600/[0.08] text-emerald-600'

        return (
          <div key={i} className="relative pb-5 last:pb-0">
            <div className={`absolute -left-7 top-[5px] w-3.5 h-3.5 rounded-full border-2 ${dotClass}`} />
            <div className="text-[11px] font-semibold text-neutral-400">{event.month}</div>
            <div className="text-sm font-semibold">{event.title}</div>
            <div className="text-xs text-neutral-500">{event.desc}</div>
            {event.tag && (
              <span className={`inline-block px-1.5 py-px text-[10px] font-semibold rounded mt-1 ${tagClass}`}>
                {event.tag}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

// --- SpokeStepCards ---
export function SpokeStepCards({ steps }: {
  steps: { title: string; desc: string; tip?: string }[]
}) {
  return (
    <div className="my-4">
      {steps.map((step, i) => (
        <div key={i} className="relative pl-14 py-4 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-2 hover:border-emerald-600 hover:bg-emerald-600/[0.02] transition-all">
          <div className="absolute left-3.5 top-3.5 w-[30px] h-[30px] rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">
            {i + 1}
          </div>
          <div className="text-sm font-semibold text-neutral-800">{step.title}</div>
          <div className="text-xs text-neutral-500 mt-0.5">{step.desc}</div>
          {step.tip && <div className="text-[11px] text-emerald-600 mt-1 font-medium">{step.tip}</div>}
        </div>
      ))}
    </div>
  )
}

// --- SpokeCompareCards ---
export function SpokeCompareCards({ cards }: {
  cards: { title: string; subtitle: string; items: string[]; recommended?: boolean; recLabel?: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`border rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all ${
            card.recommended ? 'border-emerald-600 bg-emerald-600/[0.02]' : 'border-neutral-200'
          }`}
        >
          {card.recommended && card.recLabel && (
            <span className="inline-block text-[10px] font-bold py-0.5 px-2 bg-emerald-600/10 text-emerald-600 rounded mb-2">
              {card.recLabel}
            </span>
          )}
          <h4 className="text-sm font-bold mb-0.5">{card.title}</h4>
          <div className="text-[11px] text-neutral-500 mb-2.5">{card.subtitle}</div>
          <ul className="list-none m-0 p-0">
            {card.items.map((item, j) => (
              <li key={j} className="text-xs text-neutral-600 py-0.5 pl-3.5 relative before:content-['·'] before:absolute before:left-0 before:font-bold before:text-neutral-400">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// --- SpokeRateBars ---
export function SpokeRateBars({ bars }: {
  bars: { label: string; rate: string; width: string }[]
}) {
  return (
    <div className="my-5">
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-3 mb-2.5">
          <span className="w-20 text-xs font-semibold text-neutral-600 text-right shrink-0">{bar.label}</span>
          <div className="flex-1 h-6 bg-neutral-100 rounded-xl overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-xl flex items-center pl-2.5 text-[11px] font-bold text-white"
              style={{ width: bar.width }}
            >
              {bar.rate}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// --- SpokeFlow ---
export function SpokeFlow({ steps }: {
  steps: { icon: string; label: string; sub?: string }[]
}) {
  return (
    <div className="flex items-center justify-center gap-0 my-6 flex-wrap">
      {steps.map((step, i) => (
        <div key={i} className="contents">
          {i > 0 && <span className="text-neutral-300 px-2 shrink-0 text-base">&rarr;</span>}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-[18px] py-[14px] text-center min-w-[100px] hover:border-emerald-600 hover:bg-emerald-600/[0.03] transition-all">
            <div className="text-2xl mb-1">{step.icon}</div>
            <div className="text-xs font-semibold text-neutral-700">{step.label}</div>
            {step.sub && <div className="text-[10px] text-neutral-400 mt-0.5">{step.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

// --- SpokeWarnBox ---
export function SpokeWarnBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-orange-500/15 rounded-xl py-5 px-6 my-5 text-[13px] text-neutral-600">
      <h4 className="text-sm font-bold text-orange-500 mb-2">{title}</h4>
      {children}
    </div>
  )
}

// --- QuickAnswer ---
export function QuickAnswer({ title, body, hook }: {
  title: string; body: React.ReactNode; hook?: string
}) {
  return (
    <div className="bg-emerald-600/[0.04] border border-emerald-600/20 rounded-xl p-5 my-4">
      <h4 className="text-sm font-bold text-emerald-600 mb-2">{title}</h4>
      <div className="text-[13px] text-neutral-700 leading-relaxed">{body}</div>
      {hook && <div className="text-xs text-emerald-600 mt-2 font-medium">{hook}</div>}
    </div>
  )
}

// --- SpokeChecklist ---
export function SpokeChecklist({ items }: {
  items: { text: string; done?: boolean; note?: string }[]
}) {
  return (
    <div className="my-4 border border-neutral-200 rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className={`flex items-start gap-3 px-5 py-3 ${i > 0 ? 'border-t border-neutral-100' : ''}`}>
          <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
            item.done ? 'bg-emerald-600' : 'border-2 border-neutral-300'
          }`}>
            {item.done && (
              <svg viewBox="0 0 24 24" className="w-3 h-3">
                <path d="M20 6L9 17l-5-5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-sm ${item.done ? 'text-neutral-800 font-medium' : 'text-neutral-500'}`}>{item.text}</div>
            {item.note && <div className="text-[11px] text-emerald-600 mt-0.5">{item.note}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
