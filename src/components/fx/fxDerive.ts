/**
 * 통화 페이지(스포크)의 키워드 표기와 파생 숫자 — 서버(빌드 때 굽기)와 브라우저(갱신)가 같은 함수를 쓴다.
 *
 * 숫자 문장은 여기서만 만든다. 화면·FAQ·JSON-LD·메타 설명이 같은 값을 말해야 하기 때문이다.
 * 전망·추천 문장은 만들지 않는다(AdSense 규칙). 공시값과 그 값으로 한 계산만 말한다.
 */

import {
  bankRate,
  korDate,
  korDateTime,
  won,
  type FxAirportRow,
  type FxBank,
  type FxData,
  type FxRate,
  type HistoryPoint,
} from "./fxCore";

/* ─────────────────────────── 통화 15종 ─────────────────────────── */

export interface CurrencyMeta {
  code: string;
  /** 주소 /fx/<slug> */
  slug: string;
  /** "엔" — 금액 뒤에 붙는 말 */
  unitWord: string;
  /** "엔화" — 문장 주어 */
  short: string;
  /** 대표 검색어 — 제목 맨 앞 */
  keyword: string;
  h1: string;
  /** 설명 첫머리에 늘어놓는 같은 뜻의 검색어 */
  aliases: string[];
  country: string;
  /** 은행 비교 기준 금액(외화) — 여행 한 번에 흔히 바꾸는 규모 */
  sample: number;
  /** 금액 칩 */
  chips: number[];
}

/**
 * 순서 = 검색량 순(2026-10-01 사용자 제공 키워드 표: 엔화 579만 · 달러 416만 · 유로 101만 · 베트남 70만 · 중국 66만 …).
 * 은행연합회가 은행 비교를 공시하는 15종과 같다(update-banks.mjs CURRENCIES).
 */
export const SPOKES: CurrencyMeta[] = [
  { code: "USD", slug: "usd", unitWord: "달러", short: "달러", keyword: "달러 환율", h1: "달러 환율 · 달러 환전", aliases: ["달러 환율", "원달러 환율", "미국 환율"], country: "미국", sample: 1000, chips: [500, 1000, 3000] },
  { code: "JPY", slug: "jpy", unitWord: "엔", short: "엔화", keyword: "엔화 환율", h1: "엔화 환율 · 엔화 환전", aliases: ["엔화 환율", "일본 환율", "100엔 환율"], country: "일본", sample: 100000, chips: [50000, 100000, 300000] },
  { code: "EUR", slug: "eur", unitWord: "유로", short: "유로", keyword: "유로 환율", h1: "유로 환율 · 유로 환전", aliases: ["유로 환율", "유로화 환율", "유럽 환율"], country: "유럽", sample: 1000, chips: [500, 1000, 3000] },
  { code: "VND", slug: "vnd", unitWord: "동", short: "베트남 동", keyword: "베트남 환율", h1: "베트남 환율 · 베트남 동 환전", aliases: ["베트남 환율", "베트남 동 환율", "동 환율"], country: "베트남", sample: 10_000_000, chips: [5_000_000, 10_000_000, 20_000_000] },
  { code: "CNY", slug: "cny", unitWord: "위안", short: "위안화", keyword: "중국 환율", h1: "중국 환율 · 위안화 환전", aliases: ["중국 환율", "위안화 환율", "위안 환율"], country: "중국", sample: 5000, chips: [2000, 5000, 10000] },
  { code: "THB", slug: "thb", unitWord: "바트", short: "바트", keyword: "태국 환율", h1: "태국 환율 · 바트 환전", aliases: ["태국 환율", "바트 환율", "태국 바트 환율"], country: "태국", sample: 20000, chips: [10000, 20000, 50000] },
  { code: "GBP", slug: "gbp", unitWord: "파운드", short: "파운드", keyword: "파운드 환율", h1: "파운드 환율 · 파운드 환전", aliases: ["파운드 환율", "영국 환율", "영국 파운드 환율"], country: "영국", sample: 1000, chips: [500, 1000, 3000] },
  { code: "TWD", slug: "twd", unitWord: "대만달러", short: "대만 달러", keyword: "대만 환율", h1: "대만 환율 · 대만 달러 환전", aliases: ["대만 환율", "대만 달러 환율"], country: "대만", sample: 20000, chips: [10000, 20000, 50000] },
  { code: "PHP", slug: "php", unitWord: "페소", short: "페소", keyword: "필리핀 환율", h1: "필리핀 환율 · 페소 환전", aliases: ["필리핀 환율", "페소 환율", "필리핀 페소 환율"], country: "필리핀", sample: 30000, chips: [10000, 30000, 50000] },
  { code: "HKD", slug: "hkd", unitWord: "홍콩달러", short: "홍콩 달러", keyword: "홍콩 환율", h1: "홍콩 환율 · 홍콩 달러 환전", aliases: ["홍콩 환율", "홍콩 달러 환율"], country: "홍콩", sample: 5000, chips: [2000, 5000, 10000] },
  { code: "AUD", slug: "aud", unitWord: "호주달러", short: "호주 달러", keyword: "호주 환율", h1: "호주 환율 · 호주 달러 환전", aliases: ["호주 환율", "호주 달러 환율"], country: "호주", sample: 1000, chips: [500, 1000, 3000] },
  { code: "SGD", slug: "sgd", unitWord: "싱가포르달러", short: "싱가포르 달러", keyword: "싱가포르 환율", h1: "싱가포르 환율 · 싱가포르 달러 환전", aliases: ["싱가포르 환율", "싱가포르 달러 환율"], country: "싱가포르", sample: 1000, chips: [500, 1000, 3000] },
  { code: "CAD", slug: "cad", unitWord: "캐나다달러", short: "캐나다 달러", keyword: "캐나다 환율", h1: "캐나다 환율 · 캐나다 달러 환전", aliases: ["캐나다 환율", "캐나다 달러 환율"], country: "캐나다", sample: 1000, chips: [500, 1000, 3000] },
  { code: "CHF", slug: "chf", unitWord: "프랑", short: "스위스 프랑", keyword: "스위스 환율", h1: "스위스 환율 · 스위스 프랑 환전", aliases: ["스위스 환율", "스위스 프랑 환율"], country: "스위스", sample: 1000, chips: [500, 1000, 3000] },
  { code: "NZD", slug: "nzd", unitWord: "뉴질랜드달러", short: "뉴질랜드 달러", keyword: "뉴질랜드 환율", h1: "뉴질랜드 환율 · 뉴질랜드 달러 환전", aliases: ["뉴질랜드 환율", "뉴질랜드 달러 환율"], country: "뉴질랜드", sample: 1000, chips: [500, 1000, 3000] },
];

export const metaBySlug = (slug: string) => SPOKES.find((m) => m.slug === slug);
export const metaByCode = (code: string) => SPOKES.find((m) => m.code === code);

/* ─────────────────────────── 조사 ─────────────────────────── */

/** 받침에 맞춰 조사를 붙인다 — josa("10만 엔", "을를") → "10만 엔을", josa("신한은행 외 8곳", "이가") → "…곳이" */
export function josa(word: string, pair: "을를" | "이가" | "은는" | "과와"): string {
  const c = word.charCodeAt(word.length - 1);
  const hasFinal = c >= 0xac00 && c <= 0xd7a3 ? (c - 0xac00) % 28 !== 0 : false;
  return word + (hasFinal ? pair[0] : pair[1]);
}

/* ─────────────────────────── 금액 표기 ─────────────────────────── */

/** 1000 → "1,000", 100000 → "10만", 10000000 → "1,000만" — 외화 금액 칩·문장용 */
export function amountKo(n: number): string {
  if (n >= 10000 && n % 10000 === 0) return `${won(n / 10000)}만`;
  return won(n);
}

/** "10만 엔" · "1,000달러" — 단위가 한 글자면 띄우고 긴 단위는 붙인다 */
export function amountLabel(meta: CurrencyMeta, n: number): string {
  const a = amountKo(n);
  return /만$/.test(a) ? `${a} ${meta.unitWord}` : `${a}${meta.unitWord}`;
}

/** 고시 단위 표기 — "100엔" · "1달러" */
export function quoteLabel(meta: CurrencyMeta, unit: number): string {
  return `${unit}${meta.unitWord}`;
}

/* ─────────────────────────── 기준 환율 ─────────────────────────── */

export interface BaseRate {
  code: string;
  /** 고시 단위 값 (엔은 100엔당) */
  rate: number;
  unit: number;
  perUnit: number;
  kind: "official" | "mid";
  /** "매매기준율(한국수출입은행 고시)" · "시장 중간환율" */
  label: string;
  /** "10월 1일 고시" · "10월 1일 10:29" */
  when: string;
  rateRow: FxRate;
}

function daysBetween(a: string, b: string): number {
  return Math.abs(Date.parse(a.slice(0, 10)) - Date.parse(b.slice(0, 10))) / 86400000;
}

/**
 * 수출입은행 매매기준율이 있으면 그것을, 없으면 시장 중간환율을 기준으로 쓴다.
 * 수출입은행은 베트남 동·대만 달러·필리핀 페소를 고시하지 않는다 — 그 셋은 키가 있어도 시장환율이다.
 */
export function baseOf(data: FxData | null | undefined, code: string): BaseRate | null {
  const r = data?.rates?.find((x) => x.code === code);
  if (!r || !Number.isFinite(r.rate) || !r.unit) return null;
  const o = data?.official;
  const item = o?.items?.find((x) => x.code === code);
  const fresh =
    item?.dealBasR && o?.quoteDate && data?.updatedAt ? daysBetween(o.quoteDate, data.updatedAt) <= 4 : false;
  if (item && fresh) {
    const rate = item.dealBasR * (r.unit / (item.unit || 1));
    return {
      code,
      rate,
      unit: r.unit,
      perUnit: rate / r.unit,
      kind: "official",
      label: "매매기준율(한국수출입은행 고시)",
      when: `${korDate(o!.quoteDate)} 고시`,
      rateRow: r,
    };
  }
  return {
    code,
    rate: r.rate,
    unit: r.unit,
    perUnit: r.rate / r.unit,
    kind: "mid",
    label: "시장 중간환율",
    when: korDateTime(data?.updatedAt),
    rateRow: r,
  };
}

/* ─────────────────────────── 은행 ─────────────────────────── */

export function banksOf(data: FxData | null | undefined, code: string): FxBank[] {
  return (data?.banks?.byCurrency?.[code] ?? []).filter((b) => Number.isFinite(b.feeRate));
}

export function median(xs: number[]): number | null {
  const s = xs.filter(Number.isFinite).sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** 공시 수수료율 중간값 — "우대 없이 창구에서" 의 기준 */
export function medianFee(data: FxData | null | undefined, code: string): number | null {
  return median(banksOf(data, code).map((b) => b.feeRate));
}

const prefOf = (b: FxBank) => (typeof b.maxPref === "number" ? b.maxPref : b.basePref ?? 0);

export interface BankRow {
  bank: FxBank;
  pref: number;
  /** 우대 후 살 때 환율 (고시 단위) */
  applied: number;
  /** amount 외화를 살 때 낼 원화 */
  pay: number;
  /** 그중 수수료 */
  fee: number;
  /** 최저 대비 더 내는 돈 */
  diff: number;
  isBest: boolean;
}

/** amount 외화를 앱 최대 우대(공시)로 살 때 은행별로 낼 원화 — 적게 내는 순 */
export function rankBanks(data: FxData | null | undefined, code: string, amount: number): BankRow[] {
  const base = baseOf(data, code);
  const banks = banksOf(data, code);
  if (!base || !banks.length) return [];
  const rows = banks.map((b) => {
    const pref = prefOf(b);
    const perUnitApplied = bankRate(base.perUnit, b.feeRate, pref, "buy");
    const pay = amount * perUnitApplied;
    return { bank: b, pref, applied: perUnitApplied * base.unit, pay, fee: pay - amount * base.perUnit, diff: 0, isBest: false };
  });
  rows.sort((a, b) => a.pay - b.pay || a.bank.bank.localeCompare(b.bank.bank, "ko"));
  const min = rows[0].pay;
  for (const r of rows) {
    r.diff = r.pay - min;
    r.isBest = r.diff < 0.5; // 원 단위 반올림 안에서 같으면 함께 1위
  }
  return rows;
}

/** "신한은행 외 8곳" · "KB국민은행" */
export function bestLabel(rows: BankRow[]): string {
  const best = rows.filter((r) => r.isBest);
  if (!best.length) return "";
  return best.length === 1 ? best[0].bank.bank : `${best[0].bank.bank} 외 ${best.length - 1}곳`;
}

/** 우대 없이 창구(공시 수수료율 중간값)에서 amount 를 살 때 */
export function counterPay(data: FxData | null | undefined, code: string, amount: number) {
  const base = baseOf(data, code);
  const fee = medianFee(data, code);
  if (!base || fee == null) return null;
  const perUnitApplied = bankRate(base.perUnit, fee, 0, "buy");
  return { feeRate: fee, pay: amount * perUnitApplied, fee: amount * (perUnitApplied - base.perUnit), applied: perUnitApplied * base.unit };
}

/** 우대 없이 창구에서 팔 때(받는 원화) 기준 환율 */
export function counterSell(data: FxData | null | undefined, code: string) {
  const base = baseOf(data, code);
  const fee = medianFee(data, code);
  if (!base || fee == null) return null;
  return bankRate(base.perUnit, fee, 0, "sell") * base.unit;
}

/* ─────────────────────────── 인천공항점 ─────────────────────────── */

export function airportOf(data: FxData | null | undefined, code: string): FxAirportRow[] {
  return (data?.banks?.airport?.byCurrency?.[code] ?? []).filter((r) => Number.isFinite(r.buyFee));
}

export interface AirportCompare {
  rows: FxAirportRow[];
  minBuy: number;
  maxBuy: number;
  midBuy: number;
  midSell: number | null;
  /** 공항 창구에서 amount 를 살 때 수수료 (공항점 수수료율 중간값, 우대 없음) */
  airportFee: number;
  cityFee: number | null;
  cityFeeRate: number | null;
  appFee: number | null;
  /** 공항 수수료율 ÷ 시내 창구 수수료율 */
  times: number | null;
}

export function airportCompare(data: FxData | null | undefined, code: string, amount: number): AirportCompare | null {
  const rows = airportOf(data, code);
  const base = baseOf(data, code);
  if (!rows.length || !base) return null;
  const buys = rows.map((r) => r.buyFee);
  const midBuy = median(buys)!;
  const sells = rows.map((r) => r.sellFee).filter((x): x is number => typeof x === "number");
  const city = counterPay(data, code, amount);
  const ranked = rankBanks(data, code, amount);
  return {
    rows,
    minBuy: Math.min(...buys),
    maxBuy: Math.max(...buys),
    midBuy,
    midSell: median(sells),
    airportFee: amount * base.perUnit * (midBuy / 100),
    cityFee: city?.fee ?? null,
    cityFeeRate: city?.feeRate ?? null,
    appFee: ranked[0]?.fee ?? null,
    times: city?.feeRate ? midBuy / city.feeRate : null,
  };
}

/** "4.2%" · "13.9~17%" */
export function feeRange(min: number, max: number): string {
  const f = (x: number) => `${+x.toFixed(2)}`;
  return min === max ? `${f(min)}%` : `${f(min)}~${f(max)}%`;
}

/* ─────────────────────────── 1년 흐름 ─────────────────────────── */

export interface RangeStats {
  days: number;
  /** "최근 1년" · "최근 20거래일" */
  spanLabel: string;
  low: HistoryPoint;
  high: HistoryPoint;
  /** 0 = 기간 최저, 1 = 기간 최고 */
  pos: number;
  /** 기간별 등락 — 그 날짜 값 대비 지금 (원, %) */
  changes: { label: string; from: HistoryPoint; diff: number; pct: number }[];
}

/** history 에 오늘 값을 붙인 시계열 (같은 날짜면 오늘 값이 이긴다) */
export function withLatest(history: HistoryPoint[], r: FxRate | undefined, today?: string): HistoryPoint[] {
  const s = history.filter((p) => Number.isFinite(p.rate));
  if (!r || !today) return s;
  const d = today.slice(0, 10);
  const out = s.filter((p) => p.date !== d);
  out.push({ date: d, rate: r.rate });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

export function rangeStats(series: HistoryPoint[]): RangeStats | null {
  if (series.length < 5) return null;
  const last = series[series.length - 1];
  let low = series[0];
  let high = series[0];
  for (const p of series) {
    if (p.rate < low.rate) low = p;
    if (p.rate > high.rate) high = p;
  }
  const spanDays = daysBetween(series[0].date, last.date);
  const spanLabel = spanDays >= 330 ? "최근 1년" : spanDays >= 150 ? "최근 6개월" : `최근 ${series.length}거래일`;
  const back = (days: number) => {
    const target = Date.parse(last.date) - days * 86400000;
    let pick: HistoryPoint | null = null;
    for (const p of series) if (Date.parse(p.date) <= target) pick = p;
    return pick;
  };
  const changes: RangeStats["changes"] = [];
  for (const [label, days] of [["1개월 전", 30], ["3개월 전", 91], ["6개월 전", 182], ["1년 전", 365]] as const) {
    const from = back(days);
    if (from) changes.push({ label, from, diff: last.rate - from.rate, pct: ((last.rate - from.rate) / from.rate) * 100 });
  }
  return {
    days: series.length,
    spanLabel,
    low,
    high,
    pos: high.rate === low.rate ? 0.5 : (last.rate - low.rate) / (high.rate - low.rate),
    changes,
  };
}

/* ─────────────────────────── 문장 ─────────────────────────── */

const updown = (d: number) => (d > 0 ? "올랐습니다" : d < 0 ? "내렸습니다" : "같습니다");

/** 통화 페이지 첫 문단 */
export function leadText(data: FxData, meta: CurrencyMeta): string {
  const base = baseOf(data, meta.code);
  if (!base) return "";
  const r = base.rateRow;
  const q = quoteLabel(meta, base.unit);
  const parts = [`${base.when} 기준 ${q} ${won(base.rate, 2)}원(${base.label})입니다.`];
  if (r.prevClose && typeof r.change === "number") {
    parts.push(
      `전일 종가(${korDate(r.prevClose.date)} ${won(r.prevClose.rate, 2)}원)보다 ${won(Math.abs(r.change), 2)}원 ${updown(r.change)}.`
    );
  }
  const counter = counterPay(data, meta.code, meta.sample);
  const ranked = rankBanks(data, meta.code, meta.sample);
  if (counter && ranked.length) {
    parts.push(
      `${josa(amountLabel(meta, meta.sample), "을를")} 현찰로 사면 우대 없이 ${won(counter.pay)}원, 앱 최대 우대로는 ${josa(bestLabel(ranked), "이가")} ${won(ranked[0].pay)}원으로 가장 적게 냅니다.`
    );
  }
  return parts.join(" ");
}

export interface Faq {
  q: string;
  a: string;
}

export function currencyFaq(data: FxData, meta: CurrencyMeta): Faq[] {
  const base = baseOf(data, meta.code);
  if (!base) return [];
  const out: Faq[] = [];
  const q = quoteLabel(meta, base.unit);
  const r = base.rateRow;
  const counter = counterPay(data, meta.code, meta.sample);

  out.push({
    q: `오늘 ${meta.keyword}은 얼마인가요?`,
    a:
      `${base.when} 기준 ${q} ${won(base.rate, 2)}원입니다(${base.label}).` +
      (r.prevClose && typeof r.change === "number"
        ? ` 전일 종가 ${won(r.prevClose.rate, 2)}원보다 ${won(Math.abs(r.change), 2)}원 ${updown(r.change)}.`
        : "") +
      (counter ? ` 은행 창구에서 현찰로 살 때는 수수료가 붙어 우대 없이 ${q} 약 ${won(counter.applied, 2)}원입니다.` : ""),
  });

  const ranked = rankBanks(data, meta.code, meta.sample);
  if (ranked.length && counter) {
    out.push({
      q: `${meta.short} 환전은 어느 은행이 가장 싼가요?`,
      a:
        `은행연합회 공시 수수료율·최대 우대율로 ${josa(amountLabel(meta, meta.sample), "을를")} 살 때 ${josa(bestLabel(ranked), "이가")} ${won(ranked[0].pay)}원으로 가장 적게 냅니다. ` +
        `우대 없이 창구에서 사면 ${won(counter.pay)}원이라 ${won(counter.pay - ranked[0].pay)}원 차이입니다. ` +
        `최대 우대율은 앱·금액·거래 실적 조건이 붙으니 거래 전에 은행에서 확인해야 합니다.`,
    });
  }

  const ap = airportCompare(data, meta.code, meta.sample);
  if (ap && ap.cityFeeRate != null && ap.cityFee != null) {
    out.push({
      q: `인천공항에서 ${meta.short} 환전하면 얼마나 비싼가요?`,
      a:
        `인천공항점(${ap.rows.map((x) => x.bank).join("·")}) 공시 살 때 수수료율은 ${feeRange(ap.minBuy, ap.maxBuy)}로, 시내 창구 공시 중간값 ${+ap.cityFeeRate.toFixed(2)}%의 약 ${ap.times!.toFixed(1)}배입니다. ` +
        `${amountLabel(meta, meta.sample)}면 수수료가 공항 창구 약 ${won(ap.airportFee)}원, 시내 창구 ${won(ap.cityFee)}원` +
        (ap.appFee != null ? `, 앱 최대 우대 ${won(ap.appFee)}원입니다.` : "입니다."),
    });
  }

  if (counter && ranked.length) {
    const krw = 1_000_000;
    out.push({
      q: `100만 원이면 ${meta.short} 얼마인가요?`,
      a:
        `우대 없이 창구에서 현찰로 사면 약 ${won(Math.floor(krw / (counter.applied / base.unit)))}${meta.unitWord}, ` +
        `앱 최대 우대(${bestLabel(ranked)})로 사면 약 ${won(Math.floor(krw / (ranked[0].applied / base.unit)))}${meta.unitWord}입니다. 기준 환율 ${q} ${won(base.rate, 2)}원으로 계산했습니다.`,
    });
  }

  const fees = banksOf(data, meta.code).map((b) => b.feeRate);
  if (fees.length) {
    out.push({
      q: `현찰 살 때 환율은 왜 기준 환율보다 높은가요?`,
      a:
        `은행은 기준 환율에 환전 수수료(공시 용어로 현찰 스프레드)를 더해 팝니다. ${meta.short} 수수료율은 은행 공시 ${feeRange(Math.min(...fees), Math.max(...fees))}입니다. ` +
        `"우대율 90%"는 환율을 90% 깎는다는 뜻이 아니라 이 수수료의 90%를 빼 준다는 뜻입니다.`,
    });
  }
  return out;
}

/* ─────────────────────────── 허브 ─────────────────────────── */

export function hubFaq(data: FxData): Faq[] {
  const usd = metaByCode("USD")!;
  const base = baseOf(data, "USD");
  const out: Faq[] = [];
  if (base) {
    out.push({
      q: "오늘 달러 환율은 얼마인가요?",
      a: `${base.when} 기준 1달러 ${won(base.rate, 2)}원입니다(${base.label}). 통화별 값은 아래 표와 통화별 페이지에서 볼 수 있습니다.`,
    });
  }
  const counter = counterPay(data, "USD", usd.sample);
  const ranked = rankBanks(data, "USD", usd.sample);
  if (counter && ranked.length) {
    out.push({
      q: "환전 수수료는 은행마다 얼마나 다른가요?",
      a: `1,000달러를 살 때 우대 없이 창구에서는 수수료가 ${won(counter.fee)}원, 공시된 앱 최대 우대를 받으면 ${josa(bestLabel(ranked), "이가")} ${won(ranked[0].fee)}원으로 가장 적습니다. 은행별 수수료율과 우대율은 은행연합회가 공시합니다.`,
    });
  }
  out.push({
    q: "기준 환율과 은행에서 살 때 환율은 왜 다른가요?",
    a: "은행은 기준 환율에 환전 수수료(현찰 스프레드)를 더해 팔고, 빼서 삽니다. 우대율은 이 수수료를 깎아 주는 비율입니다. 그래서 같은 날 같은 통화라도 은행과 우대 조건에 따라 낼 원화가 달라집니다.",
  });
  out.push({
    q: "이 페이지의 환율은 언제 바뀌나요?",
    a: "시장 환율은 평일 30분마다 다시 받습니다. 은행별 수수료율·우대율과 인천공항점 공시는 하루 한 번 은행연합회 외환길잡이에서 받습니다. 은행 공시는 은행마다 기준일이 달라 표에 기준일을 함께 적습니다.",
  });
  return out;
}

export function banksFaq(data: FxData): Faq[] {
  const usd = metaByCode("USD")!;
  const out: Faq[] = [];
  const ranked = rankBanks(data, "USD", usd.sample);
  const counter = counterPay(data, "USD", usd.sample);
  if (ranked.length && counter) {
    out.push({
      q: "환전 수수료가 가장 싼 은행은 어디인가요?",
      a: `은행연합회 공시 수수료율과 최대 우대율로 1,000달러를 살 때 ${josa(bestLabel(ranked), "이가")} 수수료 ${won(ranked[0].fee)}원으로 가장 적습니다. 우대 없이 창구에서 사면 ${won(counter.fee)}원입니다. 통화마다 1위 은행이 달라 통화별 표를 따로 봐야 합니다.`,
    });
  }
  out.push({
    q: "환전 우대율 90%는 무슨 뜻인가요?",
    a: "환율을 90% 깎아 준다는 말이 아니라 환전 수수료(기준 환율과 현찰 살 때 환율의 차이)의 90%를 빼 준다는 뜻입니다. 수수료율 1.75%인 통화를 90% 우대받으면 실제 수수료는 0.175%가 됩니다.",
  });
  const med = (c: string) => medianFee(data, c);
  const u = med("USD");
  const v = med("VND");
  const t = med("TWD");
  if (u != null && v != null) {
    out.push({
      q: "통화마다 환전 수수료율이 왜 다른가요?",
      a: `은행이 그 통화 현찰을 들여오고 보관하는 비용이 달라서입니다. 공시 중간값으로 달러는 ${+u.toFixed(2)}%인데 베트남 동은 ${+v.toFixed(2)}%${t != null ? `, 대만 달러는 ${+t.toFixed(2)}%` : ""}입니다. 수수료율이 높은 통화일수록 우대율 차이가 금액 차이로 크게 벌어집니다.`,
    });
  }
  out.push({
    q: "은행 공시값과 실제 앱 화면 값이 다를 수 있나요?",
    a: "다를 수 있습니다. 공시는 은행마다 기준일이 다르고, 최대 우대율에는 앱 환전·금액·거래 실적 같은 조건이 붙습니다. 표의 기준일을 보고, 거래 전에 은행 앱이나 창구에서 적용 우대율을 확인해야 합니다.",
  });
  return out;
}

export function airportFaq(data: FxData): Faq[] {
  const usd = metaByCode("USD")!;
  const jpy = metaByCode("JPY")!;
  const out: Faq[] = [];
  const ap = airportCompare(data, "USD", usd.sample);
  if (ap && ap.cityFeeRate != null && ap.cityFee != null) {
    out.push({
      q: "인천공항 환전 수수료는 얼마인가요?",
      a: `은행연합회 공시로 인천공항점 달러 살 때 수수료율은 ${feeRange(ap.minBuy, ap.maxBuy)}입니다. 1,000달러면 수수료가 약 ${won(ap.airportFee)}원으로, 시내 창구(${+ap.cityFeeRate.toFixed(2)}%) ${won(ap.cityFee)}원의 약 ${ap.times!.toFixed(1)}배입니다.`,
    });
  }
  const aj = airportCompare(data, "JPY", jpy.sample);
  if (aj) {
    out.push({
      q: "인천공항에서 엔화를 바꾸면 얼마나 더 내나요?",
      a: `인천공항점 엔화 살 때 수수료율은 ${feeRange(aj.minBuy, aj.maxBuy)}입니다. 10만 엔이면 수수료가 공항 창구 약 ${won(aj.airportFee)}원` +
        (aj.cityFee != null ? `, 시내 창구 ${won(aj.cityFee)}원` : "") +
        (aj.appFee != null ? `, 앱 최대 우대 ${won(aj.appFee)}원입니다.` : "입니다."),
    });
  }
  out.push({
    q: "인천공항에서 환전하는 은행은 어디인가요?",
    a: "은행연합회 외환길잡이에 인천공항점 수수료를 공시하는 은행은 우리은행·하나은행·KB국민은행 세 곳입니다. 지점별 기준일은 표에 적었습니다.",
  });
  out.push({
    q: "공항에서 받아야 하면 어떻게 하나요?",
    a: "은행 앱에서 미리 환전을 신청하고 수령 장소를 공항 지점으로 고르는 방법이 있습니다. 이때 적용되는 우대율과 공항 수령 가능 여부는 은행마다 달라 신청 화면에서 확인해야 합니다.",
  });
  return out;
}
