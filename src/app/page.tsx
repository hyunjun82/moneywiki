import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";

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

// 계산기 목록 (카테고리별)
const calculators = {
  "세금": [
    { name: "연말정산 계산기", slug: "연말정산-계산기", icon: "📊" },
    { name: "소득세 계산기", slug: "근로소득세-계산기", icon: "💵" },
    { name: "재산세 계산기", slug: "재산세-계산기", icon: "🏘️" },
    { name: "자동차세 계산기", slug: "자동차세-계산기", icon: "🚗" },
    { name: "양도소득세 계산기", slug: "양도소득세-계산기", icon: "💸" },
    { name: "증여세 계산기", slug: "증여세-계산기", icon: "🎁" },
    { name: "상속세 계산기", slug: "상속세-계산기", icon: "👨‍👩‍👧‍👦" },
    { name: "취득세 계산기", slug: "취득세-계산기", icon: "🏡" },
    { name: "종합부동산세 계산기", slug: "종합부동산세-계산기", icon: "🏢" },
  ],
  "급여": [
    { name: "실수령액 계산기", slug: "연봉-실수령액-계산기", icon: "💰" },
    { name: "시급 계산기", slug: "시급-계산기", icon: "⏱️" },
    { name: "연봉 계산기", slug: "연봉-계산기", icon: "💼" },
    { name: "퇴직금 계산기", slug: "퇴직금-계산기", icon: "🎂" },
    { name: "주휴수당 계산기", slug: "주휴수당-계산기", icon: "📅" },
  ],
  "대출": [
    { name: "대출이자 계산기", slug: "대출이자-계산기", icon: "🏦" },
    { name: "주택담보대출 계산기", slug: "주택담보대출-계산기", icon: "🏠" },
    { name: "전세자금대출 계산기", slug: "전세대출-계산기", icon: "🔑" },
    { name: "대출상환 계산기", slug: "대출상환-계산기", icon: "💳" },
    { name: "할부이자 계산기", slug: "할부-이자-계산기", icon: "🛒" },
    { name: "DSR 계산기", slug: "DSR-계산기", icon: "📊" },
  ],
  "금융": [
    { name: "복리이자 계산기", slug: "복리-계산기", icon: "📈" },
    { name: "예금이자 계산기", slug: "예금이자-계산기", icon: "💵" },
    { name: "적금 계산기", slug: "적금-계산기", icon: "🏦" },
    { name: "주식수익률 계산기", slug: "주식-수익률-계산기", icon: "📉" },
  ],
  "보험": [
    { name: "보험료 계산기", slug: "4대보험료-계산기", icon: "🛡️" },
    { name: "국민연금 계산기", slug: "국민연금-수령액-계산기", icon: "👴" },
    { name: "실업급여 계산기", slug: "실업급여-계산기", icon: "📄" },
  ],
  "부동산": [
    { name: "중개수수료 계산기", slug: "중개수수료-계산기", icon: "🤝" },
    { name: "평수변환 계산기", slug: "평수-계산기", icon: "📐" },
  ],
};

export default function Home() {
  // 실제 위키 문서 가져오기
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

  // 카테고리 정렬 (문서 수 기준)
  const sortedCategories = Object.entries(docsByCategory)
    .sort((a, b) => b[1].length - a[1].length);

  // 최신 문서 (최근 수정 기준)
  const recentDocs = [...allDocs]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 10);

  // 인기 문서 (주요 키워드 기준)
  const popularDocs = allDocs.filter(doc =>
    ["연말정산", "퇴직금", "종합소득세", "실업급여", "4대보험", "양도소득세", "취득세", "전세자금대출"].some(
      keyword => doc.title.includes(keyword) || doc.slug.includes(keyword)
    )
  ).slice(0, 8);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* 히어로 */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-sm text-emerald-700 mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          {allDocs.length}개 문서 · 세금 · 경제 · 부동산 · 법률
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          머니위키<br />
          <span className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-transparent">
            쉽게 찾아보세요
          </span>
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-8">
          퇴직금, 연말정산, 부동산, 대출까지.<br />
          정부 사이트보다 쉽고, 블로그보다 정확하게.
        </p>

        {/* 빠른 검색 */}
        <div className="max-w-md mx-auto">
          <Link
            href="/search"
            className="flex items-center gap-3 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-neutral-500">문서 검색...</span>
          </Link>
        </div>
      </section>

      {/* 계산기 섹션 */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-6">
          계산기
        </h2>
        <div className="space-y-6">
          {Object.entries(calculators).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-neutral-700 mb-3">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/w/${calc.slug}`}
                    className="group p-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{calc.icon}</span>
                      <span className="text-sm font-medium text-neutral-800 group-hover:text-emerald-600">
                        {calc.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 카테고리 요약 */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-6">
          카테고리별 문서
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sortedCategories.map(([category, docs]) => (
            <Link
              key={category}
              href={category === "양식·서식" ? "/forms" : `#category-${category}`}
              className="p-4 bg-white border border-neutral-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all text-center"
            >
              <span className="text-2xl mb-2 block">{categoryEmoji[category] || "📄"}</span>
              <span className="font-medium text-sm">{category}</span>
              <p className="text-xs text-neutral-500 mt-1">{docs.length}개 문서</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 인기 문서 */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            🔥 인기 문서
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/w/${encodeURIComponent(doc.slug)}`}
              className="group p-4 bg-white border border-neutral-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs bg-emerald-50 text-emerald-600 rounded">
                  {doc.category}
                </span>
              </div>
              <h3 className="font-medium text-neutral-800 group-hover:text-emerald-600 transition-colors mb-1 line-clamp-1">
                {doc.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2">{doc.summary || doc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 최신 업데이트 */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            ✨ 최신 업데이트
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recentDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/w/${encodeURIComponent(doc.slug)}`}
              className="group flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-xl hover:border-emerald-300 transition-all"
            >
              <div className="flex-1 min-w-0">
                <span className="font-medium text-neutral-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {doc.title}
                </span>
                <p className="text-xs text-neutral-500 mt-1">{doc.category}</p>
              </div>
              <span className="text-xs text-neutral-500 shrink-0">{doc.lastUpdated}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 광고 슬롯 */}
      <div className="mb-16 p-6 bg-neutral-50 border border-dashed border-neutral-200 rounded-xl text-center">
        <span className="text-sm text-neutral-400">Advertisement</span>
      </div>

      {/* 카테고리별 전체 문서 */}
      {sortedCategories.map(([category, docs]) => (
        <section key={category} id={`category-${category}`} className="mb-16 scroll-mt-8">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-neutral-200">
            <span className="text-2xl">{categoryEmoji[category] || "📄"}</span>
            <h2 className="text-xl font-bold">{category}</h2>
            <span className="text-sm text-neutral-500">({docs.length}개)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {docs
              .sort((a, b) => a.title.localeCompare(b.title, 'ko'))
              .map((doc) => (
              <Link
                key={doc.slug}
                href={`/w/${encodeURIComponent(doc.slug)}`}
                className="group flex items-start gap-3 p-4 bg-white border border-neutral-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-neutral-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                    {doc.summary || doc.description}
                  </p>
                </div>
                <svg className="w-4 h-4 text-neutral-300 group-hover:text-emerald-500 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* 전체 문서 인덱스 */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-neutral-200">
          <span className="text-2xl">📚</span>
          <h2 className="text-xl font-bold">전체 문서 목록</h2>
          <span className="text-sm text-neutral-500">({allDocs.length}개)</span>
        </div>
        <div className="bg-neutral-50 rounded-xl p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {allDocs
              .sort((a, b) => a.title.localeCompare(b.title, 'ko'))
              .map((doc) => (
              <Link
                key={doc.slug}
                href={`/w/${encodeURIComponent(doc.slug)}`}
                className="text-sm text-neutral-600 hover:text-emerald-600 hover:underline truncate py-1"
              >
                {doc.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 정보 */}
      <div className="text-center text-sm text-neutral-500 py-8 border-t border-neutral-200">
        <p>머니위키 - 대한민국 세금·경제·부동산·법률 정보</p>
        <p className="mt-1">총 {allDocs.length}개 문서 | 2026년 기준 정보</p>
      </div>
    </main>
  );
}
