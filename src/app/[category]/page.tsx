export const dynamic = "force-static";

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getHubArticle, getSpokesByCategory } from "@/data/articles";
import { categories } from "@/data/categories";
import AdSense, { AD_SLOTS } from "@/components/AdSense";

function formatKoreanDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const slug = decodeURIComponent(category);
  const hub = getHubArticle(slug);
  if (!hub) return {};
  return {
    title: hub.title,
    description: hub.metaDescription,
    authors: [{ name: "머니위키 에디터", url: "https://www.jjyu.co.kr/about" }],
    openGraph: {
      title: hub.title,
      description: hub.metaDescription,
      url: `https://www.jjyu.co.kr/${slug}`,
      siteName: "머니위키",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: hub.title,
      description: hub.metaDescription,
    },
    alternates: {
      canonical: `https://www.jjyu.co.kr/${slug}`,
    },
  };
}

export default async function HubPage({ params }: PageProps) {
  const { category } = await params;
  const slug = decodeURIComponent(category);
  const hub = getHubArticle(slug);
  const catInfo = categories.find((c) => c.slug === slug);

  if (!hub || !catInfo) notFound();

  const spokeArticles = getSpokesByCategory(slug);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1B3A5C]">
              홈
            </Link>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-900 font-medium">{catInfo.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-[#EDF2F8] to-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <span className="inline-block bg-[#1B3A5C] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {catInfo.icon} {catInfo.name} 가이드
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {hub.h1}
          </h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed max-w-2xl">
            {hub.heroDescription}
          </p>
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
            <Link
              href="/about"
              className="font-medium text-gray-500 hover:text-[#1B3A5C] transition-colors"
            >
              머니위키 에디터
            </Link>
            {hub.dateModified && (
              <>
                <span>|</span>
                <time dateTime={hub.dateModified}>
                  {formatKoreanDate(hub.dateModified)} 업데이트
                </time>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Ad: Hero 아래 */}
      <div className="mx-auto max-w-4xl px-4 py-4">
        <AdSense slot={AD_SLOTS.HORIZONTAL} className="w-full" />
      </div>

      {/* Spoke Articles List */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">상세 가이드</h2>
        <div className="grid gap-3">
          {hub.spokes.map((spoke) => (
            <Link
              key={spoke.slug}
              href={`/${slug}/${spoke.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#B8D0E8] hover:shadow-md"
            >
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-[#1B3A5C] transition-colors">
                  {spoke.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {spoke.description}
                </p>
              </div>
              <svg
                className="h-5 w-5 shrink-0 text-gray-300 group-hover:text-[#1B3A5C] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* 인기 계산기 (해당 카테고리에 있으면) */}
      {spokeArticles.some((s) => s.calculator) && (
        <section className="border-t bg-gray-50/50">
          <div className="mx-auto max-w-4xl px-4 py-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {catInfo.name} 계산기
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {spokeArticles
                .filter((s) => s.calculator)
                .slice(0, 6)
                .map((spoke) => (
                  <Link
                    key={spoke.slug}
                    href={`/${slug}/${spoke.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#B8D0E8] hover:shadow-md"
                  >
                    <span className="w-10 h-10 bg-[#EDF2F8] rounded-lg flex items-center justify-center text-lg">
                      🧮
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#1B3A5C] truncate transition-colors">
                        {spoke.title.split("|")[0].trim()}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad: 하단 */}
      <div className="mx-auto max-w-4xl px-4 py-4">
        <AdSense slot={AD_SLOTS.VERTICAL} className="w-full" />
      </div>

      {/* Back Link */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1B3A5C] transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          전체 카테고리 보기
        </Link>
      </div>

      {/* BreadcrumbList 스키마 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: "https://www.jjyu.co.kr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: catInfo.name,
                item: `https://www.jjyu.co.kr/${slug}`,
              },
            ],
          }),
        }}
      />

      {/* ItemList 스키마 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${catInfo.name} 가이드`,
            description: hub.description,
            numberOfItems: hub.spokes.length,
            itemListElement: hub.spokes.map((spoke, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: spoke.title,
              url: `https://www.jjyu.co.kr/${slug}/${spoke.slug}`,
            })),
          }),
        }}
      />
    </>
  );
}
