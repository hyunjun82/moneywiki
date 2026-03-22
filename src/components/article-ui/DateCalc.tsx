"use client";

import { useState } from "react";
import { colors } from "./styles";

interface DateCalcProps {
  title?: string;
  label: string;
  calculate: (date: string) => { label: string; value: string }[];
  note?: string;
}

export function DateCalc({ title, label, calculate, note }: DateCalcProps) {
  const [date, setDate] = useState("");
  const results = date ? calculate(date) : [];

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
      {title && (
        <p style={{ fontSize: 15, fontWeight: 700, color: colors.heading, marginBottom: 14 }}>
          {title}
        </p>
      )}

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: colors.body, fontWeight: 500, display: "block", marginBottom: 6 }}>
          {label}
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: `1px solid ${colors.line}`,
            borderRadius: 8,
            fontSize: 14,
            color: colors.body,
            boxSizing: "border-box",
          }}
        />
      </div>

      {results.length > 0 && (
        <div
          style={{
            padding: "0.9rem 1rem",
            backgroundColor: colors.greenBg,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
          }}
        >
          {results.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 0",
              }}
            >
              <span style={{ fontSize: 13, color: colors.greenText, fontWeight: 500 }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: colors.mainGreen }}>{r.value}</span>
            </div>
          ))}
        </div>
      )}

      {note && (
        <p style={{ fontSize: 11.5, color: colors.muted, marginTop: 8, lineHeight: 1.6 }}>
          {note}
        </p>
      )}
    </div>
  );
}
