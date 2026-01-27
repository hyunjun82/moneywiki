import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWikiDocument, getAllWikiSlugs, findRelatedDocuments, getAllWikiDocuments } from "@/lib/wiki";
import {
  ArticleSchema,
  FAQSchema,
  HowToSchema,
  BreadcrumbSchema,
  CalculatorSchema,
} from "@/components/JsonLd";
import AdSense, { AD_SLOTS } from "@/components/AdSense";
import ShareButtons from "@/components/ShareButtons";
// 계산기 컴포넌트는 클라이언트 래퍼에서 동적 로딩
import CalculatorLoader from "@/components/CalculatorLoader";
// 차트 컴포넌트 동적 로딩
import ChartLoader from "@/components/ChartLoader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ISR 사용 - 주문형 정적 생성 (On-Demand ISR)
export const revalidate = 3600; // 1시간마다 갱신
export const dynamicParams = true; // 미리 생성되지 않은 페이지는 런타임에 생성

// 정적 생성을 위한 경로 생성 - 빈 배열로 설정하여 주문형 ISR 사용
export async function generateStaticParams() {
  // 선택적: 가장 인기 있는 페이지만 미리 생성
  const popularSlugs = ["실업급여", "퇴직금", "연말정산", "최저임금"];
  return popularSlugs.map((slug) => ({
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

  const url = `https://www.jjyu.co.kr/w/${slug}`;

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
      section: doc.category,
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

// HTML 콘텐츠에서 목차 추출
function extractToc(html: string): { id: string; text: string; level: number }[] {
  const toc: { id: string; text: string; level: number }[] = [];
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  let counter = 0;

  while ((match = regex.exec(html)) !== null) {
    toc.push({
      id: `section-${counter++}`,
      text: match[2].replace(/<[^>]+>/g, ""), // HTML 태그 제거
      level: parseInt(match[1]),
    });
  }
  return toc;
}

// HTML에 섹션 ID와 번호 추가 (나무위키 스타일)
function addSectionIds(html: string): string {
  let counter = 0;
  let h2Counter = 0;
  let h3Counter = 0;

  return html.replace(
    /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
    (match, tag, attrs, content) => {
      const id = `section-${counter++}`;
      const level = tag.toLowerCase() === 'h2' ? 2 : 3;
      let number = "";

      if (level === 2) {
        h2Counter++;
        h3Counter = 0;
        number = `${h2Counter}.`;
      } else if (level === 3) {
        h3Counter++;
        number = `${h2Counter}.${h3Counter}.`;
      }

      return `<${tag}${attrs} id="${id}"><span class="text-neutral-400 font-normal mr-2">${number}</span>${content}</${tag}>`;
    }
  );
}

export default async function WikiPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getWikiDocument(slug);

  if (!doc) {
    notFound();
  }

  const url = `https://www.jjyu.co.kr/w/${slug}`;
  const relatedDocs = findRelatedDocuments(doc.slug, 5);
  const allDocs = getAllWikiDocuments();

  // 인기 문서 (조회수 기반 - 현재는 최신순으로 대체)
  const popularDocs = allDocs.slice(0, 5);

  // HTML 처리
  const processedHtml = addSectionIds(doc.htmlContent || "");
  const toc = extractToc(doc.htmlContent || "");

  // 브레드크럼 데이터 (메인 페이지 카테고리 앵커로 연결)
  const breadcrumbItems = [
    { name: "홈", url: "https://www.jjyu.co.kr" },
    { name: doc.category, url: `https://www.jjyu.co.kr/#category-${encodeURIComponent(doc.category)}` },
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
        keywords={doc.keywords}
        category={doc.category}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {doc.faq && doc.faq.length > 0 && <FAQSchema items={doc.faq} />}
      {/* HowTo 스키마 - 배열 형식 지원 (계산기 사용법 등) */}
      {doc.howTo && Array.isArray(doc.howTo) && doc.howTo.length > 0 && (
        <HowToSchema
          name={`${doc.title} 사용법`}
          description={doc.description}
          steps={doc.howTo.map((item: { step: string; description: string }) => ({
            name: item.step,
            text: item.description,
          }))}
        />
      )}
      {/* HowTo 스키마 - 객체 형식 지원 */}
      {doc.howTo && !Array.isArray(doc.howTo) && doc.howTo.steps && doc.howTo.steps.length > 0 && (
        <HowToSchema
          name={doc.howTo.name}
          description={doc.howTo.description}
          steps={doc.howTo.steps}
          totalTime={doc.howTo.totalTime}
        />
      )}
      {/* 계산기 페이지용 SoftwareApplication 스키마 */}
      {doc.schemaType === "calculator" && (
        <CalculatorSchema
          name={doc.title}
          description={doc.description}
          url={url}
          datePublished={doc.datePublished}
          dateModified={doc.lastUpdated}
          category={doc.category}
          keywords={doc.keywords}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* 메인 콘텐츠 */}
        <main className="flex-1 min-w-0">
          {/* 브레드크럼 */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-black transition-colors">홈</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/#category-${encodeURIComponent(doc.category)}`} className="hover:text-black transition-colors">
              {doc.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-black" aria-current="page">{doc.title}</span>
          </nav>

          {/* 문서 헤더 */}
          <header className="mb-8 pb-6 border-b border-neutral-200">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded font-medium">
                  {doc.category}
                </span>
                {doc.updateNote && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded font-medium">
                    {doc.updateNote}
                  </span>
                )}
                <time className="text-xs text-neutral-400" dateTime={doc.lastUpdated}>
                  마지막 수정: {doc.lastUpdated}
                </time>
              </div>
              {/* 공유 버튼 */}
              <ShareButtons title={doc.title} url={url} description={doc.description} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{doc.title}</h1>
            <p className="text-neutral-600 text-lg">{doc.description}</p>
          </header>

          {/* 계산기 컴포넌트 - 동적 로딩 (코드 스플리팅) */}
          <CalculatorLoader slug={slug} />

          {/* 목차 - 나무위키 스타일 (계산기 페이지에서는 숨김) */}
          {doc.schemaType !== "calculator" && toc.length >= 2 && (() => {
            let h2Counter = 0;
            let h3Counter = 0;
            return (
              <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-neutral-600">목차</h2>
                </div>
                <ol className="space-y-1 text-sm">
                  {toc.map((item) => {
                    let number = "";
                    if (item.level === 2) {
                      h2Counter++;
                      h3Counter = 0;
                      number = `${h2Counter}.`;
                    } else if (item.level === 3) {
                      h3Counter++;
                      number = `${h2Counter}.${h3Counter}.`;
                    }
                    return (
                      <li key={item.id} className={item.level === 3 ? "ml-6" : ""}>
                        <a
                          href={`#${item.id}`}
                          className="text-emerald-600 hover:underline"
                        >
                          {number} {item.text}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })()}

          {/* 3줄 요약 (계산기 페이지에서는 숨김) */}
          {doc.schemaType !== "calculator" && doc.summary && (
            <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💡</span>
                <h2 className="font-semibold text-emerald-800">3줄 요약</h2>
              </div>
              {Array.isArray(doc.summary) ? (
                <ul className="text-neutral-700 leading-relaxed space-y-2">
                  {doc.summary.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-700 leading-relaxed">{doc.summary}</p>
              )}
            </div>
          )}

          {/* 차트 컴포넌트 - 동적 로딩 */}
          <ChartLoader chartName={doc.chart} chartConfig={doc.chartConfig} />

          {/* CTA 버튼 (외부링크) */}
          {doc.cta && doc.cta.length > 0 && (
            <div className="mb-8 space-y-3">
              {doc.cta.slice(0, 2).map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ext-btn ext-btn-${item.color || 'green'}`}
                >
                  {item.badge && (
                    <span className="ext-btn-badge">{item.badge}</span>
                  )}
                  <span className="ext-btn-text">{item.text}</span>
                  <span className="ext-btn-cta">{item.action || '바로가기'} →</span>
                </a>
              ))}
            </div>
          )}

          {/* 광고 - 본문 상단 */}
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
              prose-pre:bg-neutral-100 prose-pre:text-neutral-800 prose-pre:border prose-pre:border-neutral-200
              prose-table:border prose-table:border-neutral-200
              prose-th:bg-neutral-50 prose-th:p-3 prose-th:text-left
              prose-td:p-3 prose-td:border-t prose-td:border-neutral-200
              prose-li:my-1
              prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-1"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />

          {/* FAQ 섹션 */}
          {doc.faq && doc.faq.length > 0 && (
            <section className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">❓</span>
                <h2 className="text-2xl font-bold">자주 묻는 질문</h2>
              </div>
              <div className="space-y-4">
                {doc.faq.map((item, index) => (
                  <details key={index} className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
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

          {/* 출처 섹션 - E-E-A-T 강화 */}
          {doc.sources && doc.sources.length > 0 && (
            <section className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📚</span>
                <h2 className="text-lg font-semibold">출처 및 참고자료</h2>
              </div>
              <ul className="space-y-2 text-sm">
                {doc.sources.map((source, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-neutral-400">[{index + 1}]</span>
                    <div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline"
                      >
                        {source.name}
                      </a>
                      {source.date && (
                        <span className="text-neutral-400 ml-2">({source.date} 확인)</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 광고 - 본문 하단 */}
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
                    href={`/w/${encodeURIComponent(keyword)}`}
                    className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 transition-colors"
                  >
                    #{keyword}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 관련 문서 */}
          {relatedDocs.length > 0 && (
            <section className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">📄</span>
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

          {/* 문서 피드백 */}
          <div className="mt-12 p-6 bg-neutral-50 rounded-2xl text-center">
            <p className="text-sm text-neutral-500 mb-2">이 문서가 도움이 되었나요?</p>
            <p className="text-xs text-neutral-400">
              잘못된 정보가 있다면 알려주세요. 더 나은 정보를 제공하기 위해 노력하겠습니다.
            </p>
          </div>
        </main>

        {/* 사이드바 */}
        <aside className="w-72 shrink-0 hidden lg:block space-y-4">
          <div className="sticky top-4">
            {/* 사이드바 광고 */}
            <div className="mb-4">
              <AdSense slot={AD_SLOTS.SQUARE} className="w-full" />
            </div>

            {/* 인기 문서 */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 bg-emerald-600">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  🔥 인기 문서
                </span>
              </div>
              <ul className="divide-y divide-neutral-100">
                {popularDocs.map((item, index) => (
                  <li key={item.slug}>
                    <Link
                      href={`/w/${encodeURIComponent(item.slug)}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                    >
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        index < 3 ? "bg-emerald-600 text-white" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {index + 1}
                      </span>
                      <span className="flex-1 text-sm text-neutral-700 truncate">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 같은 카테고리 문서 */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 border-b border-neutral-100">
                <span className="text-sm font-semibold text-neutral-800">
                  📁 {doc.category} 문서
                </span>
              </div>
              <ul className="divide-y divide-neutral-100">
                {allDocs
                  .filter((d) => d.category === doc.category && d.slug !== doc.slug)
                  .slice(0, 5)
                  .map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/w/${encodeURIComponent(item.slug)}`}
                        className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-emerald-600 transition-colors truncate"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* 인기 계산기 */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  인기 계산기
                </span>
              </div>
              <ul className="divide-y divide-neutral-100">
                {[
                  { title: '실업급여 계산기', slug: '실업급여-계산기', rank: 1 },
                  { title: '퇴직금 계산기', slug: '퇴직금-계산기', rank: 2 },
                  { title: '연말정산 계산기', slug: '연말정산-계산기', rank: 3 },
                  { title: '양도소득세 계산기', slug: '양도소득세-계산기', rank: 4 },
                  { title: '대출이자 계산기', slug: '대출이자-계산기', rank: 5 },
                  { title: '국민연금 수령액', slug: '국민연금-수령액-계산기', rank: 6 },
                  { title: '근로소득세 계산기', slug: '근로소득세-계산기', rank: 7 },
                  { title: '4대보험료 계산기', slug: '4대보험료-계산기', rank: 8 },
                ].map((item) => (
                  <li key={item.rank}>
                    <Link
                      href={`/w/${item.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors"
                    >
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                        item.rank <= 3 ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {item.rank}
                      </span>
                      <span className="flex-1 text-sm text-neutral-700 truncate">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 빠른 링크 */}
            <div className="p-4 bg-emerald-50 rounded-xl">
              <h3 className="text-xs font-semibold text-emerald-700 mb-3">빠른 링크</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/w/퇴직금" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors border border-neutral-200">
                  퇴직금
                </Link>
                <Link href="/w/연말정산" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors border border-neutral-200">
                  연말정산
                </Link>
                <Link href="/w/실업급여" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors border border-neutral-200">
                  실업급여
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
