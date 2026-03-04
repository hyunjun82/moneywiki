import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { categories } from "@/data/categories";
import QuickSidebar from "@/components/QuickSidebar";

export const dynamic = "force-static";

/* ── SVG 아이콘 paths (남색 단일 톤) ── */
const CATEGORY_ICONS: Record<string, string> = {
  부동산: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/>',
  근로: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2"/>',
  세금: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>',
  금융: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  실업급여: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>',
  복지: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
  법률: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>',
  퇴직: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>',
  생활경제: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>',
  보험: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  교육: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>',
  창업: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
};

/* ── 계산기 ── */
const CALCULATORS = [
  { name: "연봉 실수령액", slug: "연봉-실수령액-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>' },
  { name: "퇴직금 계산기", slug: "퇴직금-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>' },
  { name: "실업급여 계산기", slug: "실업급여-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>' },
  { name: "연말정산 계산기", slug: "연말정산-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>' },
  { name: "양도소득세", slug: "양도소득세-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/>' },
  { name: "대출이자 계산기", slug: "대출이자-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' },
  { name: "4대보험료", slug: "4대보험료-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>' },
  { name: "국민연금 수령액", slug: "국민연금-계산기", path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>' },
];

/* ── 퀵링크 ── */
const QUICK_LINKS = [
  { name: "연봉 실수령액", desc: "세후 월급 바로 계산", slug: "연봉-실수령액-계산기" },
  { name: "퇴직금 계산기", desc: "세전·세후 금액 비교", slug: "퇴직금-계산기" },
  { name: "실업급여 계산기", desc: "수급액·수급기간 확인", slug: "실업급여-계산기" },
  { name: "대출이자 계산기", desc: "원리금 균등상환 비교", slug: "대출이자-계산기" },
];

/* ── 인기 가이드 ── */
const POPULAR_GUIDES = [
  { title: "퇴직금 완벽 가이드", desc: "퇴직금 계산법, 세율, 중간정산까지.", href: "/w/퇴직금", category: "근로·급여" },
  { title: "연말정산 절세 전략", desc: "소득공제·세액공제 항목별 핵심 정리.", href: "/w/연말정산", category: "세금" },
  { title: "전세자금대출 총정리", desc: "전세대출 조건, 금리, 한도 비교.", href: "/w/전세자금대출", category: "부동산" },
  { title: "실업급여 받는 법", desc: "자격요건, 신청 절차, 수급 기간 안내.", href: "/w/실업급여", category: "실업급여" },
];

/* ── 관련 사이트 ── */
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

/* ── 남색 아이콘 컴포넌트 ── */
function NavyIcon({ svg, size = 48 }: { svg: string; size?: number }) {
  return (
    <div
      className="rounded-xl flex items-center justify-center bg-[#EDF2F8]"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1B3A5C"
        style={{ width: size * 0.5, height: size * 0.5 }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

export default function Home() {
  const allDocs = getAllWikiDocuments();

  return (
    <>
      <QuickSidebar />

      <div className="lg:ml-[88px]">
        {/* ===== Hero ===== */}
        <section className="bg-[#1B3A5C]">
          <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
            <div className="flex items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-[40px] font-bold tracking-tight mb-4 text-white leading-tight">
                  경제/금융 정보를
                  <br />한 눈에 확인하세요.
                </h1>
                <p className="text-white/60 mb-8 text-base md:text-lg leading-relaxed">
                  정부 사이트보다 쉽고, 블로그보다 정확하게.
                  <br className="hidden sm:block" />
                  계산기, 체크리스트, 가이드까지 한곳에서.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-lg hover:bg-gray-50 transition-colors text-[#1B3A5C] font-medium shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{allDocs.length}개 문서 검색</span>
                </Link>
              </div>

              {/* 히어로 우측: 주요 카테고리 6개 */}
              <div className="hidden md:block shrink-0">
                <div className="grid grid-cols-3 gap-3">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
                    >
                      <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" className="w-5 h-5" dangerouslySetInnerHTML={{ __html: CATEGORY_ICONS[cat.slug] || "" }} />
                      </div>
                      <span className="text-[11px] text-white/80 font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 계산기 바로가기 ===== */}
        <section id="section-calc" className="py-14 bg-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">계산기 바로가기</h2>
              <Link href="/search" className="text-sm text-[#1B3A5C] hover:underline font-medium">전체보기</Link>
            </div>

            {/* 아이콘 그리드 */}
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 mb-5">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {CALCULATORS.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/w/${calc.slug}`}
                    className="flex flex-col items-center gap-2.5 py-2 group"
                  >
                    <NavyIcon svg={calc.path} />
                    <span className="text-xs text-gray-600 group-hover:text-[#1B3A5C] font-medium transition-colors text-center leading-tight">
                      {calc.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 퀵링크 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.slug}
                  href={`/w/${link.slug}`}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1B3A5C]/30 hover:shadow-sm transition-all group"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-[#1B3A5C] transition-colors">{link.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{link.desc}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#1B3A5C] transition-colors shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 카테고리별 가이드 ===== */}
        <section id="section-categories" className="py-14 bg-[#F8FAFC]">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-8">카테고리별 가이드</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-100 rounded-xl hover:border-[#1B3A5C]/30 hover:shadow-md transition-all text-center group"
                >
                  <NavyIcon svg={CATEGORY_ICONS[cat.slug] || ""} size={52} />
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-[#1B3A5C] transition-colors">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 인기 가이드 ===== */}
        <section id="section-guides" className="py-14 bg-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-8">인기 가이드</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {POPULAR_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1B3A5C]/30 transition-all group"
                >
                  <span className="inline-block text-xs font-medium text-[#1B3A5C] bg-[#EDF2F8] px-2.5 py-1 rounded-md mb-3">{guide.category}</span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-[#1B3A5C] transition-colors">{guide.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{guide.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 관련 사이트 ===== */}
        <section id="section-partners" className="py-8 border-t border-gray-200 bg-gray-50">
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
