"use client";

import { useState } from "react";
import { colors } from "./styles";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ margin: "1.2rem 0" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              borderBottom: `1px solid ${colors.line}`,
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "14px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.heading,
                  lineHeight: 1.5,
                }}
              >
                Q. {item.q}
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: colors.muted,
                  flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <div
                style={{
                  padding: "0 0 14px",
                  fontSize: 13.5,
                  color: colors.body,
                  lineHeight: 1.95,
                }}
              >
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
