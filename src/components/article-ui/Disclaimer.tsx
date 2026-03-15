"use client";

import { colors } from "./styles";

interface DisclaimerProps {
  text: string;
}

export function Disclaimer({ text }: DisclaimerProps) {
  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "0.8rem 1rem",
        backgroundColor: colors.bgFaint,
        borderRadius: 8,
        border: `1px solid ${colors.lineFaint}`,
      }}
    >
      <p
        style={{
          fontSize: 11.5,
          color: colors.muted,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}
