import Link from "next/link";
import { tokens } from "./tokens";
import { RichText } from "./RichText";
import type { ResolutionStep, Alternative } from "@/data/articles/types";

interface Props {
  steps: ResolutionStep[];
  alternatives?: Alternative[];
}

/**
 * ResolutionFlow — 해결 흐름
 *
 * "지금 당장 할 수 있는 행동"을 단계별로 보여준다.
 * Steps 개수에 따라 단일 단계 / 순서형으로 자동 렌더링.
 * Alternatives 가 있으면 분기형 박스도 함께 보여준다.
 */
export function ResolutionFlow({ steps, alternatives }: Props) {
  return (
    <section
      aria-label="해결 단계"
      style={{ marginBottom: tokens.space.xl }}
    >
      <h2
        style={{
          fontSize: tokens.font.h2,
          color: tokens.color.heading,
          fontWeight: 700,
          margin: 0,
          marginBottom: tokens.space.lg,
          paddingLeft: tokens.space.md,
          borderLeft: `4px solid ${tokens.color.primary}`,
        }}
      >
        지금 할 수 있는 것
      </h2>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: tokens.space.md,
        }}
      >
        {steps.map((step, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: tokens.space.md,
              padding: tokens.space.lg,
              background: tokens.color.bg,
              border: `1px solid ${tokens.color.line}`,
              borderRadius: tokens.radius.md,
            }}
          >
            <div
              aria-hidden
              style={{
                flexShrink: 0,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: tokens.color.primary,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: tokens.font.small,
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontSize: tokens.font.h3,
                  color: tokens.color.heading,
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: tokens.space.sm,
                }}
              >
                {step.title}
              </h3>
              <RichText>{step.body}</RichText>
              {step.action && (
                <a
                  href={step.action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: tokens.space.xs,
                    marginTop: tokens.space.md,
                    padding: `${tokens.space.sm} ${tokens.space.md}`,
                    background: tokens.color.primary,
                    color: "#fff",
                    fontSize: tokens.font.small,
                    fontWeight: 600,
                    textDecoration: "none",
                    borderRadius: tokens.radius.sm,
                  }}
                >
                  {step.action.label}
                  <span style={{ fontSize: tokens.font.tiny, opacity: 0.8 }}>
                    ({step.action.org})
                  </span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      {alternatives && alternatives.length > 0 && (
        <div style={{ marginTop: tokens.space.xl }}>
          <h3
            style={{
              fontSize: tokens.font.h3,
              color: tokens.color.heading,
              fontWeight: 700,
              margin: 0,
              marginBottom: tokens.space.md,
            }}
          >
            상황이 다르다면
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tokens.space.sm,
            }}
          >
            {alternatives.map((alt, i) => (
              <div
                key={i}
                style={{
                  padding: tokens.space.md,
                  background: tokens.color.bgFaint,
                  borderLeft: `3px solid ${tokens.color.primary}`,
                  borderRadius: tokens.radius.sm,
                }}
              >
                <p
                  style={{
                    fontSize: tokens.font.small,
                    color: tokens.color.primaryDeep,
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: tokens.space.xs,
                  }}
                >
                  {alt.condition}
                </p>
                <p
                  style={{
                    fontSize: tokens.font.body - 1,
                    color: tokens.color.text,
                    lineHeight: tokens.font.bodyLine,
                    margin: 0,
                  }}
                >
                  {alt.description}
                  {alt.link && (
                    <>
                      {" "}
                      <Link
                        href={`/w/${alt.link.slug}`}
                        style={{
                          color: tokens.color.primary,
                          fontWeight: 600,
                          textDecoration: "underline",
                          textUnderlineOffset: 3,
                        }}
                      >
                        {alt.link.label}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
