import Link from "next/link";
import { tokens } from "./tokens";
import { RichText } from "./RichText";
import type { MainSection } from "@/data/articles/types";

interface Props {
  items: MainSection[];
}

/**
 * MainSections — 본문 H2 × N개 (SGE "관련 질문" 트리거)
 *
 * 핵심 원칙:
 * - 모든 heading은 질문형 (~인가요? ~되나요? ~이유?)
 * - 모든 heading이 메인 키워드를 공유 (일관성)
 * - body 첫 문장은 결론. SGE/Featured Snippet 발췌 가능.
 */
export function MainSections({ items }: Props) {
  return (
    <section aria-label="본문" style={{ marginBottom: tokens.space.xl }}>
      {items.map((s, i) => (
        <article
          key={i}
          style={{
            marginBottom: tokens.space.xl,
          }}
        >
          <h2
            style={{
              fontSize: tokens.font.h2,
              fontWeight: 700,
              color: tokens.color.heading,
              margin: 0,
              marginBottom: tokens.space.md,
              paddingLeft: tokens.space.md,
              borderLeft: `4px solid ${tokens.color.primary}`,
              lineHeight: 1.4,
            }}
          >
            {s.heading}
          </h2>

          {s.highlight && (
            <p
              style={{
                margin: 0,
                marginBottom: tokens.space.md,
                padding: tokens.space.md,
                background: tokens.color.primarySoft,
                borderLeft: `3px solid ${tokens.color.primary}`,
                borderRadius: tokens.radius.sm,
                fontSize: tokens.font.body,
                fontWeight: 600,
                color: tokens.color.primaryDeep,
                lineHeight: 1.6,
              }}
            >
              {s.highlight}
            </p>
          )}

          <div>
            <RichText>{s.body}</RichText>
          </div>

          {s.link && (
            <p style={{ marginTop: tokens.space.md, fontSize: tokens.font.body - 1 }}>
              <Link
                href={`/w/${s.link.slug}`}
                style={{
                  color: tokens.color.primary,
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                {s.link.label} →
              </Link>
            </p>
          )}
        </article>
      ))}
    </section>
  );
}
