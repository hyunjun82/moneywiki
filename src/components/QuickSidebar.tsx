'use client';

import { useState, useEffect } from 'react';

const SIDEBAR_ITEMS = [
  { icon: '🏠', label: '부동산·세금', id: 'section-calc' },
  { icon: '💼', label: '근로·급여', id: 'section-categories' },
  { icon: '💰', label: '금융·보험', id: 'section-guides' },
  { icon: '⚖️', label: '법률·복지', id: 'section-partners' },
];

export default function QuickSidebar() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    for (const item of SIDEBAR_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-14 bottom-0 w-[100px] flex-col z-30"
      style={{ background: 'linear-gradient(180deg, #1B3A5C 0%, #24466B 100%)' }}
    >
      <div className="px-2 py-3 text-white/70 font-semibold text-[11px] text-center tracking-wider uppercase border-b border-white/10">
        빠른 메뉴
      </div>
      <nav className="flex-1 flex flex-col pt-1">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                relative flex flex-col items-center gap-1.5 px-2 py-4
                text-center transition-all cursor-pointer
                ${isActive
                  ? 'bg-white/12 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white/90'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-white rounded-r-full" />
              )}
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="px-2 py-3 border-t border-white/10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full flex items-center justify-center py-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
