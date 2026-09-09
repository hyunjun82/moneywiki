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
  /** 전일 대비 변동 — 절댓값. 방향은 dir 이 갖는다. */
  change: number;
  dir: Dir;
  /** 살 때에만: 부가세를 뺀 원문 고시가 (갱신기 또는 normalizePrice 가 채운다) */
  priceExVat?: number;
  changeExVat?: number;
}

export interface RetailItem {
  key: string;
  name: string;
  /** 사용자가 금을 팔고 받는 돈 */
  userSell: Quote | null;
  /** 사용자가 금을 사며 내는 돈 — 부가세 10% 포함 (normalizePrice 가 보장한다) */
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
    /** true 면 userBuy.price 가 이미 부가세 포함이다. 없거나 false 면 옛 규격(부가세 별도). */
    vatIncludedBuy?: boolean;
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
    /** 등락의 분모 — "prevClose"(전일 종가) */
    changeBasis?: string;
    prevClose?: { date: string; rate: number } | null;
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
          if (alive) setState({ data: normalizePrice(json), status: "ready" });
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

/** 살 때 값이 부가세 포함이라는 안내. 갱신기가 note 를 주지 않을 때 화면이 쓴다. */
export const VAT_NOTE =
  "살 때 가격은 부가세 10%를 포함한 실제 결제 금액입니다(원문 고시가에 부가세를 더한 값).";

/**
 * 살 때 값을 부가세 포함으로 통일한다 (2026-09-09).
 *
 * 갱신기가 retail.vatIncludedBuy: true 로 발행하면 그대로 쓰고, 옛 규격(부가세 별도 원문)이면
 * 여기서 ×1.1 한다. 갱신기와 화면 중 어느 쪽이 먼저 배포되든 화면은 항상 실제 결제 금액을
 * 보여주고, 두 번 곱하는 일도 없다. 원문 값은 priceExVat/changeExVat 에 남긴다.
 */
export function normalizePrice(data: PriceData | null): PriceData | null {
  const retail = data?.retail;
  if (!data || !retail || retail.vatIncludedBuy === true || !retail.items) return data;
  const items = retail.items.map((it) => {
    const b = it.userBuy;
    if (!b) return it;
    return {
      ...it,
      userBuy: {
        price: Math.round(b.price * 1.1),
        change: Math.round((b.change ?? 0) * 1.1),
        dir: b.dir,
        priceExVat: b.price,
        changeExVat: b.change,
      },
    };
  });
  return { ...data, retail: { ...retail, vatIncludedBuy: true, note: VAT_NOTE, items } };
}

/** 전일 고시가. 갱신기는 등락을 절댓값+방향으로 주므로 방향에 따라 더하거나 뺀다. */
export function prevPrice(q: Quote | null | undefined): number | null {
  if (!q || !Number.isFinite(q.price)) return null;
  const c = Math.abs(q.change ?? 0);
  if (q.dir === "down") return q.price + c;
  if (q.dir === "up") return q.price - c;
  return q.price;
}

/**
 * 전일 대비 등락률(%) — 분모는 전일 고시가, 부호는 방향을 따른다.
 * (예전 화면은 change/(price−change) 로 계산해 하락일에 분모가 작아져 1.29% 처럼 부풀려졌다.
 *  9,000/714,000 = 1.26% 가 맞다.) 보합·값 없음은 null.
 */
export function changePct(q: Quote | null | undefined): number | null {
  const p = prevPrice(q);
  if (!q || p === null || p <= 0 || !q.change || q.dir === "none") return null;
  const pct = (Math.abs(q.change) / p) * 100;
  return q.dir === "down" ? -pct : pct;
}

/** 배지용 "▼ 9,000 (1.26%)" — 방향 기호 + 변동액 + 등락률 */
export function changeBadgeText(q: Quote | null | undefined): string {
  if (!q || !q.change || q.dir === "none") return "";
  const pct = changePct(q);
  return `${dirMark(q.dir)} ${won(Math.abs(q.change))}${pct !== null ? ` (${Math.abs(pct).toFixed(2)}%)` : ""}`;
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
