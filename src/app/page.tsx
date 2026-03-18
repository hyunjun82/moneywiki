import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { categories } from "@/data/categories";

export const dynamic = "force-static";

/* ── 계산기 ── */
const CALCULATORS = [
  { name: "연봉 실수령액", slug: "연봉-실수령액-계산기" },
  { name: "퇴직금 계산기", slug: "퇴직금-계산기" },
  { name: "실업급여 계산기", slug: "실업급여-계산기" },
  { name: "연말정산 계산기", slug: "연말정산-계산기" },
  { name: "양도소득세", slug: "양도소득세-계산기" },
  { name: "대출이자 계산기", slug: "대출이자-계산기" },
  { name: "4대보험료", slug: "4대보험료-계산기" },
  { name: "국민연금 수령액", slug: "국민연금-계산기" },
];

/* ── 인기 가이드 ── */
const POPULAR_GUIDES = [
  { title: "퇴직금 완벽 가이드", desc: "퇴직금 계산법, 세율, 중간정산까지.", href: "/w/퇴직금", category: "근로·급여" },
  { title: "연말정산 절세 전략", desc: "소득공제·세액공제 항목별 핵심 정리.", href: "/w/연말정산", category: "세금" },
  { title: "전세자금대출 총정리", desc: "전세대출 조건, 금리, 한도 비교.", href: "/w/전세자금대출", category: "부동산" },
  { title: "실업급여 받는 법", desc: "자격요건, 신청 절차, 수급 기간 안내.", href: "/w/실업급여", category: "실업급여" },
  { title: "개인사업자 대출 갈아타기", desc: "스마트폰으로 신용대출 금리 비교·갈아타기.", href: "/w/개인사업자-신용대출-갈아타기", category: "금융" },
  { title: "이혼 퇴직금 재산분할", desc: "재산분할 대상 여부와 청구 방법.", href: "/w/이혼-퇴직금-재산분할-대상", category: "법률" },
];

/* ── 관련 사이트 ── */
const PARTNER_SITES = [
  { name: "국세청", url: "https://www.nts.go.kr" },
  { name: "고용노동부", url: "https://www.moel.go.kr" },
  { name: "금융감독원", url: "https://www.fss.or.kr" },
  { name: "국민건강보험", url: "https://www.nhis.or.kr" },
  { name: "홈택스", url: "https://www.hometax.go.kr" },
  { name: "고용보험", url: "https://www.ei.go.kr" },
  { name: "정부24", url: "https://www.gov.kr" },
];

export default function Home() {
  const allDocs = getAllWikiDocuments();

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-[40px] font-bold tracking-tight mb-4 text-gray-900 leading-tight">
              경제·금융 정보를
              <br /><span className="text-[#1D9E75]">쉽고 정확하게</span>
            </h1>
            <p className="text-gray-500 mb-8 text-base md:text-lg leading-relaxed">
              {allDocs.length.toLocaleString()}개 문서 · 계산기 · 체크리스트 · 가이드
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1D9E75] rounded-lg hover:bg-[#17875f] transition-colors text-white font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              문서 검색
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 계산기 ===== */}
      <section id="calculators" className="py-14 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">계산기</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CALCULATORS.map((calc) => (
              <Link
                key={calc.slug}
                href={`/w/${calc.slug}`}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1D9E75]/40 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E1F5EE] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#1D9E75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#1D9E75] transition-colors">{calc.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 카테고리 ===== */}
      <section className="py-14 bg-[#F9FAFB]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#1D9E75]/30 hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E1F5EE] flex items-center justify-center shrink-0">
                  <span className="text-[#1D9E75] text-sm font-bold">{cat.name.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-[#1D9E75] transition-colors">{cat.name}</span>
                  <p className="text-xs text-gray-400 truncate">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 인기 가이드 ===== */}
      <section className="py-14 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">인기 가이드</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1D9E75]/30 hover:shadow-sm transition-all group"
              >
                <span className="inline-block text-xs font-medium text-[#1D9E75] bg-[#E1F5EE] px-2 py-0.5 rounded mb-3">{guide.category}</span>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[#1D9E75] transition-colors">{guide.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 관련 사이트 ===== */}
      <section className="py-8 border-t border-gray-100 bg-[#F9FAFB]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {PARTNER_SITES.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-[#1D9E75] transition-colors"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
