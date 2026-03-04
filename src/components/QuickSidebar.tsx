'use client';

import { useState, useEffect } from 'react';

const SIDEBAR_ITEMS = [
  { label: '계산기', id: 'section-calc', path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>' },
  { label: '카테고리', id: 'section-categories', path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>' },
  { label: '가이드', id: 'section-guides', path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>' },
  { label: '관련사이트', id: 'section-partners', path: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>' },
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
    <aside className="hidden lg:flex fixed left-0 top-14 bottom-0 w-[88px] flex-col z-30 bg-white border-r border-gray-200">
      <div className="px-2 py-3 text-[#1B3A5C] font-semibold text-[10px] text-center tracking-wider border-b border-gray-100">
        바로가기
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
                  ? 'bg-[#EDF2F8] text-[#1B3A5C]'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-[#1B3A5C]'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#1B3A5C] rounded-r-full" />
              )}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" dangerouslySetInnerHTML={{ __html: item.path }} />
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="px-2 py-3 border-t border-gray-100">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full flex items-center justify-center py-2 text-gray-300 hover:text-[#1B3A5C] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
