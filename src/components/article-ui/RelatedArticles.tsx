"use client";

import { colors } from "./styles";
import { ArticleAd } from "./ArticleAd";
// 페이지마다 손으로 적어 둔 관련 글 목록에 없는 주소가 섞여 있다(429개).
// scripts/build-link-fixes.mjs 가 만든 표로, 값이 있으면 그 글로 보내고
// 빈 값이면 그 항목을 아예 그리지 않는다. 없는 곳으로 보내느니 안 보이는 편이 낫다.
import relatedFixes from "@/data/related-fixes.json";

export interface RelatedItem {
  slug: string;
  title: string;
  description: string;
}

interface Props {
  heading?: string;
  items: RelatedItem[];
}

export function RelatedArticles({
  heading = "관련 정보도 확인해 보세요",
  items,
}: Props) {
  return (
    <>
      <ArticleAd position="mid" />
    <div
      style={{
        border: `1px solid ${colors.line}`,
        borderRadius: 12,
        padding: "24px 20px",
        marginBottom: 28,
      }}
    >
      <p
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: colors.heading,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 17 }}>&#128203;</span>
        {heading}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item) => {
          const fixed = (relatedFixes as Record<string, string>)[item.slug];
          // 표에 없으면 살아 있는 주소다. 표에 있고 값이 비었으면 갈 곳이 없다.
          if (fixed === "") return null;
          const slug = fixed ?? item.slug;
          return (
          <a
            key={item.slug}
            href={`/w/${encodeURIComponent(slug)}`}
            style={{
              display: "block",
              padding: "14px 16px",
              borderRadius: 8,
              backgroundColor: colors.bgFaint,
              textDecoration: "none",
              borderLeft: `3px solid ${colors.mainGreen}`,
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: colors.mainGreen,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 13 }}>&#10095;</span>
              {item.title}
            </p>
            <p
              style={{
                fontSize: 13.5,
                color: colors.sub,
                lineHeight: 1.65,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.description}
            </p>
          </a>
          );
        })}
      </div>
    </div>
    </>
  );
}
