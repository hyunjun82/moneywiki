import type { Metadata } from "next";
import NewsView from "@/components/fx/NewsView";
import { listFxNewsDates, loadFxNews } from "@/components/fx/newsData";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/fx/ld";
import { korDate } from "@/components/fx/fxCore";

/**
 * /fx/news/[date] — 환율 일일 기사. 데이터: src/data/fx-news/YYYY-MM-DD.json (scripts/fx/generate-news.mjs).
 * 빌드 시점에 있는 날짜만 정적으로 만든다.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return listFxNewsDates().map((date) => ({ date }));
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }): Promise<Metadata> {
  const { date } = await params;
  const doc = loadFxNews(date);
  if (!doc) return { title: "환율 기사" };
  return {
    title: { absolute: doc.title },
    description: doc.description,
    keywords: ["오늘 환율", "달러 환율", "엔화 환율", "환율", "환율조회", `${korDate(date)} 환율`],
    alternates: { canonical: `/fx/news/${date}` },
    openGraph: { type: "article", url: `/fx/news/${date}`, title: doc.title, description: doc.description },
  };
}

export default async function FxNewsPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const doc = loadFxNews(date);
  if (!doc) return null;
  const dates = listFxNewsDates(); // 최신 → 과거
  const i = dates.indexOf(date);
  const prev = i >= 0 && i + 1 < dates.length ? dates[i + 1] : null;
  const next = i > 0 ? dates[i - 1] : null;
  const published = doc.publishedAt ?? `${doc.date}T09:30:00+09:00`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: doc.title,
          datePublished: published,
          dateModified: doc.updatedAt ?? published,
          author: { "@type": "Organization", name: "머니위키" },
          publisher: { "@type": "Organization", name: "머니위키" },
          mainEntityOfPage: `https://www.jjyu.co.kr/fx/news/${doc.date}`,
          description: doc.description,
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "머니위키", path: "/" },
          { name: "오늘 환율", path: "/fx" },
          { name: "환율 기사", path: "/fx/news" },
          { name: `${korDate(doc.date)} 환율`, path: `/fx/news/${doc.date}` },
        ])}
      />
      {doc.faq?.length ? <JsonLd data={faqLd(doc.faq)} /> : null}
      <NewsView doc={doc} prev={prev} next={next} />
    </>
  );
}
