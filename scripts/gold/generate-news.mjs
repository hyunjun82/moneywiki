/**
 * 금시세 일일 기사 생성기 (v3, 2026-09-20)
 *
 * price-data 브랜치의 gold.json(한국금거래소 고시 + 1년 일별 이력) 과 price.json(KRX 도매·환율·국제·거시)
 * 을 읽어 src/data/gold-news/YYYY-MM-DD.json 을 쓴다. 화면은 NewsView.tsx 가 그린다.
 *
 * 경쟁 언론사 기사(더페어·국제뉴스 등)는 "오늘 고시 숫자 + 국제 시세 + 달러·금리 한 문단"까지다.
 * 이 글은 거기에 없는 것을 넣는다:
 *  - 1년 일별 이력에서 계산한 위치: 30일·1년 최고/최저, n일 만에 최고/최저, 연속 상승/하락, 1주·1달·1년 변동
 *  - 그래프 데이터(series) — 화면이 30일·1년 선을 그린다
 *  - "왜 움직였나"를 데이터로: 국제 금값·환율·달러인덱스·미 10년물·유가의 실제 등락과 이론값 대 실제 고시
 *  - 실전 숫자: 사자마자 팔면 손해액, 본전까지 필요한 상승률, 18K·14K 매입가와 이론값 차이
 *  - 제목이 날마다 달라진다: 그날 가장 두드러진 사실 하나(예: "3주 만에 최저")를 제목에 넣는다
 *
 * 원칙:
 *  - 모든 숫자는 gold.json·price.json 에서만 온다. 값이 없는 문장·절은 통째로 뺀다.
 *  - 등락의 "이유"는 단정하지 않는다. 지표의 실제 움직임과 일반적으로 알려진 방향(달러 강세면 금값 부담 등)만 쓴다.
 *  - 살 때 값은 부가세 포함(retail.vatIncludedBuy). 옛 규격이 오면 여기서 ×1.1 한다.
 *  - --require-today: 고시일이 오늘이 아니면 발행하지 않고 exit 3.
 *  - 기존 기사가 있으면 고시일이 바뀌었을 때만 다시 쓴다(publishedAt 유지). --force 면 무조건 다시 쓴다.
 *
 * 사용법: node scripts/gold/generate-news.mjs [출력 디렉토리] [--force] [--require-today] [--date YYYY-MM-DD] [--price <경로|URL>] [--gold <경로|URL>]
 */

import fs from "node:fs";
import path from "node:path";
import { applyModelAnalysis } from "./lib/news-analysis.mjs";

const PRICE_URL = "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/price.json";
const GOLD_URL = "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/gold.json";

/* ── 인자 ── */
const argv = process.argv.slice(2);
const VALUE_FLAGS = new Set(["--price", "--gold", "--date", "--model"]);
const valueOf = (flag) => {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : null;
};
const PRICE_SRC = valueOf("--price") ?? PRICE_URL;
const GOLD_SRC = valueOf("--gold") ?? GOLD_URL;
const OUT_DIR =
  argv.find((a, i) => !a.startsWith("--") && !(i > 0 && VALUE_FLAGS.has(argv[i - 1]))) || "src/data/gold-news";
const FORCE = argv.includes("--force");
const REQUIRE_TODAY = argv.includes("--require-today");
/*
  해석 문단(리드·왜 움직였나·어떻게 읽나)은 모델이 쓴다(lib/news-analysis.mjs, 구독 claude -p, 기본 opus).
  숫자는 여기서 고른 것만 허용하고 어긋나면 조립 문장으로 낸다. --no-model 이면 처음부터 조립 문장.
*/
const NO_MODEL = argv.includes("--no-model");
const MODEL = valueOf("--model") ?? process.env.GOLD_NEWS_MODEL ?? "opus";
const GRAM_PER_DON = 3.75;

/* ── 유틸 ── */
const won = (n) => Math.round(n).toLocaleString("ko-KR");
const kstNow = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00");
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const korDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : "";
};
const shiftDate = (iso, days) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
const daysBetween = (a, b) => Math.round((new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`)) / 86400000);
const pct1 = (now, before) => (before ? Math.round(((now - before) / before) * 1000) / 10 : null);
const signed = (n, unit = "") => (n > 0 ? `+${won(n)}${unit}` : n < 0 ? `-${won(Math.abs(n))}${unit}` : `0${unit}`);
const signedPct = (p) => (p > 0 ? `+${p}%` : `${p}%`);
const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);

/* --date YYYY-MM-DD: 그 날짜 기사로 쓴다(재생성·검증용). 평소엔 오늘. */
const today = /^\d{4}-\d{2}-\d{2}$/.test(valueOf("--date") ?? "") ? valueOf("--date") : kstDate();
const outPath = path.join(OUT_DIR, `${today}.json`);

/* ── 기존 기사 (정정용) ── */
let existing = null;
if (fs.existsSync(outPath)) {
  try {
    existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch {
    existing = null;
  }
}
const existingQuoteDate = existing?.quoteDate ?? null;

/* ── 자료 읽기 ── */
const loadJson = async (src, label) => {
  if (/^https?:/.test(src)) {
    const res = await fetch(src, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`${label} HTTP ${res.status}`);
    return res.json();
  }
  console.log(`--${label.replace(".json", "")}: 로컬 파일 사용 ${src}`);
  return JSON.parse(fs.readFileSync(src, "utf8"));
};
const data = await loadJson(PRICE_SRC, "price.json");
let gold = null;
try {
  gold = await loadJson(GOLD_SRC, "gold.json");
  if (!gold?.retail?.latest?.buy || !gold.retail.latest.sell) throw new Error("순금 값 없음");
} catch (e) {
  console.warn(`gold.json 을 쓰지 못함(${e.message}) — price.json 의 소매 값으로 대신 씁니다`);
  gold = null;
}

/* ── 소매 숫자를 한 모양으로 ── */
const toQuote = (price, change) => {
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) return null;
  const c = typeof change === "number" && Number.isFinite(change) ? change : 0;
  return { price, change: Math.abs(c), dir: c > 0 ? "up" : c < 0 ? "down" : "none" };
};
const retailSrc = gold
  ? (() => {
      const r = gold.retail;
      const l = r.latest;
      const c = r.change ?? {};
      const mchg = (now, prev) => (now != null && prev != null ? now - prev : 0);
      return {
        source: r.source ?? "한국금거래소",
        sourceUrl: r.sourceUrl ?? "https://www.koreagoldx.co.kr/price/gold",
        quoteDate: l.date,
        round: l.round,
        time: l.time ?? null,
        vatIncludedBuy: true,
        note: r.note ?? "한국금거래소 고시. 살 때는 부가세 10% 포함, 하루 여러 차례 고시됩니다.",
        items: [
          { key: "gold24", name: "순금 24K", userSell: toQuote(l.sell, c.sell), userBuy: toQuote(l.buy, c.buy) },
          { key: "gold18", name: "18K", userSell: toQuote(l.k18, c.k18), userBuy: null },
          { key: "gold14", name: "14K", userSell: toQuote(l.k14, c.k14), userBuy: null },
          {
            key: "platinum",
            name: "백금",
            userSell: toQuote(r.platinum?.sell, mchg(r.platinum?.sell, r.platinum?.prevSell)),
            userBuy: toQuote(r.platinum?.buy, mchg(r.platinum?.buy, r.platinum?.prevBuy)),
          },
          {
            key: "silver",
            name: "은",
            userSell: toQuote(r.silver?.sell, mchg(r.silver?.sell, r.silver?.prevSell)),
            userBuy: toQuote(r.silver?.buy, mchg(r.silver?.buy, r.silver?.prevBuy)),
          },
        ].filter((it) => it.userSell || it.userBuy),
      };
    })()
  : {
      source: data.retail?.source ?? "종로금거래소",
      sourceUrl: data.retail?.sourceUrl ?? "http://www.jongrogx.com/",
      quoteDate: data.retail?.quoteDate ?? null,
      round: null,
      time: null,
      vatIncludedBuy: data.retail?.vatIncludedBuy === true,
      note: data.retail?.note ?? "",
      items: Array.isArray(data.retail?.items) ? data.retail.items : [],
    };

const incomingQuoteDate = retailSrc.quoteDate ?? null;

if (REQUIRE_TODAY && incomingQuoteDate !== today) {
  console.log(`당일 고시 아직 없음 — 고시일 ${incomingQuoteDate ?? "없음"} ≠ 오늘 ${today}. 발행하지 않음 (exit 3)`);
  process.exit(3);
}

if (FORCE) console.log("--force: 기존 기사가 있어도 다시 생성합니다");
if (existingQuoteDate !== null && !FORCE) {
  if (incomingQuoteDate && incomingQuoteDate !== existingQuoteDate) {
    console.log(`기사 정정: 고시일 ${existingQuoteDate} → ${incomingQuoteDate} — 같은 날짜 기사를 새 숫자로 다시 씁니다`);
  } else {
    console.log(`이미 존재하고 고시일(${existingQuoteDate}) 변동 없음 — 생성 생략`);
    process.exit(0);
  }
}

const items = retailSrc.items;
const find = (k) => items.find((it) => it.key === k);
const g24 = find("gold24");
const buyRaw = g24?.userBuy;
const sell = g24?.userSell;
if (!buyRaw?.price || !sell?.price) throw new Error("순금 24K 살 때/팔 때 값이 없음 — 기사 생성 중단");

/* ── 살 때: 부가세 포함으로 통일 ── */
const VAT_INCL = retailSrc.vatIncludedBuy === true;
const inclOf = (q) => (VAT_INCL ? q.price : Math.round(q.price * 1.1));
const buy = {
  price: inclOf(buyRaw),
  change: VAT_INCL ? buyRaw.change : Math.round(buyRaw.change * 1.1),
  dir: buyRaw.dir,
};
const buyIncl = buy.price;
const buyEx = VAT_INCL ? (buyRaw.priceExVat ?? Math.round(buyRaw.price / 1.1)) : buyRaw.price;
const vatWon = buyIncl - buyEx;

const quoteDate = retailSrc.quoteDate ?? today;
const kd = korDate(today);
const quoteKd = korDate(quoteDate) || kd;
const quoteLabel = `${retailSrc.source} ${quoteKd}${retailSrc.round ? ` ${retailSrc.round}차` : ""} 고시`;

/* 전일가 = 하락이면 price + change, 상승이면 price - change */
const prevOf = (q) => (q.dir === "down" ? q.price + q.change : q.price - q.change);
const pctOf = (q) => {
  const p = prevOf(q);
  return q.change && p > 0 ? Math.round((q.change / p) * 10000) / 100 : 0;
};
const signedChange = (q) => (q.dir === "down" ? -q.change : q.change);
const moveWord = (q) =>
  q.change === 0 || q.dir === "none" ? "변동이 없다" : `${won(q.change)}원(${pctOf(q)}%) ${q.dir === "up" ? "올랐다" : "내렸다"}`;
/** 연결형: "…올랐고" */
const moveMid = (q) =>
  q.change === 0 || q.dir === "none" ? "변동이 없고" : `${won(q.change)}원(${pctOf(q)}%) ${q.dir === "up" ? "올랐고" : "내렸고"}`;
const korDateY = (iso) => (iso && iso.slice(0, 4) !== quoteDate.slice(0, 4) ? `${iso.slice(0, 4)}년 ${korDate(iso)}` : korDate(iso));
const moveShort = (q) => (q.change === 0 || q.dir === "none" ? "보합" : `${q.dir === "up" ? "▲" : "▼"} ${won(q.change)}원`);

const realGap = buyIncl - sell.price; // 소비자가 체감하는 간격 (부가세 포함 살 때 − 팔 때)
const realGapPct = Math.round((realGap / buyIncl) * 1000) / 10;
const breakevenPct = Math.round((realGap / sell.price) * 1000) / 10; // 팔 때가 여기까지 올라야 본전
const gapEx = buyEx - sell.price;
const gapExPct = Math.round((gapEx / buyEx) * 1000) / 10;
const buyPerGram = buyIncl / GRAM_PER_DON;
const sellPerGram = sell.price / GRAM_PER_DON;

const k18 = find("gold18")?.userSell ?? null;
const k14 = find("gold14")?.userSell ?? null;
const pt = find("platinum");
const ag = find("silver");

/* ══════════════════════════════════════════════════════════════
 * 1년 이력 통계 — gold.json history.daily (그날 마지막 고시)
 * ══════════════════════════════════════════════════════════════ */
const dailyAll = Array.isArray(gold?.history?.daily)
  ? gold.history.daily.filter((d) => d?.date && num(d.buy) && num(d.sell)).sort((a, b) => a.date.localeCompare(b.date))
  : [];
/* 오늘 고시가 이력 마지막과 다르면(장중 정정) 마지막 점을 오늘 값으로 맞춘다 */
if (dailyAll.length && dailyAll[dailyAll.length - 1].date === quoteDate) {
  dailyAll[dailyAll.length - 1] = { ...dailyAll[dailyAll.length - 1], buy: buyIncl, sell: sell.price };
}

function computeStats() {
  if (dailyAll.length < 5) return null;
  const last = dailyAll[dailyAll.length - 1];
  const from30 = shiftDate(quoteDate, -30);
  const from365 = shiftDate(quoteDate, -365);
  const win30 = dailyAll.filter((d) => d.date >= from30);
  const win1y = dailyAll.filter((d) => d.date >= from365);
  const ext = (arr, key, fn) =>
    arr.reduce((best, d) => (best == null || fn(d[key], best[key]) ? d : best), null);
  const hi30 = ext(win30, "buy", (a, b) => a > b);
  const lo30 = ext(win30, "buy", (a, b) => a < b);
  const hi1y = ext(win1y, "buy", (a, b) => a > b);
  const lo1y = ext(win1y, "buy", (a, b) => a < b);
  const hi30s = ext(win30, "sell", (a, b) => a > b);
  const lo30s = ext(win30, "sell", (a, b) => a < b);

  /* 기준 시점 값: 그 날짜 이하의 마지막 고시 */
  const at = (iso) => {
    let r = null;
    for (const d of dailyAll) if (d.date <= iso) r = d;
    return r;
  };
  const w1 = at(shiftDate(quoteDate, -7));
  const m1 = at(shiftDate(quoteDate, -30));
  const y1 = at(shiftDate(quoteDate, -365));
  const ytdBase = at(`${quoteDate.slice(0, 4) - 1}-12-31`);
  const covered = daysBetween(dailyAll[0].date, quoteDate);

  /* 연속 상승/하락 일수 (살 때 기준, 그날 마지막 고시끼리) */
  let streakDir = "none";
  let streak = 0;
  for (let i = dailyAll.length - 1; i >= 1; i--) {
    const diff = dailyAll[i].buy - dailyAll[i - 1].buy;
    const dir = diff > 0 ? "up" : diff < 0 ? "down" : "none";
    if (dir === "none") break;
    if (streakDir === "none") streakDir = dir;
    if (dir !== streakDir) break;
    streak++;
  }

  /* n일 만에 최고/최저: 오늘 값 이상(이하)이었던 마지막 날까지의 일수 */
  const sinceHigher = (() => {
    for (let i = dailyAll.length - 2; i >= 0; i--) if (dailyAll[i].buy >= last.buy) return daysBetween(dailyAll[i].date, quoteDate);
    return covered;
  })();
  const sinceLower = (() => {
    for (let i = dailyAll.length - 2; i >= 0; i--) if (dailyAll[i].buy <= last.buy) return daysBetween(dailyAll[i].date, quoteDate);
    return covered;
  })();

  const range30 = hi30.buy - lo30.buy;
  const pos30 = range30 > 0 ? Math.round(((last.buy - lo30.buy) / range30) * 100) : 50;

  return {
    covered,
    hi30: { date: hi30.date, buy: hi30.buy },
    lo30: { date: lo30.date, buy: lo30.buy },
    hi30Sell: { date: hi30s.date, sell: hi30s.sell },
    lo30Sell: { date: lo30s.date, sell: lo30s.sell },
    hi1y: { date: hi1y.date, buy: hi1y.buy },
    lo1y: { date: lo1y.date, buy: lo1y.buy },
    pos30,
    chg1w: w1 ? { won: last.buy - w1.buy, pct: pct1(last.buy, w1.buy), from: w1.date } : null,
    chg1m: m1 ? { won: last.buy - m1.buy, pct: pct1(last.buy, m1.buy), from: m1.date } : null,
    chg1y: y1 && covered >= 360 ? { won: last.buy - y1.buy, pct: pct1(last.buy, y1.buy), from: y1.date } : null,
    chgYtd: ytdBase ? { won: last.buy - ytdBase.buy, pct: pct1(last.buy, ytdBase.buy), from: ytdBase.date } : null,
    streak: { dir: streakDir, days: streak },
    sinceHigher,
    sinceLower,
    isHi1y: covered >= 300 && last.buy >= hi1y.buy,
    isLo1y: covered >= 300 && last.buy <= lo1y.buy,
    isHi30: last.buy >= hi30.buy,
    isLo30: last.buy <= lo30.buy,
  };
}
const stats = computeStats();

/* 오늘 회차별 고시 (장중 흐름) */
const todayRounds = Array.isArray(gold?.retail?.quotes)
  ? gold.retail.quotes.filter((q) => q.date === quoteDate).sort((a, b) => a.round - b.round)
  : [];
const intraday =
  todayRounds.length >= 1
    ? {
        rounds: todayRounds.length,
        first: { round: todayRounds[0].round, time: todayRounds[0].time, buy: todayRounds[0].buy, sell: todayRounds[0].sell },
        last: {
          round: todayRounds[todayRounds.length - 1].round,
          time: todayRounds[todayRounds.length - 1].time,
          buy: todayRounds[todayRounds.length - 1].buy,
          sell: todayRounds[todayRounds.length - 1].sell,
        },
      }
    : null;

/* ── 제목에 넣을 "오늘의 한 가지 사실" ── */
const spanWord = (days) => (days >= 360 ? "1년" : days >= 180 ? "6개월" : days >= 90 ? "3개월" : days >= 60 ? "두 달" : days >= 28 ? "한 달" : days >= 21 ? "3주" : days >= 14 ? "2주" : `${days}일`);
function headline() {
  if (stats) {
    if (stats.isHi1y) return { short: "1년 최고", sentence: `살 때 기준으로 최근 1년 사이 가장 높은 값이다.` };
    if (stats.isLo1y) return { short: "1년 최저", sentence: `살 때 기준으로 최근 1년 사이 가장 낮은 값이다.` };
    if (stats.sinceHigher >= 14 && buy.dir === "up") return { short: `${spanWord(stats.sinceHigher)} 만에 최고`, sentence: `이 값 이상이었던 날은 ${won(stats.sinceHigher)}일 전이 마지막이라 ${spanWord(stats.sinceHigher)} 만의 최고가다.` };
    if (stats.sinceLower >= 14 && buy.dir === "down") return { short: `${spanWord(stats.sinceLower)} 만에 최저`, sentence: `이 값 이하였던 날은 ${won(stats.sinceLower)}일 전이 마지막이라 ${spanWord(stats.sinceLower)} 만의 최저가다.` };
    if (stats.isHi30 && stats.hi30.date !== stats.lo30.date) return { short: "한 달 최고", sentence: `최근 30일 중 가장 높은 살 때 값이다.` };
    if (stats.isLo30 && stats.hi30.date !== stats.lo30.date) return { short: "한 달 최저", sentence: `최근 30일 중 가장 낮은 살 때 값이다.` };
    if (stats.streak.days >= 3) return { short: `${stats.streak.days}일 연속 ${stats.streak.dir === "up" ? "상승" : "하락"}`, sentence: `살 때 값이 ${stats.streak.days}거래일 연속 ${stats.streak.dir === "up" ? "올랐다" : "내렸다"}.` };
  }
  const p = pctOf(buy);
  if (buy.dir !== "none" && p >= 1) return { short: `하루 ${p}% ${buy.dir === "up" ? "급등" : "급락"}`, sentence: `하루 만에 ${p}% ${buy.dir === "up" ? "오른" : "내린"} 큰 폭의 움직임이다.` };
  if (buy.dir === "none" && sell.dir === "none") return { short: "전일과 같은 보합", sentence: `살 때·팔 때 모두 전일과 같은 보합이다.` };
  if (stats && stats.chg1w) return { short: `한 주 ${signedPct(stats.chg1w.pct)}`, sentence: `일주일 전(${korDate(stats.chg1w.from)})보다 ${signed(stats.chg1w.won, "원")}(${signedPct(stats.chg1w.pct)}) 움직였다.` };
  return { short: `전일 대비 ${moveShort(buy)}`, sentence: `전일 대비 살 때 ${moveWord(buy)}.` };
}
const hl = headline();

/* ══════════════════════════════════════════════════════════════
 * 배경 지표: 국제 금값 · 환율 · 달러 · 금리 · 유가
 * ══════════════════════════════════════════════════════════════ */
const fx = data.fx ?? null;
const ig = data.intl?.gold ?? null;
const macro = data.macro ?? null;
const dxy = macro?.dxy ?? null;
const us10 = macro?.us10y ?? null;
const wti = macro?.wti ?? null;
const krx = data.krx?.latest ?? null;

const upDown = (dir, up = "올랐다", down = "내렸다", flat = "변동이 없다") => (dir === "up" ? up : dir === "down" ? down : flat);
const fxChangeWon = fx ? Math.abs(num(fx.change) ?? 0) : 0;
const fxPctAbs = fx ? Math.abs(num(fx.changePct) ?? 0) : 0;
const igPctAbs = ig ? Math.abs(num(ig.changePct) ?? 0) : 0;
/* 국제 금값 × 환율 이론 변동률 */
const theoryPct = ig && fx ? Math.round(((1 + (num(ig.changePct) ?? 0) / 100) * (1 + (num(fx.changePct) ?? 0) / 100) - 1) * 100 * 100) / 100 : null;
const actualPct = buy.dir === "down" ? -pctOf(buy) : pctOf(buy);

/* ══════════════════════════════════════════════════════════════
 * 본문
 * ══════════════════════════════════════════════════════════════ */

/* 리드: 오늘 값 → 위치 → 배경, 세 문장 */
const leadParts = [];
leadParts.push(
  `${quoteKd} 순금(24K) 한 돈은 살 때 ${won(buyIncl)}원(부가세 포함), 팔 때 ${won(sell.price)}원이다. 전일 대비 살 때는 ${moveMid(buy)} 팔 때는 ${moveWord(sell)}.`
);
if (stats) {
  const posWord = stats.pos30 >= 80 ? "위쪽 끝" : stats.pos30 >= 60 ? "위쪽" : stats.pos30 >= 40 ? "중간" : stats.pos30 >= 20 ? "아래쪽" : "아래쪽 끝";
  leadParts.push(
    `${hl.sentence} 최근 30일 살 때 값은 ${won(stats.lo30.buy)}원(${korDate(stats.lo30.date)})에서 ${won(stats.hi30.buy)}원(${korDate(stats.hi30.date)}) 사이였고, 오늘은 그 범위의 ${posWord}(${stats.pos30}%)에 있다.`
  );
} else {
  leadParts.push(hl.sentence);
}
if (ig && fx) {
  let s = `밤사이 국제 금값은 ${igPctAbs}% ${upDown(ig.dir, "올랐고", "내렸고", "변동이 없었고")} 원/달러 환율은 ${fxChangeWon.toFixed(2)}원 ${upDown(fx.dir)}`;
  const extra = [];
  if (dxy) extra.push(`달러인덱스 ${signedPct(num(dxy.changePct) ?? 0)}`);
  if (us10) extra.push(`미 10년물 금리 ${(num(us10.price) ?? 0).toFixed(2)}%`); // 5 → "5.00%" (2026-09-21 기사에 "5%"로 나갔다)
  s += extra.length ? `(${extra.join(", ")}).` : ".";
  leadParts.push(s);
}
const lead = leadParts.join(" ");

const sections = [];

/* 1. 오늘 고시 */
{
  const ps = [];
  let p1 = `${quoteLabel}${retailSrc.time ? `(${retailSrc.time.slice(0, 5)})` : ""} 기준 순금 1돈(3.75g)은 살 때 ${won(buyIncl)}원, 팔 때 ${won(sell.price)}원이다.`;
  if (intraday && intraday.rounds >= 2) {
    const d = intraday.last.buy - intraday.first.buy;
    p1 += ` 오늘은 ${intraday.rounds}차례 고시됐고, 1차(${intraday.first.time.slice(0, 5)}) 살 때 ${won(intraday.first.buy)}원에서 ${intraday.last.round}차 ${won(intraday.last.buy)}원으로 장중 ${d === 0 ? "변동이 없었다" : `${won(Math.abs(d))}원 ${d > 0 ? "올랐다" : "내렸다"}`}.`;
  } else if (intraday && intraday.rounds === 1) {
    p1 += ` 오늘 첫 고시이며, 국제 시세와 환율에 따라 오후에 다시 고시될 수 있다.`;
  }
  ps.push(p1);
  ps.push(
    `살 때 ${won(buyIncl)}원에는 부가가치세 10%(${won(vatWon)}원)가 들어 있다. 부가세를 뺀 고시가는 ${won(buyEx)}원이다. 다른 사이트 숫자와 다르면 대개 부가세 포함 여부 차이다. 그램으로는 살 때 ${won(buyPerGram)}원, 팔 때 ${won(sellPerGram)}원이라 소량 거래는 그램으로 따지는 편이 정확하다.`
  );
  if (k18 || k14) {
    const parts = [];
    if (k18) parts.push(`18K ${won(k18.price)}원(${moveShort(k18)})`);
    if (k14) parts.push(`14K ${won(k14.price)}원(${moveShort(k14)})`);
    let p3 = `장롱 속 반지·목걸이를 판다면 순금이 아니라 제품 금 매입가가 기준이다. 오늘 1돈 매입가는 ${parts.join(", ")}이다.`;
    const der = gold?.derived;
    if (der && num(der.k18Gap) != null && num(der.k18Theory) != null) {
      p3 += ` 18K는 금 함량 75%라 순금 매입가의 75%면 ${won(der.k18Theory)}원인데, 실제 고시는 그보다 ${won(Math.abs(der.k18Gap))}원 ${der.k18Gap >= 0 ? "높다" : "낮다"}.`;
      if (num(der.k14Gap) != null && num(der.k14Theory) != null) p3 += ` 14K(58.5%)는 이론값 ${won(der.k14Theory)}원 대비 ${won(Math.abs(der.k14Gap))}원 ${der.k14Gap >= 0 ? "높다" : "낮다"}.`;
    }
    ps.push(p3);
  }
  sections.push({
    heading: `살 때 ${won(buyIncl)}원 · 팔 때 ${won(sell.price)}원 — ${quoteKd} 고시${intraday?.rounds ? ` ${intraday.rounds}차까지` : ""}`,
    paragraphs: ps,
  });
}

/* 2. 이력 속 위치 */
if (stats) {
  const ps = [];
  ps.push(
    `최근 30일 살 때 최고는 ${korDate(stats.hi30.date)} ${won(stats.hi30.buy)}원, 최저는 ${korDate(stats.lo30.date)} ${won(stats.lo30.buy)}원이다. 오늘 ${won(buyIncl)}원은 ${buyIncl >= stats.hi30.buy ? "그 최고가와 같다" : buyIncl <= stats.lo30.buy ? `최고보다 ${won(stats.hi30.buy - buyIncl)}원 낮은 최저가다` : `최고보다 ${won(stats.hi30.buy - buyIncl)}원 낮고 최저보다 ${won(buyIncl - stats.lo30.buy)}원 높다`}. 팔 때는 같은 기간 ${won(stats.lo30Sell.sell)}~${won(stats.hi30Sell.sell)}원 사이를 오갔다.`
  );
  const chg = [];
  if (stats.chg1w) chg.push(`1주일 전보다 ${signed(stats.chg1w.won, "원")}(${signedPct(stats.chg1w.pct)})`);
  if (stats.chg1m) chg.push(`한 달 전보다 ${signed(stats.chg1m.won, "원")}(${signedPct(stats.chg1m.pct)})`);
  if (stats.chgYtd) chg.push(`올해 초보다 ${signed(stats.chgYtd.won, "원")}(${signedPct(stats.chgYtd.pct)})`);
  if (stats.chg1y) chg.push(`1년 전보다 ${signed(stats.chg1y.won, "원")}(${signedPct(stats.chg1y.pct)})`);
  if (chg.length) ps.push(`기간별로 보면 ${chg.join(", ")} 움직였다.`);
  let p3 = "";
  if (stats.covered >= 300) p3 += `최근 1년 최고는 ${korDateY(stats.hi1y.date)} ${won(stats.hi1y.buy)}원, 최저는 ${korDateY(stats.lo1y.date)} ${won(stats.lo1y.buy)}원이다. 오늘은 1년 최고보다 ${Math.abs(pct1(buyIncl, stats.hi1y.buy))}% 낮고 1년 최저보다 ${pct1(buyIncl, stats.lo1y.buy)}% 높다. `;
  if (stats.streak.days >= 2) p3 += `살 때 값은 ${stats.streak.days}거래일 연속 ${stats.streak.dir === "up" ? "오르는" : "내리는"} 중이다. `;
  else if (stats.streak.days === 1) p3 += `어제까지의 흐름과 반대 방향으로 움직인 첫날이다. `;
  p3 += `위 그래프는 한국금거래소가 하루에 여러 번 내는 고시 중 그날 마지막 값을 이은 것이다.`;
  ps.push(p3.trim());
  sections.push({ heading: `최근 30일 ${won(stats.lo30.buy)}~${won(stats.hi30.buy)}원, 오늘은 ${hl.short}`, paragraphs: ps });
}

/* 3. 왜 움직였나 — 데이터로 */
if (ig && fx) {
  const ps = [];
  ps.push(
    `국내 금값은 국제 금값(달러/온스)에 원/달러 환율을 곱해 정해진다. 오늘 국제 금값은 온스당 ${won(ig.usdPerOz)}달러로 전일 종가보다 ${igPctAbs}% ${upDown(ig.dir, "올랐고", "내렸고", "변동이 없고")} 환율은 ${fx.usdkrw?.toLocaleString("ko-KR")}원으로 ${fxChangeWon.toFixed(2)}원(${fxPctAbs}%) ${upDown(fx.dir)}. 두 변동을 곱한 이론상 원화 금값 변동은 ${theoryPct == null ? "계산 불가" : signedPct(theoryPct)}이고, 실제 국내 살 때 고시는 ${signedPct(actualPct)}였다.` +
      (theoryPct != null && Math.abs(theoryPct - actualPct) >= 0.3
        ? ` 차이가 ${Math.abs(Math.round((actualPct - theoryPct) * 100) / 100)}%p 나는 것은 국제 시세가 24시간 움직이는 데 비해 국내 고시는 하루 몇 차례만 정해지고, 국내 실물 수급도 함께 반영되기 때문이다.`
        : ` 국제 시세와 환율의 움직임이 국내 고시에 거의 그대로 반영된 날이다.`)
  );
  if (ig.krwPerDon) ps.push(`국제 금값을 환율로 환산하면 한 돈 ${won(ig.krwPerDon)}원이다. 국내 팔 때 ${won(sell.price)}원은 이보다 ${won(Math.abs(sell.price - ig.krwPerDon))}원 ${sell.price >= ig.krwPerDon ? "높고" : "낮고"}, 살 때 ${won(buyIncl)}원에는 부가세와 유통 마진이 얹혀 있다.`);
  /*
    "로/으로" 는 숫자를 읽은 소리의 받침이 정한다.
    끝자리 0·1·7·8(영·일·칠·팔)은 ㄹ받침이라 "로", 2·4·5·9(이·사·오·구)는 받침이 없어 "로",
    3·6(삼·육)만 "으로"다. 2026-09-21 기사에 "100.27으로"가 나갔다 — 하드코딩이 원인이었다.
  */
  const ro = (v) => {
    const d = String(v).replace(/[^0-9]/g, "").slice(-1);
    return "36".includes(d) ? "으로" : "로";
  };
  const mac = [];
  if (dxy) mac.push(`달러인덱스는 ${dxy.price}${ro(dxy.price)} 전일보다 ${Math.abs(num(dxy.changePct) ?? 0)}% ${upDown(dxy.dir)}`);
  if (us10) mac.push(`미 10년물 국채금리는 ${(num(us10.price) ?? 0).toFixed(2)}%로 ${Math.abs(num(us10.change) ?? 0).toFixed(2)}%p ${upDown(us10.dir)}`);
  if (wti) mac.push(`WTI 유가는 배럴당 ${wti.price}달러로 ${Math.abs(num(wti.changePct) ?? 0)}% ${upDown(wti.dir)}`);
  if (mac.length) {
    /* 각 조각이 "올랐다/내렸다"로 끝난다. 쉼표로 이으면 비문이 된다 (2026-09-21 기사에 그대로 나갔다). */
    let p = `달러와 금리도 금값을 좌우한다. ${mac.join(". ")}.`;
    const notes = [];
    if (dxy && dxy.dir !== "none") notes.push(`달러가 ${dxy.dir === "up" ? "강해지면" : "약해지면"} 달러로 값을 매기는 금은 다른 통화 보유자에게 ${dxy.dir === "up" ? "비싸져 수요가 줄고" : "싸져 수요가 늘어"} 금값에 ${dxy.dir === "up" ? "부담" : "힘"}이 되는 것이 일반적이다`);
    if (us10 && us10.dir !== "none") notes.push(`금은 이자가 없어 국채금리가 ${us10.dir === "up" ? "오르면" : "내리면"} 상대적 매력이 ${us10.dir === "up" ? "떨어지는" : "커지는"} 쪽으로 작용한다`);
    /*
      원래는 WTI 까지 나열해 놓고 "이런 지표들의 방향과 대체로 맞물린다"로 닫았는데,
      판정식은 달러인덱스·10년물 둘만 봤다. 판단에 들어가지도 않은 유가가 근거처럼 읽혔다.
      여기서는 금값이 왜 그 방향으로 눌리거나 밀리는지 기제만 적고, 오늘 등락의 원인은 단정하지 않는다.
    */
    if (notes.length) {
      const against = [];
      if (dxy && dxy.dir !== "none") against.push(dxy.dir === "up" ? "누르는" : "밀어 올리는");
      if (us10 && us10.dir !== "none") against.push(us10.dir === "up" ? "누르는" : "밀어 올리는");
      const same = against.length === 2 && against[0] === against[1];
      p += ` ${notes.join(". ")}.`;
      if (same) p += ` 오늘은 달러와 금리 모두 금값을 ${against[0]} 방향이었다.`;
      else if (against.length === 2) p += ` 오늘은 달러와 금리가 서로 반대 방향이었다.`;
    }
    ps.push(p);
  }
  if (krx?.krwPerGram) ps.push(`도매 시장인 한국거래소(KRX) 금시장은 ${korDate(krx.date)} 1g당 ${won(krx.krwPerGram)}원(한 돈 ${won(krx.krwPerDon)}원)에 마감했다. 전 거래일보다 ${won(Math.abs(krx.change ?? 0))}원(${Math.abs(krx.changePct ?? 0)}%) ${upDown(krx.change > 0 ? "up" : krx.change < 0 ? "down" : "none")}. 이 값은 하루 한 번 갱신되는 전 영업일 종가라 오늘 소매 고시보다 하루 이상 늦다.`);
  const headBits = [`국제 금값 ${signedPct(ig.dir === "down" ? -igPctAbs : igPctAbs)}`, `환율 ${signed(fx.dir === "down" ? -fxChangeWon : fxChangeWon, "원")}`];
  if (dxy) headBits.push(`달러 ${signedPct(num(dxy.changePct) ?? 0)}`);
  sections.push({ heading: `왜 움직였나 — ${headBits.join(", ")}`, paragraphs: ps });
}

/* 4. 실전 */
{
  const ps = [];
  ps.push(
    `오늘 사서 오늘 되판다고 가정하면 결제액 ${won(buyIncl)}원에 매입가 ${won(sell.price)}원이니 한 돈에 ${won(realGap)}원, ${realGapPct}%가 사라진다. 팔 때 값이 ${breakevenPct}% 올라야 본전이다. 부가세를 뺀 고시가끼리만 비교하면 차이가 ${won(gapEx)}원(${gapExPct}%)으로 보이지만, 살 때는 부가세를 내고 팔 때는 돌려받지 못하므로 실제 간격은 ${realGapPct}%다.`
  );
  if (stats?.chg1m) {
    const need = breakevenPct;
    const got = stats.chg1m.pct;
    ps.push(`참고로 지난 한 달 살 때 값은 ${signedPct(got)} 움직였다. 한 달 전에 사서 오늘 판 사람은 ${got >= need ? "간격을 넘어 이익 구간" : "아직 간격(" + need + "%)을 못 넘은 손실 구간"}이다. 실물 금은 시세 차익보다 간격을 먼저 계산해야 하는 이유다.`);
  }
  let p3 = `내 금이 얼마인지는 중량과 순도가 정한다. 1g은 팔 때 ${won(sellPerGram)}원, 반 돈(1.875g)은 ${won(sell.price / 2)}원이다.`;
  if (k18) p3 += ` 18K 반지 한 돈이면 ${won(k18.price)}원, 순금 대비 ${Math.round((k18.price / sell.price) * 1000) / 10}% 수준이다.`;
  p3 += ` 아래 금 계산기에 무게와 순도를 넣으면 오늘 고시가로 바로 환산된다.`;
  ps.push(p3);
  sections.push({ heading: `사자마자 팔면 ${won(realGap)}원(${realGapPct}%) 손해 — 본전까지 ${breakevenPct}%`, paragraphs: ps });
}

/* FAQ (화면 하단 · 검색 스니펫용) */
const faq = [
  { q: `${quoteKd} 금 한 돈 가격은 얼마인가요?`, a: `한국금거래소 고시 기준 순금 24K 한 돈(3.75g)은 살 때 ${won(buyIncl)}원(부가세 포함), 팔 때 ${won(sell.price)}원입니다. 18K는 팔 때 ${k18 ? won(k18.price) + "원" : "매장 문의"}, 14K는 ${k14 ? won(k14.price) + "원" : "매장 문의"}입니다.` },
  { q: "살 때와 팔 때 가격이 왜 이렇게 차이 나나요?", a: `살 때 값에는 부가가치세 10%(${won(vatWon)}원)와 유통 마진이 들어가고, 팔 때는 부가세를 돌려받지 못합니다. 오늘 기준 한 돈 간격은 ${won(realGap)}원(${realGapPct}%)이며, 팔 때 값이 ${breakevenPct}% 올라야 본전입니다.` },
  { q: "금시세는 하루에 몇 번 바뀌나요?", a: `한국금거래소는 국제 금값과 환율에 따라 평일 오전 첫 고시 뒤 하루 몇 차례 다시 고시합니다. ${intraday?.rounds ? `${quoteKd}은 ${intraday.rounds}차례 고시됐습니다. ` : ""}이 기사는 발행 시점 고시가 기준이며 상단 배지가 실시간 값입니다.` },
];

/* 그래프 데이터: 최근 1년 일별(그날 마지막 고시) — 화면이 30일·1년으로 잘라 그린다 */
const series = dailyAll.length
  ? dailyAll.filter((d) => d.date >= shiftDate(quoteDate, -370)).map((d) => ({ d: d.date, b: d.buy, s: d.sell }))
  : [];

/* 배경 지표 묶음 (화면 요인 줄) */
const drivers = [];
if (ig) drivers.push({ key: "intlGold", name: "국제 금값", value: `$${won(ig.usdPerOz)}`, unit: "/oz", changePct: num(ig.changePct), dir: ig.dir });
if (fx) drivers.push({ key: "usdkrw", name: "원/달러", value: `${fx.usdkrw?.toLocaleString("ko-KR")}원`, unit: "", change: num(fx.change), changePct: num(fx.changePct), dir: fx.dir });
if (dxy) drivers.push({ key: "dxy", name: "달러인덱스", value: `${dxy.price}`, unit: "", changePct: num(dxy.changePct), dir: dxy.dir });
if (us10) drivers.push({ key: "us10y", name: "미 10년물", value: `${(num(us10.price) ?? 0).toFixed(2)}%`, unit: "", change: num(us10.change), changePct: num(us10.changePct), dir: us10.dir });
if (wti) drivers.push({ key: "wti", name: "WTI 유가", value: `$${wti.price}`, unit: "", changePct: num(wti.changePct), dir: wti.dir });

/* ── 스냅샷 (화면 표) ── */
const retailSnapshot = items.length
  ? {
      source: retailSrc.source,
      sourceUrl: retailSrc.sourceUrl,
      quoteDate: retailSrc.quoteDate,
      round: retailSrc.round,
      unit: "원/돈",
      vatIncludedBuy: true,
      note: VAT_INCL ? retailSrc.note : "살 때 가격은 부가세 10%를 포함한 실제 결제 금액입니다(원문 고시가에 부가세를 더한 값).",
      items: items.map((it) =>
        it.userBuy && !VAT_INCL
          ? { ...it, userBuy: { price: inclOf(it.userBuy), change: Math.round(it.userBuy.change * 1.1), dir: it.userBuy.dir, priceExVat: it.userBuy.price, changeExVat: it.userBuy.change } }
          : it
      ),
    }
  : null;

const title = `오늘의 금시세(금값) ${kd} — 순금 한 돈 ${won(buyIncl)}원, ${hl.short}`;
const descBits = [`${kd} 순금 24K 한 돈 살 때 ${won(buyIncl)}원(부가세 포함)·팔 때 ${won(sell.price)}원, ${hl.short}.`];
if (stats) descBits.push(`30일 최저 ${won(stats.lo30.buy)}원~최고 ${won(stats.hi30.buy)}원.`);
if (ig && fx) descBits.push(`국제 금값 ${signedPct(ig.dir === "down" ? -igPctAbs : igPctAbs)}, 환율 ${signed(fx.dir === "down" ? -fxChangeWon : fxChangeWon, "원")}.`);
descBits.push(`사자마자 팔면 ${realGapPct}% 손해, 18K·14K 매입가와 금 계산기까지.`);

const doc = {
  v: 3,
  date: today,
  title,
  description: descBits.join(" "),
  publishedAt: existing?.publishedAt ?? kstNow(),
  updatedAt: gold?.updatedAt ?? data.updatedAt ?? null,
  quoteDate,
  headline: hl.short,
  retail: retailSnapshot,
  krx: krx ? { latest: krx, note: data.krx?.note ?? null } : null,
  fx: fx,
  intl: data.intl ?? null,
  macro: macro,
  stats,
  intraday,
  drivers,
  series,
  lead,
  sections,
  faq,
  paragraphs: [lead, ...sections.flatMap((s) => s.paragraphs)],
  sources: [
    `${retailSrc.source} 고시가 (${retailSrc.sourceUrl}) — 살 때는 부가세 포함, 1년 일별 이력은 그날 마지막 고시`,
    "한국거래소 KRX 금시장 — 금융위원회·공공데이터포털 (전 영업일 종가)",
    "국제 금값·환율·달러인덱스·미 10년물·WTI — Yahoo Finance (전일 종가 대비)",
  ],
};

if (!NO_MODEL) {
  const facts = {
    quoteKd, round: retailSrc.round, time: retailSrc.time, intraday, buyIncl, buyEx, vatWon, sell: sell.price, buy, sellQ: sell,
    buyPerGram, sellPerGram, k18, k14, derived: gold?.derived ?? null, stats, hl, ig, fx, dxy, us10, wti, krx,
    theoryPct, actualPct, realGap, realGapPct, breakevenPct, gapEx, gapExPct,
  };
  await applyModelAnalysis(doc, facts, { model: MODEL, won, signed, signedPct, korDate, korDateY, log: console.log, logDir: path.join(OUT_DIR, "..", "..", "..", "scripts", "reports", "logs", "gold-news") });
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n", "utf8");
console.log(`생성: ${outPath}\n  제목: ${title}\n  섹션 ${doc.sections.length}개 · 이력 ${series.length}일 · 요인 ${drivers.length}개 · 살 때 ${won(buyIncl)} / 팔 때 ${won(sell.price)}${doc.analysis ? ` · 해석 문단 ${doc.analysis.model}` : " · 조립 문장"}`);
