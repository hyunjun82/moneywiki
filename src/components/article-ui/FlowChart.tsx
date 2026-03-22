"use client";

import { useState } from "react";
import { colors } from "./styles";

interface FlowNode {
  question: string;
  yes: string | number;
  no: string | number;
}

interface FlowResult {
  id: number;
  text: string;
  color?: "green" | "red" | "gray";
}

interface FlowChartProps {
  nodes: FlowNode[];
  results: FlowResult[];
}

export function FlowChart({ nodes, results }: FlowChartProps) {
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<FlowResult | null>(null);

  const handleAnswer = (next: string | number) => {
    if (typeof next === "string") {
      const found = results.find((r) => r.text === next) || { id: -1, text: next, color: "gray" as const };
      setResult(found);
    } else {
      if (next < nodes.length) {
        setCurrent(next);
      } else {
        const found = results.find((r) => r.id === next);
        setResult(found || null);
      }
    }
  };

  const reset = () => {
    setCurrent(0);
    setResult(null);
  };

  const colorMap = { green: colors.mainGreen, red: "#dc2626", gray: colors.sub };

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
      {result ? (
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: colorMap[result.color || "green"],
              marginBottom: 16,
              lineHeight: 1.6,
            }}
          >
            {result.text}
          </p>
          <button
            onClick={reset}
            style={{
              padding: "8px 20px",
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              backgroundColor: colors.greenBg,
              color: colors.greenText,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            다시 해볼게요
          </button>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: colors.heading, marginBottom: 16, lineHeight: 1.6 }}>
            {nodes[current].question}
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => handleAnswer(nodes[current].yes)}
              style={{
                flex: 1,
                padding: "10px 0",
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                backgroundColor: colors.greenBg,
                color: colors.mainGreen,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              네
            </button>
            <button
              onClick={() => handleAnswer(nodes[current].no)}
              style={{
                flex: 1,
                padding: "10px 0",
                border: `1px solid ${colors.line}`,
                borderRadius: 8,
                backgroundColor: colors.bgFaint,
                color: colors.sub,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              아니요
            </button>
          </div>
          <p style={{ fontSize: 11.5, color: colors.muted, marginTop: 10, textAlign: "center" }}>
            {current + 1} / {nodes.length}
          </p>
        </div>
      )}
    </div>
  );
}
