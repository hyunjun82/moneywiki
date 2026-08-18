"use client";

import { usePathname } from "next/navigation";
import { changeText, fxColor, useFx, won, type FxRate } from "./fxData";

const TABS = [
  { href: "/fx", label: "환율 계산기" },
  { href: "/fx/banks", label: "은행 비교" },
] as const;

/** 티커에 올릴 주요 통화 */
const TICKER = ["USD", "JPY", "EUR", "CNY", "GBP", "AUD"];

/**
 * 상단 다크 헤더 + LIVE 티커.
 * 시안에서 헤더 아래 붙어 있던 티커 바를 그대로 옮겼다.
 */
export default function FxNav() {
  const pathname = usePathname();
  const current = pathname?.replace(/\/$/, "") || "/fx";
  const { data } = useFx();

  const ticker = (data?.rates ?? [])
    .filter((r) => TICKER.includes(r.code))
    .sort((a, b) => TICKER.indexOf(a.code) - TICKER.indexOf(b.code));

  return (
    <>
      <header className="sticky top-0 z-20 bg-[rgba(9,29,45,0.92)] backdrop-blur-[16px] border-b border-white/10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 h-[70px] flex items-center justify-between gap-6">
          <a href="/fx" className="flex items-center gap-2.5 shrink-0">
            <span className="w-7 h-7 rounded-[9px] bg-white text-[#0B2233] flex items-center justify-center text-[14px] font-extrabold tracking-[-0.04em]">
              ₩
            </span>
            <span className="text-[16.5px] font-bold text-white tracking-[-0.02em]">환율노트</span>
            <span className="ml-1.5 px-2 py-[3px] rounded-md border border-white/20 text-[10.5px] font-bold text-white/70 tracking-[0.08em] hidden sm:inline">
              BETA
            </span>
          </a>
          <nav className="flex items-center gap-1 bg-white/10 p-1 rounded-full">
            {TABS.map((t) => {
              const on = current === t.href;
              return (
                <a
                  key={t.href}
                  href={t.href}
                  aria-current={on ? "page" : undefined}
                  className={`px-3.5 sm:px-[18px] py-2 rounded-full text-[13px] sm:text-[14px] font-semibold whitespace-nowrap transition-colors ${
                    on ? "bg-white text-[#0B2233]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {t.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {ticker.length > 0 ? <Ticker rates={ticker} /> : null}
    </>
  );
}

function Ticker({ rates }: { rates: FxRate[] }) {
  return (
    <div className="bg-[#0B2233] border-b border-white/[0.08]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 flex items-stretch overflow-x-auto [scrollbar-width:none]">
        <div className="flex-none flex items-center gap-[7px] py-3.5 pr-5 border-r border-white/[0.12] mr-[22px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] shadow-[0_0_0_3px_rgba(61,214,140,0.18)]" />
          <span className="text-[11.5px] font-extrabold text-white/70 tracking-[0.1em]">LIVE</span>
        </div>
        {rates.map((r) => (
          <div key={r.code} className="flex-none flex items-center gap-2 py-3.5 pr-[22px] whitespace-nowrap">
            <span className="text-[12px] font-bold text-white/50 tracking-[0.04em]">
              {r.code}/KRW
            </span>
            <span className="text-[13.5px] font-bold text-white tabular-nums">
              {won(r.rate, 2)}
            </span>
            <span
              className="text-[12px] font-bold tabular-nums"
              style={{ color: r.changePct && r.changePct > 0 ? "#3DD68C" : fxColor(r.changePct) }}
            >
              {changeText(r.changePct)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
