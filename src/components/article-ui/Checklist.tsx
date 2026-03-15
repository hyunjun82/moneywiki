"use client";

import { useState } from "react";
import { colors } from "./styles";

interface ChecklistProps {
  items: string[];
}

export function Checklist({ items }: ChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const toggle = (idx: number) =>
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  return (
    <div
      style={{
        border: `1px solid ${colors.line}`,
        borderRadius: 10,
        padding: "1rem 1.2rem",
        margin: "1.2rem 0",
        backgroundColor: "#fff",
      }}
    >
      {items.map((item, i) => (
        <label
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            padding: "6px 0",
            fontSize: 15,
            color: checked[i] ? colors.muted : colors.body,
            textDecoration: checked[i] ? "line-through" : "none",
            lineHeight: 1.6,
          }}
        >
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => toggle(i)}
            style={{
              width: 17,
              height: 17,
              accentColor: colors.mainGreen,
              flexShrink: 0,
            }}
          />
          {item}
        </label>
      ))}
    </div>
  );
}
