'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: '부동산', href: '/부동산' },
  { label: '세금', href: '/세금' },
  { label: '금융', href: '/금융' },
  { label: '근로·급여', href: '/근로' },
  { label: '법률', href: '/법률' },
  { label: '계산기', href: '/#calculators' },
];

const ALL_CATEGORIES = [
  { label: '부동산', href: '/부동산', icon: '🏠' },
  { label: '세금', href: '/세금', icon: '🧾' },
  { label: '금융·투자', href: '/금융', icon: '💰' },
  { label: '근로·급여', href: '/근로', icon: '💼' },
  { label: '실업급여', href: '/실업급여', icon: '📋' },
  { label: '복지·지원금', href: '/복지', icon: '🤝' },
  { label: '법률', href: '/법률', icon: '⚖️' },
  { label: '퇴직·연금', href: '/퇴직', icon: '🏦' },
  { label: '생활경제', href: '/생활경제', icon: '🛒' },
  { label: '보험', href: '/보험', icon: '🛡️' },
  { label: '교육·장학금', href: '/교육', icon: '📚' },
  { label: '창업·사업', href: '/창업', icon: '🚀' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* 로고 */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-[#1B3A5C] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-[#1B3A5C]">머니위키</span>
            </Link>

            {/* 네비게이션 - PC */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 전체메뉴 버튼 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#1B3A5C] border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <span className="hidden sm:inline">{menuOpen ? '닫기' : '전체메뉴'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 전체메뉴 오버레이 */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute right-0 top-14 w-full max-w-md bg-white shadow-xl border-l border-gray-200 h-[calc(100vh-56px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-lg font-bold text-[#1B3A5C] mb-4">전체 카테고리</h2>
              <div className="grid grid-cols-2 gap-3">
                {ALL_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-[#2563EB] hover:bg-blue-50/50 transition-colors"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">바로가기</h3>
                <div className="space-y-2">
                  <Link href="/search" onClick={() => setMenuOpen(false)} className="block text-sm text-gray-600 hover:text-[#2563EB] py-1">문서 검색</Link>
                  <Link href="/w/퇴직금-계산기" onClick={() => setMenuOpen(false)} className="block text-sm text-gray-600 hover:text-[#2563EB] py-1">퇴직금 계산기</Link>
                  <Link href="/w/연봉-실수령액-계산기" onClick={() => setMenuOpen(false)} className="block text-sm text-gray-600 hover:text-[#2563EB] py-1">연봉 실수령액 계산기</Link>
                  <Link href="/w/실업급여-계산기" onClick={() => setMenuOpen(false)} className="block text-sm text-gray-600 hover:text-[#2563EB] py-1">실업급여 계산기</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
