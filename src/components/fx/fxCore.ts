/**
 * 환율 타입·순수 계산 — 서버(정적 굽기)와 브라우저(실시간 갱신)가 같이 쓴다.
 *
 * "use client" 파일(fxData.ts)에서 꺼낸 함수는 서버 컴포넌트에서 부를 수 없다(클라이언트 참조가 된다).
 * 그래서 훅이 아닌 것은 전부 여기 둔다. fxData.ts 는 이것을 다시 내보낸다.
 */

/** 국내 시세 관례: 상승 빨강 · 하락 파랑 · 보합 회색 (2026-10-01, 초록 상승을 바꿈) */
export const UP_COLOR = "#D93B30";
export const DOWN_COLOR = "#2563C9";
export const FLAT_COLOR = "#9CA1A8";
export const UP_BG = "#FDECEA";
export const DOWN_BG = "#E8F0FC";
/** 어두운 배경(헤더 티커) 위 */
export const UP_ON_DARK = "#FF7A72";
export const DOWN_ON_DARK = "#7FB2FF";

/** 갱신기(scripts/fx/update-fx.mjs)가 내보내는 그대로의 모양 */
export interface FxRate {
  code: string;
  /** "미국 달러" — 나라와 통화가 한 문자열로 온다 */
  name: string;
  /** 고시 단위. 엔·동·루피아는 100 */
  unit: number;
  /** 고시 단위 기준 원화 (unit이 100이면 100단위 값) */
  rate: number;
  /** 전일 종가 대비 원화 */
  change?: number;
  /** 전일 종가 대비 % */
  changePct?: number;
  dir?: "up" | "down" | "flat" | "none";
  /** 등락의 분모 — "prevClose"(전일 종가). 없으면 옛 갱신기 값(5거래일 전 대비)이다. */
  changeBasis?: string;
  /** 전일 종가 {date, rate} — 화면에 "9월 8일 종가 대비" 로 표기한다 */
  prevClose?: { date: string; rate: number } | null;
  /** 차트용 과거 시세. 과거 → 최신. fx.json 은 30일치, fx-history.json 은 1년치 */
  history?: HistoryPoint[];
  /** 여행지 묶음 — "일본·중화권" */
  region?: string;
}

export interface HistoryPoint {
  date: string;
  rate: number;
}

export interface FxBank {
  bank: string;
  /** 환전수수료율 % */
  feeRate: number;
  /** 기본우대율 % */
  basePref: number;
  /** 최대우대율 % */
  maxPref?: number | null;
  /** "모바일 80%" 처럼 조건이 붙는 원문 표기 */
  maxPrefText?: string | null;
  /** 우대 조건 설명 */
  note?: string | null;
  /** 은행이 공시한 기준일 YYYY-MM-DD — 화면에 그대로 노출한다 */
  asOf?: string | null;
}

/** 인천공항점 공시 한 줄 (update-banks.mjs fetchAirport) */
export interface FxAirportRow {
  bank: string;
  branch?: string | null;
  /** 현찰 살 때 수수료율 % */
  buyFee: number;
  /** 현찰 팔 때 수수료율 % */
  sellFee?: number | null;
  asOf?: string | null;
}

export interface FxAirport {
  source: string;
  sourceUrl: string;
  currencies: string[];
  byCurrency: Record<string, FxAirportRow[]>;
}

export interface FxBanks {
  source: string;
  sourceUrl: string;
  /** 수집된 공시 중 가장 최근 기준일 */
  latestAsOf?: string | null;
  note?: string;
  /** 은행 비교가 가능한 통화 코드 */
  currencies: string[];
  byCurrency: Record<string, FxBank[]>;
  /** 인천공항점 공시 — 2026-10-01 부터 수집. 옛 파일에는 없다 */
  airport?: FxAirport | null;
}

/** 수출입은행 매매기준율 — EXIM 키가 있을 때만 채워진다 (update-fx.mjs) */
export interface FxOfficialItem {
  code: string;
  unit: number;
  name?: string;
  /** 매매기준율 (unit 단위) */
  dealBasR: number;
  /** 송금 받으실 때 */
  ttb?: number | null;
  /** 송금 보내실 때 */
  tts?: number | null;
}

export interface FxOfficial {
  source?: string;
  sourceUrl?: string;
  quoteDate?: string;
  fetchedDate?: string;
  items?: FxOfficialItem[];
}

export interface FxData {
  updatedAt?: string;
  base?: string;
  source?: string;
  note?: string;
  /** 갱신기가 전일 종가 기준으로 등락을 계산했음을 뜻하는 "prevClose" */
  changeBasis?: string;
  rates?: FxRate[];
  official?: FxOfficial | null;
  banks?: FxBanks | null;
}

/* ─────────────────────────── 계산 ─────────────────────────── */

/** 1단위당 원화. 엔처럼 unit이 100이면 나눠서 맞춘다. */
export function perUnit(r: FxRate | undefined): number | null {
  if (!r || !Number.isFinite(r.rate) || !r.unit) return null;
  return r.rate / r.unit;
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

export function changeText(changePct: number | undefined | null): string {
  if (typeof changePct !== "number" || changePct === 0) return "0.00%";
  return `${changePct > 0 ? "▲" : "▼"} ${Math.abs(changePct).toFixed(2)}%`;
}

/** "전일 종가(9월 8일 1,343.57원) 대비" — 등락의 분모를 화면에 밝힌다 */
export function prevCloseLabel(r: FxRate | undefined): string {
  if (!r?.prevClose) return "전일 대비";
  return `전일 종가(${korDate(r.prevClose.date)} ${won(r.prevClose.rate, 2)}원) 대비`;
}

/** 통화 이름에서 나라를 앞 토막으로 뽑는다 — "미국 달러" → "미국" */
export function countryOf(name: string | undefined): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(0, -1).join(" ") : name;
}

/** "미국 달러" → "달러" */
export function unitNameOf(name: string | undefined): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1];
}

/** "2026-08-17" → "8월 17일". Date 파싱을 안 거쳐 시간대에 흔들리지 않는다. */
export function korDate(iso: string | undefined | null): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : "";
}

/** 공시 기준일 — 기준 시점과 해가 다르면 연도를 붙인다 ("2025년 11월 7일"). 은행 공시는 1년 가까이 묵은 것도 있다. */
export function asOfLabel(iso: string | undefined | null, ref: string | undefined | null): string {
  if (!iso) return "";
  const y = iso.slice(0, 4);
  return ref && ref.slice(0, 4) !== y ? `${y}년 ${korDate(iso)}` : korDate(iso);
}

export function korDateTime(iso: string | undefined): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
  return m ? `${Number(m[2])}월 ${Number(m[3])}일 ${m[4]}:${m[5]}` : korDate(iso);
}
