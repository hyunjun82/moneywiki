/**
 * /fx 페이지 공용 조각 — 훅·이벤트가 없어 서버·클라이언트 어디서든 그린다.
 */

import { SPOKES, type Faq } from "./fxDerive";
import { won, type HistoryPoint } from "./fxCore";

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="현재 위치" className="text-[13px] text-[#6C727B] flex flex-wrap items-center gap-1.5">
      {items.map((it, i) => (
        <span key={it.name} className="flex items-center gap-1.5">
          {i > 0 ? <span className="text-[#B7B3AA]">›</span> : null}
          {it.href ? (
            <a href={it.href} className="hover:text-[#1F4E79] hover:underline underline-offset-2">
              {it.name}
            </a>
          ) : (
            <span className="text-[#3C424A] font-semibold">{it.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function H2({ id, children, lead }: { id?: string; children: React.ReactNode; lead?: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="m-0 text-[21px] sm:text-[25px] font-extrabold tracking-[-0.03em] text-[#1A1D21] leading-snug">
        {children}
      </h2>
      {lead ? <p className="mt-2 mb-0 text-[15px] sm:text-[16px] leading-[1.7] text-[#5B616A]">{lead}</p> : null}
    </div>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="flex flex-col divide-y divide-[#E2DFD7] border-y border-[#E2DFD7] bg-white rounded-[16px] overflow-hidden">
      {items.map((f) => (
        <details key={f.q} className="group px-5 sm:px-6 py-4" open>
          <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[15.5px] font-bold text-[#1A1D21]">
            <h3 className="m-0 text-[15.5px] font-bold">{f.q}</h3>
            <span className="text-[#9CA1A8] group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="mt-2.5 mb-0 text-[15px] leading-[1.75] text-[#3C424A]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** 통화 15종 바로가기 — 허브·통화·공항 페이지 하단 */
export function CurrencyChips({
  current,
  rates,
}: {
  current?: string;
  rates?: Record<string, { rate: number; unit: number }>;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
      {SPOKES.map((m) => {
        const r = rates?.[m.code];
        const on = m.code === current;
        return (
          <a
            key={m.code}
            href={`/fx/${m.slug}`}
            aria-current={on ? "page" : undefined}
            className={`flex flex-col gap-0.5 px-4 py-3 rounded-[14px] border transition-colors ${
              on ? "border-[#1F4E79] bg-[#E9F0F7]" : "border-[#E2DFD7] bg-white hover:border-[#1F4E79]"
            }`}
          >
            <span className="text-[14.5px] font-bold text-[#1A1D21]">{m.keyword}</span>
            <span className="text-[12.5px] text-[#6C727B] tabular-nums">
              {m.code}
              {r ? ` · ${r.unit}${m.unitWord} ${won(r.rate, 2)}원` : ""}
            </span>
          </a>
        );
      })}
    </div>
  );
}

/** 선 그래프 — 기간 최저·최고에 점을 찍는다. 축 숫자는 아래 표가 대신한다. */
export function LineChart({ series, label }: { series: HistoryPoint[]; label: string }) {
  if (series.length < 2) return null;
  const W = 640;
  const H = 180;
  const P = 10;
  const rates = series.map((p) => p.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const x = (i: number) => P + (i * (W - 2 * P)) / (series.length - 1);
  const y = (v: number) => (max === min ? H / 2 : H - P - ((v - min) / (max - min)) * (H - 2 * P));
  const line = series.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.rate).toFixed(1)}`).join("");
  const area = `${line}L${x(series.length - 1).toFixed(1)},${H}L${x(0).toFixed(1)},${H}Z`;
  const iMin = rates.indexOf(min);
  const iMax = rates.indexOf(max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={label}>
      <path d={area} fill="#1F4E79" fillOpacity="0.08" />
      <path d={line} fill="none" stroke="#1F4E79" strokeWidth="2" strokeLinejoin="round" />
      <circle cx={x(iMax)} cy={y(max)} r="4" fill="#2E7D5B" />
      <circle cx={x(iMin)} cy={y(min)} r="4" fill="#2A6099" />
      <circle cx={x(series.length - 1)} cy={y(rates[rates.length - 1])} r="4.5" fill="#1A1D21" />
    </svg>
  );
}

/** 표 껍데기 — 좁은 화면에서는 표만 가로로 민다(페이지는 밀리지 않는다). */
export function TableWrap({ children, min = 560 }: { children: React.ReactNode; min?: number }) {
  return (
    <div className="bg-white border border-[#E2DFD7] rounded-[16px] overflow-x-auto">
      <table className="w-full border-collapse text-[14px] sm:text-[14.5px]" style={{ minWidth: min }}>
        {children}
      </table>
    </div>
  );
}

export const th = "px-4 py-3 text-left text-[12.5px] font-bold text-[#6C727B] bg-[#F7F6F3] border-b border-[#E2DFD7] whitespace-nowrap";
export const td = "px-4 py-3 border-b border-[#EFEDE8] text-[#3C424A] tabular-nums whitespace-nowrap";

export function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[13px] leading-[1.75] text-[#6C727B] bg-[#F7F6F3] border border-[#E2DFD7] rounded-[14px] px-5 py-4">
      {children}
    </div>
  );
}
