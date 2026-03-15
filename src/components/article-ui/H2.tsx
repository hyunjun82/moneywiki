"use client";

import { colors } from "./styles";

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 19,
        fontWeight: 700,
        color: colors.heading,
        margin: "2.2rem 0 1rem",
        lineHeight: 1.5,
        paddingLeft: 14,
        borderLeft: `4px solid ${colors.mainGreen}`,
      }}
    >
      {children}
    </h2>
  );
}
