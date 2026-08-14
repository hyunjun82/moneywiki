import { MetadataRoute } from "next";
import { getAllWikiParams } from "@/lib/wiki";
import { getAllArticleSlugs } from "@/lib/articles";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
      const baseUrl = "https://www.jjyu.co.kr";

  // 정적 페이지
  const staticUrls: MetadataRoute.Sitemap = [
      {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: "daily",
                priority: 1,
      },
      // 양식 다운로드 허브
      {
                url: `${baseUrl}/forms`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.9,
      },
      // 정책 페이지 (privacy는 AdSense 필수)
      ...["about", "privacy", "terms"].map((p) => ({
                url: `${baseUrl}/${p}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.3,
      })),
        ];

  // MD 문서 슬러그
  const wikiParams = getAllWikiParams();
      const mdSlugs = new Set(wikiParams.map((p) => p.slug));

  const wikiUrls: MetadataRoute.Sitemap = wikiParams.map((p) => ({
          url: `${baseUrl}/w/${encodeURIComponent(p.slug)}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
  }));

  // TSX 글 (src/app/w/{slug}/page.tsx) — MD에 없는 것만 추가
  const tsxDir = path.join(process.cwd(), "src/app/w");
      let tsxUrls: MetadataRoute.Sitemap = [];

  if (fs.existsSync(tsxDir)) {
          const dirs = fs.readdirSync(tsxDir).filter((d) => {
                    if (d.startsWith("[") || d.startsWith(".")) return false;
                    const pagePath = path.join(tsxDir, d, "page.tsx");
                    return fs.existsSync(pagePath);
          });

        tsxUrls = dirs
            .filter((slug) => !mdSlugs.has(slug))
            .map((slug) => ({
                        url: `${baseUrl}/w/${encodeURIComponent(slug)}`,
                        lastModified: new Date(),
                        changeFrequency: "weekly" as const,
                        priority: 0.8,
            }));
  }

  // articles 글 (src/data/articles/*.ts) — MD/TSX에 없는 슬러그만 추가
  const tsxSlugs = new Set(tsxUrls.map((u) => u.url));
  const articleUrls: MetadataRoute.Sitemap = getAllArticleSlugs()
    .map((slug) => `${baseUrl}/w/${encodeURIComponent(slug)}`)
    .filter((url) => !tsxSlugs.has(url))
    .filter((url) => {
      const slug = decodeURIComponent(url.slice(`${baseUrl}/w/`.length));
      return !mdSlugs.has(slug);
    })
    .map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticUrls, ...wikiUrls, ...tsxUrls, ...articleUrls];
}
