"use client";

/**
 * 환율 데이터 계층.
 *
 * 이 저장소는 화면만 만든다. 데이터는 별도 갱신기가 발행하는 JSON 하나를
 * 브라우저가 직접 읽는다 — 금 시세(gold/priceData.ts)와 같은 구조다.
 * 시세를 main에 커밋하면 /w/ 글 2,000여 개가 매번 재빌드되고 Cloudflare
 * Pages 무료 한도를 넘긴다. output:'export' 라 빌드에 넣으면 값이 그 시점에
 * 얼어붙는 문제도 있다.
 *
 * 출처(갱신기가 채운다):
 *   rates — 한국수출입은행 환율 API (매매기준율·현찰 살 때/팔 때)
 *   banks — 은행연합회 외환길잡이 (환전수수료율·기본/최대우대율·기준일)
 *            exchange.kfb.or.kr. 카카오·토스 등 인터넷은행은 이 공시에
 *            없으므로 확인되지 않으면 목록에 넣지 않는다.
 *
 * 모든 최상위 키는 없을 수 있다. 값이 없으면 그 칸을 통째로 숨긴다.
 * 0원이나 '-'를 환율 자리에 내보내지 않는다.
 */

import { useEffect, useState } from "react";

/** 갱신기가 발행하는 주소. 준비되면 이 상수만 바꾸면 된다. */
export const FX_URL =
  "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/fx.json";

/** 시안 규칙: 상승 초록 · 하락 파랑 · 보합 회색 */
export const UP_COLOR = "#2E7D5B";
export const DOWN_COLOR = "#2A6099";
export const FLAT_COLOR = "#9CA1A8";

export interface FxRate {
  code: string;
  /** 나라 이름 — "미국" */
  country: string;
  /** 통화 이름 — "달러" */
  name?: string;
  /** 고시 단위. 엔은 100 */
  unit: number;
  /** 매매기준율 (원) */
  base: number;
  /** 현찰 살 때 (원) */
  buy?: number;
  /** 현찰 팔 때 (원) */
  sell?: number;
  /** 전일 대비 % */
  change?: number;
  /** 차트·스파크라인용 과거 매매기준율. 과거 → 최신 */
  history?: number[];
  /** 여행지 묶음 — "일본·중화권" */
  region?: string;
}

export interface FxBank {
  bank: string;
  /** 우대 조건 설명 — "KB스타뱅킹 환전" */
  note?: string;
  /** 환전수수료율 % (살 때 기준) */
  feeRate: number;
  /** 기본우대율 % */
  basePref: number;
  /** 최대우대율 % */
  maxPref?: number;
  /** 은행연합회 공시 기준일 YYYY-MM-DD */
  asOf?: string;
  /** 로고 대체 표기 */
  mark?: string;
  markBg?: string;
  markFg?: string;
}

export interface FxData {
  updatedAt?: string;
  quoteDate?: string;
  rates?: FxRate[];
  banks?: FxBank[];
  /** 은행 데이터 출처 표기 */
  bankSource?: { name: string; url: string };
  rateSource?: { name: string; url: string };
}

export type FxStatus = "loading" | "ready" | "error";

export function useFx(): { data: FxData | null; status: FxStatus } {
  const [state, setState] = useState<{ data: FxData | null; status: FxStatus }>({
    data: null,
    status: "loading",
  });

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(FX_URL, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((json: FxData) => {
          if (alive) setState({ data: json, status: "ready" });
        })
        .catch(() => {
          // 이미 값을 들고 있으면 유지한다. 갱신 실패로 화면을 비우지 않는다.
          if (alive) setState((prev) => (prev.data ? prev : { data: null, status: "error" }));
        });

    load();
    const timer = setInterval(load, 10 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  return state;
}

/* ─────────────────────────── 계산 ─────────────────────────── */

/** 1단위당 원화. 엔처럼 unit이 100이면 나눠서 맞춘다. */
export function perUnit(r: FxRate | undefined): number | null {
  if (!r || !Number.isFinite(r.base) || !r.unit) return null;
  return r.base / r.unit;
}

/** from 통화 amount를 to 통화로 환산. KRW는 code "KRW"로 다룬다. */
export function convert(
  amount: number,
  from: string,
  to: string,
  rates: FxRate[] | undefined
): number | null {
  if (!rates || !Number.isFinite(amount)) return null;
  const krwPer = (code: string): number | null => {
    if (code === "KRW") return 1;
    const r = rates.find((x) => x.code === code);
    return perUnit(r);
  };
  const f = krwPer(from);
  const t = krwPer(to);
  if (!f || !t) return null;
  return (amount * f) / t;
}

/**
 * 은행 적용 환율 = 매매기준율 ± 매매기준율 × 수수료율 × (1 − 우대율)
 *
 * 살 때는 더하고 팔 때는 뺀다. 우대율이 100%면 매매기준율 그대로다.
 * 은행연합회가 공시하는 수수료율·우대율을 그대로 넣어 계산한다.
 */
export function bankRate(
  base: number,
  feeRatePct: number,
  prefPct: number,
  method: "buy" | "sell"
): number {
  const spread = base * (feeRatePct / 100) * (1 - prefPct / 100);
  return method === "buy" ? base + spread : base - spread;
}

/* ─────────────────────────── 포맷 ─────────────────────────── */

export function won(n: number | null | undefined, digits = 0): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "";
  return n.toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fxColor(change: number | undefined | null): string {
  if (typeof change !== "number" || change === 0) return FLAT_COLOR;
  return change > 0 ? UP_COLOR : DOWN_COLOR;
}

export function changeText(change: number | undefined | null): string {
  if (typeof change !== "number" || change === 0) return "0.00%";
  return `${change > 0 ? "▲" : "▼"} ${Math.abs(change).toFixed(2)}%`;
}

/** "2026-08-17" → "8월 17일". Date 파싱을 안 거쳐 시간대에 흔들리지 않는다. */
export function korDate(iso: string | undefined): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : "";
}

export function korDateTime(iso: string | undefined): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
  return m ? `${Number(m[2])}월 ${Number(m[3])}일 ${m[4]}:${m[5]}` : korDate(iso);
}
