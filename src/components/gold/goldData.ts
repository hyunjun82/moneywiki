"use client";

/**
 * gold.json 데이터 계층 (스펙 5절, 2026-09-09).
 *
 * scripts/gold/build-gold-json.mjs 가 price-data 브랜치에 발행하는 한 파일을 브라우저가 읽는다.
 *   retail    한국금거래소 최신 고시·전 거래일 마지막 고시·등락·최근 3거래일 회차·백금·은 (살 때는 부가세 포함)
 *   reference 기준가 = 국제 금값 / 31.1034768 × USD/KRW × 3.75
 *   wholesale KRX 금시장 전 영업일 종가 + 월별 6개월
 *   derived   스프레드·살 때 분해·18K/14K 이론가 대비 차이
 *   history   일별 마지막 고시 (최대 1년)
 *
 * 값이 없으면 그 칸을 통째로 숨긴다. 0원이나 '-'를 시세 자리에 내보내지 않는다.
 * 옛 화면(살 때·팔 때·계산기)은 priceData.usePrice 가 이 파일을 PriceData 모양으로 바꿔 준다.
 */

import { useEffect, useState } from "react";
import type { Dir, PriceData, Quote, RetailItem } from "./priceData";

export const GOLD_URL =
  "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/gold.json";

export const GRAM_PER_DON = 3.75;

export interface GoldMetalQuote {
  buy: number | null;
  sell: number | null;
}

export interface GoldQuote {
  date: string;
  round: number;
  /** "11:19:25" */
  time: string;
  /** 순금 1돈 살 때 — 부가세 포함 */
  buy: number;
  /** 순금 1돈 팔 때 */
  sell: number;
  k18: number | null;
  k14: number | null;
  platinum?: GoldMetalQuote | null;
  silver?: GoldMetalQuote | null;
}

export interface GoldLatest extends GoldQuote {
  /** 18K·14K 살 때 — 웹엔 "제품시세적용"으로 숨겨진 API 참고값 */
  s18: number | null;
  s14: number | null;
}

export interface GoldPrevClose {
  date: string;
  round: number;
  time: string;
  buy: number;
  sell: number;
  k18: number | null;
  k14: number | null;
}

export interface GoldChange {
  buy: number;
  buyPct: number | null;
  sell: number;
  sellPct: number | null;
  k18: number | null;
  k14: number | null;
}

export interface GoldMetal {
  buy: number | null;
  sell: number | null;
  prevBuy: number | null;
  prevSell: number | null;
}

export interface GoldRetail {
  source: string;
  sourceUrl: string;
  unit: string;
  vatIncludedBuy: true;
  note?: string;
  latest: GoldLatest;
  /** 전 거래일 마지막 고시 — 등락의 분모 */
  prevClose: GoldPrevClose | null;
  change: GoldChange | null;
  /** 최근 3거래일 회차 — 최신 날짜·최신 회차가 앞 */
  quotes: GoldQuote[];
  platinum: GoldMetal;
  silver: GoldMetal;
}

export interface GoldReference {
  xauUsd: number;
  usdKrw: number;
  asOf: string;
  basePerGram: number;
  basePerDon: number;
  formula: string;
  source: string;
}

export interface GoldWholesaleMonth {
  month: string;
  date: string;
  closePerGram: number;
  closePerDon: number;
}

export interface GoldWholesale {
  source: string;
  sourceUrl?: string | null;
  date: string;
  closePerGram: number;
  closePerDon: number;
  change?: number | null;
  changePct?: number | null;
  note?: string;
  monthly: GoldWholesaleMonth[];
}

export interface GoldDerived {
  spread: number;
  spreadPct: number;
  breakdown: { gold: number; craft: number; vat: number } | null;
  sellVsBase: number | null;
  k18Theory: number;
  k18Gap: number | null;
  k14Theory: number;
  k14Gap: number | null;
}

export interface GoldDaily {
  date: string;
  buy: number;
  sell: number;
  k18: number | null;
  k14: number | null;
  rounds: number;
}

export interface GoldData {
  updatedAt?: string;
  date?: string;
  retail?: GoldRetail;
  reference?: GoldReference | null;
  intl?: {
    xagUsd?: number;
    silverBasePerGram?: number;
    silverBasePerDon?: number;
    source?: string;
  } | null;
  wholesale?: GoldWholesale | null;
  derived?: GoldDerived;
  history?: { daily: GoldDaily[]; days: number; from: string | null };
}

export type GoldStatus = "loading" | "ready" | "error";

export async function fetchGold(): Promise<GoldData> {
  const r = await fetch(GOLD_URL, { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = (await r.json()) as GoldData;
  if (!json?.retail?.latest?.buy || !json.retail.latest.sell) throw new Error("gold.json 에 순금 값이 없음");
  return json;
}

/** gold.json 을 읽는다. 열어둔 채로도 갱신되도록 10분마다 다시 읽는다. reload() 는 갱신 버튼용. */
export function useGold(): { data: GoldData | null; status: GoldStatus; reload: () => void; loadedAt: number } {
  const [state, setState] = useState<{ data: GoldData | null; status: GoldStatus; loadedAt: number }>({
    data: null,
    status: "loading",
    loadedAt: 0,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetchGold()
        .then((json) => {
          if (alive) setState({ data: json, status: "ready", loadedAt: Date.now() });
        })
        .catch(() => {
          // 이미 값을 들고 있으면 유지한다. 갱신 실패로 화면을 비우지 않는다.
          if (alive) setState((prev) => (prev.data ? prev : { data: null, status: "error", loadedAt: 0 }));
        });
    load();
    const timer = setInterval(load, 10 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [tick]);

  return { ...state, reload: () => setTick((t) => t + 1) };
}

/* ─────────────────────────── 옛 화면용 어댑터 ─────────────────────────── */

function toQuote(price: number | null | undefined, change: number | null | undefined): Quote | null {
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) return null;
  const c = typeof change === "number" && Number.isFinite(change) ? change : 0;
  const dir: Dir = c > 0 ? "up" : c < 0 ? "down" : "none";
  return { price, change: Math.abs(c), dir };
}

/**
 * gold.json → PriceData. 살 때·팔 때·계산기·기사 배지처럼 RetailItem 을 쓰는 화면이
 * 소스 교체(종로 → 한국금거래소) 를 몰라도 되게 한다. 등락은 전 거래일 마지막 고시 대비.
 */
export function priceLikeFromGold(g: GoldData): PriceData {
  const r = g.retail!;
  const l = r.latest;
  const c = r.change;
  const pt = r.platinum;
  const ag = r.silver;
  const metalChange = (now: number | null, prev: number | null) =>
    now != null && prev != null ? now - prev : 0;
  const items: RetailItem[] = [
    { key: "gold24", name: "순금 24K", userSell: toQuote(l.sell, c?.sell), userBuy: toQuote(l.buy, c?.buy) },
    { key: "gold18", name: "18K", userSell: toQuote(l.k18, c?.k18), userBuy: null },
    { key: "gold14", name: "14K", userSell: toQuote(l.k14, c?.k14), userBuy: null },
    {
      key: "platinum",
      name: "백금",
      userSell: toQuote(pt?.sell, metalChange(pt?.sell ?? null, pt?.prevSell ?? null)),
      userBuy: toQuote(pt?.buy, metalChange(pt?.buy ?? null, pt?.prevBuy ?? null)),
    },
    {
      key: "silver",
      name: "은",
      userSell: toQuote(ag?.sell, metalChange(ag?.sell ?? null, ag?.prevSell ?? null)),
      userBuy: toQuote(ag?.buy, metalChange(ag?.buy ?? null, ag?.prevBuy ?? null)),
    },
  ];
  return {
    updatedAt: g.updatedAt,
    sources: ["retail:koreagoldx", "reference:yahoo", "krx:data.go.kr"],
    retail: {
      source: r.source,
      sourceUrl: r.sourceUrl,
      quoteDate: l.date,
      unit: "원/돈",
      note: r.note,
      vatIncludedBuy: true,
      items,
    },
    krx: g.wholesale
      ? {
          source: g.wholesale.source,
          sourceUrl: g.wholesale.sourceUrl ?? undefined,
          note: g.wholesale.note,
          latest: {
            date: g.wholesale.date,
            krwPerGram: g.wholesale.closePerGram,
            krwPerDon: g.wholesale.closePerDon,
            change: g.wholesale.change ?? 0,
            changePct: g.wholesale.changePct ?? 0,
          },
        }
      : undefined,
    fx: g.reference ? { usdkrw: g.reference.usdKrw } : undefined,
  };
}

/* ─────────────────────────── 계산 ─────────────────────────── */

/** 며칠 전 마지막 고시와 비교. daily 는 오래된 → 최신. 오늘 점은 제외하고 찾는다. */
export function pointDaysAgo(daily: GoldDaily[], latestDate: string, days: number): GoldDaily | null {
  const target = new Date(`${latestDate}T00:00:00Z`);
  target.setUTCDate(target.getUTCDate() - days);
  const t = target.toISOString().slice(0, 10);
  let found: GoldDaily | null = null;
  for (const p of daily) {
    if (p.date <= t) found = p;
    else break;
  }
  return found;
}

/** 이달(같은 YYYY-MM) 살 때 고점 */
export function monthHigh(daily: GoldDaily[], latestDate: string): GoldDaily | null {
  const ym = latestDate.slice(0, 7);
  let best: GoldDaily | null = null;
  for (const p of daily) {
    if (p.date.slice(0, 7) !== ym) continue;
    if (!best || p.buy > best.buy) best = p;
  }
  return best;
}

/** 이번 주 첫 거래일(월요일 이후 첫 점) 전날의 마지막 고시 = "이번 주 시작 대비"의 분모 */
export function weekStartPoint(daily: GoldDaily[], latestDate: string): GoldDaily | null {
  const d = new Date(`${latestDate}T00:00:00Z`);
  const dow = d.getUTCDay(); // 0 일 … 6 토
  const back = dow === 0 ? 6 : dow - 1; // 월요일까지 며칠
  d.setUTCDate(d.getUTCDate() - back - 1); // 월요일 전날(일요일) 이하
  const t = d.toISOString().slice(0, 10);
  let found: GoldDaily | null = null;
  for (const p of daily) {
    if (p.date <= t) found = p;
    else break;
  }
  return found;
}

export function pctOf(now: number, before: number | null | undefined): number | null {
  if (!before) return null;
  return ((now - before) / before) * 100;
}

export function won(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "";
  return Math.round(n).toLocaleString("ko-KR");
}

/** 부호 붙은 원 단위 — "+3,000" / "−8,000" / "0" */
export function signedWon(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "";
  if (n === 0) return "0";
  return `${n > 0 ? "+" : "−"}${Math.round(Math.abs(n)).toLocaleString("ko-KR")}`;
}

/** "−0.95%" 처럼 부호 붙은 % */
export function signedPct(n: number | null | undefined, digits = 2): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "";
  if (Math.abs(n) < 0.005) return "0.00%";
  return `${n > 0 ? "+" : "−"}${Math.abs(n).toFixed(digits)}%`;
}

export function dirOf(n: number | null | undefined): Dir {
  if (typeof n !== "number" || !Number.isFinite(n) || n === 0) return "none";
  return n > 0 ? "up" : "down";
}

/** "2026-09-09" → "9월 9일 (수)" */
export function korDateDow(iso: string | undefined): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  const dow = ["일", "월", "화", "수", "목", "금", "토"][d.getUTCDay()];
  return `${Number(m[2])}월 ${Number(m[3])}일 (${dow})`;
}

/** "2026-09-09" → "9.9" (차트 눈금) */
export function shortDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[2])}.${Number(m[3])}` : iso;
}

/** "11:19:25" → "11:19" */
export function hhmm(t: string | undefined): string {
  return t ? t.slice(0, 5) : "";
}
