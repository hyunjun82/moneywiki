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
  EventSchema,
  ItemListSchema,
} from "@/components/JsonLd";
import AdSense, { AD_SLOTS } from "@/components/AdSense";
import ShareButtons from "@/components/ShareButtons";
import CtaCard from "@/components/CtaCard";
// 계산기 컴포넌트는 클라이언트 래퍼에서 동적 로딩
import CalculatorLoader from "@/components/CalculatorLoader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ISR - 빌드 시 0개, 요청 시 생성 → 캐시 → 24시간 후 재생성
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

// 메타데이터 생성 - SEO 최적화
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

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
      ...(doc.thumbnail && {
        images: [
          {
            url: `https://www.jjyu.co.kr${doc.thumbnail}`,
            width: 1200,
            height: 630,
            alt: doc.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.title} | 머니위키`,
      description: doc.description,
      ...(doc.thumbnail && {
        images: [`https://www.jjyu.co.kr${doc.thumbnail}`],
      }),
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

// 주제별 계산기 매핑 함수 (점수 기반 - 가장 관련성 높은 계산기 반환)
function getRelatedCalculator(slug: string, title: string, category: string): { slug: string; title: string } | null {
  const text = `${slug} ${title} ${category}`.toLowerCase();

  // 계산기 매핑 테이블 (키워드와 가중치)
  const calculatorMappings = [
    {
      slug: '퇴직금-계산기',
      title: '퇴직금 계산기',
      keywords: [
        { word: '퇴직금', weight: 10 },
        { word: '퇴직연금', weight: 8 },
        { word: '퇴직', weight: 5 },
      ]
    },
    {
      slug: '실업급여-계산기',
      title: '실업급여 계산기',
      keywords: [
        { word: '실업급여', weight: 10 },
        { word: '고용보험', weight: 8 },
        { word: '구직급여', weight: 8 },
      ]
    },
    {
      slug: '연말정산-계산기',
      title: '연말정산 계산기',
      keywords: [
        { word: '연말정산', weight: 10 },
        { word: '소득공제', weight: 6 },
        { word: '세액공제', weight: 6 },
      ]
    },
    {
      slug: '양도소득세-계산기',
      title: '양도소득세 계산기',
      keywords: [
        { word: '양도소득세', weight: 10 },
        { word: '양도세', weight: 10 },
        { word: '양도', weight: 5 },
      ]
    },
    {
      slug: '대출이자-계산기',
      title: '대출이자 계산기',
      keywords: [
        { word: '대출이자', weight: 10 },
        { word: '대출', weight: 6 },
        { word: '금리', weight: 5 },
        { word: '원리금', weight: 5 },
      ]
    },
    {
      slug: 'DSR-계산기',
      title: 'DSR 계산기',
      keywords: [
        { word: 'dsr', weight: 10 },
        { word: '총부채', weight: 8 },
      ]
    },
    {
      slug: '국민연금-수령액-계산기',
      title: '국민연금 수령액',
      keywords: [
        { word: '국민연금', weight: 10 },
        { word: '연금수령', weight: 8 },
      ]
    },
    {
      slug: '4대보험료-계산기',
      title: '4대보험료 계산기',
      keywords: [
        { word: '4대보험', weight: 10 },
        { word: '사대보험', weight: 10 },
      ]
    },
    {
      slug: '근로소득세-계산기',
      title: '근로소득세 계산기',
      keywords: [
        { word: '근로소득세', weight: 10 },
        { word: '근로소득', weight: 6 },
      ]
    },
    {
      slug: '전월세-계산기',
      title: '전월세 계산기',
      keywords: [
        { word: '전세', weight: 8 },
        { word: '월세', weight: 8 },
        { word: '임대차', weight: 6 },
      ]
    },
    {
      slug: '주식-계산기',
      title: '주식 계산기',
      keywords: [
        { word: '주식', weight: 8 },
        { word: '배당', weight: 6 },
        { word: '증권', weight: 5 },
      ]
    },
    {
      slug: '예적금-계산기',
      title: '예적금 계산기',
      keywords: [
        { word: '예금', weight: 10 },
        { word: '적금', weight: 10 },
        { word: '예적금', weight: 10 },
        { word: '정기예금', weight: 8 },
        { word: '정기적금', weight: 8 },
      ]
    },
  ];

  // 각 계산기별 점수 계산
  let bestMatch: { slug: string; title: string; score: number } | null = null;

  for (const calc of calculatorMappings) {
    let score = 0;
    for (const kw of calc.keywords) {
      if (text.includes(kw.word)) {
        score += kw.weight;
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { slug: calc.slug, title: calc.title, score };
    }
  }

  return bestMatch ? { slug: bestMatch.slug, title: bestMatch.title } : null;
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
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

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
  let processedHtml = addSectionIds(doc.htmlContent || "");

  // FAQ를 본문에 삽입 (결론 전, 출처 앞의 마지막 H2 앞에)
  if (doc.faq && doc.faq.length > 0) {
    const faqHtml = `
      <section class="faq-section mt-12 pt-8 border-t border-neutral-200">
        <div class="flex items-center gap-2 mb-6">
          <span class="text-2xl">❓</span>
          <h2 id="faq" class="text-2xl font-bold">자주 묻는 질문</h2>
        </div>
        <div class="space-y-4">
          ${doc.faq.map((item: { question: string; answer: string }, index: number) => `
            <details class="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary>
                <span>${item.question}</span>
              </summary>
              <div class="px-5 pb-5 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                ${item.answer}
              </div>
            </details>
          `).join('')}
        </div>
      </section>
    `;

    // 마크다운 본문에서 "자주 묻는 질문" 섹션 제거 (frontmatter FAQ로 대체)
    // addSectionIds 후: <h2 id="section-N"><span...>숫자.</span>자주 묻는 질문</h2>
    const faqRemovePattern = /<h2[^>]*>(?:<span[^>]*>[^<]*<\/span>)?\s*자주\s*묻는\s*질문<\/h2>[\s\S]*?(?=<hr|<h2|$)/gi;
    processedHtml = processedHtml.replace(faqRemovePattern, '');

    // 본문에서 "출처" 섹션 제거 (하단 출처 및 참고자료로 대체)
    const sourceRemovePattern = /<h2[^>]*>(?:<span[^>]*>[^<]*<\/span>)?\s*출처<\/h2>[\s\S]*?(?=<hr|<h2|<section|$)/gi;
    processedHtml = processedHtml.replace(sourceRemovePattern, '');

    // 본문에서 "관련 문서" 섹션 제거 (사이드바로 이동)
    // FIXME: 정규식이 너무 광범위하게 매칭되어 본문까지 삭제하는 문제 발생
    // 임시로 비활성화
    // const relatedDocsRemovePattern = /<h2[^>]*>[\s\S]*?관련\s*문서[\s\S]*?<\/h2>[\s\S]*?(?=<hr|<h2|<section|$)/gi;
    // processedHtml = processedHtml.replace(relatedDocsRemovePattern, '');

    // 머니위키 박스 HTML 생성
    const wikiBoxHtml = relatedDocs.length > 0 ? `
      <div class="my-8 border border-neutral-200 rounded-xl overflow-hidden not-prose">
        <div class="px-4 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2">
          <span class="text-[#1E3A5F] font-semibold text-sm">💡 머니위키</span>
        </div>
        <div class="divide-y divide-neutral-100">
          ${relatedDocs.slice(0, 3).map((relDoc: { slug: string; title: string }) => `
            <a href="/w/${encodeURIComponent(relDoc.slug)}" class="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors group no-underline">
              <span class="text-sm text-neutral-700 group-hover:text-[#1E3A5F] transition-colors">${relDoc.title}</span>
              <span class="text-[#2B5280] font-bold">→</span>
            </a>
          `).join('')}
        </div>
      </div>
    ` : '';

    // 머니위키 박스: 본문 마지막 H2 바로 위에 삽입
    // 시스템 H2 (FAQ, 출처, 관련 문서) 제외하고 마지막 본문 H2 찾기
    if (wikiBoxHtml) {
      const h2Regex = /<h2[^>]*>(?:<span[^>]*>[^<]*<\/span>)?([^<]*)<\/h2>/gi;
      const systemH2Patterns = /자주\s*묻는\s*질문|출처|관련\s*문서|관련\s*키워드|참고\s*자료/i;

      let lastContentH2Index: number | null = null;
      let match;

      while ((match = h2Regex.exec(processedHtml)) !== null) {
        const h2Text = match[1].trim();
        // 시스템 H2가 아니면 마지막 본문 H2 위치 업데이트
        if (!systemH2Patterns.test(h2Text)) {
          lastContentH2Index = match.index;
        }
      }

      // 마지막 본문 H2 앞에 삽입
      if (lastContentH2Index !== null) {
        processedHtml = processedHtml.slice(0, lastContentH2Index) + wikiBoxHtml + processedHtml.slice(lastContentH2Index);
      }
    }

    // FAQ 삽입: 본문 맨 끝에 (7번 결론 아래)
    processedHtml = processedHtml + faqHtml;
  }

  // 서론/본문 분리 (첫 번째 <h2> 기준)
  const firstH2Index = processedHtml.search(/<h2[\s>]/);
  const introHtml = firstH2Index > 0 ? processedHtml.slice(0, firstH2Index) : "";
  const bodyHtml = firstH2Index > 0 ? processedHtml.slice(firstH2Index) : processedHtml;

  // 목차 추출 (processedHtml에서 - FAQ 제거 후)
  const toc = extractToc(processedHtml).filter(
    item => !/자주\s*묻는\s*질문/i.test(item.text)
  );

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
          featureList={doc.tool?.featureList}
        />
      )}
      {/* Event 스키마 - 신청 기간 있는 글 (CTR 30-50% ↑) */}
      {doc.event && (
        <EventSchema
          name={doc.event.name}
          description={doc.event.description || doc.description}
          startDate={doc.event.startDate}
          endDate={doc.event.endDate}
          url={url}
          organizerName={doc.event.organizerName}
          organizerUrl={doc.event.organizerUrl}
        />
      )}
      {/* ItemList 스키마 - Hub 페이지 (내부 SEO ↑) */}
      {doc.itemList && doc.itemList.length > 0 && (
        <ItemListSchema items={doc.itemList} />
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
                <span className="px-2 py-1 text-xs bg-[#EDF2F8] text-[#162F4F] rounded font-medium">
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
          </header>

          {/* 서론 (첫 번째 H2 전까지) - 제목 바로 아래 */}
          {introHtml && (
            <article
              className="prose prose-neutral max-w-none
                prose-p:leading-[1.9] prose-p:text-[#404040] prose-strong:text-[#1a1a1a]
                prose-a:text-[#1E3A5F] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />
          )}

          {/* CTA 카드 - 서론 아래 행동 유도 (계산기 페이지에서는 숨김) */}
          {doc.schemaType !== "calculator" && doc.ctaCard && (
            <CtaCard
              label={doc.ctaCard.label}
              mainText={doc.ctaCard.mainText}
              subText={doc.ctaCard.subText}
              url={doc.ctaCard.url}
              external={doc.ctaCard.external}
            />
          )}

          {/* 계산기 컴포넌트 - 동적 로딩 (코드 스플리팅) */}
          <CalculatorLoader slug={slug} />

          {/* 목차 - 나무위키 스타일 (계산기 페이지에서는 숨김) */}
          {doc.schemaType !== "calculator" && toc.length >= 2 && (
              <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 id="toc" className="text-sm font-semibold text-neutral-600">목차</h2>
                </div>
                <ol className="space-y-1 text-sm">
                  {toc.map((item) => {
                    // 텍스트에서 앞부분 번호 제거 (이미 번호가 포함되어 있음)
                    return (
                      <li key={item.id} className={item.level === 3 ? "ml-6" : ""}>
                        <a
                          href={`#${item.id}`}
                          className="text-[#1E3A5F] hover:underline"
                        >
                          {item.text}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
          )}

          {/* 3줄 요약 (계산기 페이지에서는 숨김) */}
          {doc.schemaType !== "calculator" && doc.summary && (
            <div className="mb-8 p-6 bg-gradient-to-r from-[#F5F8FB] to-teal-50 rounded-2xl border border-[#EDF2F8]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💡</span>
                <h2 id="summary" className="font-semibold text-[#132A42]">3줄 요약</h2>
              </div>
              {Array.isArray(doc.summary) ? (
                <ul className="text-neutral-700 leading-relaxed space-y-2">
                  {doc.summary.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#1E3A5F] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-700 leading-relaxed">{doc.summary}</p>
              )}
            </div>
          )}


          {/* 썸네일 이미지 */}
          {doc.thumbnail && (
            <div className="mb-8">
              <img
                src={doc.thumbnail}
                alt={doc.title}
                className="w-full rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
          )}

          {/* ctaButton (단일 객체 - position: "afterChart"인 경우) */}
          {doc.ctaButton && doc.ctaButton.position === "afterChart" && (
            <div className="mb-8 overflow-hidden">
              <a
                href={doc.ctaButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`ext-btn ext-btn-${doc.ctaButton.theme || 'green'}`}
              >
                {doc.ctaButton.badge && (
                  <span className="ext-btn-badge">{doc.ctaButton.badge}</span>
                )}
                <span className="ext-btn-text">{doc.ctaButton.text}</span>
                <span className="ext-btn-cta">{doc.ctaButton.cta}</span>
              </a>
            </div>
          )}

          {/* CTA 버튼 (외부링크 - 배열) */}
          {doc.cta && doc.cta.length > 0 && (
            <div className="mb-8 space-y-3 overflow-hidden">
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

          {/* 본문 (H2 섹션들) */}
          <article
            className="prose prose-neutral max-w-none
              prose-headings:font-bold prose-headings:scroll-mt-20
              prose-h2:text-[1.45rem] prose-h2:text-[#1E3A5F] prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-[#1E3A5F]/20
              prose-h3:text-[1.15rem] prose-h3:text-[#1E3A5F] prose-h3:mt-10 prose-h3:mb-4
              prose-p:leading-[1.9] prose-p:text-[#404040]
              prose-strong:text-[#1a1a1a]
              prose-a:text-[#1E3A5F] prose-a:no-underline hover:prose-a:underline
              prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-neutral-100 prose-pre:text-neutral-800 prose-pre:border prose-pre:border-neutral-200
              prose-li:my-1.5 prose-li:leading-[1.8]
              prose-blockquote:border-l-[3px] prose-blockquote:border-l-[#1E3A5F] prose-blockquote:bg-[#F5F8FB] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {/* 출처 섹션 - E-E-A-T 강화 */}
          {doc.sources && doc.sources.length > 0 && (
            <section className="mt-8 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📚</span>
                <h2 id="sources" className="text-lg font-semibold">출처 및 참고자료</h2>
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
                        className="text-[#1E3A5F] hover:underline"
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

            {/* CTA 버튼 - 노란색 깜박임 효과 */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="p-4 space-y-3">
                <Link
                  href="/w/미환급금-조회"
                  className="group flex items-center gap-3 p-3 rounded-lg transition-all border border-transparent hover:border-[#B8D0E8] animate-yellow-blink"
                >
                  <span className="w-10 h-10 bg-[#EDF2F8] rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">💰</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">내 숨은 환급금 찾기</p>
                    <p className="text-xs text-neutral-500">평균 13만원 환급</p>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-[#1E3A5F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/category/정부지원금"
                  className="group flex items-center gap-3 p-3 rounded-lg transition-all border border-transparent hover:border-blue-200 animate-yellow-blink"
                  style={{ animationDelay: '0.3s' }}
                >
                  <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🏛️</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">2026 정부지원금</p>
                    <p className="text-xs text-neutral-500">30개+ 지원금 총정리</p>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/w/2026년-달라지는-제도"
                  className="group flex items-center gap-3 p-3 rounded-lg transition-all border border-transparent hover:border-amber-200 animate-yellow-blink"
                  style={{ animationDelay: '0.6s' }}
                >
                  <span className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📋</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">2026년 달라지는 제도</p>
                    <p className="text-xs text-neutral-500">꼭 알아야 할 변경사항</p>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 관련 문서 - 1번 실업급여 계산기 고정 */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 border-b border-neutral-100">
                <span className="text-sm font-semibold text-neutral-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  관련 문서
                </span>
              </div>
              <div className="p-3 space-y-2">
                {/* 1번: 주제별 계산기 동적 매핑 */}
                {(() => {
                  const calculator = getRelatedCalculator(slug, doc.title, doc.category);
                  if (calculator) {
                    return (
                      <Link
                        href={`/w/${calculator.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-200"
                      >
                        <span className="w-6 h-6 bg-[#EDF2F8] text-[#162F4F] rounded-md flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-[#B8D0E8] transition-colors">
                          1
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-neutral-700 group-hover:text-[#1E3A5F] line-clamp-2 font-medium transition-colors">
                            {calculator.title}
                          </p>
                          <p className="text-xs text-neutral-400 mt-0.5">계산기</p>
                        </div>
                      </Link>
                    );
                  }
                  return null;
                })()}
                {/* 계산기 있으면 2번부터, 없으면 1번부터 relatedDocs 표시 */}
                {(() => {
                  const calculator = getRelatedCalculator(slug, doc.title, doc.category);
                  const startIndex = calculator ? 2 : 1;
                  const excludeSlug = calculator?.slug;
                  return relatedDocs
                    .filter((d) => d.slug !== excludeSlug)
                    .slice(0, calculator ? 4 : 5)
                    .map((relDoc, index) => (
                      <Link
                        key={relDoc.slug}
                        href={`/w/${encodeURIComponent(relDoc.slug)}`}
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-200"
                      >
                        <span className="w-6 h-6 bg-[#EDF2F8] text-[#162F4F] rounded-md flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-[#B8D0E8] transition-colors">
                          {index + startIndex}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-neutral-700 group-hover:text-[#1E3A5F] line-clamp-2 font-medium transition-colors">
                            {relDoc.title}
                          </p>
                          <p className="text-xs text-neutral-400 mt-0.5">{relDoc.category}</p>
                        </div>
                      </Link>
                    ));
                })()}
              </div>
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
            <div className="p-4 bg-[#F5F8FB] rounded-xl">
              <h3 className="text-xs font-semibold text-[#162F4F] mb-3">빠른 링크</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/w/퇴직금" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors border border-neutral-200">
                  퇴직금
                </Link>
                <Link href="/w/연말정산" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors border border-neutral-200">
                  연말정산
                </Link>
                <Link href="/w/실업급여" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors border border-neutral-200">
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
