"use client";

/**
 * 금시세 데이터 계층.
 *
 * 데이터는 이 저장소의 금 전용 갱신기(.github/workflows/gold-price.yml +
 * scripts/gold/update-price.mjs)가 월~토 매시 price-data 브랜치에 발행한다.
 * 커밋 메시지의 [CI Skip] 덕분에 Cloudflare Pages 빌드는 돌지 않는다 —
 * 시세를 main에 커밋하면 /w/ 글 2,000여 개가 매번 재빌드되고(월 730회)
 * Cloudflare Pages 무료 한도 500회를 넘기기 때문. output:'export' 라
 * 빌드에 넣으면 시세가 그 시점에 얼어붙는 문제도 피한다.
 *
 * 모든 최상위 키는 없을 수 있다. 소스 한 곳이 죽어도 나머지는 살아 있게
 * 설계된 규격이므로 반드시 옵셔널 체이닝으로 접근하고, 값이 없으면 그 칸을
 * 통째로 숨긴다. 0원이나 '-'를 시세 자리에 절대 내보내지 않는다.
 */

import { useEffect, useState } from "react";

export const PRICE_URL =
  "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/price.json";

/** 1돈 = 3.75g */
export const GRAM_PER_DON = 3.75;

/** 한국 관례: 상승 빨강 · 하락 파랑 · 보합 회색. 초록은 쓰지 않는다. */
export const DIR_COLOR = {
  up: "#C2442E",
  down: "#1D4ED8",
  none: "#6C727B",
} as const;

export type Dir = "up" | "down" | "none";

export interface Quote {
  price: number;
  change: number;
  dir: Dir;
}

export interface RetailItem {
  key: string;
  name: string;
  /** 사용자가 금을 팔고 받는 돈 */
  userSell: Quote | null;
  /** 사용자가 금을 사며 내는 돈 (부가세 별도) */
  userBuy: Quote | null;
}

export interface KrxPoint {
  date: string;
  krwPerGram: number;
  krwPerDon: number;
  change: number;
  changePct: number;
}

export interface IntlItem {
  name: string;
  usdPerOz: number;
  changePct: number;
  dir: Dir;
  krwPerGram: number;
  krwPerDon: number;
  source: string;
}

export interface PriceData {
  updatedAt?: string;
  sources?: string[];
  retail?: {
    source?: string;
    sourceUrl?: string;
    quoteDate?: string;
    unit?: string;
    note?: string;
    items?: RetailItem[];
  };
  krx?: {
    source?: string;
    sourceUrl?: string;
    item?: string;
    unit?: string;
    note?: string;
    latest?: KrxPoint;
    history?: KrxPoint[];
  };
  fx?: {
    usdkrw?: number;
    change?: number;
    changePct?: number;
    dir?: Dir;
    source?: string;
  };
  intl?: {
    gold?: IntlItem;
    silver?: IntlItem;
  };
}

export type PriceStatus = "loading" | "ready" | "error";

export interface PriceState {
  data: PriceData | null;
  status: PriceStatus;
}

/**
 * 시세를 읽어온다. 페이지를 열어둔 채로도 갱신되도록 10분마다 다시 읽는다.
 * (원본 갱신은 1시간 주기라 그 사이엔 같은 값이 돌아온다.)
 */
export function usePrice(): PriceState {
  const [state, setState] = useState<PriceState>({ data: null, status: "loading" });

  useEffect(() => {
    let alive = true;

    const load = () =>
      fetch(PRICE_URL, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((json: PriceData) => {
          if (alive) setState({ data: json, status: "ready" });
        })
        .catch(() => {
          // 이미 값을 들고 있으면 그 값을 유지한다. 갱신 실패로 화면을 비우지 않는다.
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

/** 소매 품목을 key로 찾는다. */
export function findRetail(data: PriceData | null, key: string): RetailItem | undefined {
  return data?.retail?.items?.find((it) => it.key === key);
}

/** 순금 24K — 화면의 주인공 */
export function gold24(data: PriceData | null): RetailItem | undefined {
  return findRetail(data, "gold24");
}

/** 1돈 가격 → 1g 가격 */
export function perGram(price: number | null | undefined): number | null {
  if (typeof price !== "number" || !Number.isFinite(price)) return null;
  return price / GRAM_PER_DON;
}

/** 각인 규격에서 나오는 순금 함량. 매입률 계산의 분모에 쓴다. */
export const KARAT_PURITY: Record<string, number> = {
  gold24: 0.999,
  gold18: 0.75,
  gold14: 0.585,
};

/**
 * 매입률 = 실제 매입가 ÷ (순금 매입가 × 함량)
 *
 * 원본 시안에는 98%·92%·88% 가 박혀 있었지만 데이터에 없는 값이라 쓰지 않는다.
 * 대신 오늘 고시가에서 직접 계산한다. 함량 기준이 없는 백금·은은 null.
 */
export function buybackRate(
  itemPrice: number | null | undefined,
  gold24Price: number | null | undefined,
  key: string
): number | null {
  const purity = KARAT_PURITY[key];
  if (!purity || !itemPrice || !gold24Price) return null;
  return (itemPrice / (gold24Price * purity)) * 100;
}

export function won(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "";
  return Math.round(n).toLocaleString("ko-KR");
}

/** "2026-08-15" → "8월 15일". Date 파싱을 거치지 않아 시간대에 흔들리지 않는다. */
export function korDate(iso: string | undefined): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return "";
  return `${Number(m[2])}월 ${Number(m[3])}일`;
}

/** "2026-08-15T17:04:34.257+09:00" → "8월 15일 17:04" */
export function korDateTime(iso: string | undefined): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
  if (!m) return korDate(iso);
  return `${Number(m[2])}월 ${Number(m[3])}일 ${m[4]}:${m[5]}`;
}

/** 등락 기호 */
export function dirMark(dir: Dir | undefined): string {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "—";
}

export function dirColor(dir: Dir | undefined): string {
  return DIR_COLOR[dir ?? "none"];
}
