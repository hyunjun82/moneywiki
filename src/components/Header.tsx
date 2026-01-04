'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">머니위키</span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/category/경제">경제</NavLink>
            <NavLink href="/category/부동산">부동산</NavLink>
            <NavLink href="/category/세금">세금</NavLink>
            <NavLink href="/category/법률">법률</NavLink>
            <NavLink href="/calc">계산기</NavLink>
          </nav>

          {/* 검색 & 액션 */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="검색..."
                  className="w-48 lg:w-64 h-9 pl-9 pr-3 text-sm bg-neutral-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
            </form>
            <Link
              href="/recent"
              className="text-sm text-neutral-600 hover:text-black transition-colors"
            >
              최근 변경
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-neutral-600 hover:text-black transition-colors"
    >
      {children}
    </Link>
  );
}
