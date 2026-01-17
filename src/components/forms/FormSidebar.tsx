'use client';

import Link from 'next/link';

// 인기 다운로드 - 실제 존재하는 양식만
const popularDownloads = [
  { title: '표준근로계약서', slug: '표준근로계약서', category: '고용·근로', rank: 1 },
  { title: '단시간근로계약서', slug: '단시간근로계약서', category: '고용·근로', rank: 2 },
  { title: '기간제근로계약서', slug: '기간제근로계약서', category: '고용·근로', rank: 3 },
];

// 인기 계산기 - 실제 위키 글 경로
const popularCalculators = [
  { title: '실업급여 계산기', slug: '실업급여-계산기', rank: 1 },
  { title: '퇴직금 계산기', slug: '퇴직금-계산기', rank: 2 },
  { title: '연말정산 계산기', slug: '연말정산-계산기', rank: 3 },
  { title: '양도소득세 계산기', slug: '양도소득세-계산기', rank: 4 },
  { title: '대출이자 계산기', slug: '대출이자-계산기', rank: 5 },
  { title: '국민연금 수령액', slug: '국민연금-수령액-계산기', rank: 6 },
  { title: '근로소득세 계산기', slug: '근로소득세-계산기', rank: 7 },
  { title: '4대보험료 계산기', slug: '4대보험료-계산기', rank: 8 },
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
      </div>

      {/* 인기 계산기 */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
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
                href={`/w/${item.slug}`}
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
      </div>
    </aside>
  );
}
