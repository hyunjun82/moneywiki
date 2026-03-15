"use client";

import { colors } from "./styles";

interface BorderBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function BorderBox({ title, children }: BorderBoxProps) {
  return (
    <div
      style={{
        border: `1px solid ${colors.line}`,
        borderRadius: 10,
        padding: "1.1rem 1.2rem",
        margin: "1.2rem 0",
        backgroundColor: colors.bgFaint,
      }}
    >
      {title && (
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: colors.heading,
            marginBottom: 8,
          }}
        >
          {title}
        </p>
      )}
      <div style={{ fontSize: 15, color: colors.body, lineHeight: 2.0 }}>
        {children}
      </div>
    </div>
  );
}
