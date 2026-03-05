import { Fragment } from "react";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { CategorySidebar } from "@/components/CategorySidebar";
import { AuthorBio } from "@/components/AuthorBio";
import AdSense, { AD_SLOTS } from "@/components/AdSense";
import ShareButtons from "@/components/ShareButtons";
import { ArticleViz } from "@/components/ArticleViz";
import { categories } from "@/data/categories";
import { hubArticles } from "@/data/articles";
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

// 본문 중간 관련 글 내부링크 (3개)
function RelatedSpokesInline({ categorySlug, currentSlug }: { categorySlug: string; currentSlug: string }) {
  const hub = hubArticles[categorySlug];
  if (!hub) return null;
  const others = hub.spokes.filter((s) => s.slug !== currentSlug);
  if (others.length === 0) return null;
  const display = others.slice(0, 3);
  const totalCount = hub.spokes.length;
  const catInfo = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-gray-50/50 p-5">
      <Link
        href={`/${categorySlug}`}
        className="group flex items-center justify-center gap-2.5 w-full rounded-xl bg-[#1B3A5C] hover:bg-[#15304D] px-5 py-4 text-white font-bold text-base transition-all shadow-sm hover:shadow-md mb-5"
      >
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>{catInfo?.name ?? categorySlug} 정보 {totalCount}개 전체 보기</span>
        <svg className="h-5 w-5 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
        📋 관련 정보도 확인해 보세요
      </h3>
      <div className="space-y-2.5">
        {display.map((spoke) => (
          <Link
            key={spoke.slug}
            href={`/w/${spoke.slug}`}
            className="group flex items-start gap-2.5 rounded-lg bg-white px-4 py-3 border border-gray-100 transition-all hover:border-[#1B3A5C]/20 hover:shadow-sm"
          >
            <svg className="h-4 w-4 mt-0.5 shrink-0 text-[#1B3A5C] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-gray-900 group-hover:text-[#1B3A5C] transition-colors">
                {spoke.title}
              </span>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                {spoke.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SpokeArticleRenderer({ article, slug }: Props) {
  const catSlug = article.categorySlug;
  const catInfo = categories.find((c) => c.slug === catSlug);
  const url = `https://www.jjyu.co.kr/w/${slug}`;
  const midIndex = Math.min(2, article.sections.length - 1);

  return (
    <>
      {/* Breadcrumb — 6xl 기준으로 정렬 */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3">
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

      {/* Hero — 6xl 2컬럼 안에서 본문과 정렬 */}
      <section className="border-b bg-gradient-to-b from-[#EDF2F8] to-white">
        <div className="mx-auto max-w-6xl px-4 lg:flex lg:gap-10">
          <div className="flex-1 max-w-3xl py-12">
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
          {/* 히어로 오른쪽은 사이드바 자리 비움 (정렬용) */}
          <div className="hidden lg:block lg:w-[280px] lg:shrink-0" />
        </div>
      </section>

      {/* 2-column layout: 히어로~본문~사이드바 동일 폭 */}
      <div className="mx-auto max-w-6xl px-4 lg:flex lg:gap-10">
        <div className="flex-1 max-w-3xl">
          {/* Ad */}
          <div className="py-4">
            <AdSense slot={AD_SLOTS.HORIZONTAL} className="w-full" />
          </div>

          {/* Article Sections */}
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
                  {i === midIndex && (
                    <RelatedSpokesInline categorySlug={catSlug} currentSlug={slug} />
                  )}
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
