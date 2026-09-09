import type { Metadata } from "next";
import GoldNav from "@/components/gold/GoldNav";
import GoldShell from "@/components/gold/GoldShell";

/**
 * 금 섹션 공통 껍데기.
 *
 * 루트 layout.tsx 안에 중첩된다 — 루트는 건드리지 않는다.
 * 배경·타이포는 이 트리 안에서만 적용되므로 /w/ 글 2,138개에 영향이 없다.
 * 허브(/gold)는 목업 v2(IBM Plex Sans KR · Mono, 흰 바탕)를 따른다.
 *   글꼴은 Google Fonts <link> 로 받는다 — next/font 를 중첩 레이아웃에 넣으면 Turbopack dev 에서
 *   다른 모든 하위 경로가 404 로 떨어졌다(2026-09-09 실측: /gold/sell·/fx/banks 까지).
 */

const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";

export const metadata: Metadata = {
  title: {
    default: "금시세",
    template: "%s | 머니위키",
  },
};

export default function GoldLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={
        {
          "--font-plex-sans": "'IBM Plex Sans KR'",
          "--font-plex-mono": "'IBM Plex Mono'",
        } as React.CSSProperties
      }
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_CSS} />
      <GoldShell>
        <GoldNav />
        <div className="max-w-[1120px] mx-auto px-4 sm:px-8 pb-16">{children}</div>
      </GoldShell>
    </div>
  );
}
