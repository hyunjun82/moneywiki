import type { ReactNode } from 'react'
import type { TOCItem } from '@/components/spoke/SpokeTOC'

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
}
