"use client";

import type { ReactNode } from "react";

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
        }}
      >
        <div style={{ flex: 1, minWidth: 0, maxWidth: 720 }}>{children}</div>
        <aside
          className="article-sidebar"
          style={{ width: 280, flexShrink: 0 }}
        >
          {sidebar}
        </aside>
      </div>
    </>
  );
}
