/**
 * 디자인 토큰 — 머니위키 사용자 중심 문제해결 시스템
 *
 * 원칙:
 * 1. 에메랄드 단일 톤 유지 (#1D9E75)
 * 2. 모바일 우선 (max-width 720px)
 * 3. 즉답 우선 (글 최상단 = 검색자 질문에 직답)
 * 4. 점진 공개 (보충 정보는 접힘 → 펼침)
 */

export const tokens = {
  // ── 색상 ──
  color: {
    primary: "#1D9E75",        // 에메랄드 메인
    primarySoft: "#E1F5EE",    // 옅은 배경
    primaryDeep: "#085041",    // 진한 텍스트
    primaryBorder: "#9FE1CB",  // 보더

    text: "#1f2937",           // 본문
    textMuted: "#6b7280",      // 보조 텍스트
    textFaint: "#9ca3af",      // 흐린 텍스트
    heading: "#111827",        // 제목

    bg: "#ffffff",
    bgFaint: "#f9fafb",
    bgSubtle: "#f3f4f6",

    line: "#e5e7eb",
    lineFaint: "#f3f4f6",

    warning: "#f59e0b",
    warningSoft: "#fef3c7",
    danger: "#ef4444",
  },

  // ── 간격 ──
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
    xxl: "64px",
  },

  // ── 타이포 ──
  font: {
    body: 16,
    bodyLine: 1.75,
    h1: 28,
    h2: 22,
    h3: 18,
    small: 14,
    tiny: 12,
  },

  // ── 레이아웃 ──
  layout: {
    contentMax: "720px",       // 본문 최대 폭 (모바일 우선)
    contentPad: "20px",        // 모바일 좌우 패딩
    contentPadDesktop: "32px",
  },

  // ── 라운드 ──
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },

  // ── 그림자 ──
  shadow: {
    card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
    cardHover: "0 4px 12px rgba(0,0,0,0.08)",
  },
} as const;
