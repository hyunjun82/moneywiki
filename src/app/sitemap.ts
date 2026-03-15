import { MetadataRoute } from "next";
import { getAllWikiParams } from "@/lib/wiki";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jjyu.co.kr";

  // 정적 페이지
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 기존 wiki MD 문서 — /w/{slug}
  const wikiParams = getAllWikiParams();
  const wikiUrls = wikiParams.map((p) => ({
    url: `${baseUrl}/w/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...wikiUrls];
}
