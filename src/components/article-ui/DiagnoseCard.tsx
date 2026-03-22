"use client";

import { useState } from "react";
import { colors } from "./styles";

interface DiagnoseOption {
  label: string;
  desc: string;
  pros: string[];
  cons: string[];
  best: string;
}

interface DiagnoseCardProps {
  question: string;
  options: DiagnoseOption[];
}

export function DiagnoseCard({ question, options }: DiagnoseCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: "1.3rem",
        margin: "1.2rem 0",
        backgroundColor: "#fff",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 700, color: colors.heading, marginBottom: 14, lineHeight: 1.6 }}>
        {question}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: selected !== null ? 16 : 0 }}>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              padding: "10px 14px",
              border: `1px solid ${selected === i ? colors.mainGreen : colors.line}`,
              borderRadius: 8,
              backgroundColor: selected === i ? colors.greenBg : "#fff",
              color: selected === i ? colors.mainGreen : colors.body,
              fontSize: 14,
              fontWeight: selected === i ? 600 : 400,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: colors.greenBg,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
          }}
        >
          <p style={{ fontSize: 14, color: colors.greenText, marginBottom: 10, lineHeight: 1.7 }}>
            {options[selected].desc}
          </p>

          <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: colors.mainGreen, marginBottom: 4 }}>장점</p>
              {options[selected].pros.map((p, i) => (
                <p key={i} style={{ fontSize: 13, color: colors.greenText, margin: "2px 0", lineHeight: 1.6 }}>
                  {p}
                </p>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", marginBottom: 4 }}>단점</p>
              {options[selected].cons.map((c, i) => (
                <p key={i} style={{ fontSize: 13, color: colors.sub, margin: "2px 0", lineHeight: 1.6 }}>
                  {c}
                </p>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 13, fontWeight: 600, color: colors.mainGreen, margin: 0, lineHeight: 1.6 }}>
            {options[selected].best}
          </p>
        </div>
      )}
    </div>
  );
}
