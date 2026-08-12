import Link from "next/link";
import { tokens } from "./tokens";
import type { RelatedQuestion } from "@/data/articles/types";

interface Props {
  items: RelatedQuestion[];
}

/**
 * RelatedQuestions — 자연스러운 거미줄
 *
 * 카테고리 채움용이 아니라, 검색자가 "이게 궁금했어요" 싶은 질문만.
 * 1~5개 권장. 억지 연결 금지.
 */
export function RelatedQuestions({ items }: Props) {
  if (!items?.length) return null;

  return (
    <section
      aria-label="이런 것도 궁금하다면"
      style={{ marginBottom: tokens.space.xl }}
    >
      <h2
        style={{
          fontSize: tokens.font.h3,
          color: tokens.color.heading,
          fontWeight: 700,
          margin: 0,
          marginBottom: tokens.space.md,
        }}
      >
        이런 것도 궁금하다면
      </h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: tokens.space.xs,
        }}
      >
        {items.map((q, i) => (
          <li key={i}>
            <Link
              href={`/w/${q.slug}`}
              style={{
                display: "block",
                padding: `${tokens.space.sm} ${tokens.space.md}`,
                fontSize: tokens.font.body - 1,
                color: tokens.color.text,
                textDecoration: "none",
                borderLeft: `3px solid ${tokens.color.primaryBorder}`,
                background: tokens.color.bgFaint,
                borderRadius: tokens.radius.sm,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: tokens.color.primary, fontWeight: 600 }}>Q.</span>{" "}
              {q.question}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
