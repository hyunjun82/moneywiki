import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { notFound } from "next/navigation";

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
  "금융/금전": "💳",
  "급여": "💼",
  "고용": "🤝",
  "근로": "👔",
  "근로/노동": "👔",
  "근로노동": "👔",
  "법률": "⚖️",
  "정책": "📜",
  "노동": "🔧",
  "연금": "👴",
  "투자": "📉",
  "양식·서식": "📥",
  "일반": "📄",
  "연차휴가": "🏖️",
  "복지": "🎁",
  "고용/복지": "🎁",
  "고용복지": "🎁",
  "근로·고용": "👔",
  "생활": "🏡",
  "교육": "📚",
  "휴일": "📅",
  "생활법률": "⚖️",
  "휴업": "🔒",
  "기타휴가": "✈️",
  "교통": "🚗",
  "휴직": "💤",
  "고용보험": "🛡️",
  "창업/폐업": "🏪",
  "재테크": "💹",
  "세금/연말정산": "📊",
  "생활/소비": "🛒",
  "보험/금융": "🏦",
  "금융/대출": "💰",
  "행정": "🏛️",
};

// 정적 경로 생성
export async function generateStaticParams() {
  const allDocs = getAllWikiDocuments();
  const categories = Array.from(new Set(allDocs.map((doc) => doc.category || "일반")));

  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const allDocs = getAllWikiDocuments();
  const categoryDocs = allDocs.filter((doc) => doc.category === category);

  return {
    title: `${category} - 머니위키`,
    description: `${category} 관련 문서 ${categoryDocs.length}개`,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const allDocs = getAllWikiDocuments();

  // 해당 카테고리 문서 필터링
  const categoryDocs = allDocs.filter((doc) => doc.category === category);

  if (categoryDocs.length === 0) {
    notFound();
  }

  // 최신순 정렬
  const sortedDocs = [...categoryDocs].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:underline mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{categoryEmoji[category] || "📄"}</span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{category}</h1>
            <p className="text-neutral-500 mt-1">{categoryDocs.length}개 문서</p>
          </div>
        </div>
      </div>

      {/* 문서 리스트 */}
      <div className="space-y-3">
        {sortedDocs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/w/${encodeURIComponent(doc.slug)}`}
            className="block p-4 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 transition-colors"
          >
            <h2 className="font-medium text-neutral-800 mb-1">{doc.title}</h2>
            {doc.description && (
              <p className="text-sm text-neutral-600 line-clamp-2">{doc.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
              {doc.lastUpdated && <span>{doc.lastUpdated}</span>}
              {doc.keywords && doc.keywords.length > 0 && (
                <div className="flex gap-1.5">
                  {doc.keywords.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
