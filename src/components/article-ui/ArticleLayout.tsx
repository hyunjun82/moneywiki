"use client";

import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";

interface Props {
  children: ReactNode;
  sidebar?: ReactNode;
}

export function ArticleLayout({ children, sidebar }: Props) {
  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .article-sidebar { display: none !important; }
        }
        .article-sidebar ins.adsbygoogle,h
        .article-sidebar iframe[id^="aswift"],
        .article-sidebar iframe[id^="google_ads"],
        .article-sidebar > div[data-google-query-id],
        .article-sidebar div[id^="google_ads"] {
          display: none !important;
          height: 0 !important;
          max-height: 0 !important;
          overflow: hidden !important;
        }
      `}</style>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "2rem 1.5rem",
          display: "flex",
          gap: 40,
          fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
          color: "#111",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ flex: 1, minWidth: 680, maxWidth: 720, position: "relative", zIndex: 2 }}>
          {children}
          <AdSlot slot="bottom" />
        </div>
        <aside
          className="article-sidebar"
          data-ad-region="exclude"
          data-nosnippet="true"
          style={{ width: 280, flexShrink: 0, position: "relative", overflow: "hidden" }}
        >
          {sidebar}
        </aside>
      </div>
      <AdSlot slot="anchor" />
    </>
  );
}
