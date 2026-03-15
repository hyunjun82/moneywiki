import type { CSSProperties } from "react";

/* ── 컬러 시스템 ── */
export const colors = {
  mainGreen: "#1D9E75",
  greenBg: "#E1F5EE",
  greenText: "#085041",
  badgeText: "#0F6E56",
  border: "#9FE1CB",
  body: "#374151",
  heading: "#111",
  sub: "#6b7280",
  muted: "#9ca3af",
  line: "#e5e7eb",
  lineFaint: "#f3f4f6",
  bgFaint: "#f9fafb",
} as const;

/* ── 본문 기본 스타일 ── */
export const body: CSSProperties = {
  fontSize: 14,
  color: colors.body,
  lineHeight: 2.05,
  marginBottom: "0.95rem",
};
