'use client';

import { useState, useEffect } from 'react';

const SIDEBAR_ITEMS = [
  { label: '부동산\n세금', id: 'section-calc' },
  { label: '근로\n급여', id: 'section-guides' },
  { label: '금융\n보험', id: 'section-categories' },
  { label: '법률\n복지', id: 'section-popular' },
  { label: '계산기', id: 'calculators' },
  { label: '최신\n가이드', id: 'section-recent' },
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
      className="hidden lg:flex fixed left-0 top-14 bottom-0 w-[120px] flex-col z-30"
      style={{ background: 'linear-gradient(180deg, #1B3A5C 0%, #2B5280 60%, #3D6A9E 100%)' }}
    >
      <div className="px-3 py-4 text-white/90 font-bold text-sm text-center border-b border-white/15">
        빠른 메뉴
      </div>
      <nav className="flex-1 flex flex-col">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`
              px-3 py-4 text-center text-white/80 text-xs font-medium
              border-b border-white/10 hover:bg-white/10 hover:text-white
              transition-all whitespace-pre-line leading-relaxed cursor-pointer
              ${activeId === item.id ? 'bg-white/15 text-white border-l-[3px] border-l-white' : ''}
            `}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
