'use client'

import Link from 'next/link'

export function StickyBar({ topLabel, value, buttonText, href, scrollTo }: {
  topLabel: string
  value: string
  buttonText: string
  href?: string
  scrollTo?: string
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 py-[10px] px-4 flex items-center justify-center gap-[14px] z-[80] shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
      <div>
        <div className="text-[11px] text-neutral-500">{topLabel}</div>
        <div className="text-base font-black text-[#1E3A5F]">{value}</div>
      </div>
      {href ? (
        <Link
          href={href}
          className="bg-[#1E3A5F] text-white text-[13px] font-bold py-[11px] px-5 rounded-lg cursor-pointer transition-colors whitespace-nowrap hover:bg-[#2B5280] no-underline"
        >
          {buttonText}
        </Link>
      ) : (
        <button
          onClick={() => scrollTo && document.querySelector(scrollTo)?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-[#1E3A5F] text-white text-[13px] font-bold py-[11px] px-5 rounded-lg border-none cursor-pointer font-[inherit] transition-colors whitespace-nowrap hover:bg-[#2B5280]"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
