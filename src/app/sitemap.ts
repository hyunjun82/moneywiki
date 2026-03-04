import { MetadataRoute } from "next";
import { getAllWikiParams } from "@/lib/wiki";
import { hubArticles, spokeArticles } from "@/data/articles";

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

  // 카테고리 허브 페이지 (/세금, /부동산 등)
  const hubUrls = Object.entries(hubArticles)
    .filter(([, hub]) => hub.title && hub.spokes.length > 0)
    .map(([slug]) => ({
      url: `${baseUrl}/${encodeURIComponent(slug)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // 카테고리 스포크 페이지 (/세금/부양가족-공제-연말정산 등)
  const spokeUrls = Object.entries(spokeArticles).flatMap(([catSlug, spokes]) =>
    Object.keys(spokes).map((spokeSlug) => ({
      url: `${baseUrl}/${encodeURIComponent(catSlug)}/${encodeURIComponent(spokeSlug)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...staticUrls, ...wikiUrls, ...hubUrls, ...spokeUrls];
}
