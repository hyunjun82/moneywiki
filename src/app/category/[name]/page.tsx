import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";

interface PageProps {
  params: Promise<{ name: string }>;
}

// ISR 사용 - 주문형 정적 생성 (On-Demand ISR)
export const revalidate = 3600; // 1시간마다 갱신
export const dynamicParams = true; // 미리 생성되지 않은 페이지는 런타임에 생성

// 카테고리별 이모지
const categoryEmoji: Record<string, string> = {
  "연말정산": "📊",
  "실업급여": "📋",
  "퇴직금": "💵",
  "퇴직연금": "🏦",
  "부동산": "🏠",
  "세금": "💰",
  "경제": "📈",
  "금융": "💳",
  "급여": "💼",
  "고용": "🤝",
  "근로": "👔",
  "법률": "⚖️",
  "정책": "📜",
  "노동": "🔧",
  "연금": "👴",
  "투자": "📉",
  "양식·서식": "📥",
  "일반": "📄",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  return {
    title: `${categoryName} - 머니위키`,
    description: `${categoryName} 관련 문서 모음. 머니위키에서 쉽고 정확하게 찾아보세요.`,
  };
}

export async function generateStaticParams() {
  // 선택적: 가장 인기 있는 카테고리만 미리 생성 (나머지는 on-demand ISR)
  const popularCategories = ["부동산", "연말정산", "실업급여", "세금", "금융", "근로/노동"];
  return popularCategories.map((name) => ({
    name: encodeURIComponent(name),
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  const allDocs = getAllWikiDocuments();

  const docs = allDocs.filter(doc => (doc.category || "일반") === categoryName);

  if (docs.length === 0) {
    notFound();
  }

  // 가나다순 정렬
  const sortedDocs = docs.sort((a, b) => a.title.localeCompare(b.title, 'ko'));

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700 mb-4 inline-block">
          ← 홈으로
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryEmoji[categoryName] || "📄"}</span>
          <div>
            <h1 className="text-2xl font-bold">{categoryName}</h1>
            <p className="text-neutral-500">{docs.length}개 문서</p>
          </div>
        </div>
      </div>

      {/* 문서 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sortedDocs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/w/${encodeURIComponent(doc.slug)}`}
            className="p-4 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 transition-colors"
          >
            <h3 className="font-medium text-neutral-800 line-clamp-1">{doc.title}</h3>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
              {doc.summary || doc.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
