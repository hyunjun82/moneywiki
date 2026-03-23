export const dynamic = 'force-static';
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
// ê³ì°ê¸° ì»´í¬ëí¸ë í´ë¼ì´ì¸í¸ ëí¼ìì ëì  ë¡ë©
import CalculatorLoader from "@/components/CalculatorLoader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllWikiSlugs();
    return slugs.map((slug) => ({ slug }));
}

// ISR - ë¹ë ì 0ê°, ìì²­ ì ìì± â ìºì â 24ìê° í ì¬ìì±


// ë©íë°ì´í° ìì± - SEO ìµì í
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  let slug: string;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    return { title: "íì´ì§ë¥¼ ì°¾ì ì ììµëë¤ | ë¨¸ëìí¤" };
  }
  if (slug.includes(' ') || slug.includes('%')) {
    return { title: "íì´ì§ë¥¼ ì°¾ì ì ììµëë¤ | ë¨¸ëìí¤" };
  }

  const doc = await getWikiDocument(slug);

  if (!doc) {
    return {
      title: "ë¬¸ìë¥¼ ì°¾ì ì ììµëë¤",
    };
  }

  const url = `https://www.jjyu.co.kr/w/${slug}`;

  return {
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    authors: [{ name: "ë¨¸ëìí¤" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${doc.title} | ë¨¸ëìí¤`,
      description: doc.description,
      type: "article",
      url: url,
      siteName: "ë¨¸ëìí¤",
      locale: "ko_KR",
      publishedTime: doc.datePublished,
      modifiedTime: doc.lastUpdated,
      authors: ["ë¨¸ëìí¤"],
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
      title: `${doc.title} | ë¨¸ëìí¤`,
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

// ì£¼ì ë³ ê³ì°ê¸° ë§¤í í¨ì (ì ì ê¸°ë° - ê°ì¥ ê´ë ¨ì± ëì ê³ì°ê¸° ë°í)
function getRelatedCalculator(slug: string, title: string, category: string): { slug: string; title: string } | null {
  const text = `${slug} ${title} ${category}`.toLowerCase();

  // ê³ì°ê¸° ë§¤í íì´ë¸ (í¤ìëì ê°ì¤ì¹)
  const calculatorMappings = [
    {
      slug: 'í´ì§ê¸-ê³ì°ê¸°',
      title: 'í´ì§ê¸ ê³ì°ê¸°',
      keywords: [
        { word: 'í´ì§ê¸', weight: 10 },
        { word: 'í´ì§ì°ê¸', weight: 8 },
        { word: 'í´ì§', weight: 5 },
      ]
    },
    {
      slug: 'ì¤ìê¸ì¬-ê³ì°ê¸°',
      title: 'ì¤ìê¸ì¬ ê³ì°ê¸°',
      keywords: [
        { word: 'ì¤ìê¸ì¬', weight: 10 },
        { word: 'ê³ ì©ë³´í', weight: 8 },
        { word: 'êµ¬ì§ê¸ì¬', weight: 8 },
      ]
    },
    {
      slug: 'ì°ë§ì ì°-ê³ì°ê¸°',
      title: 'ì°ë§ì ì° ê³ì°ê¸°',
      keywords: [
        { word: 'ì°ë§ì ì°', weight: 10 },
        { word: 'ìëê³µì ', weight: 6 },
        { word: 'ì¸ì¡ê³µì ', weight: 6 },
      ]
    },
    {
      slug: 'ìëìëì¸-ê³ì°ê¸°',
      title: 'ìëìëì¸ ê³ì°ê¸°',
      keywords: [
        { word: 'ìëìëì¸', weight: 10 },
        { word: 'ìëì¸', weight: 10 },
        { word: 'ìë', weight: 5 },
      ]
    },
    {
      slug: 'ëì¶ì´ì-ê³ì°ê¸°',
      title: 'ëì¶ì´ì ê³ì°ê¸°',
      keywords: [
        { word: 'ëì¶ì´ì', weight: 10 },
        { word: 'ëì¶', weight: 6 },
        { word: 'ê¸ë¦¬', weight: 5 },
        { word: 'ìë¦¬ê¸', weight: 5 },
      ]
    },
    {
      slug: 'DSR-ê³ì°ê¸°',
      title: 'DSR ê³ì°ê¸°',
      keywords: [
        { word: 'dsr', weight: 10 },
        { word: 'ì´ë¶ì±', weight: 8 },
      ]
    },
    {
      slug: 'êµ­ë¯¼ì°ê¸-ìë ¹ì¡-ê³ì°ê¸°',
      title: 'êµ­ë¯¼ì°ê¸ ìë ¹ì¡',
      keywords: [
        { word: 'êµ­ë¯¼ì°ê¸', weight: 10 },
        { word: 'ì°ê¸ìë ¹', weight: 8 },
      ]
    },
    {
      slug: '4ëë³´íë£-ê³ì°ê¸°',
      title: '4ëë³´íë£ ê³ì°ê¸°',
      keywords: [
        { word: '4ëë³´í', weight: 10 },
        { word: 'ì¬ëë³´í', weight: 10 },
      ]
    },
    {
      slug: 'ê·¼ë¡ìëì¸-ê³ì°ê¸°',
      title: 'ê·¼ë¡ìëì¸ ê³ì°ê¸°',
      keywords: [
        { word: 'ê·¼ë¡ìëì¸', weight: 10 },
        { word: 'ê·¼ë¡ìë', weight: 6 },
      ]
    },
    {
      slug: 'ì ìì¸-ê³ì°ê¸°',
      title: 'ì ìì¸ ê³ì°ê¸°',
      keywords: [
        { word: 'ì ì¸', weight: 8 },
        { word: 'ìì¸', weight: 8 },
        { word: 'ìëì°¨', weight: 6 },
      ]
    },
    {
      slug: 'ì£¼ì-ê³ì°ê¸°',
      title: 'ì£¼ì ê³ì°ê¸°',
      keywords: [
        { word: 'ì£¼ì', weight: 8 },
        { word: 'ë°°ë¹', weight: 6 },
        { word: 'ì¦ê¶', weight: 5 },
      ]
    },
    {
      slug: 'ìì ê¸-ê³ì°ê¸°',
      title: 'ìì ê¸ ê³ì°ê¸°',
      keywords: [
        { word: 'ìê¸', weight: 10 },
        { word: 'ì ê¸', weight: 10 },
        { word: 'ìì ê¸', weight: 10 },
        { word: 'ì ê¸°ìê¸', weight: 8 },
        { word: 'ì ê¸°ì ê¸', weight: 8 },
      ]
    },
  ];

  // ê° ê³ì°ê¸°ë³ ì ì ê³ì°
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

// HTML ì½íì¸ ìì ëª©ì°¨ ì¶ì¶
function extractToc(html: string): { id: string; text: string; level: number }[] {
  const toc: { id: string; text: string; level: number }[] = [];
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  let counter = 0;

  while ((match = regex.exec(html)) !== null) {
    toc.push({
      id: `section-${counter++}`,
      text: match[2].replace(/<[^>]+>/g, ""), // HTML íê·¸ ì ê±°
      level: parseInt(match[1]),
    });
  }
  return toc;
}

// HTMLì ì¹ì IDì ë²í¸ ì¶ê° (ëë¬´ìí¤ ì¤íì¼)
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
  let slug: string;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    notFound();
  }
  if (slug.includes(' ') || slug.includes('%')) {
    notFound();
  }

  const doc = await getWikiDocument(slug);

  if (!doc) {
    notFound();
  }

  const url = `https://www.jjyu.co.kr/w/${slug}`;
  const relatedDocs = findRelatedDocuments(doc.slug, 5);
  const allDocs = getAllWikiDocuments();

  // ì¸ê¸° ë¬¸ì (ì¡°íì ê¸°ë° - íì¬ë ìµì ìì¼ë¡ ëì²´)
  const popularDocs = allDocs.slice(0, 5);

  // HTML ì²ë¦¬
  let processedHtml = addSectionIds(doc.htmlContent || "");

  // FAQë¥¼ ë³¸ë¬¸ì ì½ì (ê²°ë¡  ì , ì¶ì² ìì ë§ì§ë§ H2 ìì)
  if (doc.faq && doc.faq.length > 0) {
    const faqHtml = `
      <section class="faq-section mt-12 pt-8 border-t border-neutral-200">
        <div class="flex items-center gap-2 mb-6">
          <span class="text-2xl">â</span>
          <h2 id="faq" class="text-2xl font-bold">ìì£¼ ë¬»ë ì§ë¬¸</h2>
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

    // ë§í¬ë¤ì´ ë³¸ë¬¸ìì "ìì£¼ ë¬»ë ì§ë¬¸" ì¹ì ì ê±° (frontmatter FAQë¡ ëì²´)
    // addSectionIds í: <h2 id="section-N"><span...>ì«ì.</span>ìì£¼ ë¬»ë ì§ë¬¸</h2>
    const faqRemovePattern = /<h2[^>]*>(?:<span[^>]*>[^<]*<\/span>)?\s*ìì£¼\s*ë¬»ë\s*ì§ë¬¸<\/h2>[\s\S]*?(?=<hr|<h2|$)/gi;
    processedHtml = processedHtml.replace(faqRemovePattern, '');

    // ë³¸ë¬¸ìì "ì¶ì²" ì¹ì ì ê±° (íë¨ ì¶ì² ë° ì°¸ê³ ìë£ë¡ ëì²´)
    const sourceRemovePattern = /<h2[^>]*>(?:<span[^>]*>[^<]*<\/span>)?\s*ì¶ì²<\/h2>[\s\S]*?(?=<hr|<h2|<section|$)/gi;
    processedHtml = processedHtml.replace(sourceRemovePattern, '');

    // ë³¸ë¬¸ìì "ê´ë ¨ ë¬¸ì" ì¹ì ì ê±° (ì¬ì´ëë°ë¡ ì´ë)
    // FIXME: ì ê·ìì´ ëë¬´ ê´ë²ìíê² ë§¤ì¹­ëì´ ë³¸ë¬¸ê¹ì§ ì­ì íë ë¬¸ì  ë°ì
    // ììë¡ ë¹íì±í
    // const relatedDocsRemovePattern = /<h2[^>]*>[\s\S]*?ê´ë ¨\s*ë¬¸ì[\s\S]*?<\/h2>[\s\S]*?(?=<hr|<h2|<section|$)/gi;
    // processedHtml = processedHtml.replace(relatedDocsRemovePattern, '');

    // ë¨¸ëìí¤ ë°ì¤ HTML ìì±
    const wikiBoxHtml = relatedDocs.length > 0 ? `
      <div class="my-8 border border-neutral-200 rounded-xl overflow-hidden not-prose">
        <div class="px-4 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2">
          <span class="text-[#1E3A5F] font-semibold text-sm">ð¡ ë¨¸ëìí¤</span>
        </div>
        <div class="divide-y divide-neutral-100">
          ${relatedDocs.slice(0, 3).map((relDoc: { slug: string; title: string }) => `
            <a href="/w/${encodeURIComponent(relDoc.slug)}" class="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors group no-underline">
              <span class="text-sm text-neutral-700 group-hover:text-[#1E3A5F] transition-colors">${relDoc.title}</span>
              <span class="text-[#2B5280] font-bold">â</span>
            </a>
          `).join('')}
        </div>
      </div>
    ` : '';

    // ë¨¸ëìí¤ ë°ì¤: ë³¸ë¬¸ ë§ì§ë§ H2 ë°ë¡ ìì ì½ì
    // ìì¤í H2 (FAQ, ì¶ì², ê´ë ¨ ë¬¸ì) ì ì¸íê³  ë§ì§ë§ ë³¸ë¬¸ H2 ì°¾ê¸°
    if (wikiBoxHtml) {
      const h2Regex = /<h2[^>]*>(?:<span[^>]*>[^<]*<\/span>)?([^<]*)<\/h2>/gi;
      const systemH2Patterns = /ìì£¼\s*ë¬»ë\s*ì§ë¬¸|ì¶ì²|ê´ë ¨\s*ë¬¸ì|ê´ë ¨\s*í¤ìë|ì°¸ê³ \s*ìë£/i;

      let lastContentH2Index: number | null = null;
      let match;

      while ((match = h2Regex.exec(processedHtml)) !== null) {
        const h2Text = match[1].trim();
        // ìì¤í H2ê° ìëë©´ ë§ì§ë§ ë³¸ë¬¸ H2 ìì¹ ìë°ì´í¸
        if (!systemH2Patterns.test(h2Text)) {
          lastContentH2Index = match.index;
        }
      }

      // ë§ì§ë§ ë³¸ë¬¸ H2 ìì ì½ì
      if (lastContentH2Index !== null) {
        processedHtml = processedHtml.slice(0, lastContentH2Index) + wikiBoxHtml + processedHtml.slice(lastContentH2Index);
      }
    }

    // FAQ ì½ì: ë³¸ë¬¸ ë§¨ ëì (7ë² ê²°ë¡  ìë)
    processedHtml = processedHtml + faqHtml;
  }

  // ìë¡ /ë³¸ë¬¸ ë¶ë¦¬ (ì²« ë²ì§¸ <h2> ê¸°ì¤)
  const firstH2Index = processedHtml.search(/<h2[\s>]/);
  const introHtml = firstH2Index > 0 ? processedHtml.slice(0, firstH2Index) : "";
  const bodyHtml = firstH2Index > 0 ? processedHtml.slice(firstH2Index) : processedHtml;

  // ëª©ì°¨ ì¶ì¶ (processedHtmlìì - FAQ ì ê±° í)
  const toc = extractToc(processedHtml).filter(
    item => !/ìì£¼\s*ë¬»ë\s*ì§ë¬¸/i.test(item.text)
  );

  // ë¸ë ëí¬ë¼ ë°ì´í° (ë©ì¸ íì´ì§ ì¹´íê³ ë¦¬ ìµì»¤ë¡ ì°ê²°)
  const breadcrumbItems = [
    { name: "í", url: "https://www.jjyu.co.kr" },
    { name: doc.category, url: `https://www.jjyu.co.kr/#category-${encodeURIComponent(doc.category)}` },
    { name: doc.title, url: url },
  ];

  return (
    <>
      {/* JSON-LD ì¤í¤ë§ - SEO ê·¹ëí */}
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
      {/* HowTo ì¤í¤ë§ - ë°°ì´ íì ì§ì (ê³ì°ê¸° ì¬ì©ë² ë±) */}
      {doc.howTo && Array.isArray(doc.howTo) && doc.howTo.length > 0 && (
        <HowToSchema
          name={`${doc.title} ì¬ì©ë²`}
          description={doc.description}
          steps={doc.howTo.map((item: { step: string; description: string }) => ({
            name: item.step,
            text: item.description,
          }))}
        />
      )}
      {/* HowTo ì¤í¤ë§ - ê°ì²´ íì ì§ì */}
      {doc.howTo && !Array.isArray(doc.howTo) && doc.howTo.steps && doc.howTo.steps.length > 0 && (
        <HowToSchema
          name={doc.howTo.name}
          description={doc.howTo.description}
          steps={doc.howTo.steps}
          totalTime={doc.howTo.totalTime}
        />
      )}
      {/* ê³ì°ê¸° íì´ì§ì© SoftwareApplication ì¤í¤ë§ */}
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
      {/* Event ì¤í¤ë§ - ì ì²­ ê¸°ê° ìë ê¸ (CTR 30-50% â) */}
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
      {/* ItemList ì¤í¤ë§ - Hub íì´ì§ (ë´ë¶ SEO â) */}
      {doc.itemList && doc.itemList.length > 0 && (
        <ItemListSchema items={doc.itemList} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* ë©ì¸ ì½íì¸  */}
        <main className="flex-1 min-w-0">
          {/* ë¸ë ëí¬ë¼ */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-black transition-colors">í</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/#category-${encodeURIComponent(doc.category)}`} className="hover:text-black transition-colors">
              {doc.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-black" aria-current="page">{doc.title}</span>
          </nav>

          {/* ë¬¸ì í¤ë */}
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
                  ë§ì§ë§ ìì : {doc.lastUpdated}
                </time>
              </div>
              {/* ê³µì  ë²í¼ */}
              <ShareButtons title={doc.title} url={url} description={doc.description} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{doc.title}</h1>
          </header>

          {/* ìë¡  (ì²« ë²ì§¸ H2 ì ê¹ì§) - ì ëª© ë°ë¡ ìë */}
          {introHtml && (
            <article
              className="prose prose-neutral max-w-none
                prose-p:leading-[1.9] prose-p:text-[#404040] prose-strong:text-[#1a1a1a]
                prose-a:text-[#1E3A5F] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />
          )}

          {/* CTA ì¹´ë - ìë¡  ìë íë ì ë (ê³ì°ê¸° íì´ì§ììë ì¨ê¹) */}
          {doc.schemaType !== "calculator" && doc.ctaCard && (
            <CtaCard
              label={doc.ctaCard.label}
              mainText={doc.ctaCard.mainText}
              subText={doc.ctaCard.subText}
              url={doc.ctaCard.url}
              external={doc.ctaCard.external}
            />
          )}

          {/* ê³ì°ê¸° ì»´í¬ëí¸ - ëì  ë¡ë© (ì½ë ì¤íë¦¬í) */}
          <CalculatorLoader slug={slug} />

          {/* ëª©ì°¨ - ëë¬´ìí¤ ì¤íì¼ (ê³ì°ê¸° íì´ì§ììë ì¨ê¹) */}
          {doc.schemaType !== "calculator" && toc.length >= 2 && (
              <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 id="toc" className="text-sm font-semibold text-neutral-600">ëª©ì°¨</h2>
                </div>
                <ol className="space-y-1 text-sm">
                  {toc.map((item) => {
                    // íì¤í¸ìì ìë¶ë¶ ë²í¸ ì ê±° (ì´ë¯¸ ë²í¸ê° í¬í¨ëì´ ìì)
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

          {/* 3ì¤ ìì½ (ê³ì°ê¸° íì´ì§ììë ì¨ê¹) */}
          {doc.schemaType !== "calculator" && doc.summary && (
            <div className="mb-8 p-6 bg-gradient-to-r from-[#F5F8FB] to-teal-50 rounded-2xl border border-[#EDF2F8]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">ð¡</span>
                <h2 id="summary" className="font-semibold text-[#132A42]">3ì¤ ìì½</h2>
              </div>
              {Array.isArray(doc.summary) ? (
                <ul className="text-neutral-700 leading-relaxed space-y-2">
                  {doc.summary.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#1E3A5F] mt-1">â¢</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-700 leading-relaxed">{doc.summary}</p>
              )}
            </div>
          )}


          {/* ì¸ë¤ì¼ ì´ë¯¸ì§ */}
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

          {/* ctaButton (ë¨ì¼ ê°ì²´ - position: "afterChart"ì¸ ê²½ì°) */}
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

          {/* CTA ë²í¼ (ì¸ë¶ë§í¬ - ë°°ì´) */}
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
                  <span className="ext-btn-cta">{item.action || 'ë°ë¡ê°ê¸°'} â</span>
                </a>
              ))}
            </div>
          )}

          {/* ê´ê³  - ë³¸ë¬¸ ìë¨ */}
          <div className="mb-8 max-h-[120px] overflow-hidden">
            <AdSense slot={AD_SLOTS.HORIZONTAL} format="horizontal" className="w-full" />
          </div>

          {/* ë³¸ë¬¸ (H2 ì¹ìë¤) */}
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

          {/* ì¶ì² ì¹ì - E-E-A-T ê°í */}
          {doc.sources && doc.sources.length > 0 && (
            <section className="mt-8 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">ð</span>
                <h2 id="sources" className="text-lg font-semibold">ì¶ì² ë° ì°¸ê³ ìë£</h2>
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
                        <span className="text-neutral-400 ml-2">({source.date} íì¸)</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ê´ê³  - ë³¸ë¬¸ íë¨ */}
          <div className="mt-12 max-h-[120px] overflow-hidden">
            <AdSense slot={AD_SLOTS.VERTICAL} format="horizontal" className="w-full" />
          </div>

          {/* í¤ìë íê·¸ */}
          {doc.keywords && doc.keywords.length > 0 && (
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-500 mb-3">ê´ë ¨ í¤ìë</h3>
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


          {/* ë¬¸ì í¼ëë°± */}
          <div className="mt-12 p-6 bg-neutral-50 rounded-2xl text-center">
            <p className="text-sm text-neutral-500 mb-2">ì´ ë¬¸ìê° ëìì´ ëìëì?</p>
            <p className="text-xs text-neutral-400">
              ìëª»ë ì ë³´ê° ìë¤ë©´ ìë ¤ì£¼ì¸ì. ë ëì ì ë³´ë¥¼ ì ê³µíê¸° ìí´ ë¸ë ¥íê² ìµëë¤.
            </p>
          </div>
        </main>

        {/* ì¬ì´ëë° */}
        <aside className="w-72 shrink-0 hidden lg:block space-y-4">
          <div className="sticky top-4">
            {/* ì¬ì´ëë° ê´ê³  */}
            <div className="mb-4 max-w-[300px]">
              <AdSense slot={AD_SLOTS.SQUARE} format="rectangle" className="w-full" />
            </div>

            {/* CTA ë²í¼ - ë¸ëì ê¹ë°ì í¨ê³¼ */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="p-4 space-y-3">
                <Link
                  href="/w/ë¯¸íê¸ê¸-ì¡°í"
                  className="group flex items-center gap-3 p-3 rounded-lg transition-all border border-transparent hover:border-[#B8D0E8] animate-yellow-blink"
                >
                  <span className="w-10 h-10 bg-[#EDF2F8] rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">ð°</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">ë´ ì¨ì íê¸ê¸ ì°¾ê¸°</p>
                    <p className="text-xs text-neutral-500">íê·  13ë§ì íê¸</p>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-[#1E3A5F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/category/ì ë¶ì§ìê¸"
                  className="group flex items-center gap-3 p-3 rounded-lg transition-all border border-transparent hover:border-blue-200 animate-yellow-blink"
                  style={{ animationDelay: '0.3s' }}
                >
                  <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">ðï¸</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">2026 ì ë¶ì§ìê¸</p>
                    <p className="text-xs text-neutral-500">30ê°+ ì§ìê¸ ì´ì ë¦¬</p>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/w/2026ë-ë¬ë¼ì§ë-ì ë"
                  className="group flex items-center gap-3 p-3 rounded-lg transition-all border border-transparent hover:border-amber-200 animate-yellow-blink"
                  style={{ animationDelay: '0.6s' }}
                >
                  <span className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">ð</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">2026ë ë¬ë¼ì§ë ì ë</p>
                    <p className="text-xs text-neutral-500">ê¼­ ììì¼ í  ë³ê²½ì¬í­</p>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ê´ë ¨ ë¬¸ì - 1ë² ì¤ìê¸ì¬ ê³ì°ê¸° ê³ ì  */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 border-b border-neutral-100">
                <span className="text-sm font-semibold text-neutral-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  ê´ë ¨ ë¬¸ì
                </span>
              </div>
              <div className="p-3 space-y-2">
                {/* 1ë²: ì£¼ì ë³ ê³ì°ê¸° ëì  ë§¤í */}
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
                          <p className="text-xs text-neutral-400 mt-0.5">ê³ì°ê¸°</p>
                        </div>
                      </Link>
                    );
                  }
                  return null;
                })()}
                {/* ê³ì°ê¸° ìì¼ë©´ 2ë²ë¶í°, ìì¼ë©´ 1ë²ë¶í° relatedDocs íì */}
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

            {/* ì¸ê¸° ê³ì°ê¸° */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  ì¸ê¸° ê³ì°ê¸°
                </span>
              </div>
              <ul className="divide-y divide-neutral-100">
                {[
                  { title: 'ì¤ìê¸ì¬ ê³ì°ê¸°', slug: 'ì¤ìê¸ì¬-ê³ì°ê¸°', rank: 1 },
                  { title: 'í´ì§ê¸ ê³ì°ê¸°', slug: 'í´ì§ê¸-ê³ì°ê¸°', rank: 2 },
                  { title: 'ì°ë§ì ì° ê³ì°ê¸°', slug: 'ì°ë§ì ì°-ê³ì°ê¸°', rank: 3 },
                  { title: 'ìëìëì¸ ê³ì°ê¸°', slug: 'ìëìëì¸-ê³ì°ê¸°', rank: 4 },
                  { title: 'ëì¶ì´ì ê³ì°ê¸°', slug: 'ëì¶ì´ì-ê³ì°ê¸°', rank: 5 },
                  { title: 'êµ­ë¯¼ì°ê¸ ìë ¹ì¡', slug: 'êµ­ë¯¼ì°ê¸-ìë ¹ì¡-ê³ì°ê¸°', rank: 6 },
                  { title: 'ê·¼ë¡ìëì¸ ê³ì°ê¸°', slug: 'ê·¼ë¡ìëì¸-ê³ì°ê¸°', rank: 7 },
                  { title: '4ëë³´íë£ ê³ì°ê¸°', slug: '4ëë³´íë£-ê³ì°ê¸°', rank: 8 },
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

            {/* ë¹ ë¥¸ ë§í¬ */}
            <div className="p-4 bg-[#F5F8FB] rounded-xl">
              <h3 className="text-xs font-semibold text-[#162F4F] mb-3">ë¹ ë¥¸ ë§í¬</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/w/í´ì§ê¸" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors border border-neutral-200">
                  í´ì§ê¸
                </Link>
                <Link href="/w/ì°ë§ì ì°" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors border border-neutral-200">
                  ì°ë§ì ì°
                </Link>
                <Link href="/w/ì¤ìê¸ì¬" className="px-3 py-1.5 bg-white text-xs text-neutral-600 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors border border-neutral-200">
                  ì¤ìê¸ì¬
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
