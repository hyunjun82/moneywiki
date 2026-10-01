"use client";

import { usePathname } from "next/navigation";
import { DOWN_ON_DARK, FLAT_COLOR, UP_ON_DARK, changeText, useFx, won, type FxData } from "./fxData";
import { SPOKES } from "./fxDerive";
import { Flag } from "./parts";

const TABS = [
  { href: "/fx", label: "오늘 환율" },
  { href: "/fx/news", label: "환율 기사" },
  { href: "/fx/calculator", label: "환율 계산기" },
  { href: "/fx/exchange-calculator", label: "환전 계산기" },
  { href: "/fx/banks", label: "은행 비교" },
  { href: "/fx/airport", label: "공항 환전" },
] as const;

/** 기사(/fx/news/날짜)는 "환율 기사", 통화 페이지(/fx/usd 등)는 "오늘 환율" 탭 아래로 본다 */
const tabOf = (path: string) =>
  TABS.some((t) => t.href === path) ? path : path.startsWith("/fx/news") ? "/fx/news" : "/fx";

/**
 * 상단 다크 헤더 + 통화 바로가기 띠.
 *
 * 2026-10-01: 통화 바로가기가 페이지 맨 아래에만 있어 보이지 않았다(사용자 지적). 예전 LIVE 티커(6종, 숫자만)를
 * 통화 15종 바로가기(국기·이름·환율·등락, 누르면 통화 페이지)로 바꿔 모든 /fx 페이지 맨 위에 둔다.
 * layout 이 빌드 때 스냅숏을 initial 로 넘겨 첫 HTML 에도 링크와 숫자가 있다.
 */
export default function FxNav({ initial }: { initial?: FxData | null }) {
  const pathname = (usePathname() ?? "/fx").replace(/\/$/, "") || "/fx";
  const current = tabOf(pathname);
  const currentCode = SPOKES.find((m) => pathname === `/fx/${m.slug}`)?.code;
  const { data } = useFx(initial);
  const byCode = new Map((data?.rates ?? []).map((r) => [r.code, r]));

  return (
    <>
      <header className="sticky top-0 z-20 bg-[rgba(9,29,45,0.94)] backdrop-blur-[16px] border-b border-white/10">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 h-[64px] flex items-center justify-between gap-4">
          <a href="/fx" className="flex items-center gap-2.5 shrink-0">
            <span className="w-7 h-7 rounded-[9px] bg-white text-[#0B2233] flex items-center justify-center text-[14px] font-extrabold tracking-[-0.04em]">
              ₩
            </span>
            <span className="text-[16.5px] font-bold text-white tracking-[-0.02em] hidden lg:inline">환율노트</span>
          </a>
          <nav aria-label="환율 메뉴" className="flex items-center gap-1 bg-white/10 p-1 rounded-full overflow-x-auto [scrollbar-width:none] min-w-0">
            {TABS.map((t) => {
              const on = current === t.href;
              return (
                <a
                  key={t.href}
                  href={t.href}
                  aria-current={on ? "page" : undefined}
                  className={`px-3 sm:px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold whitespace-nowrap transition-colors ${
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

      <nav aria-label="통화별 환율" className="bg-[#0B2233] border-b border-white/[0.08]">
        {/* 넓은 화면: 두 줄로 펼쳐 15종이 다 보이게 / 휴대폰: 한 줄로 밀어서 본다 */}
        <div className="max-w-[1180px] mx-auto px-2 sm:px-6 py-1 flex items-stretch gap-x-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:overflow-visible">
          {SPOKES.map((m) => {
            const r = byCode.get(m.code);
            const on = m.code === currentCode;
            return (
              <a
                key={m.code}
                href={`/fx/${m.slug}`}
                aria-current={on ? "page" : undefined}
                className={`flex-none flex items-center gap-2 px-3 my-0.5 py-1.5 rounded-[10px] whitespace-nowrap transition-colors ${
                  on ? "bg-white/[0.14] ring-1 ring-white/30" : "hover:bg-white/[0.07]"
                }`}
              >
                <Flag code={m.code} size={14} />
                <span className="text-[13px] font-bold text-white">{m.keyword.replace(/ 환율$/, "")}</span>
                {r ? (
                  <>
                    <span className="text-[13px] font-semibold text-white/85 tabular-nums">{won(r.rate, 2)}</span>
                    <span
                      className="text-[11.5px] font-bold tabular-nums"
                      style={{ color: !r.changePct ? FLAT_COLOR : r.changePct > 0 ? UP_ON_DARK : DOWN_ON_DARK }}
                    >
                      {changeText(r.changePct)}
                    </span>
                  </>
                ) : null}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
