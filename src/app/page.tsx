import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { categories } from "@/data/categories";
import QuickSidebar from "@/components/QuickSidebar";

export const dynamic = 'force-static';

/* 계산기 그룹 (KFB 3열 카드) */
const CALC_GROUPS = [
  {
    title: "급여·소득 계산기",
    badge: "TOP",
    items: [
      { name: "연봉 실수령액", slug: "연봉-실수령액-계산기" },
      { name: "퇴직금 계산기", slug: "퇴직금-계산기" },
      { name: "실업급여 계산기", slug: "실업급여-계산기" },
      { name: "연말정산 계산기", slug: "연말정산-계산기" },
    ],
  },
  {
    title: "부동산·세금 계산기",
    badge: "HOT",
    items: [
      { name: "양도소득세 계산기", slug: "양도소득세-계산기" },
      { name: "취득세 계산기", slug: "취득세-계산기" },
      { name: "전월세 전환율", slug: "전월세-전환율" },
      { name: "종합소득세 계산기", slug: "종합소득세-계산기" },
    ],
  },
  {
    title: "금융·대출 계산기",
    badge: "NEW",
    items: [
      { name: "대출이자 계산기", slug: "대출이자-계산기" },
      { name: "4대보험료 계산기", slug: "4대보험료-계산기" },
      { name: "국민연금 계산기", slug: "국민연금-계산기" },
      { name: "건강보험료 계산기", slug: "건강보험료-계산기" },
    ],
  },
];

/* 인기 가이드 */
const POPULAR_GUIDES = [
  { title: "퇴직금 완벽 가이드", desc: "퇴직금 계산법, 세율, 중간정산까지 모든 것을 정리했어요.", href: "/w/퇴직금", category: "근로·급여" },
  { title: "연말정산 절세 전략", desc: "연말정산 소득공제·세액공제 항목별 핵심 정리.", href: "/w/연말정산", category: "세금" },
  { title: "전세자금대출 총정리", desc: "전세대출 조건, 금리, 한도를 비교해드려요.", href: "/w/전세자금대출", category: "부동산" },
  { title: "실업급여 받는 법", desc: "실업급여 자격요건, 신청 절차, 수급 기간 안내.", href: "/w/실업급여", category: "실업급여" },
];

/* 관련 사이트 */
const PARTNER_SITES = [
  { name: "국세청", url: "https://www.nts.go.kr" },
  { name: "고용노동부", url: "https://www.moel.go.kr" },
  { name: "금융감독원", url: "https://www.fss.or.kr" },
  { name: "국민건강보험", url: "https://www.nhis.or.kr" },
  { name: "법원", url: "https://www.scourt.go.kr" },
  { name: "홈택스", url: "https://www.hometax.go.kr" },
  { name: "고용보험", url: "https://www.ei.go.kr" },
  { name: "정부24", url: "https://www.gov.kr" },
];

export default function Home() {
  const allDocs = getAllWikiDocuments();

  const recentDocs = [...allDocs]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 6);

  const popularDocs = allDocs.filter(doc =>
    ["연말정산", "퇴직금", "종합소득세", "실업급여", "4대보험", "양도소득세"].some(
      keyword => doc.title.includes(keyword) || doc.slug.includes(keyword)
    )
  ).slice(0, 6);

  return (
    <>
      <QuickSidebar />

      <div className="lg:ml-[120px]">
        {/* ===== Section 0: Hero ===== */}
        <section className="section-kfb-blue py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
              머니위키에서{' '}
              <span className="text-[#2563EB]">경제/금융/법률 정보</span>를
              <br className="hidden sm:block" />
              한 눈에 확인하세요.
            </h1>
            <p className="text-gray-500 mb-8 text-base">
              퇴직금, 연말정산, 부동산, 대출까지. 정부 사이트보다 쉽고, 블로그보다 정확하게.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#2563EB] hover:shadow-md transition-all text-gray-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {allDocs.length}개 문서 검색
            </Link>
          </div>
        </section>

        {/* ===== Section 1: 계산기 바로가기 (KFB 3열 카드) ===== */}
        <section id="section-calc" className="py-16">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="kfb-section-title">계산기 바로가기</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="calculators">
              {CALC_GROUPS.map((group) => (
                <div key={group.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{group.title}</h3>
                    <span className="badge-kfb">{group.badge}</span>
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/w/${item.slug}`}
                          className="flex items-center justify-between py-2 px-1 text-sm text-gray-600 hover:text-[#2563EB] transition-colors group"
                        >
                          <span>{item.name}</span>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-[#2563EB] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 2: 인기 가이드 바로가기 ===== */}
        <section id="section-guides" className="section-kfb-blue py-16">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="kfb-section-title">인기 가이드 바로가기</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {POPULAR_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#2563EB]/30 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-[#2563EB] mb-1 block">{guide.category}</span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{guide.desc}</p>
                    </div>
                    <div className="ml-4 shrink-0">
                      <span className="btn-kfb text-xs group-hover:bg-[#142D4A]">
                        바로가기
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 3: 카테고리별 가이드 ===== */}
        <section id="section-categories" className="py-16">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="kfb-section-title">카테고리별 가이드 바로가기</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex flex-col items-center p-5 bg-white border border-gray-200 rounded-xl hover:border-[#2563EB] hover:shadow-md transition-all text-center group"
                >
                  <span className="text-2xl mb-2">{cat.icon}</span>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-[#2563EB] transition-colors">{cat.name}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{cat.description.slice(0, 15)}...</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 4: 인기 문서 + 최신 업데이트 ===== */}
        <section id="section-popular" className="section-kfb-purple py-16">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 인기 문서 */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">인기 문서</h2>
                  <Link href="/search" className="text-sm text-[#2563EB] hover:underline">더보기</Link>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {popularDocs.map((doc, i) => (
                    <Link
                      key={doc.slug}
                      href={`/w/${encodeURIComponent(doc.slug)}`}
                      className={`flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors ${i < popularDocs.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <span className="text-xs font-medium text-[#1B3A5C] bg-blue-50 px-2 py-0.5 rounded shrink-0">{doc.category}</span>
                      <span className="text-sm text-gray-700 truncate">{doc.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 최신 업데이트 */}
              <div id="section-recent">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">최신 업데이트</h2>
                  <Link href="/search" className="text-sm text-[#2563EB] hover:underline">더보기</Link>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {recentDocs.map((doc, i) => (
                    <Link
                      key={doc.slug}
                      href={`/w/${encodeURIComponent(doc.slug)}`}
                      className={`flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors ${i < recentDocs.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <span className="text-sm text-gray-700 truncate flex-1">{doc.title}</span>
                      <span className="text-xs text-gray-400 shrink-0 ml-3">{doc.lastUpdated}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 5: 관련 사이트 ===== */}
        <section className="py-10 border-t border-gray-200 bg-gray-50">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {PARTNER_SITES.map((site) => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#1B3A5C] transition-colors"
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
