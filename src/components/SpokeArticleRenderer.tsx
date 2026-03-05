import { Fragment } from "react";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { CategorySidebar } from "@/components/CategorySidebar";
import { AuthorBio } from "@/components/AuthorBio";
import AdSense, { AD_SLOTS } from "@/components/AdSense";
import ShareButtons from "@/components/ShareButtons";
import { ArticleViz } from "@/components/ArticleViz";
import { categories } from "@/data/categories";
import type { SpokeArticle } from "@/lib/types";

function formatKoreanDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

const SECTION_ICONS: Record<string, string> = {
  핵심: "📌", 요약: "📋", 조건: "✅", 자격: "✅", 요건: "✅",
  신청: "📝", 절차: "📝", 방법: "📝", 계산: "🧮", 금액: "💰",
  세율: "📊", 비교: "⚖️", 절세: "💡", 주의: "⚠️", 개요: "📖",
  금리: "📈", 한도: "📐", 비용: "💳", 기간: "📅",
};

function getSectionIcon(title: string): string {
  for (const [keyword, icon] of Object.entries(SECTION_ICONS)) {
    if (title.includes(keyword)) return icon;
  }
  return "📖";
}

interface Props {
  article: SpokeArticle;
  slug: string;
}

export default function SpokeArticleRenderer({ article, slug }: Props) {
  const catSlug = article.categorySlug;
  const catInfo = categories.find((c) => c.slug === catSlug);
  const url = `https://www.jjyu.co.kr/w/${slug}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1B3A5C]">홈</Link>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {catInfo && (
              <>
                <Link href={`/${catSlug}`} className="hover:text-[#1B3A5C]">{catInfo.name}</Link>
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{slug}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-[#EDF2F8] to-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          {catInfo && (
            <span className="inline-block bg-[#1B3A5C] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {catInfo.icon} {catInfo.name}
            </span>
          )}
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {article.h1}
          </h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed sm:text-lg">
            {article.heroDescription}
          </p>
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
            <Link href="/about" className="font-medium text-gray-500 hover:text-[#1B3A5C] transition-colors">
              머니위키 에디터
            </Link>
            {article.datePublished && (
              <>
                <span>|</span>
                <time dateTime={article.dateModified || article.datePublished}>
                  {formatKoreanDate(article.datePublished)} 작성
                </time>
              </>
            )}
            {article.dateModified && article.dateModified !== article.datePublished && (
              <>
                <span>|</span>
                <time dateTime={article.dateModified}>{formatKoreanDate(article.dateModified)} 수정</time>
              </>
            )}
          </div>
          <div className="mt-4">
            <ShareButtons title={article.title} url={url} description={article.description} />
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="mx-auto max-w-3xl px-4 py-4">
        <AdSense slot={AD_SLOTS.HORIZONTAL} className="w-full" />
      </div>

      {/* 2-column layout */}
      <div className="mx-auto max-w-6xl px-4 lg:flex lg:gap-10">
        <div className="flex-1 max-w-3xl">
          <article>
            {article.sections.map((section, i) => {
              const icon = getSectionIcon(section.title);
              return (
                <Fragment key={i}>
                  <section className="mb-8">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDF2F8] text-base">
                        {icon}
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <div className="pl-[42px]">
                      <ArticleViz slug={slug} position={`section-${i}`} />
                    </div>
                    <div className="text-[15px] text-gray-600 leading-[1.85] sm:text-[16px] pl-[42px] space-y-3">
                      {section.content.split("\n\n").map((paragraph, pi) => (
                        <p key={pi}>{paragraph}</p>
                      ))}
                    </div>
                    {i < article.sections.length - 1 && <hr className="mt-8 border-gray-200" />}
                  </section>
                </Fragment>
              );
            })}
            <div className="pl-[42px]">
              <ArticleViz slug={slug} position="bottom" />
            </div>
          </article>

          {/* Sources */}
          {article.sources.length > 0 && (
            <section className="mt-4 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                <span>📚</span> 출처 및 참고자료
              </h3>
              <ul className="space-y-1.5 text-sm">
                {article.sources.map((source, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-400">[{i + 1}]</span>
                    <div>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#1B3A5C] hover:underline">
                        {source.name}
                      </a>
                      {source.date && <span className="text-gray-400 ml-2">({source.date} 확인)</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.faq.length > 0 && <FAQSection items={article.faq} />}

          <div className="mt-8">
            <AdSense slot={AD_SLOTS.VERTICAL} className="w-full" />
          </div>

          <AuthorBio
            categoryName={catInfo?.name ?? catSlug}
            datePublished={article.datePublished}
            dateModified={article.dateModified}
          />

          <div className="py-8 flex gap-4">
            <Link href={`/${catSlug}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1B3A5C] transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {catInfo?.name ?? catSlug} 가이드로 돌아가기
            </Link>
          </div>
        </div>

        <CategorySidebar categorySlug={catSlug} currentSlug={slug} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: article.title, description: article.description,
        datePublished: article.datePublished, dateModified: article.dateModified,
        author: { "@type": "Person", name: "머니위키 에디터", url: "https://www.jjyu.co.kr/about" },
        publisher: { "@type": "Organization", name: "머니위키", url: "https://www.jjyu.co.kr" },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "ko",
      }) }} />
      {article.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
            "@type": "Question", name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }) }} />
      )}
    </>
  );
}
