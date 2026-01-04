import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWikiDocument, getAllWikiSlugs, findRelatedDocuments } from "@/lib/wiki";
import {
  ArticleSchema,
  FAQSchema,
  HowToSchema,
  BreadcrumbSchema,
} from "@/components/JsonLd";
import AdSense, { AD_SLOTS } from "@/components/AdSense";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 정적 생성을 위한 경로 생성
export async function generateStaticParams() {
  const slugs = getAllWikiSlugs();
  // Next.js가 자동으로 URL 인코딩을 처리하므로 raw slug 반환
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// 메타데이터 생성 - SEO 최적화
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getWikiDocument(slug);

  if (!doc) {
    return {
      title: "문서를 찾을 수 없습니다",
    };
  }

  const url = `https://www.jjyu.co.kr/w/${encodeURIComponent(slug)}`;

  return {
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    authors: [{ name: "머니위키" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${doc.title} | 머니위키`,
      description: doc.description,
      type: "article",
      url: url,
      siteName: "머니위키",
      locale: "ko_KR",
      publishedTime: doc.datePublished,
      modifiedTime: doc.lastUpdated,
      authors: ["머니위키"],
      tags: doc.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.title} | 머니위키`,
      description: doc.description,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default async function WikiPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getWikiDocument(slug);

  if (!doc) {
    notFound();
  }

  const url = `https://www.jjyu.co.kr/w/${encodeURIComponent(slug)}`;
  const relatedDocs = findRelatedDocuments(doc.slug, 5);

  // 브레드크럼 데이터
  const breadcrumbItems = [
    { name: "홈", url: "https://www.jjyu.co.kr" },
    { name: doc.category, url: `https://www.jjyu.co.kr/category/${encodeURIComponent(doc.category)}` },
    { name: doc.title, url: url },
  ];

  return (
    <>
      {/* JSON-LD 스키마 - SEO 극대화 */}
      <ArticleSchema
        title={doc.title}
        description={doc.description}
        url={url}
        datePublished={doc.datePublished}
        dateModified={doc.lastUpdated}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {doc.faq && doc.faq.length > 0 && <FAQSchema items={doc.faq} />}
      {doc.howTo && (
        <HowToSchema
          name={doc.howTo.name}
          description={doc.howTo.description}
          steps={doc.howTo.steps}
          totalTime={doc.howTo.totalTime}
        />
      )}

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 브레드크럼 */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black transition-colors">
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/category/${encodeURIComponent(doc.category)}`}
            className="hover:text-black transition-colors"
          >
            {doc.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-black" aria-current="page">{doc.title}</span>
        </nav>

        {/* 문서 헤더 */}
        <header className="mb-8 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded font-medium">
              {doc.category}
            </span>
            <time className="text-xs text-neutral-400" dateTime={doc.lastUpdated}>
              마지막 수정: {doc.lastUpdated}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{doc.title}</h1>
          <p className="text-neutral-600 text-lg">{doc.description}</p>
        </header>

        {/* 토스 스타일: 3줄 요약 */}
        {doc.summary && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <h2 className="font-semibold text-emerald-800">3줄 요약</h2>
            </div>
            <p className="text-neutral-700 leading-relaxed">{doc.summary}</p>
          </div>
        )}

        {/* 토스 스타일: 핵심 포인트 */}
        {doc.keyPoints && doc.keyPoints.length > 0 && (
          <div className="mb-8 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎯</span>
              <h2 className="font-semibold">핵심 포인트</h2>
            </div>
            <ul className="space-y-3">
              {doc.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 광고 - 본문 상단 (수평) */}
        <div className="mb-8">
          <AdSense slot={AD_SLOTS.HORIZONTAL} className="w-full" />
        </div>

        {/* 문서 본문 */}
        <article
          className="prose prose-neutral max-w-none
            prose-headings:font-semibold prose-headings:scroll-mt-20
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-neutral-200
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:leading-7
            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
            prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-neutral-900 prose-pre:text-neutral-100
            prose-table:border prose-table:border-neutral-200
            prose-th:bg-neutral-50 prose-th:p-3 prose-th:text-left
            prose-td:p-3 prose-td:border-t prose-td:border-neutral-200
            prose-li:my-1
            prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-1"
          dangerouslySetInnerHTML={{ __html: doc.htmlContent || "" }}
        />

        {/* FAQ 섹션 - 구글 피처드 스니펫 최적화 */}
        {doc.faq && doc.faq.length > 0 && (
          <section className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">❓</span>
              <h2 className="text-2xl font-bold">자주 묻는 질문</h2>
            </div>
            <div className="space-y-4">
              {doc.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-xl border border-neutral-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-neutral-50 transition-colors">
                    <span className="font-medium text-neutral-800 pr-4">{item.question}</span>
                    <span className="text-neutral-400 group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 광고 - 본문 하단 (수직) */}
        <div className="mt-12">
          <AdSense slot={AD_SLOTS.VERTICAL} className="w-full" />
        </div>

        {/* 키워드 태그 */}
        {doc.keywords && doc.keywords.length > 0 && (
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-500 mb-3">관련 키워드</h3>
            <div className="flex flex-wrap gap-2">
              {doc.keywords.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/search?q=${encodeURIComponent(keyword)}`}
                  className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  #{keyword}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 관련 문서 - 나무위키 스타일 내부 링크 */}
        {relatedDocs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-bold">관련 문서</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedDocs.map((relDoc) => (
                <Link
                  key={relDoc.slug}
                  href={`/w/${encodeURIComponent(relDoc.slug)}`}
                  className="group p-4 bg-white rounded-xl border border-neutral-200 hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-500 rounded">
                      {relDoc.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-neutral-800 group-hover:text-emerald-600 transition-colors mb-1">
                    {relDoc.title}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">{relDoc.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 문서 수정 제안 */}
        <div className="mt-12 p-6 bg-neutral-50 rounded-2xl text-center">
          <p className="text-sm text-neutral-500 mb-2">이 문서가 도움이 되었나요?</p>
          <p className="text-xs text-neutral-400">
            잘못된 정보가 있다면 알려주세요. 더 나은 정보를 제공하기 위해 노력하겠습니다.
          </p>
        </div>
      </main>
    </>
  );
}
