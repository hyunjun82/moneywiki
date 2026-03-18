import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { categories } from "@/data/categories";

export const dynamic = "force-static";

/* ── 계산기 ── */
const CALCULATORS = [
  { name: "연봉 실수령액", desc: "세후 월급 바로 확인", slug: "연봉-실수령액-계산기" },
  { name: "퇴직금 계산기", desc: "세전·세후 금액 비교", slug: "퇴직금-계산기" },
  { name: "실업급여 계산기", desc: "수급액·기간 확인", slug: "실업급여-계산기" },
  { name: "연말정산 계산기", desc: "환급액 미리 확인", slug: "연말정산-계산기" },
  { name: "양도소득세", desc: "양도세 자동 계산", slug: "양도소득세-계산기" },
  { name: "대출이자 계산기", desc: "원리금 상환 비교", slug: "대출이자-계산기" },
  { name: "4대보험료", desc: "급여별 보험료 확인", slug: "4대보험료-계산기" },
  { name: "국민연금 수령액", desc: "예상 연금액 조회", slug: "국민연금-계산기" },
];

/* ── 인기 가이드 ── */
const POPULAR_GUIDES = [
  { title: "퇴직금 완벽 가이드", desc: "퇴직금 계산법부터 세율, 중간정산 조건까지 한 번에 정리했어요.", href: "/w/퇴직금", category: "근로·급여" },
  { title: "연말정산 절세 전략", desc: "소득공제·세액공제 항목별로 놓치기 쉬운 핵심을 짚어줘요.", href: "/w/연말정산", category: "세금" },
  { title: "전세자금대출 총정리", desc: "전세대출 조건, 금리, 한도를 은행별로 비교할 수 있어요.", href: "/w/전세자금대출", category: "부동산" },
  { title: "실업급여 받는 법", desc: "자격요건부터 신청 절차, 수급 기간까지 단계별로 안내해요.", href: "/w/실업급여", category: "실업급여" },
  { title: "개인사업자 대출 갈아타기", desc: "스마트폰으로 신용대출 금리를 비교하고 갈아타는 방법이에요.", href: "/w/개인사업자-신용대출-갈아타기", category: "금융" },
  { title: "이혼 퇴직금 재산분할", desc: "퇴직금 재산분할 대상 여부와 청구 조건, 절차를 정리했어요.", href: "/w/이혼-퇴직금-재산분할-대상", category: "법률" },
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
      <section className="bg-[#F8FBF9]">
        <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#1D9E75] font-semibold text-sm mb-4 tracking-wide">경제·금융·법률 정보 위키</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.2] mb-5">
              어려운 금융 정보를<br />
              <span className="text-[#1D9E75]">쉽고 정확하게</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              {allDocs.length.toLocaleString()}개 문서, 8개 계산기, 12개 카테고리.<br className="hidden sm:block" />
              정부 사이트보다 쉽고, 블로그보다 정확하게.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/search"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#1D9E75] rounded-xl hover:bg-[#17875f] transition-all text-white font-semibold text-[15px] shadow-lg shadow-[#1D9E75]/20 hover:shadow-xl hover:shadow-[#1D9E75]/30 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                문서 검색
              </Link>
              <Link
                href="/#calculators"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-gray-200 text-gray-600 hover:border-[#1D9E75]/40 hover:text-[#1D9E75] hover:bg-white transition-all font-medium text-[15px]"
              >
                계산기 바로가기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 계산기 ===== */}
      <section id="calculators" className="py-16 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">계산기</h2>
            <p className="text-gray-400 text-sm">궁금한 금액을 바로 계산해보세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CALCULATORS.map((calc) => (
              <Link
                key={calc.slug}
                href={`/w/${calc.slug}`}
                className="flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E1F5EE] flex items-center justify-center mb-4 group-hover:bg-[#1D9E75] transition-colors duration-200">
                  <svg className="w-6 h-6 text-[#1D9E75] group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#1D9E75] transition-colors mb-1">{calc.name}</span>
                <span className="text-xs text-gray-400">{calc.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 카테고리 ===== */}
      <section className="py-16 md:py-20 bg-[#F9FAFB]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">카테고리</h2>
            <p className="text-gray-400 text-sm">주제별로 필요한 정보를 찾아보세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E1F5EE] flex items-center justify-center shrink-0 group-hover:bg-[#1D9E75] transition-colors duration-200">
                  <span className="text-[#1D9E75] text-sm font-bold group-hover:text-white transition-colors duration-200">{cat.name.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-gray-900 group-hover:text-[#1D9E75] transition-colors">{cat.name}</span>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 인기 가이드 ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">인기 가이드</h2>
            <p className="text-gray-400 text-sm">가장 많이 찾는 가이드를 모았어요</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POPULAR_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span className="inline-block text-xs font-semibold text-[#1D9E75] bg-[#E1F5EE] px-2.5 py-1 rounded-lg mb-4">{guide.category}</span>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#1D9E75] transition-colors">{guide.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 관련 사이트 ===== */}
      <section className="py-10 border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-xs text-gray-300 text-center mb-4">참고 사이트</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
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
