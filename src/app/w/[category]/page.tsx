import { Metadata } from "next";
import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { BreadcrumbSchema } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ category: string }>;
}

// 정적 생성을 위한 카테고리 목록
export async function generateStaticParams() {
  const allDocs = getAllWikiDocuments();
  const categories = [...new Set(allDocs.map((doc) => doc.category))];
  return categories.map((category) => ({
    category: category,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} - 머니위키`,
    description: `${decodedCategory} 관련 문서를 모아봤어요. 쉽게 이해할 수 있는 정보를 제공합니다.`,
    alternates: {
      canonical: `https://www.jjyu.co.kr/w/${category}`,
    },
    openGraph: {
      title: `${decodedCategory} | 머니위키`,
      description: `${decodedCategory} 관련 문서를 모아봤어요.`,
      type: "website",
      url: `https://www.jjyu.co.kr/w/${category}`,
      siteName: "머니위키",
      locale: "ko_KR",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const allDocs = getAllWikiDocuments();

  // 해당 카테고리의 문서만 필터링
  const categoryDocs = allDocs.filter((doc) => doc.category === decodedCategory);

  // 브레드크럼 데이터
  const breadcrumbItems = [
    { name: "홈", url: "https://www.jjyu.co.kr" },
    { name: decodedCategory, url: `https://www.jjyu.co.kr/w/${category}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black transition-colors">홈</Link>
          <span aria-hidden="true">/</span>
          <span className="text-black" aria-current="page">{decodedCategory}</span>
        </nav>

        {/* 헤더 */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 rounded-lg font-medium">
              {decodedCategory}
            </span>
            <span className="text-sm text-neutral-500">
              {categoryDocs.length}개 문서
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{decodedCategory}</h1>
          <p className="text-neutral-600 text-lg">
            {decodedCategory} 관련 문서를 모아봤어요. 궁금한 정보를 찾아보세요.
          </p>
        </header>

        {/* 문서 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/w/${encodeURIComponent(doc.category)}/${encodeURIComponent(doc.slug)}`}
              className="group p-5 bg-white rounded-xl border border-neutral-200 hover:border-emerald-300 hover:shadow-lg transition-all"
            >
              <h2 className="font-semibold text-neutral-800 group-hover:text-emerald-600 transition-colors mb-2">
                {doc.title}
              </h2>
              <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{doc.description}</p>
              <time className="text-xs text-neutral-400">{doc.lastUpdated}</time>
            </Link>
          ))}
        </div>

        {categoryDocs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500">해당 카테고리에 문서가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
