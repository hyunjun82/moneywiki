"use client";

import { colors } from "./styles";

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: colors.greenBg,
        color: colors.badgeText,
        fontSize: 12,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 6,
        marginBottom: 10,
      }}
    >
      {children}
    </span>
  );
}
