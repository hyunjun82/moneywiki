import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import MarqueeBanner from "@/components/MarqueeBanner";

// Pure SSG - 빌드타임에만 정적 생성 (런타임 CPU 0%)
export const dynamic = 'force-static';

// 카테고리별 이모지
const categoryEmoji: Record<string, string> = {
  "정부지원금": "💰",
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

// 계산기 목록 (카테고리별) - 인기 계산기만
const calculators = [
  { name: "연말정산 계산기", slug: "연말정산-계산기", icon: "📊" },
  { name: "실수령액 계산기", slug: "연봉-실수령액-계산기", icon: "💰" },
  { name: "퇴직금 계산기", slug: "퇴직금-계산기", icon: "🎂" },
  { name: "실업급여 계산기", slug: "실업급여-계산기", icon: "📄" },
  { name: "양도소득세 계산기", slug: "양도소득세-계산기", icon: "💸" },
  { name: "취득세 계산기", slug: "취득세-계산기", icon: "🏡" },
  { name: "대출이자 계산기", slug: "대출이자-계산기", icon: "🏦" },
  { name: "4대보험료 계산기", slug: "4대보험료-계산기", icon: "🛡️" },
];

export default function Home() {
  const allDocs = getAllWikiDocuments();

  // 카테고리별로 그룹화
  const docsByCategory = allDocs.reduce((acc, doc) => {
    const category = doc.category || "일반";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {} as Record<string, typeof allDocs>);

  // 카테고리 정렬 (문서 수 기준) - 상위 8개만
  const sortedCategories = Object.entries(docsByCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 8);

  // 최신 문서 6개만
  const recentDocs = [...allDocs]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 6);

  // 인기 문서 6개만
  const popularDocs = allDocs.filter(doc =>
    ["연말정산", "퇴직금", "종합소득세", "실업급여", "4대보험", "양도소득세"].some(
      keyword => doc.title.includes(keyword) || doc.slug.includes(keyword)
    )
  ).slice(0, 6);

  return (
    <>
      {/* 롤링 티커 - 정부지원금 홍보 */}
      <MarqueeBanner />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* 히어로 - 간소화 */}
        <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          머니위키
        </h1>
        <p className="text-neutral-500 mb-6">
          퇴직금, 연말정산, 부동산, 대출까지. 쉽고 정확하게.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors text-neutral-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {allDocs.length}개 문서 검색
        </Link>
      </section>

      {/* 인기 계산기 - 8개만 */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
          계산기
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/w/${calc.slug}`}
              className="flex items-center gap-2 p-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 transition-colors"
            >
              <span>{calc.icon}</span>
              <span className="text-sm font-medium text-neutral-700">{calc.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 카테고리 - 상위 8개만 */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
          카테고리
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sortedCategories.map(([category, docs]) => (
            <Link
              key={category}
              href={`/category/${encodeURIComponent(category)}`}
              className="p-4 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 transition-colors text-center"
            >
              <span className="text-xl block mb-1">{categoryEmoji[category] || "📄"}</span>
              <span className="text-sm font-medium">{category}</span>
              <p className="text-xs text-neutral-500">{docs.length}개</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 인기 문서 - 6개만 */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
          인기 문서
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/w/${encodeURIComponent(doc.slug)}`}
              className="p-4 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 transition-colors"
            >
              <span className="text-xs text-emerald-600 mb-1 block">{doc.category}</span>
              <h3 className="font-medium text-neutral-800 line-clamp-1">{doc.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 최신 업데이트 - 6개만 */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
          최신 업데이트
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recentDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/w/${encodeURIComponent(doc.slug)}`}
              className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 transition-colors"
            >
              <span className="font-medium text-neutral-700 truncate">{doc.title}</span>
              <span className="text-xs text-neutral-400 shrink-0 ml-2">{doc.lastUpdated}</span>
            </Link>
          ))}
        </div>
      </section>

    </main>
    </>
  );
}
