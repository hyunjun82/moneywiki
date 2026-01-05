import { MetadataRoute } from "next";
import { getAllWikiParams } from "@/lib/wiki";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jjyu.co.kr";

  // 정적 페이지들
  const staticPages = [
    "",
    "/calc",
    "/calc/severance",
    "/calc/salary",
    "/calc/rent",
    "/calc/loan",
  ];

  // 위키 문서들 - 카테고리 포함 URL
  const wikiParams = getAllWikiParams();

  // 카테고리 목록 추출
  const categories = [...new Set(wikiParams.map((p) => p.category))];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : 0.8,
  }));

  // 카테고리 인덱스 페이지 (/w/부동산, /w/세금 등)
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/w/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 위키 문서들 (/w/부동산/임대차보호법 형식)
  const wikiUrls = wikiParams.map((p) => ({
    url: `${baseUrl}/w/${encodeURIComponent(p.category)}/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticUrls, ...categoryUrls, ...wikiUrls];
}
