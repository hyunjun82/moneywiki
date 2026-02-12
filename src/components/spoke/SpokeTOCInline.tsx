'use client'

import { useState } from 'react'
import type { TOCItem } from '@/data/spoke/types'

export default function SpokeTOCInline({ items }: { items: TOCItem[] }) {
  const [open, setOpen] = useState(false)

  if (!items || items.length === 0) return null

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden my-[10px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-[18px] py-3 bg-[#F5F8FB] border-b border-neutral-200 text-[13px] font-bold text-[#1E3A5F] cursor-pointer border-none font-[inherit] text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-[6px]">📑 목차</span>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="px-[18px] py-[14px]">
          <ol className="list-none m-0 p-0">
            {items.map((item, i) => (
              <li key={item.id} className="py-[5px]">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-[10px] text-[13.5px] text-neutral-600 no-underline hover:text-[#1E3A5F] transition-colors"
                >
                  <span className="text-[11px] font-bold text-[#1E3A5F] bg-[#EDF2F8] w-[22px] h-[22px] rounded-md flex items-center justify-center shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{item.label || item.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
