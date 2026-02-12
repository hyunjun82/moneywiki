import Link from 'next/link'

// =============================================
// 1. HubFlow — 흐름도 (아이콘 → 라벨 → 화살표)
// =============================================
export function HubFlow({ steps }: {
  steps: { icon: string; label: string; sub?: string }[]
}) {
  return (
    <div className="flex items-center justify-center gap-0 my-6 flex-wrap">
      {steps.map((step, i) => (
        <div key={i} className="contents">
          {i > 0 && <span className="text-neutral-300 px-2 shrink-0 text-base">→</span>}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-[18px] py-[14px] text-center min-w-[100px] hover:border-[#1E3A5F] hover:bg-[#1E3A5F]/[0.03] transition-all">
            <div className="text-2xl mb-1">{step.icon}</div>
            <div className="text-xs font-semibold text-neutral-700">{step.label}</div>
            {step.sub && <div className="text-[10px] text-neutral-400 mt-0.5">{step.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

// =============================================
// 2. HubRateBars — 비율 비교 막대 차트
// =============================================
export function HubRateBars({ bars }: {
  bars: { label: string; rate: string; width: string }[]
}) {
  return (
    <div className="my-5">
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-3 mb-2.5">
          <span className="w-20 text-xs font-semibold text-neutral-600 text-right shrink-0">{bar.label}</span>
          <div className="flex-1 h-6 bg-neutral-100 rounded-xl overflow-hidden">
            <div
              className="h-full bg-[#1E3A5F] rounded-xl flex items-center pl-2.5 text-[11px] font-bold text-white"
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

// =============================================
// 3. HubTimeline — 수직 타임라인
// =============================================
export function HubTimeline({ events }: {
  events: { month: string; title: string; desc: string; status?: 'normal' | 'current' | 'warning'; tag?: string }[]
}) {
  return (
    <div className="relative pl-7 my-4">
      <div className="absolute left-[6px] top-[6px] bottom-[6px] w-0.5 bg-neutral-200" />
      {events.map((event, i) => {
        const dotClass =
          event.status === 'current' ? 'border-[#1E3A5F] bg-[#1E3A5F] shadow-[0_0_0_3px_rgba(30,58,95,0.15)]' :
          event.status === 'warning' ? 'border-orange-500 bg-orange-500' :
          'border-neutral-300 bg-white'
        const tagClass =
          event.status === 'warning' ? 'bg-orange-500/[0.08] text-orange-500' : 'bg-[#1E3A5F]/[0.08] text-[#1E3A5F]'

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

// =============================================
// 4. HubStepCards — 번호 카드 (자동 번호)
// =============================================
export function HubStepCards({ steps }: {
  steps: { title: string; desc: string; tip?: string }[]
}) {
  return (
    <div className="my-4">
      {steps.map((step, i) => (
        <div key={i} className="relative pl-14 py-4 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-2 hover:border-[#1E3A5F] hover:bg-[#1E3A5F]/[0.02] transition-all">
          <div className="absolute left-3.5 top-3.5 w-[30px] h-[30px] rounded-full bg-[#1E3A5F] text-white text-sm font-bold flex items-center justify-center">
            {i + 1}
          </div>
          <div className="text-sm font-semibold text-neutral-800">{step.title}</div>
          <div className="text-xs text-neutral-500 mt-0.5">{step.desc}</div>
          {step.tip && <div className="text-[11px] text-[#1E3A5F] mt-1 font-medium">{step.tip}</div>}
        </div>
      ))}
    </div>
  )
}

// =============================================
// 5. HubCompareCards — 비교 카드 (2열)
// =============================================
export function HubCompareCards({ cards }: {
  cards: { title: string; subtitle: string; items: string[]; recommended?: boolean; recLabel?: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`border rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all ${
            card.recommended ? 'border-[#1E3A5F] bg-[#1E3A5F]/[0.02]' : 'border-neutral-200'
          }`}
        >
          {card.recommended && card.recLabel && (
            <span className="inline-block text-[10px] font-bold py-0.5 px-2 bg-[#1E3A5F]/10 text-[#1E3A5F] rounded mb-2">
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

// =============================================
// 6. HubTable — 데이터 테이블
// =============================================
export function HubTable({ id, title, subtitle, headers, rows, highlightCol, warnCol }: {
  id?: string
  title?: string
  subtitle?: string
  headers: string[]
  rows: (string | { text: string; highlight?: boolean; warn?: boolean })[][]
  highlightCol?: number
  warnCol?: number
}) {
  return (
    <>
      {title && (
        <h3 id={id} className="text-base font-bold mt-6 mb-0 pl-3 border-l-[3px] border-[#1E3A5F] scroll-mt-20">
          {title}
          {subtitle && <small className="inline-block text-[11px] font-medium text-neutral-500 ml-2 px-2 py-0.5 bg-neutral-100 rounded align-middle tracking-normal">{subtitle}</small>}
        </h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse my-4 text-[13px]">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className={`text-left px-3 py-2.5 font-semibold text-xs text-[#1E3A5F] bg-[#EDF2F8] border-b-2 border-[#1E3A5F] ${
                  i === 0 ? 'rounded-tl-lg' : ''
                } ${i === headers.length - 1 ? 'rounded-tr-lg' : ''}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-neutral-50 transition-colors">
                {row.map((cell, ci) => {
                  const isObj = typeof cell === 'object'
                  const text = isObj ? cell.text : cell
                  const isHighlight = (isObj && cell.highlight) || (highlightCol !== undefined && ci === highlightCol)
                  const isWarn = (isObj && cell.warn) || (warnCol !== undefined && ci === warnCol)
                  return (
                    <td key={ci} className={`px-3 py-2.5 border-b border-neutral-100 ${
                      isHighlight ? 'text-[#1E3A5F] font-semibold' :
                      isWarn ? 'text-orange-500 font-semibold' : ''
                    }`}>
                      {text}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// =============================================
// 7. HubTipBox — 초록 팁 박스
// =============================================
export function HubTipBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1E3A5F]/[0.04] border border-[#1E3A5F]/[0.12] rounded-xl py-5 px-6 my-5 text-[13px] text-neutral-600">
      <h4 className="text-sm font-bold text-[#1E3A5F] mb-2">{title}</h4>
      {children}
    </div>
  )
}

// =============================================
// 8. HubWarnBox — 주황 경고 박스
// =============================================
export function HubWarnBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-orange-500/15 rounded-xl py-5 px-6 my-5 text-[13px] text-neutral-600">
      <h4 className="text-sm font-bold text-orange-500 mb-2">⚠️ {title}</h4>
      {children}
    </div>
  )
}

// =============================================
// 9. HubInfoBox — 파란 정보 박스
// =============================================
export function HubInfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-blue-600/[0.04] border border-blue-600/[0.12] rounded-xl py-5 px-6 my-5 text-[13px] text-neutral-600">
      <h4 className="text-sm font-bold text-blue-600 mb-2">{title}</h4>
      {children}
    </div>
  )
}

// =============================================
// 10. HubFormula — 수식/공식 표시
// =============================================
export function HubFormula({ text }: { text: string }) {
  return (
    <div className="bg-[#EDF2F8] border border-[#1E3A5F]/10 rounded-lg py-3.5 px-[18px] my-3 font-mono text-[14px] font-semibold text-[#1E3A5F] text-center">
      {text}
    </div>
  )
}

// =============================================
// 11. HubCTA — CTA 버튼 (외부링크)
// =============================================
export function HubCTA({ buttons }: {
  buttons: { href: string; label: string; title: string; variant: 'dark' | 'blue' | 'green' }[]
}) {
  const colors = {
    dark: 'from-slate-800 to-slate-600',
    blue: 'from-blue-600 to-blue-500',
    green: 'from-[#1E3A5F] to-[#2B5280]',
  }
  return (
    <div className="flex flex-col gap-2.5 my-5">
      {buttons.map((btn, i) => (
        <a
          key={i}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`hub-cta flex items-center justify-between px-5 py-4 rounded-xl !text-white bg-gradient-to-r ${colors[btn.variant]} hover:-translate-y-0.5 hover:opacity-95 transition-all !no-underline`}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold opacity-70">{btn.label}</span>
            <span className="text-sm font-bold">{btn.title}</span>
          </div>
          <span className="text-[13px] font-semibold">바로가기 →</span>
        </a>
      ))}
    </div>
  )
}

// =============================================
// 12. HubBridgeCTA — 섹션 간 연결 CTA
// =============================================
export function HubBridgeCTA({ href, badge, title, desc }: {
  href: string; badge: string; title: string; desc: string
}) {
  const cls = 'group flex items-center gap-4 mt-8 p-[18px] bg-white border border-neutral-200 rounded-[14px] no-underline transition-all hover:border-[#1E3A5F] hover:shadow-md hover:-translate-y-px'
  const inner = (
    <>
      <div className="shrink-0 w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
          <path d="M9 5l7 7-7 7" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="inline-block text-[10px] font-bold text-[#1E3A5F] bg-[#1E3A5F]/[0.08] px-2 py-0.5 rounded-full mb-1 tracking-wide">{badge}</div>
        <div className="text-[15px] font-bold text-neutral-800 leading-snug">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{desc}</div>
      </div>
      <span className="shrink-0 text-lg text-neutral-400 group-hover:text-[#1E3A5F] group-hover:translate-x-1 transition-all">&rarr;</span>
    </>
  )

  if (href.startsWith('#') || href.startsWith('http')) {
    return <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
  }
  return <Link href={href} className={cls}>{inner}</Link>
}

// =============================================
// 13. HubSpokeLink — 인라인 스포크 링크 (본문 중간)
// =============================================
export function HubSpokeLink({ href, badge, title, desc }: {
  href: string; badge: string; title: string; desc: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 my-4 p-[18px] bg-white border border-neutral-200 rounded-[14px] no-underline transition-all hover:border-[#1E3A5F] hover:shadow-md hover:-translate-y-px"
    >
      <div className="shrink-0 w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
          <path d="M9 5l7 7-7 7" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="inline-block text-[10px] font-bold text-[#1E3A5F] bg-[#1E3A5F]/[0.08] px-2 py-0.5 rounded-full mb-1 tracking-wide">{badge}</div>
        <div className="text-[15px] font-bold text-neutral-800 leading-snug">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{desc}</div>
      </div>
      <span className="shrink-0 text-lg text-neutral-400 group-hover:text-[#1E3A5F] group-hover:translate-x-1 transition-all">→</span>
    </Link>
  )
}
