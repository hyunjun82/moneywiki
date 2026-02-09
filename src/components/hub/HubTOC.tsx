'use client'

import { useState, useEffect } from 'react'
import type { HubTOCItem } from '@/data/hub/types'

export default function HubFloatingTOC({ items }: { items: HubTOCItem[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= 100) {
          current = item.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  return (
    <nav
      className="hidden xl:block fixed z-50 text-xs text-neutral-500"
      style={{ left: 'max(24px, calc(50% - 564px))', top: '80px', width: '180px' }}
    >
      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
        목차
      </div>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block py-1 ${item.sub ? 'pl-6 text-[10px]' : 'pl-3'} border-l-2 transition-all no-underline leading-snug ${
            activeId === item.id
              ? 'text-emerald-600 font-semibold border-emerald-600 border-l-[3px]'
              : 'text-neutral-500 border-neutral-200 hover:text-neutral-800 hover:border-emerald-600'
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}
