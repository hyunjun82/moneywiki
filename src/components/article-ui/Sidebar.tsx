"use client";

import { colors } from "./styles";

export interface SidebarItem {
  slug: string;
  title: string;
}

interface Props {
  heading: string;
  items: SidebarItem[];
  currentSlug: string;
  /** 반짝이 효과를 줄 slug 목록 (계산기 등) */
  highlightSlugs?: string[];
}

export function Sidebar({ heading, items, currentSlug, highlightSlugs = [] }: Props) {
  const highlightSet = new Set(highlightSlugs);

  return (
    <>
      {highlightSlugs.length > 0 && (
        <style>{`
          @keyframes sidebarGlow {
            0%, 100% { background-color: #FFF9E6; border-left-color: #F5C842; }
            50% { background-color: #FFF3CC; border-left-color: #E8B20E; }
          }
          .sidebar-highlight {
            animation: sidebarGlow 2s ease-in-out infinite;
            font-weight: 700 !important;
          }
          .sidebar-highlight:hover {
            background-color: #FFF3CC !important;
          }
        `}</style>
      )}
      <div
        style={{
          position: "sticky",
          top: 24,
          border: `1px solid ${colors.line}`,
          borderRadius: 12,
          padding: "20px 0",
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto",
        }}
      >
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: colors.heading,
            padding: "0 20px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>&#128209;</span>
          {heading}
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map((item) => {
            const isCurrent = item.slug === currentSlug;
            const isHighlight = !isCurrent && highlightSet.has(item.slug);
            return (
              <li key={item.slug}>
                <a
                  href={`/w/${item.slug}`}
                  className={isHighlight ? "sidebar-highlight" : undefined}
                  style={{
                    display: "block",
                    padding: "8px 20px",
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: isCurrent
                      ? colors.mainGreen
                      : isHighlight
                        ? "#946B00"
                        : colors.body,
                    fontWeight: isCurrent ? 600 : isHighlight ? 700 : 400,
                    textDecoration: "none",
                    backgroundColor: isCurrent ? colors.greenBg : "transparent",
                    borderLeft: isCurrent
                      ? `3px solid ${colors.mainGreen}`
                      : isHighlight
                        ? "3px solid #F5C842"
                        : "3px solid transparent",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {isHighlight ? "\u{1F5A9} " : isCurrent ? "" : ""}{item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
