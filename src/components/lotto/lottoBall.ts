/**
 * 로또 공 색·스타일 — 시안(lotto-main.html)의 colorFor / ballStyle 을 그대로 옮긴 것.
 *
 * 1~10 금 · 11~20 파랑 · 21~30 빨강 · 31~40 회색 · 41~45 초록.
 * 동행복권 실제 공 색 규칙과 같다.
 */

import type { CSSProperties } from "react";

export function colorFor(n: number): [string, string] {
  if (n <= 10) return ["#E8B12B", "#A87B12"];
  if (n <= 20) return ["#4A93C4", "#24597B"];
  if (n <= 30) return ["#D2585A", "#8C2F31"];
  if (n <= 40) return ["#8A9099", "#545A62"];
  return ["#6FA84B", "#3B6626"];
}

/** 구간 범례 — 시안 푸터에 있던 5개 */
export const RANGES: { label: string; from: number }[] = [
  { label: "1–10", from: 1 },
  { label: "11–20", from: 11 },
  { label: "21–30", from: 21 },
  { label: "31–40", from: 31 },
  { label: "41–45", from: 41 },
];

/**
 * 공 하나의 인라인 스타일.
 * n이 없으면 아직 안 뽑힌 빈 슬롯(점선 원)이다.
 */
export function ballStyle(
  n: number | null | undefined,
  opts: { big?: boolean; size?: number } = {}
): CSSProperties {
  const size = opts.size ?? (opts.big ? 60 : 58);
  const base: CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    flex: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: Math.round(size * (n && n >= 10 ? 0.38 : 0.4)),
    fontWeight: 800,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
  };

  if (!n) {
    return {
      ...base,
      background: "#F7F6F3",
      border: "1px dashed #CFCBC1",
      color: "transparent",
      boxShadow: "none",
    };
  }

  const [c, d] = colorFor(n);
  return {
    ...base,
    color: "#fff",
    textShadow: "0 1px 2px rgba(0,0,0,.3)",
    background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,.92) 0%, ${c} 44%, ${d} 100%)`,
    boxShadow:
      "inset -4px -6px 10px rgba(0,0,0,.24), inset 3px 4px 8px rgba(255,255,255,.35), 0 10px 16px -10px rgba(26,29,33,.7)",
  };
}

/** 범례·드럼 장식용 작은 공 배경 */
export function ballBg(n: number): string {
  const [c, d] = colorFor(n);
  return `radial-gradient(circle at 32% 26%, rgba(255,255,255,.9), ${c} 46%, ${d} 100%)`;
}
