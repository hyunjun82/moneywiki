"use client";

import { colors } from "./styles";

interface StepItem {
  title: string;
  desc: string;
  tip?: string;
  link?: { label: string; href: string };
}

interface StepsProps {
  steps: StepItem[];
}

export function Steps({ steps }: StepsProps) {
  return (
    <div style={{ margin: "1.2rem 0" }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 14,
            marginBottom: i < steps.length - 1 ? 0 : undefined,
          }}
        >
          {/* 세로 라인 + 번호 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: colors.mainGreen,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 2,
                  flex: 1,
                  backgroundColor: colors.line,
                  minHeight: 20,
                }}
              />
            )}
          </div>

          {/* 내용 */}
          <div style={{ paddingBottom: i < steps.length - 1 ? 20 : 0, flex: 1 }}>
            <p
              style={{
                fontSize: 15.5,
                fontWeight: 700,
                color: colors.heading,
                margin: "2px 0 4px",
              }}
            >
              {step.title}
            </p>
            <p
              style={{
                fontSize: 15,
                color: colors.body,
                lineHeight: 1.95,
                margin: 0,
              }}
            >
              {step.desc}
            </p>
            {step.tip && (
              <p
                style={{
                  fontSize: 12.5,
                  color: colors.mainGreen,
                  fontWeight: 500,
                  marginTop: 4,
                }}
              >
                TIP: {step.tip}
              </p>
            )}
            {step.link && (
              <a
                href={step.link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  padding: "6px 14px",
                  backgroundColor: colors.mainGreen,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 6,
                  textDecoration: "none",
                }}
              >
                {step.link.label} →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
