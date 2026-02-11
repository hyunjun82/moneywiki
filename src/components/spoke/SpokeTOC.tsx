'use client'

import { useState, useEffect, useCallback } from 'react'

export interface TOCItem {
  id: string
  text: string
  sub?: boolean
}

interface SpokeTOCProps {
  items: TOCItem[]
}

export default function SpokeTOC({ items }: SpokeTOCProps) {
  const [activeId, setActiveId] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [allItems, setAllItems] = useState<TOCItem[]>(items)

  // h3 자동 감지: SpokeTable 등의 h3를 서브항목으로 추가
  useEffect(() => {
    const spokeEl = document.querySelector('[data-spoke="true"]')
    if (!spokeEl) return

    const merged: TOCItem[] = []
    for (const item of items) {
      merged.push(item)
      // 이 섹션 내부의 h3[id] 찾기
      const sectionEl = document.getElementById(item.id)
      if (sectionEl) {
        const section = sectionEl.closest('section')
        if (section) {
          const h3s = section.querySelectorAll('h3[id]')
          h3s.forEach(h3 => {
            const text = h3.getAttribute('data-toc-text') || h3.textContent?.trim() || ''
            if (text) {
              merged.push({ id: h3.id, text, sub: true })
            }
          })
        }
      }
    }
    setAllItems(merged)
  }, [items])

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const item of allItems) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top < 150) {
          current = item.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [allItems])

  const handleClick = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      {/* Desktop Floating TOC */}
      <nav
        className="hidden xl:block fixed z-50 text-xs text-neutral-500"
        style={{ left: 'max(24px, calc(50% - 560px))', top: '80px', width: '180px' }}
      >
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">목차</div>
        {allItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-1 border-l-2 transition-all leading-snug ${
              item.sub ? 'pl-6 text-[11px] text-neutral-400' : 'pl-3'
            } ${
              activeId === item.id
                ? 'border-[#1E3A5F] text-[#1E3A5F] font-semibold'
                : 'border-neutral-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>

      {/* Mobile Sticky TOC */}
      <div className="xl:hidden sticky top-[52px] z-40 bg-white border-b border-neutral-200 px-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full py-3 text-[13px] font-semibold text-neutral-800 bg-transparent border-none cursor-pointer font-sans"
        >
          <span>{mobileOpen ? '목차 닫기' : '목차 보기'}</span>
          <svg
            className={`w-4 h-4 text-neutral-500 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {mobileOpen && (
          <div className="pb-3">
            {allItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleClick}
                className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                  item.sub ? 'pl-7 text-xs text-neutral-400' : 'text-neutral-600'
                } ${
                  activeId === item.id
                    ? 'text-[#1E3A5F] bg-[#1E3A5F]/5'
                    : 'hover:text-[#1E3A5F] hover:bg-[#1E3A5F]/5'
                }`}
              >
                {item.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
