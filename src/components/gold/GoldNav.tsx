"use client";

import { usePathname } from "next/navigation";

const TABS = [
  { href: "/gold", label: "오늘의 금시세" },
  { href: "/gold/buy", label: "금 살 때" },
  { href: "/gold/sell", label: "금 팔 때" },
  { href: "/gold/calculator", label: "금 계산기" },
  { href: "/gold/news", label: "금값 뉴스" },
] as const;

/** 금 섹션 4개 페이지를 잇는 탭. 모든 페이지 상단에 같은 자리로 나온다. */
export default function GoldNav() {
  const pathname = usePathname();
  const current = pathname?.replace(/\/$/, "") || "/gold";

  return (
    <div className="bg-[#14161A] border-b border-[rgba(212,175,55,.28)]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-5 sm:gap-8 h-[60px]">
          <a href="/gold" className="flex items-center gap-2.5 shrink-0">
            <span className="w-7 h-7 rounded-lg bg-[linear-gradient(140deg,#F5E3A6,#D4AF37_55%,#A8801A)] flex items-center justify-center text-[#14161A] text-[13px] font-extrabold">
              金
            </span>
            <span className="text-[17px] font-extrabold tracking-[-0.02em] text-white hidden sm:inline">
              금시세
            </span>
          </a>
          <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
            {TABS.map((t) => {
              const active = current === t.href;
              return (
                <a
                  key={t.href}
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[14px] sm:text-[15px] whitespace-nowrap pb-0.5 border-b-2 transition-colors ${
                    active
                      ? "text-[#E3C15C] font-bold border-[#D4AF37]"
                      : "text-[#B9BDC4] font-medium border-transparent hover:text-white"
                  }`}
                >
                  {t.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
