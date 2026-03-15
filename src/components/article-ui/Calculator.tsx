"use client";

import { useState } from "react";
import { colors } from "./styles";

interface SliderConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  format: (v: number) => string;
}

interface ResultConfig {
  label: string;
  getValue: (inputs: Record<string, number>) => number;
  format: (v: number) => string;
  highlight?: boolean;
}

interface CalculatorProps {
  title?: string;
  sliders: SliderConfig[];
  results: ResultConfig[];
  note?: string;
}

export function Calculator({ title, sliders, results, note }: CalculatorProps) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const s of sliders) init[s.id] = s.defaultValue;
    return init;
  });

  const update = (id: string, v: number) =>
    setValues((prev) => ({ ...prev, [id]: v }));

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
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: colors.heading,
            marginBottom: 16,
          }}
        >
          {title}
        </p>
      )}

      {/* 슬라이더 영역 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {sliders.map((s) => (
          <div key={s.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 13, color: colors.body, fontWeight: 500 }}>
                {s.label}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: colors.mainGreen,
                  fontWeight: 700,
                }}
              >
                {s.format(values[s.id])}
              </span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={values[s.id]}
              onChange={(e) => update(s.id, Number(e.target.value))}
              style={{ width: "100%", accentColor: colors.mainGreen }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: colors.muted,
                marginTop: 2,
              }}
            >
              <span>{s.format(s.min)}</span>
              <span>{s.format(s.max)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 결과 영역 */}
      <div
        style={{
          marginTop: 18,
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
            <span
              style={{
                fontSize: 13,
                color: colors.greenText,
                fontWeight: 500,
              }}
            >
              {r.label}
            </span>
            <span
              style={{
                fontSize: r.highlight ? 18 : 14,
                fontWeight: 700,
                color: r.highlight ? colors.mainGreen : colors.greenText,
              }}
            >
              {r.format(r.getValue(values))}
            </span>
          </div>
        ))}
      </div>

      {note && (
        <p
          style={{
            fontSize: 11.5,
            color: colors.muted,
            marginTop: 8,
            lineHeight: 1.6,
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}
