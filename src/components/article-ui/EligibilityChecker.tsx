"use client";

import { useState } from "react";
import { colors } from "./styles";

interface CheckItem {
  id: string;
  label: string;
}

interface EligibilityCheckerProps {
  items?: CheckItem[];
  allMatchText?: string;
  partialMatchText?: string;
  [key: string]: unknown;
}

export function EligibilityChecker({
  items = [],
  allMatchText = "모든 조건을 충족해요! 신청 자격이 있어요.",
  partialMatchText = "일부 조건이 충족되지 않았어요. 해당 항목을 다시 확인해 보세요.",
}: EligibilityCheckerProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const allChecked = checkedCount === items.length;
  const hasAny = checkedCount > 0;

  return (
    <div
      style={{
        border: `1px solid ${colors.line}`,
        borderRadius: 12,
        padding: "1.2rem",
        margin: "1.2rem 0",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => (
          <label
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              fontSize: 15,
              color: colors.body,
              lineHeight: 1.7,
            }}
          >
            <input
              type="checkbox"
              checked={!!checked[item.id]}
              onChange={() => toggle(item.id)}
              style={{
                width: 18,
                height: 18,
                accentColor: colors.mainGreen,
                flexShrink: 0,
              }}
            />
            {item.label}
          </label>
        ))}
      </div>

      {hasAny && (
        <div
          style={{
            marginTop: 14,
            padding: "0.8rem 1rem",
            borderRadius: 8,
            backgroundColor: allChecked ? colors.greenBg : "#FEF3C7",
            border: `1px solid ${allChecked ? colors.border : "#FDE68A"}`,
          }}
        >
          <p
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: allChecked ? colors.greenText : "#92400E",
              margin: 0,
            }}
          >
            {checkedCount}/{items.length}개 충족
            {allChecked ? " — " + allMatchText : " — " + partialMatchText}
          </p>
        </div>
      )}
    </div>
  );
}
