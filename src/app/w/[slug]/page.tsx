import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWikiDocument, getAllWikiSlugs } from "@/lib/wiki";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 정적 생성을 위한 경로 생성
export async function generateStaticParams() {
  const slugs = getAllWikiSlugs();
  return slugs.map((slug) => ({
    slug: encodeURIComponent(slug),
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getWikiDocument(slug);

  if (!doc) {
    return {
      title: "문서를 찾을 수 없습니다",
    };
  }

  return {
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    openGraph: {
      title: `${doc.title} | 머니위키`,
      description: doc.description,
      type: "article",
    },
  };
}

export default async function WikiPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getWikiDocument(slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
        <Link href="/" className="hover:text-black transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link
          href={`/category/${encodeURIComponent(doc.category)}`}
          className="hover:text-black transition-colors"
        >
          {doc.category}
        </Link>
        <span>/</span>
        <span className="text-black">{doc.title}</span>
      </nav>

      {/* 문서 헤더 */}
      <header className="mb-8 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded">
            {doc.category}
          </span>
          <span className="text-xs text-neutral-400">
            마지막 수정: {doc.lastUpdated}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{doc.title}</h1>
        <p className="text-neutral-600">{doc.description}</p>
      </header>

      {/* 광고 슬롯 */}
      <div className="mb-8 p-4 bg-neutral-50 border border-dashed border-neutral-200 rounded-lg text-center">
        <span className="text-sm text-neutral-400">Advertisement</span>
      </div>

      {/* 문서 본문 */}
      <article
        className="prose prose-neutral max-w-none
          prose-headings:font-semibold
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

      {/* 하단 광고 */}
      <div className="mt-12 p-4 bg-neutral-50 border border-dashed border-neutral-200 rounded-lg text-center">
        <span className="text-sm text-neutral-400">Advertisement</span>
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
    </main>
  );
}
