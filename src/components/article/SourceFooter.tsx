import { tokens } from "./tokens";
import type { SourceItem } from "@/data/articles/types";

interface Props {
  sources: SourceItem[];
  lastVerified: string;
}

/**
 * SourceFooter — 출처 + 마지막 사실확인 날짜
 *
 * 글 하단에 신뢰성 시그널.
 * 모든 출처는 공식 기관 URL이어야 한다 (qa 에이전트가 검증).
 */
export function SourceFooter({ sources, lastVerified }: Props) {
  return (
    <footer
      aria-label="출처 및 사실확인"
      style={{
        marginTop: tokens.space.xxl,
        paddingTop: tokens.space.lg,
        borderTop: `1px solid ${tokens.color.line}`,
      }}
    >
      <h2
        style={{
          fontSize: tokens.font.small,
          fontWeight: 700,
          color: tokens.color.heading,
          margin: 0,
          marginBottom: tokens.space.md,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        출처
      </h2>
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
        {sources.map((s, i) => (
          <li
            key={i}
            style={{
              fontSize: tokens.font.small,
              color: tokens.color.textMuted,
              lineHeight: 1.6,
            }}
          >
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: tokens.color.primary,
                textDecoration: "underline",
                textUnderlineOffset: 3,
                fontWeight: 500,
              }}
            >
              {s.title}
            </a>
            <span style={{ marginLeft: tokens.space.xs, color: tokens.color.textFaint }}>
              · {s.org}
            </span>
          </li>
        ))}
      </ul>
      <p
        style={{
          fontSize: tokens.font.tiny,
          color: tokens.color.textFaint,
          margin: 0,
          marginTop: tokens.space.md,
        }}
      >
        마지막 사실확인: {lastVerified}
      </p>
    </footer>
  );
}
