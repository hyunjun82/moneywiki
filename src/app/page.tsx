import Link from "next/link";

// 인기 문서
const popularDocuments = [
  { title: "퇴직금 계산법", category: "근로", views: "12.5K" },
  { title: "종합소득세 신고 방법", category: "세금", views: "9.8K" },
  { title: "전세자금대출 조건", category: "부동산", views: "8.7K" },
  { title: "청년도약계좌 가입 방법", category: "금융", views: "7.6K" },
  { title: "실업급여 수급 조건", category: "고용", views: "6.5K" },
  { title: "연말정산 공제 항목", category: "세금", views: "5.9K" },
];

// 계산기 도구
const tools = [
  { name: "퇴직금 계산기", desc: "근속연수별 퇴직금 계산", href: "/calc/severance" },
  { name: "연봉 실수령액", desc: "세후 실수령액 계산", href: "/calc/salary" },
  { name: "전월세 전환", desc: "전세 ↔ 월세 변환", href: "/calc/rent" },
  { name: "대출이자 계산", desc: "원리금 균등상환 계산", href: "/calc/loan" },
];

// 최신 문서
const recentDocs = [
  { title: "2026년 최저임금 가이드", date: "Jan 4", isNew: true },
  { title: "청년내일채움공제 변경사항", date: "Jan 3", isNew: true },
  { title: "연말정산 간소화 서비스", date: "Jan 2", isNew: false },
  { title: "주택임대차보호법 핵심 정리", date: "Jan 1", isNew: false },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* 히어로 */}
      <section className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-sm text-emerald-700 mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          머니위키 · 경제 · 금융 · 법률
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          복잡한 정보,<br />
          <span className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-transparent">
            쉽게 찾아보세요
          </span>
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-8">
          퇴직금, 세금, 부동산, 대출까지.
          정부 사이트보다 쉽고, 블로그보다 정확하게.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/w/퇴직금"
            className="h-11 px-6 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center"
          >
            시작하기
          </Link>
          <Link
            href="/calc"
            className="h-11 px-6 bg-white text-black text-sm font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-colors inline-flex items-center"
          >
            계산기 바로가기
          </Link>
        </div>
      </section>

      {/* 계산기 도구 */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            빠른 계산
          </h2>
          <Link href="/calc" className="text-sm text-neutral-500 hover:text-black transition-colors">
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group p-5 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <h3 className="font-medium mb-1 group-hover:text-black transition-colors">{tool.name}</h3>
              <p className="text-sm text-neutral-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 광고 */}
      <div className="mb-20 p-6 bg-neutral-50 border border-dashed border-neutral-200 rounded-xl text-center">
        <span className="text-sm text-neutral-400">Advertisement</span>
      </div>

      {/* 메인 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* 인기 문서 */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              인기 문서
            </h2>
            <Link href="/popular" className="text-sm text-neutral-500 hover:text-black transition-colors">
              전체보기 →
            </Link>
          </div>
          <div className="space-y-1">
            {popularDocuments.map((doc, i) => (
              <Link
                key={doc.title}
                href={`/w/${encodeURIComponent(doc.title)}`}
                className="group flex items-center gap-4 p-4 -mx-4 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <span className="w-6 text-sm text-neutral-400 font-mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium group-hover:text-black transition-colors">{doc.title}</span>
                </div>
                <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded">{doc.category}</span>
                <span className="text-sm text-neutral-400 w-16 text-right">{doc.views}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 최신 문서 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              최신 업데이트
            </h2>
          </div>
          <div className="space-y-4">
            {recentDocs.map((doc) => (
              <Link
                key={doc.title}
                href={`/w/${encodeURIComponent(doc.title)}`}
                className="group block"
              >
                <div className="flex items-start gap-3">
                  {doc.isNew && (
                    <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full shrink-0"></span>
                  )}
                  {!doc.isNew && (
                    <span className="mt-1 w-2 h-2 bg-neutral-300 rounded-full shrink-0"></span>
                  )}
                  <div>
                    <span className="font-medium text-sm group-hover:text-black transition-colors">{doc.title}</span>
                    <p className="text-xs text-neutral-400 mt-1">{doc.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* 카테고리 */}
      <section className="mb-20">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-6">
          카테고리
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: "근로/급여", count: 156 },
            { name: "세금", count: 89 },
            { name: "부동산", count: 124 },
            { name: "금융", count: 98 },
            { name: "사회보험", count: 67 },
            { name: "법률", count: 45 },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${encodeURIComponent(cat.name)}`}
              className="p-4 border border-neutral-200 rounded-xl hover:border-neutral-400 hover:shadow-sm transition-all text-center"
            >
              <span className="font-medium text-sm">{cat.name}</span>
              <p className="text-xs text-neutral-400 mt-1">{cat.count}개 문서</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 광고 */}
      <div className="p-6 bg-neutral-50 border border-dashed border-neutral-200 rounded-xl text-center">
        <span className="text-sm text-neutral-400">Advertisement</span>
      </div>
    </main>
  );
}
