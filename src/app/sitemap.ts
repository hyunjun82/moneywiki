import { MetadataRoute } from "next";
import { getAllWikiSlugs } from "@/lib/wiki";

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

  // 카테고리 페이지들
  const categories = ["경제", "부동산", "세금", "법률", "금융", "근로"];

  // 위키 문서들 - 동적으로 가져오기
  const wikiSlugs = getAllWikiSlugs();

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const wikiUrls = wikiSlugs.map((slug) => ({
    url: `${baseUrl}/w/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticUrls, ...categoryUrls, ...wikiUrls];
}
