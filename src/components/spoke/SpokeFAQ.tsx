'use client'

import { useState, useCallback } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface SpokeFAQProps {
  items: FAQItem[]
}

export default function SpokeFAQ({ items }: SpokeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => prev === i ? null : i)
  }, [])

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="border-b border-neutral-100">
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center py-4 text-left font-semibold text-sm cursor-pointer hover:text-[#1E3A5F] transition-colors bg-transparent border-none font-sans text-neutral-900"
          >
            <span className="flex items-center gap-[7px]">
              <span className="bg-[#1E3A5F] text-white text-[9px] font-extrabold w-[18px] h-[18px] rounded flex items-center justify-center shrink-0">Q</span>
              {item.question}
            </span>
            <span className="text-neutral-400 ml-4 shrink-0">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="pb-4 text-[13px] text-neutral-500 leading-relaxed">
              <span dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
