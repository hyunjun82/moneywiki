import { MetadataRoute } from "next";
import { getAllWikiParams } from "@/lib/wiki";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jjyu.co.kr";

  // 정적 페이지 (메인만)
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 위키 문서들 - /w/키워드 형식 (카테고리 없이)
  const wikiParams = getAllWikiParams();

  const wikiUrls = wikiParams.map((p) => ({
    url: `${baseUrl}/w/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticUrls, ...wikiUrls];
}
