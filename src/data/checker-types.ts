import type { ReactNode } from 'react'

// --- Checker Option ---
export interface CheckerOption {
  value: string
  text: string
}

// --- Checker Group (질문 1개) ---
export interface CheckerGroup {
  key: string
  label: string
  options: CheckerOption[]
}

// --- Checker Result Link ---
export interface CheckerResultLink {
  icon: string
  title: string
  desc: string
  href: string
}

// --- Checker Result (evaluate 반환값) ---
export interface CheckerResult {
  pass: boolean
  headline: string
  detail: ReactNode
  amount?: {
    value: string
    unit: string
    formula?: string
  }
  badges: string[]
  links: CheckerResultLink[]
}

// --- Checker Config (GenericChecker props) ---
export interface CheckerConfig {
  title: string
  subtitle: string
  intro: ReactNode
  groups: CheckerGroup[]
  evaluate: (selections: Record<string, string>) => CheckerResult
}
