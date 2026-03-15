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
}

export function Sidebar({ heading, items, currentSlug }: Props) {
  return (
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
          return (
            <li key={item.slug}>
              <a
                href={`/w/${item.slug}`}
                style={{
                  display: "block",
                  padding: "8px 20px",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: isCurrent ? colors.mainGreen : colors.body,
                  fontWeight: isCurrent ? 600 : 400,
                  textDecoration: "none",
                  backgroundColor: isCurrent ? colors.greenBg : "transparent",
                  borderLeft: isCurrent
                    ? `3px solid ${colors.mainGreen}`
                    : "3px solid transparent",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {isCurrent ? "" : ""} {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
