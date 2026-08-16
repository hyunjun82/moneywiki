import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import NewsView, { type NewsDoc } from "@/components/gold/NewsView";

/**
 * /gold/news/[date] — 금시세 일일 기사.
 *
 * 데이터: src/data/gold-news/YYYY-MM-DD.json (generate-news.mjs 가 매일 아침 생성).
 * 빌드 시점에 존재하는 날짜만 정적으로 만들어진다.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

const DIR = path.join(process.cwd(), "src/data/gold-news");

function listDates(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .map((f) => f.replace(".json", ""))
    .sort()
    .reverse();
}

function loadDoc(date: string): NewsDoc | null {
  const p = path.join(DIR, `${date}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")) as NewsDoc;
}

export function generateStaticParams() {
  return listDates().map((date) => ({ date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const doc = loadDoc(date);
  if (!doc) return { title: "금시세 뉴스" };
  return {
    title: doc.title,
    description: doc.description,
    keywords: ["금시세", "금값", "오늘의 금시세", "오늘 금값", "금 한 돈 가격", "순금 시세"],
    alternates: { canonical: `/gold/news/${date}` },
    openGraph: {
      type: "article",
      url: `/gold/news/${date}`,
      title: doc.title,
      description: doc.description,
    },
  };
}

export default async function GoldNewsPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const doc = loadDoc(date);
  if (!doc) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: doc.title,
    datePublished: `${doc.date}T06:00:00+09:00`,
    dateModified: doc.updatedAt ?? `${doc.date}T06:00:00+09:00`,
    author: { "@type": "Organization", name: "머니위키" },
    publisher: { "@type": "Organization", name: "머니위키" },
    mainEntityOfPage: `https://www.jjyu.co.kr/gold/news/${doc.date}`,
    description: doc.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsView doc={doc} />
    </>
  );
}
