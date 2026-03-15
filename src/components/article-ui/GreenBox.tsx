"use client";

import { colors } from "./styles";

interface GreenBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function GreenBox({ title, children }: GreenBoxProps) {
  return (
    <div
      style={{
        backgroundColor: colors.greenBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        padding: "1.1rem 1.2rem",
        margin: "1.2rem 0",
      }}
    >
      {title && (
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: colors.greenText,
            marginBottom: 8,
          }}
        >
          {title}
        </p>
      )}
      <div style={{ fontSize: 13.5, color: colors.greenText, lineHeight: 1.95 }}>
        {children}
      </div>
    </div>
  );
}
