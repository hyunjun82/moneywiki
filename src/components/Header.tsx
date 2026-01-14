'use client';

import Link from 'next/link';

export default function Header() {

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
            <NavLink href="/#category-경제">경제</NavLink>
            <NavLink href="/#category-부동산">부동산</NavLink>
            <NavLink href="/#category-세금">세금</NavLink>
            <NavLink href="/#category-법률">법률</NavLink>
            <NavLink href="/#category-계산기">계산기</NavLink>
          </nav>

          {/* 액션 */}
          <div className="flex items-center gap-4">
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
