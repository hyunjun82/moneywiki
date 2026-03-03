import Link from "next/link";
import { getAllWikiDocuments } from "@/lib/wiki";
import { categories } from "@/data/categories";
import QuickSidebar from "@/components/QuickSidebar";

export const dynamic = 'force-static';

/* 계산기 그룹 */
const CALC_GROUPS = [
  {
    title: "급여·소득",
    icon: "💰",
    color: "bg-blue-50 text-blue-600",
    items: [
      { name: "연봉 실수령액", slug: "연봉-실수령액-계산기", icon: "📊" },
      { name: "퇴직금 계산기", slug: "퇴직금-계산기", icon: "🎂" },
      { name: "실업급여 계산기", slug: "실업급여-계산기", icon: "📋" },
      { name: "연말정산 계산기", slug: "연말정산-계산기", icon: "🧾" },
    ],
  },
  {
    title: "부동산·세금",
    icon: "🏠",
    color: "bg-emerald-50 text-emerald-600",
    items: [
      { name: "양도소득세", slug: "양도소득세-계산기", icon: "💸" },
      { name: "취득세 계산기", slug: "취득세-계산기", icon: "🏡" },
      { name: "전월세 전환율", slug: "전월세-전환율", icon: "🔄" },
      { name: "종합소득세", slug: "종합소득세-계산기", icon: "📑" },
    ],
  },
  {
    title: "금융·대출",
    icon: "🏦",
    color: "bg-purple-50 text-purple-600",
    items: [
      { name: "대출이자 계산기", slug: "대출이자-계산기", icon: "💳" },
      { name: "4대보험료", slug: "4대보험료-계산기", icon: "🛡️" },
      { name: "국민연금 계산기", slug: "국민연금-계산기", icon: "👴" },
      { name: "건강보험료", slug: "건강보험료-계산기", icon: "🏥" },
    ],
  },
];

/* 인기 가이드 */
const POPULAR_GUIDES = [
  { title: "퇴직금 완벽 가이드", desc: "퇴직금 계산법, 세율, 중간정산까지 모든 것을 정리했어요.", href: "/w/퇴직금", category: "근로·급여", icon: "💼" },
  { title: "연말정산 절세 전략", desc: "소득공제·세액공제 항목별 핵심 정리.", href: "/w/연말정산", category: "세금", icon: "🧾" },
  { title: "전세자금대출 총정리", desc: "전세대출 조건, 금리, 한도를 비교해드려요.", href: "/w/전세자금대출", category: "부동산", icon: "🏠" },
  { title: "실업급여 받는 법", desc: "자격요건, 신청 절차, 수급 기간 안내.", href: "/w/실업급여", category: "실업급여", icon: "📋" },
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

  return (
    <>
      <QuickSidebar />

      <div className="lg:ml-[100px]">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF2F7 0%, #E8EDF5 50%, #F0F4FA 100%)' }}>
          <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
            <div className="flex items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-[40px] font-bold tracking-tight mb-4 text-gray-900 leading-tight">
                  머니위키에서{' '}
                  <span className="text-[#2563EB]">경제/금융/법률</span>
                  <br className="hidden sm:block" />
                  정보를 한 눈에 확인하세요.
                </h1>
                <p className="text-gray-500 mb-8 text-base md:text-lg">
                  퇴직금, 연말정산, 부동산, 대출까지.<br className="sm:hidden" /> 정부 사이트보다 쉽고, 블로그보다 정확하게.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-[#2563EB] hover:shadow-lg transition-all text-gray-500 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{allDocs.length}개 문서 검색</span>
                </Link>
              </div>
              {/* 장식 일러스트 영역 */}
              <div className="hidden md:flex shrink-0 w-[280px] h-[220px] items-center justify-center">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: '📊', label: '계산기' },
                    { icon: '🏠', label: '부동산' },
                    { icon: '💰', label: '금융' },
                    { icon: '🧾', label: '세금' },
                    { icon: '⚖️', label: '법률' },
                    { icon: '💼', label: '근로' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-1 p-3 bg-white/80 rounded-xl shadow-sm backdrop-blur-sm border border-white">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[10px] text-gray-500 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* 배경 장식 */}
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] bg-[#2563EB]/5 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-[200px] h-[200px] bg-[#2563EB]/3 rounded-full blur-3xl" />
        </section>

        {/* ===== 계산기 바로가기 (KFB 아이콘 스타일) ===== */}
        <section id="section-calc" className="py-14">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="kfb-section-title">계산기 바로가기</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="calculators">
              {CALC_GROUPS.map((group) => (
                <div key={group.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${group.color}`}>
                      {group.icon}
                    </span>
                    <h3 className="text-base font-bold text-gray-900">{group.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/w/${item.slug}`}
                        className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors group text-center"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-xs text-gray-600 group-hover:text-[#2563EB] font-medium transition-colors leading-tight">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 카테고리별 가이드 (계산기 바로 아래) ===== */}
        <section id="section-categories" className="py-14" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}>
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="kfb-section-title">카테고리별 가이드</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex flex-col items-center gap-2 p-5 bg-white border border-gray-100 rounded-xl hover:border-[#2563EB] hover:shadow-md transition-all text-center group"
                >
                  <span className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover:bg-blue-50 transition-colors">
                    {cat.icon}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-[#2563EB] transition-colors">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 인기 가이드 (하단으로 이동) ===== */}
        <section id="section-guides" className="py-14">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="kfb-section-title">인기 가이드</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {POPULAR_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#2563EB]/30 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-base">{guide.icon}</span>
                    <span className="text-xs font-medium text-[#2563EB]">{guide.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-[#2563EB] transition-colors">{guide.title}</h3>
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
