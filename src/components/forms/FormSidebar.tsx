'use client';

import Link from 'next/link';

// 인기 다운로드 (실제로는 DB나 API에서 가져올 수 있음)
const popularDownloads = [
  { title: '표준근로계약서', slug: '표준근로계약서', category: '고용·근로', rank: 1 },
  { title: '임대차계약서', slug: '임대차계약서', category: '부동산', rank: 2 },
  { title: '사직서', slug: '사직서', category: '고용·근로', rank: 3 },
  { title: '이력서', slug: '이력서', category: '취업', rank: 4 },
  { title: '견적서', slug: '견적서', category: '세무·회계', rank: 5 },
  { title: '매매계약서', slug: '매매계약서', category: '부동산', rank: 6 },
  { title: '퇴직원', slug: '퇴직원', category: '고용·근로', rank: 7 },
  { title: '위임장', slug: '위임장', category: '법률', rank: 8 },
];

// 인기 계산기
const popularCalculators = [
  { title: '실업급여 계산기', slug: 'unemployment', rank: 1 },
  { title: '퇴직금 계산기', slug: 'severance', rank: 2 },
  { title: '연말정산 계산기', slug: 'year-end-tax', rank: 3 },
  { title: '연봉 실수령액', slug: 'salary', rank: 4 },
  { title: '주휴수당 계산기', slug: 'weekly-holiday', rank: 5 },
  { title: '양도소득세 계산기', slug: 'capital-gains-tax', rank: 6 },
  { title: '취득세 계산기', slug: 'acquisition-tax', rank: 7 },
  { title: '대출이자 계산기', slug: 'loan-interest', rank: 8 },
];

export default function FormSidebar() {
  return (
    <aside className="w-72 shrink-0 hidden lg:block">
      {/* 인기 다운로드 */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600">
          <span className="text-sm font-semibold text-white flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            인기 다운로드
          </span>
          <span className="text-xs text-white/60">이번 주</span>
        </div>
        <ul className="divide-y divide-gray-50">
          {popularDownloads.map((item) => (
            <li key={item.rank}>
              <Link
                href={`/forms/${encodeURIComponent(item.slug)}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  item.rank <= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-gray-700 block truncate">{item.title}</span>
                  <span className="text-[10px] text-gray-400">{item.category}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 border-t border-gray-100">
          <Link href="/forms" className="text-xs text-emerald-600 hover:underline font-medium">
            전체 양식 보기 →
          </Link>
        </div>
      </div>

      {/* 광고 슬롯 */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-gray-200 rounded-xl p-6 mb-4 text-center">
        <span className="text-gray-400 text-xs">광고</span>
      </div>

      {/* 인기 계산기 */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
          <span className="text-sm font-semibold text-white flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            인기 계산기
          </span>
          <span className="text-xs text-white/60">TOP 8</span>
        </div>
        <ul className="divide-y divide-gray-50">
          {popularCalculators.map((item) => (
            <li key={item.rank}>
              <Link
                href={`/calculators/${item.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  item.rank <= 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.rank}
                </span>
                <span className="flex-1 text-sm text-gray-700 truncate">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 border-t border-gray-100">
          <Link href="/calculators" className="text-xs text-blue-600 hover:underline font-medium">
            전체 계산기 보기 →
          </Link>
        </div>
      </div>

      {/* 광고 슬롯 2 */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-gray-200 rounded-xl p-6 text-center">
        <span className="text-gray-400 text-xs">광고</span>
      </div>
    </aside>
  );
}
