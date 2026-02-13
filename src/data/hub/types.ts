import type { ReactNode } from 'react'
import type { CheckerConfig } from '@/data/checker-types'

// --- Hub TOC Item ---
export interface HubTOCItem {
  id: string
  text: string
  sub?: boolean
}

// --- Hub Section ---
export interface HubSection {
  id: string
  tag: string          // "01 개념", "02 대상"
  heading: string
  subtitle: string
  content: ReactNode   // JSX 본문 (HubBlocks 컴포넌트 포함)
  sectionSpoke?: { icon: string; title: string; desc: string; href: string }[]
  bridgeCTA?: {
    href: string
    badge: string
    title: string
    desc: string
  }
  /** GenericChecker 설정 (주제별 맞춤) */
  checkerConfig?: CheckerConfig
}

// --- Hub Spoke Group ---
export interface HubSpokeGroup {
  title: string
  spokes: {
    slug: string
    title: string
    desc: string
    badge: string
  }[]
}

// --- Hub Data (한 허브의 전체 데이터) ---
export interface HubData {
  slug: string

  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
  }

  category: string

  hero: {
    badge: string
    tags?: string[]
    h1: ReactNode
    subtitle: string
    intro?: ReactNode
    stats?: {
      value: string
      label: string
      color?: 'green' | 'orange' | 'default'
    }[]
  }

  toc: HubTOCItem[]
  sections: HubSection[]
  faq: { question: string; answer: string }[]
  spokeGroups: HubSpokeGroup[]
  sources: { name: string; url: string; org: string }[]
  summary?: ReactNode[]
  source?: { name: string; date: string }
  chips?: { icon: string; label: string; value: string; href?: string }[]
  heroCTA?: { href: string; question: string; answer: ReactNode; buttonText: string }
  sticky?: { label: string; value: string; ctaText: string; ctaTarget: string }
  prevNext?: {
    prev?: { title: string; href: string }
    next?: { title: string; href: string }
  }
}
