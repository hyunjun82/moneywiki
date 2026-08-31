import { MetadataRoute } from "next";
import { getAllWikiParams } from "@/lib/wiki";
import { getAllArticleSlugs } from "@/lib/articles";
import { ALL_ITEMS, CATEGORIES, itemsIn } from "@/data/download";
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
      // 금시세 섹션 — 날짜 없는 고정 허브 4개
      {
                url: `${baseUrl}/gold`,
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 0.95,
      },
      ...["buy", "sell"].map((p) => ({
                url: `${baseUrl}/gold/${p}`,
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 0.85,
      })),
      {
                url: `${baseUrl}/gold/calculator`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.8,
      },
      // 금시세 뉴스 목록
      {
                url: `${baseUrl}/gold/news`,
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 0.8,
      },
      // 환율노트 — 날짜 없는 고정 허브 2개
      {
                url: `${baseUrl}/fx`,
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 0.9,
      },
      {
                url: `${baseUrl}/fx/banks`,
                lastModified: new Date(),
                changeFrequency: "daily" as const,
                priority: 0.8,
      },
      // 로또 번호 추천 — 추첨기 2개
      {
                url: `${baseUrl}/lotto`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.8,
      },
      {
                url: `${baseUrl}/lotto/tool`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.75,
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

  // 금시세 일일 기사 (src/data/gold-news/*.json)
  const goldNewsDir = path.join(process.cwd(), "src/data/gold-news");
  let goldNewsUrls: MetadataRoute.Sitemap = [];
  if (fs.existsSync(goldNewsDir)) {
    goldNewsUrls = fs
      .readdirSync(goldNewsDir)
      .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
      .map((f) => ({
        url: `${baseUrl}/gold/news/${f.replace(".json", "")}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
      }));
  }

  // 다운로드 색인 — 섹션을 만들 때 여기 등록을 빠뜨려서 346장이 통째로 사이트맵 밖에 있었다.
  const downloadUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/download`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    // 항목이 0개인 카테고리는 넣지 않는다. 빈 목록을 색인 요청하면 soft 404 다.
    ...CATEGORIES.filter((c) => itemsIn(c).length > 0).map((c) => ({
      url: `${baseUrl}/download/${c}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...ALL_ITEMS.map((it) => ({
      url: `${baseUrl}/download/${it.category}/${encodeURIComponent(it.slug)}`,
      lastModified: new Date(it.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticUrls, ...goldNewsUrls, ...wikiUrls, ...tsxUrls, ...articleUrls, ...downloadUrls];
}
