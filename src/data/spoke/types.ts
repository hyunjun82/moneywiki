import type { ReactNode } from 'react'

// --- TOC Item (인라인 정의 — SpokeTOCInline 호환) ---
export interface TOCItem {
  id: string
  label?: string   // 신규 spoke
  text?: string    // 기존 spoke (하위 호환)
  sub?: boolean
}

// --- Spoke Icon Names ---
export type SpokeIconName = 'check' | 'calc' | 'clock' | 'info' | 'grid'

// --- Spoke Section ---
export interface SpokeSection {
  id: string
  number: string      // "01", "02", ...
  heading: string
  subtitle: string
  content: ReactNode  // 섹션 본문 (JSX)
  bridgeCTA?: {
    href: string
    badge: string
    title: string
    desc: string
    icon: SpokeIconName
    primary?: boolean
  }
  /** SpokeChecker 삽입 여부 */
  checker?: boolean
  /** PAS 브릿지 (큰 카드) */
  pasBridge?: {
    href: string
    question: string
    answer: ReactNode
    buttonText: string
  }
}

// --- Spoke Data (한 글의 전체 데이터) ---
export interface SpokeData {
  slug: string
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
  }
  hub: { url: string; name: string }
  breadcrumb: string[]    // ['근로소득', '간이세액표 보는 법']
  hero: {
    badge: string
    h1: ReactNode
    intro: ReactNode
    hubCTA: { badge: string; desc: string }
  }
  toc: TOCItem[]
  sections: SpokeSection[]
  faq: { question: string; answer: string }[]
  relatedSpokes: { badge: string; title: string; desc: string; href: string }[]
  sources: { name: string; url: string; org: string }[]

  /** 📋 3줄 요약 */
  summary3?: ReactNode[]

  /** 공식 출처 바 */
  sourceBar?: {
    badge: string
    name: string
    date: string
  }

  /** 이전/다음 글 네비게이션 */
  prevNext?: {
    prev?: { title: string; href: string }
    next?: { title: string; href: string }
  }

  /** 하단 스티키 바 */
  stickyBar?: {
    topLabel: string
    value: string
    buttonText: string
    scrollTo: string
  }
}
