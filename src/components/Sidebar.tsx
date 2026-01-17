'use client';

import Link from 'next/link';

interface RecentChange {
  title: string;
  time: string;
  category: string;
}

const mockRecentChanges: RecentChange[] = [
  { title: '퇴직금 중간정산', time: '5분 전', category: '근로' },
  { title: '종합소득세 세율', time: '12분 전', category: '세금' },
  { title: '전세사기 예방법', time: '18분 전', category: '부동산' },
  { title: '청년도약계좌', time: '25분 전', category: '금융' },
  { title: '실업급여 수급기간', time: '32분 전', category: '고용' },
];

const mockPopularSearches = [
  { keyword: '퇴직금 계산', rank: 1, change: 'up' },
  { keyword: '연말정산', rank: 2, change: 'same' },
  { keyword: '전세자금대출', rank: 3, change: 'up' },
  { keyword: '종합소득세', rank: 4, change: 'down' },
  { keyword: '실업급여', rank: 5, change: 'new' },
];

const mockNews = [
  { title: '2026년 최저임금 10,030원 확정', isNew: true },
  { title: '청년 주거지원 정책 대폭 확대', isNew: true },
  { title: '연말정산 간소화 서비스 15일 오픈', isNew: false },
];

// 인기 계산기
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

export default function Sidebar() {
  return (
    <aside className="w-72 shrink-0 hidden lg:block">
      {/* 인기 검색어 */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#2d5a45] to-[#3d7a5c]">
          <span className="text-sm font-semibold text-white flex items-center gap-2">
            <span>🔥</span> 인기 검색어
          </span>
          <span className="text-xs text-white/60">실시간</span>
        </div>
        <ul className="divide-y divide-gray-50">
          {mockPopularSearches.map((item) => (
            <li key={item.rank}>
              <Link
                href={`/w/${encodeURIComponent(item.keyword)}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  item.rank <= 3 ? 'bg-[#2d5a45] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.rank}
                </span>
                <span className="flex-1 text-sm text-gray-700">{item.keyword}</span>
                <span className="text-xs">
                  {item.change === 'up' && <span className="text-red-500">▲</span>}
                  {item.change === 'down' && <span className="text-blue-500">▼</span>}
                  {item.change === 'same' && <span className="text-gray-400">-</span>}
                  {item.change === 'new' && <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded">N</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 최근 변경 */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <span>📝</span> 최근 업데이트
          </span>
          <Link href="/recent" className="text-xs text-[#2d5a45] hover:underline font-medium">
            더보기
          </Link>
        </div>
        <ul className="divide-y divide-gray-50">
          {mockRecentChanges.map((item, index) => (
            <li key={index}>
              <Link
                href={`/w/${encodeURIComponent(item.title)}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded font-medium">
                  {item.category}
                </span>
                <span className="flex-1 text-sm text-gray-700 truncate">{item.title}</span>
                <span className="text-[11px] text-gray-400">{item.time}</span>
              </Link>
            </li>
          ))}
        </ul>
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

      {/* 뉴스 */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <span>📰</span> 경제 뉴스
          </span>
        </div>
        <ul className="divide-y divide-gray-50">
          {mockNews.map((news, index) => (
            <li key={index}>
              <Link
                href="#"
                className="flex items-start gap-2 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                {news.isNew && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded shrink-0 mt-0.5">N</span>
                )}
                <span className="text-sm text-gray-700 leading-snug line-clamp-2">{news.title}</span>
              </Link>
            </li>
          ))}
          <li className="px-4 py-2">
            <Link href="/news" className="text-xs text-[#2d5a45] hover:underline font-medium">
              뉴스 더보기 →
            </Link>
          </li>
        </ul>
      </div>

      {/* 빠른 링크 */}
      <div className="p-4 bg-[#2d5a45]/5 rounded-xl">
        <h3 className="text-xs font-semibold text-[#2d5a45] mb-3">빠른 링크</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/w/퇴직금-계산기" className="px-3 py-1.5 bg-white text-xs text-gray-600 rounded-lg hover:bg-[#2d5a45] hover:text-white transition-colors border border-gray-100">
            퇴직금계산
          </Link>
          <Link href="/w/연봉-실수령액-계산기" className="px-3 py-1.5 bg-white text-xs text-gray-600 rounded-lg hover:bg-[#2d5a45] hover:text-white transition-colors border border-gray-100">
            연봉계산기
          </Link>
          <Link href="/w/연말정산" className="px-3 py-1.5 bg-white text-xs text-gray-600 rounded-lg hover:bg-[#2d5a45] hover:text-white transition-colors border border-gray-100">
            연말정산
          </Link>
        </div>
      </div>
    </aside>
  );
}
