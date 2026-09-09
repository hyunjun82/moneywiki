/**
 * gold.json 생성기 — 화면이 읽는 금시세 한 파일 (스펙 5절, 2026-09-09)
 *
 * 입력 (price-data 폴더)
 *   kgx-quotes.json  한국금거래소 회차별 고시 (collect-kgx.mjs 가 PC 에서 수집)   ← 필수
 *   price.json       KRX 도매 종가·환율·국제 시세 (update-price.mjs, GitHub Actions) ← 있으면 사용
 *   Yahoo Finance    기준가 계산용 국제 금값(달러/온스)·USD/KRW                       ← --no-yahoo 로 생략
 *
 * 출력 gold.json
 *   retail    한국금거래소 최신 고시·전 거래일 마지막 고시·등락·최근 3거래일 회차·백금·은
 *   reference 기준가 = 국제 금값 / 31.1034768 × USD/KRW × 3.75 (KB 골드뱅킹과 같은 공식. 스크래핑하지 않는다)
 *   wholesale KRX 금시장 전 영업일 종가 + 월별 종가 6개월 (price.json 에서)
 *   derived   스프레드·살 때 분해(금값·세공/유통·부가세)·18K/14K 이론가 대비 차이
 *   history   일별 마지막 고시 (수집된 전 기간, 최대 1년) — 기간별 등락·차트용
 *
 * 실행 위치: 두 곳에서 같은 파일을 만든다.
 *   - PC 예약 작업(collect-kgx.ps1): 고시 수집 직후 → 30분 안에 새 고시가 화면에 뜬다
 *   - GitHub Actions(gold-price.yml): price.json 갱신 직후 → PC 가 꺼져 있어도 기준가·도매는 움직인다
 *
 * 사용법: node scripts/gold/build-gold-json.mjs <price-data 폴더> [--out <경로>] [--no-yahoo]
 * 원칙: 순금 살 때·팔 때가 없으면 파일을 쓰지 않는다. 추정치를 만들어 넣지 않는다.
 */

import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const DIR = argv.find((a) => !a.startsWith("--")) ?? "price-data";
const flagValue = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : null;
};
const OUT = flagValue("--out") ?? path.join(DIR, "gold.json");
const NO_YAHOO = argv.includes("--no-yahoo");

const GRAM_PER_DON = 3.75;
const OZ_TO_GRAM = 31.1034768;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

const kstNow = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00");
const round2 = (n) => Math.round(n * 100) / 100;
const readJson = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
};

/* ── 1. 한국금거래소 고시 ── */
const kgx = readJson(path.join(DIR, "kgx-quotes.json"));
const quotes = Array.isArray(kgx?.quotes) ? kgx.quotes.filter((q) => q?.date && q.buy && q.sell) : [];
if (!quotes.length) {
  console.error("kgx-quotes.json 에 고시가 없음 — gold.json 을 쓰지 않음");
  process.exit(1);
}
quotes.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

/** 날짜별로 묶는다 (오래된 → 최신). 각 날의 회차는 시각순. */
const byDay = new Map();
for (const q of quotes) {
  if (!byDay.has(q.date)) byDay.set(q.date, []);
  byDay.get(q.date).push(q);
}
const days = [...byDay.keys()];
const latestDay = days[days.length - 1];
const todayQuotes = byDay.get(latestDay);
const latestQ = todayQuotes[todayQuotes.length - 1];
const prevDay = days.length >= 2 ? days[days.length - 2] : null;
const prevQ = prevDay ? byDay.get(prevDay).at(-1) : null;

const withRound = (list) => list.map((q, i) => ({ round: i + 1, ...q }));
const pct = (now, before) => (before ? round2(((now - before) / before) * 100) : null);
const diff = (a, b) => (a != null && b != null ? a - b : null);

const latest = {
  date: latestQ.date,
  round: todayQuotes.length,
  time: latestQ.time,
  buy: latestQ.buy,
  sell: latestQ.sell,
  k18: latestQ.k18 ?? null,
  k14: latestQ.k14 ?? null,
  /** 18K·14K 살 때 — 웹에는 "제품시세적용"으로 숨겨진 API 참고값 */
  s18: latestQ.s18 ?? null,
  s14: latestQ.s14 ?? null,
};
const prevClose = prevQ
  ? {
      date: prevQ.date,
      round: byDay.get(prevDay).length,
      time: prevQ.time,
      buy: prevQ.buy,
      sell: prevQ.sell,
      k18: prevQ.k18 ?? null,
      k14: prevQ.k14 ?? null,
    }
  : null;
const change = prevClose
  ? {
      buy: latest.buy - prevClose.buy,
      buyPct: pct(latest.buy, prevClose.buy),
      sell: latest.sell - prevClose.sell,
      sellPct: pct(latest.sell, prevClose.sell),
      k18: diff(latest.k18, prevClose.k18),
      k14: diff(latest.k14, prevClose.k14),
    }
  : null;

/** 최근 3거래일 회차 (최신 날짜·최신 회차가 앞) */
const recentDays = days.slice(-3).reverse();
const recentQuotes = recentDays.flatMap((d) =>
  withRound(byDay.get(d))
    .reverse()
    .map((q) => ({
      date: q.date,
      round: q.round,
      time: q.time,
      buy: q.buy,
      sell: q.sell,
      k18: q.k18 ?? null,
      k14: q.k14 ?? null,
      platinum: q.platinum ?? null,
      silver: q.silver ?? null,
    }))
);

const metal = (key) => ({
  buy: latestQ[key]?.buy ?? null,
  sell: latestQ[key]?.sell ?? null,
  prevBuy: prevQ?.[key]?.buy ?? null,
  prevSell: prevQ?.[key]?.sell ?? null,
});

const retail = {
  source: "한국금거래소",
  sourceUrl: "https://www.koreagoldx.co.kr/price/gold",
  unit: "KRW/3.75g",
  vatIncludedBuy: true,
  note: "한국금거래소 고시. 살 때는 부가세 10% 포함, 하루 여러 차례 고시됩니다. 18K·14K 살 때는 제품 시세가 적용됩니다.",
  latest,
  prevClose,
  change,
  quotes: recentQuotes,
  platinum: metal("platinum"),
  silver: metal("silver"),
};

/* ── 2. 기준가 (국제 금값 × 환율) ── */
async function yahooLast(symbol) {
  const r = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`,
    { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) }
  );
  if (!r.ok) throw new Error(`${symbol} HTTP ${r.status}`);
  const j = await r.json();
  const meta = j?.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  if (!Number.isFinite(price)) throw new Error(`${symbol}: 가격 없음`);
  const t = meta?.regularMarketTime;
  return {
    price,
    asOf: Number.isFinite(t) ? new Date((t + 9 * 3600) * 1000).toISOString().replace("Z", "+09:00") : null,
  };
}

const priceJson = readJson(path.join(DIR, "price.json"));
let reference = null;
let intl = null;
if (!NO_YAHOO) {
  try {
    /* 현물(XAU/USD)은 Yahoo 에서 심볼이 사라졌다(404, 2026-09-09) — COMEX 금 선물 GC=F 로 계산한다.
     * 선물은 현물보다 조금 높아 KB 고시와 수천 원 차이가 날 수 있다. source 에 밝힌다. */
    const [gold, fx, silver] = await Promise.all([
      yahooLast("GC=F"),
      yahooLast("KRW=X"),
      yahooLast("SI=F").catch(() => null),
    ]);
    const basePerGram = (gold.price / OZ_TO_GRAM) * fx.price;
    reference = {
      xauUsd: round2(gold.price),
      usdKrw: round2(fx.price),
      asOf: [gold.asOf, fx.asOf].filter(Boolean).sort().at(-1) ?? kstNow(),
      basePerGram: round2(basePerGram),
      basePerDon: Math.round(basePerGram * GRAM_PER_DON),
      formula: "xauUsd / 31.1034768 * usdKrw * 3.75",
      source: "COMEX 금 선물(GC=F) × USD/KRW — Yahoo Finance",
    };
    if (silver) {
      const agPerGram = (silver.price / OZ_TO_GRAM) * fx.price;
      intl = {
        xagUsd: round2(silver.price),
        silverBasePerGram: round2(agPerGram),
        silverBasePerDon: Math.round(agPerGram * GRAM_PER_DON),
        source: "COMEX 은 선물(SI=F) × USD/KRW — Yahoo Finance",
      };
    }
    console.log(`기준가 OK — 금 $${reference.xauUsd} × ${reference.usdKrw} → 1돈 ${reference.basePerDon}`);
  } catch (e) {
    console.warn(`Yahoo 실패 — 기준가 생략: ${e.message}`);
  }
}
/* Yahoo 를 못 받았으면 price.json 의 국제 시세·환율로 대신 계산한다 (몇 시간 지연될 수 있다) */
if (!reference && priceJson?.intl?.gold?.usdPerOz && priceJson?.fx?.usdkrw) {
  const basePerGram = (priceJson.intl.gold.usdPerOz / OZ_TO_GRAM) * priceJson.fx.usdkrw;
  reference = {
    xauUsd: round2(priceJson.intl.gold.usdPerOz),
    usdKrw: round2(priceJson.fx.usdkrw),
    asOf: priceJson.updatedAt ?? kstNow(),
    basePerGram: round2(basePerGram),
    basePerDon: Math.round(basePerGram * GRAM_PER_DON),
    formula: "xauUsd / 31.1034768 * usdKrw * 3.75",
    source: "price.json 의 국제 금값·환율 (지연값)",
  };
}

/* ── 3. KRX 도매 (price.json) ── */
let wholesale = null;
if (priceJson?.krx?.latest?.krwPerGram) {
  const hist = Array.isArray(priceJson.krx.history) ? priceJson.krx.history : [];
  const byMonth = new Map();
  for (const p of hist) byMonth.set(p.date.slice(0, 7), p); // 월별 마지막 영업일
  const monthly = [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, p]) => ({ month, date: p.date, closePerGram: p.krwPerGram, closePerDon: p.krwPerDon }));
  wholesale = {
    source: "KRX 금시장",
    sourceUrl: priceJson.krx.sourceUrl ?? null,
    date: priceJson.krx.latest.date,
    closePerGram: priceJson.krx.latest.krwPerGram,
    closePerDon: priceJson.krx.latest.krwPerDon,
    change: priceJson.krx.latest.change ?? null,
    changePct: priceJson.krx.latest.changePct ?? null,
    note: "전 영업일 종가 (공공데이터포털, 1~2일 지연)",
    monthly,
  };
}

/* ── 4. 파생값 ── */
const spread = latest.buy - latest.sell;
const derived = {
  spread,
  spreadPct: round2((spread / latest.buy) * 100),
  breakdown: reference
    ? {
        gold: reference.basePerDon,
        craft: Math.round(latest.buy / 1.1 - reference.basePerDon),
        vat: Math.round(latest.buy - latest.buy / 1.1),
      }
    : null,
  sellVsBase: reference ? latest.sell - reference.basePerDon : null,
  k18Theory: Math.round(latest.sell * 0.75),
  k18Gap: latest.k18 != null ? latest.k18 - Math.round(latest.sell * 0.75) : null,
  k14Theory: Math.round(latest.sell * 0.585),
  k14Gap: latest.k14 != null ? latest.k14 - Math.round(latest.sell * 0.585) : null,
};

/* ── 5. 일별 이력 (그날 마지막 고시) ── */
const daily = days.map((d) => {
  const q = byDay.get(d).at(-1);
  return { date: d, buy: q.buy, sell: q.sell, k18: q.k18 ?? null, k14: q.k14 ?? null, rounds: byDay.get(d).length };
});

const out = {
  updatedAt: kstNow(),
  date: latestDay,
  retail,
  reference,
  intl,
  wholesale,
  derived,
  history: { daily, days: daily.length, from: daily[0]?.date ?? null },
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(
  `쓰기 완료: ${OUT} — ${latestDay} ${latest.round}차 살 ${latest.buy.toLocaleString("ko-KR")} / 팔 ${latest.sell.toLocaleString("ko-KR")}` +
    (change ? ` (전일 ${prevClose.date} 대비 ${change.buy > 0 ? "+" : ""}${change.buy} / ${change.sell > 0 ? "+" : ""}${change.sell})` : "") +
    ` · 이력 ${daily.length}일 · ${Math.round(fs.statSync(OUT).size / 1024)}KB`
);
