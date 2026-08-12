"use client";

import { useState } from "react";
import Link from "next/link";
import { tokens } from "./tokens";
import type { EdgeCase, LegalReference, GlossaryItem } from "@/data/articles/types";

interface Props {
  edgeCases?: EdgeCase[];
  legalBasis?: LegalReference[];
  glossary?: GlossaryItem[];
}

/**
 * EdgeCases — 보충 정보 (접힘/펼침)
 *
 * 핵심 검색자가 아닌, 예외 케이스/법령 근거/용어 정의가 필요한 사람만 본다.
 * 기본은 접힘 상태 → "내가 그 케이스다" 싶은 사람만 펼친다.
 */
export function EdgeCases({ edgeCases, legalBasis, glossary }: Props) {
  if (!edgeCases?.length && !legalBasis?.length && !glossary?.length) {
    return null;
  }

  return (
    <section
      aria-label="보충 정보"
      style={{
        marginBottom: tokens.space.xl,
        display: "flex",
        flexDirection: "column",
        gap: tokens.space.sm,
      }}
    >
      {edgeCases && edgeCases.length > 0 && (
        <Collapsible
          title="내 상황이 좀 다른데 (예외 케이스)"
          count={edgeCases.length}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tokens.space.md,
            }}
          >
            {edgeCases.map((c, i) => (
              <div key={i}>
                <p
                  style={{
                    fontSize: tokens.font.small,
                    color: tokens.color.primaryDeep,
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: tokens.space.xs,
                  }}
                >
                  Q. {c.scenario}
                </p>
                <p
                  style={{
                    fontSize: tokens.font.body - 1,
                    color: tokens.color.text,
                    lineHeight: tokens.font.bodyLine,
                    margin: 0,
                  }}
                >
                  {c.answer}
                  {c.link && (
                    <>
                      {" "}
                      <Link
                        href={`/w/${c.link.slug}`}
                        style={{
                          color: tokens.color.primary,
                          fontWeight: 600,
                          textDecoration: "underline",
                          textUnderlineOffset: 3,
                        }}
                      >
                        {c.link.label}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </Collapsible>
      )}

      {legalBasis && legalBasis.length > 0 && (
        <Collapsible title="법령 근거" count={legalBasis.length}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: tokens.space.sm,
            }}
          >
            {legalBasis.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: tokens.font.body - 1,
                    color: tokens.color.primary,
                    fontWeight: 600,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  {l.law}
                </a>
                {l.excerpt && (
                  <p
                    style={{
                      fontSize: tokens.font.small,
                      color: tokens.color.textMuted,
                      lineHeight: tokens.font.bodyLine,
                      margin: 0,
                      marginTop: tokens.space.xs,
                      paddingLeft: tokens.space.md,
                      borderLeft: `2px solid ${tokens.color.line}`,
                    }}
                  >
                    {l.excerpt}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Collapsible>
      )}

      {glossary && glossary.length > 0 && (
        <Collapsible title="용어 정의" count={glossary.length}>
          <dl
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: tokens.space.md,
            }}
          >
            {glossary.map((g, i) => (
              <div key={i}>
                <dt
                  style={{
                    fontSize: tokens.font.small,
                    color: tokens.color.heading,
                    fontWeight: 700,
                    marginBottom: tokens.space.xs,
                  }}
                >
                  {g.term}
                </dt>
                <dd
                  style={{
                    fontSize: tokens.font.body - 1,
                    color: tokens.color.text,
                    lineHeight: tokens.font.bodyLine,
                    margin: 0,
                  }}
                >
                  {g.definition}
                </dd>
              </div>
            ))}
          </dl>
        </Collapsible>
      )}
    </section>
  );
}

function Collapsible({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: `1px solid ${tokens.color.line}`,
        borderRadius: tokens.radius.md,
        overflow: "hidden",
        background: tokens.color.bg,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${tokens.space.md} ${tokens.space.lg}`,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: tokens.font.body,
          fontWeight: 600,
          color: tokens.color.heading,
          textAlign: "left",
        }}
      >
        <span>
          {title}
          {typeof count === "number" && (
            <span
              style={{
                marginLeft: tokens.space.sm,
                fontSize: tokens.font.small,
                color: tokens.color.textMuted,
                fontWeight: 400,
              }}
            >
              {count}개
            </span>
          )}
        </span>
        <span
          aria-hidden
          style={{
            fontSize: tokens.font.small,
            color: tokens.color.textMuted,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: `${tokens.space.md} ${tokens.space.lg} ${tokens.space.lg}`,
            borderTop: `1px solid ${tokens.color.lineFaint}`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
