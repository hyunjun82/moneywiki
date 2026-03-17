"use client";

import { colors } from "./styles";

interface SourceItem {
  name: string;
  href?: string;
}

interface SourceNoteProps {
  sources: SourceItem[];
}

export function SourceNote({ sources }: SourceNoteProps) {
  return (
    <p
      style={{
        fontSize: 12.5,
        color: colors.sub,
        lineHeight: 1.8,
        margin: "1.2rem 0",
        fontStyle: "italic",
      }}
    >
      *이 글은{" "}
      {sources.map((source, i) => (
        <span key={i}>
          {source.href ? (
            <a
              href={source.href}
              style={{ color: colors.mainGreen, textDecoration: "none" }}
            >
              {source.name}
            </a>
          ) : (
            <span style={{ color: colors.mainGreen }}>{source.name}</span>
          )}
          {i < sources.length - 2 && ", "}
          {i === sources.length - 2 && ", "}
        </span>
      ))}
      의 자료를 참고했어요.
    </p>
  );
}
