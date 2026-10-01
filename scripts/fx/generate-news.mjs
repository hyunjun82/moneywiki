/**
 * 환율 일일 기사 생성기 (v1, 2026-10-01)
 *
 * price-data 의 fx.json(시장환율·은행 공시·인천공항점, 수출입은행 고시가 있으면 그것)과 fx-history.json(1년 일별)을 읽어
 * src/data/fx-news/YYYY-MM-DD.json 을 쓴다. 화면은 src/components/fx/NewsView.tsx 가 그린다.
 *
 * 언론사 환율 기사는 "개장가·전일 대비·외국인 매매 한 문단"까지다. 이 글은 환전할 사람이 쓸 숫자를 넣는다:
 *  - 1년 일별 이력에서 계산한 위치: n일 만에 최고/최저, 연속 상승/하락, 1주·1달·1년 변동, 30일·1년 범위 속 위치
 *  - 오늘 바꾸면: 통화별 여행 금액을 우대 없는 창구·앱 최대 우대(1위 은행)·인천공항 창구에서 살 때 낼 원화, 어제 종가 대비 차이
 *  - 그래프 데이터(series) — 달러·엔화 1년 선
 *  - 제목이 날마다 달라진다: 달러·엔화 중 가장 두드러진 사실 하나
 *
 * 발행 시각: 매매기준율은 서울외국환중개가 영업일 9시 전에 고시하고, 수출입은행 Open API 가 11시 전후 같은 값을 낸다
 * (2026-10-01 실측, 메모리 project-fx-daily-timeline). PC 수집기가 11시대에 부른다(collect-kgx.ps1 Publish-FxNews).
 * 수출입은행 키가 없으면 시장 중간환율(Yahoo)로 쓰고 기사에 그렇게 밝힌다.
 *
 * 원칙:
 *  - 모든 숫자는 fx.json·fx-history.json 에서만 온다. 값이 없는 문장·절은 통째로 뺀다.
 *  - 전망·권유를 쓰지 않는다. 등락의 이유를 지어내지 않는다(이 데이터에는 원인이 없다).
 *  - 해석 문단(리드·어떻게 읽나)만 모델이 쓴다(lib/news-analysis.mjs, 구독 claude -p opus). 숫자가 사실 목록과 어긋나면 조립 문장으로 낸다.
 *  - --require-today: 데이터 날짜가 오늘(평일)이 아니면 발행하지 않고 exit 3.
 *  - 기존 기사가 있으면 그대로 두고 끝낸다. --force 면 다시 쓴다(publishedAt 유지).
 *
 * 사용법: node scripts/fx/generate-news.mjs [출력 디렉토리] [--fx <경로|URL>] [--history <경로|URL>] [--date YYYY-MM-DD]
 *         [--force] [--require-today] [--no-model] [--model opus]
 */

import fs from "node:fs";
import path from "node:path";
import { applyFxAnalysis } from "./lib/news-analysis.mjs";

const FX_URL = "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/fx.json";
const HIST_URL = "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/fx-history.json";

/* ── 인자 ── */
const argv = process.argv.slice(2);
const VALUE_FLAGS = new Set(["--fx", "--history", "--date", "--model"]);
const valueOf = (flag) => {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : null;
};
const OUT_DIR = argv.find((a, i) => !a.startsWith("--") && !(i > 0 && VALUE_FLAGS.has(argv[i - 1]))) || "src/data/fx-news";
const FORCE = argv.includes("--force");
const REQUIRE_TODAY = argv.includes("--require-today");
const NO_MODEL = argv.includes("--no-model");
const MODEL = valueOf("--model") ?? process.env.FX_NEWS_MODEL ?? "opus";

/* ── 유틸 ── */
const fmt = (n, d = 2) => Number(n).toLocaleString("ko-KR", { minimumFractionDigits: d, maximumFractionDigits: d });
const won = (n) => fmt(Math.round(n), 0);
const kstNow = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00");
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const korDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : "";
};
const korDateY = (iso) => (iso ? `${iso.slice(0, 4)}년 ${korDate(iso)}` : "");
const daysBetween = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
const pct2 = (p) => Math.abs(p).toFixed(2);
const upDown = (d) => (d > 0 ? "올랐다" : d < 0 ? "내렸다" : "같다");
const median = (xs) => {
  const s = xs.filter(Number.isFinite).sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const josa = (w, pair) => {
  const c = w.charCodeAt(w.length - 1);
  const fin = c >= 0xac00 && c <= 0xd7a3 ? (c - 0xac00) % 28 !== 0 : false;
  return w + (fin ? pair[0] : pair[1]);
};

async function load(src) {
  if (/^https?:/.test(src)) {
    const r = await fetch(`${src}?t=${Date.now()}`, { signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error(`${src} HTTP ${r.status}`);
    return r.json();
  }
  return JSON.parse(fs.readFileSync(src, "utf8"));
}

/* ── 데이터 ── */
const fx = await load(valueOf("--fx") ?? FX_URL);
const hist = await load(valueOf("--history") ?? HIST_URL);
const dataDate = (fx.updatedAt ?? "").slice(0, 10);
const today = /^\d{4}-\d{2}-\d{2}$/.test(valueOf("--date") ?? "") ? valueOf("--date") : kstDate();

if (REQUIRE_TODAY) {
  const dow = new Date(`${today}T00:00:00Z`).getUTCDay();
  if (dow === 0 || dow === 6) {
    console.log(`주말(${today}) — 환율 기사를 내지 않습니다`);
    process.exit(3);
  }
  if (dataDate !== today) {
    console.log(`fx.json 날짜 ${dataDate} ≠ 오늘 ${today} — 발행 보류`);
    process.exit(3);
  }
}

const outPath = path.join(OUT_DIR, `${today}.json`);
let existing = null;
if (fs.existsSync(outPath)) {
  try {
    existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch {}
  if (existing && !FORCE) {
    console.log(`이미 있음: ${outPath} — 그대로 둡니다(--force 로 다시 씀)`);
    process.exit(0);
  }
}

/** 통화: 기사에 넣는 6종 — 검색량 순(엔화·달러·유로·베트남·중국·태국) */
const MAJORS = [
  { code: "USD", name: "달러", kw: "달러 환율", slug: "usd", unitWord: "달러", sample: 1000, sampleLabel: "1,000달러" },
  { code: "JPY", name: "엔화", kw: "엔화 환율", slug: "jpy", unitWord: "엔", sample: 100000, sampleLabel: "10만 엔" },
  { code: "EUR", name: "유로", kw: "유로 환율", slug: "eur", unitWord: "유로", sample: 1000, sampleLabel: "1,000유로" },
  { code: "VND", name: "베트남 동", kw: "베트남 환율", slug: "vnd", unitWord: "동", sample: 10_000_000, sampleLabel: "1,000만 동" },
  { code: "CNY", name: "위안화", kw: "중국 환율", slug: "cny", unitWord: "위안", sample: 5000, sampleLabel: "5,000위안" },
  { code: "THB", name: "바트", kw: "태국 환율", slug: "thb", unitWord: "바트", sample: 20000, sampleLabel: "2만 바트" },
];

const official = fx.official?.items?.length && fx.official.quoteDate === today ? fx.official : null;
const basisLabel = official ? "매매기준율(한국수출입은행 고시)" : "시장 중간환율";
const basisWhen = official ? `${korDate(today)} 고시` : `${korDate(fx.updatedAt)} ${(fx.updatedAt ?? "").slice(11, 16)}`;

function baseOf(code) {
  const r = fx.rates?.find((x) => x.code === code);
  if (!r) return null;
  const o = official?.items?.find((x) => x.code === code);
  const rate = o?.dealBasR ? o.dealBasR * (r.unit / (o.unit || 1)) : r.rate;
  return { r, rate, unit: r.unit, perUnit: rate / r.unit, kind: o ? "official" : "mid" };
}

/**
 * 하루만 튄 점을 뺀다 — 앞뒤 이웃이 서로 1% 안인데 그 점만 2.5% 넘게 벗어난 경우(Yahoo 일별 종가 오류).
 * 2026-10-01 실측: 유로 2026-08-17 1,582원(앞뒤 1,634·1,638원), 페소 2026-03-16. 사이트 그래프(fxDerive.dropSpikes)와 같은 규칙.
 */
function dropSpikes(s) {
  return s.filter((p, i) => {
    if (i === 0 || i === s.length - 1) return true;
    const a = s[i - 1].rate, n = s[i + 1].rate, m = (a + n) / 2;
    return !(Math.abs(a - n) / m < 0.01 && Math.abs(p.rate - m) / m > 0.025);
  });
}

/** 시장환율 일별 시계열(오늘 값 포함) — 위치·연속·n일 만에 계산용 */
function seriesOf(code) {
  const r = fx.rates?.find((x) => x.code === code);
  const s = dropSpikes((hist.series?.[code] ?? []).filter((p) => Number.isFinite(p.rate) && p.date <= today));
  if (r && dataDate === today) {
    const i = s.findIndex((p) => p.date === today);
    if (i >= 0) s[i] = { date: today, rate: r.rate };
    else s.push({ date: today, rate: r.rate });
  }
  return s.sort((a, b) => a.date.localeCompare(b.date));
}

function statsOf(code) {
  const s = seriesOf(code);
  if (s.length < 5) return null;
  const last = s[s.length - 1];
  const covered = daysBetween(s[0].date, last.date);
  const back = (days) => {
    const target = Date.parse(`${last.date}T00:00:00Z`) - days * 86400000;
    let pick = null;
    for (const p of s) if (Date.parse(`${p.date}T00:00:00Z`) <= target) pick = p;
    return pick;
  };
  const chg = (days) => {
    const from = back(days);
    return from ? { from: from.date, rate: from.rate, diff: last.rate - from.rate, pct: ((last.rate - from.rate) / from.rate) * 100 } : null;
  };
  const range = (days) => {
    const since = Date.parse(`${last.date}T00:00:00Z`) - days * 86400000;
    const w = s.filter((p) => Date.parse(`${p.date}T00:00:00Z`) >= since);
    let lo = w[0], hi = w[0];
    for (const p of w) {
      if (p.rate < lo.rate) lo = p;
      if (p.rate > hi.rate) hi = p;
    }
    return { lo, hi, pos: hi.rate === lo.rate ? 50 : Math.round(((last.rate - lo.rate) / (hi.rate - lo.rate)) * 100) };
  };
  // 연속 상승·하락
  let streak = 0;
  let dir = 0;
  for (let i = s.length - 1; i > 0; i--) {
    const d = Math.sign(s[i].rate - s[i - 1].rate);
    if (!d) break;
    if (!dir) dir = d;
    if (d !== dir) break;
    streak++;
  }
  // n일 만에 최고/최저 — 오늘보다 높은(낮은) 값이 마지막으로 있었던 날
  let hiGap = null, loGap = null;
  for (let i = s.length - 2; i >= 0; i--) {
    if (hiGap === null && s[i].rate > last.rate) hiGap = daysBetween(s[i].date, last.date);
    if (loGap === null && s[i].rate < last.rate) loGap = daysBetween(s[i].date, last.date);
    if (hiGap !== null && loGap !== null) break;
  }
  return {
    last,
    covered,
    streak,
    streakDir: dir,
    hiGap, // null = 기간 안 최고
    loGap,
    chg1w: chg(7),
    chg1m: chg(30),
    chg1y: covered >= 330 ? chg(365) : null,
    r30: range(30),
    r1y: covered >= 330 ? range(366) : null,
  };
}

/** 그날 가장 두드러진 사실 하나 — {score, short, sentence} */
function factOf(m, st, b) {
  if (!st || !b) return null;
  const r = b.r;
  const yearly = st.covered >= 330;
  if (st.hiGap === null && yearly) return { score: 100, short: `${m.name} 최근 1년 최고`, sentence: `${m.name}는 최근 1년 일별 종가 가운데 가장 높다.` };
  if (st.loGap === null && yearly) return { score: 100, short: `${m.name} 최근 1년 최저`, sentence: `${m.name}는 최근 1년 일별 종가 가운데 가장 낮다.` };
  if (st.hiGap !== null && st.hiGap >= 14 && st.streakDir > 0) return { score: 40 + st.hiGap / 4, short: `${m.name} ${st.hiGap}일 만에 최고`, sentence: `${m.name}는 ${st.hiGap}일 만에 가장 높은 값이다.` };
  if (st.loGap !== null && st.loGap >= 14 && st.streakDir < 0) return { score: 40 + st.loGap / 4, short: `${m.name} ${st.loGap}일 만에 최저`, sentence: `${m.name}는 ${st.loGap}일 만에 가장 낮은 값이다.` };
  if (st.streak >= 3) return { score: 20 + st.streak * 3, short: `${m.name} ${st.streak}일 연속 ${st.streakDir > 0 ? "상승" : "하락"}`, sentence: `${m.name}는 ${st.streak}거래일 연속 ${st.streakDir > 0 ? "올랐다" : "내렸다"}.` };
  if (typeof r.change === "number" && r.change !== 0)
    return { score: Math.abs(r.changePct ?? 0), short: `${m.name} ${fmt(Math.abs(r.change))}원 ${r.change > 0 ? "상승" : "하락"}`, sentence: "" };
  return { score: 0, short: `${m.name} 보합`, sentence: "" };
}

/* ── 은행·공항 ── */
const bankRate = (perUnit, fee, pref, dir = "buy") => {
  const spread = perUnit * (fee / 100) * (1 - pref / 100);
  return dir === "buy" ? perUnit + spread : perUnit - spread;
};
function exchangeOf(m, b) {
  const banks = (fx.banks?.byCurrency?.[m.code] ?? []).filter((x) => Number.isFinite(x.feeRate));
  if (!b || !banks.length) return null;
  const fee = median(banks.map((x) => x.feeRate));
  const counter = m.sample * bankRate(b.perUnit, fee, 0);
  const ranked = banks
    .map((x) => {
      const pref = typeof x.maxPref === "number" ? x.maxPref : x.basePref ?? 0;
      return { bank: x.bank, pref, pay: m.sample * bankRate(b.perUnit, x.feeRate, pref) };
    })
    .sort((a, c) => a.pay - c.pay);
  const best = ranked.filter((x) => x.pay - ranked[0].pay < 0.5);
  const air = (fx.banks?.airport?.byCurrency?.[m.code] ?? []).map((x) => x.buyFee).filter(Number.isFinite);
  const airFee = air.length ? median(air) : null;
  const prev = b.r.prevClose?.rate ? m.sample * bankRate(b.r.prevClose.rate / b.unit, fee, 0) : null;
  return {
    fee,
    counter,
    bestPay: ranked[0].pay,
    bestLabel: best.length === 1 ? best[0].bank : `${best[0].bank} 외 ${best.length - 1}곳`,
    bestPref: ranked[0].pref,
    airFee,
    airport: airFee != null ? m.sample * b.perUnit * (1 + airFee / 100) : null,
    vsPrev: prev != null ? counter - prev : null,
  };
}

/* ── 조립 ── */
const rows = MAJORS.map((m) => {
  const b = baseOf(m.code);
  const st = statsOf(m.code);
  return { m, b, st, fact: factOf(m, st, b), ex: exchangeOf(m, b) };
}).filter((x) => x.b);

const usd = rows.find((x) => x.m.code === "USD");
const jpy = rows.find((x) => x.m.code === "JPY");
if (!usd || !jpy) {
  console.error("달러·엔화 값이 없음 — 쓰지 않습니다");
  process.exit(1);
}
const top = [usd, jpy].filter((x) => x.fact).sort((a, c) => c.fact.score - a.fact.score)[0];
const headline = top?.fact?.short ?? "";

const q = (x) => `${x.b.unit === 100 ? `100${x.m.unitWord}` : `1${x.m.unitWord}`}`;
const rateTxt = (x) => `${q(x)} ${fmt(x.b.rate)}원`;
const chgTxt = (x) => {
  const r = x.b.r;
  if (!r.prevClose || typeof r.change !== "number") return "";
  return `전일 종가(${korDate(r.prevClose.date)} ${fmt(r.prevClose.rate)}원)보다 ${fmt(Math.abs(r.change))}원(${pct2(r.changePct ?? 0)}%) ${upDown(r.change)}`;
};

const title = `오늘 환율 ${korDate(today)} — 달러 ${fmt(usd.b.rate)}원·엔화 100엔 ${fmt(jpy.b.rate)}원${headline ? `, ${headline}` : ""}`;

const descBits = [`${basisWhen} ${basisLabel} 기준 달러 ${fmt(usd.b.rate)}원, 엔화 100엔 ${fmt(jpy.b.rate)}원`];
const eur = rows.find((x) => x.m.code === "EUR");
if (eur) descBits[0] += `, 유로 ${fmt(eur.b.rate)}원`;
descBits[0] += ".";
if (top?.fact?.sentence) descBits.push(top.fact.sentence.replace(/다\.$/, "다."));
if (usd.ex) descBits.push(`1,000달러를 사면 우대 없는 창구 ${won(usd.ex.counter)}원, 앱 최대 우대 ${won(usd.ex.bestPay)}원${usd.ex.airport ? `, 인천공항 창구 ${won(usd.ex.airport)}원` : ""}.`);

/* 리드(조립) — 모델이 성공하면 바뀐다 */
const leadBits = [`${basisWhen} ${basisLabel} 기준 달러는 1달러 ${fmt(usd.b.rate)}원으로 ${chgTxt(usd) || "집계됐다"}.`.replace("으로 집계됐다.", "이다.")];
leadBits.push(`엔화는 100엔 ${fmt(jpy.b.rate)}원${eur ? `, 유로는 1유로 ${fmt(eur.b.rate)}원` : ""}이다.`);
if (top?.fact?.sentence) leadBits.push(top.fact.sentence);
const lead = leadBits.join(" ");

const sections = [];

function currencySection(x) {
  const { m, st } = x;
  const ps = [];
  const c = chgTxt(x);
  ps.push(`${josa(m.name, "은는")} ${rateTxt(x)}${c ? `으로 ${c}` : "이다"}.`.replace("다.이다.", "다."));
  if (st) {
    const bits = [];
    if (st.chg1w) bits.push(`1주일 전(${korDate(st.chg1w.from)} ${fmt(st.chg1w.rate)}원)보다 ${fmt(Math.abs(st.chg1w.diff))}원 ${st.chg1w.diff >= 0 ? "높고" : "낮고"}`);
    if (st.chg1m) bits.push(`한 달 전(${korDate(st.chg1m.from)} ${fmt(st.chg1m.rate)}원)보다 ${fmt(Math.abs(st.chg1m.diff))}원(${pct2(st.chg1m.pct)}%) ${st.chg1m.diff >= 0 ? "높다" : "낮다"}`);
    if (bits.length) ps.push(`${bits.join(", ")}.`);
    ps.push(
      `최근 30일 범위는 ${fmt(st.r30.lo.rate)}원(${korDate(st.r30.lo.date)})~${fmt(st.r30.hi.rate)}원(${korDate(st.r30.hi.date)})이고, 오늘은 그 범위의 아래에서 ${st.r30.pos}% 자리다.` +
        (st.r1y
          ? ` 최근 1년으로 넓히면 최저 ${fmt(st.r1y.lo.rate)}원(${korDateY(st.r1y.lo.date)}), 최고 ${fmt(st.r1y.hi.rate)}원(${korDateY(st.r1y.hi.date)}) 사이의 ${st.r1y.pos}% 자리다.`
          : "")
    );
    if (st.streak >= 2) ps.push(`${st.streak}거래일 연속 ${st.streakDir > 0 ? "올랐다" : "내렸다"}.`);
    if (x.fact?.sentence && !ps.some((p) => p.includes(x.fact.sentence))) ps.push(x.fact.sentence);
  }
  const head = x.fact && x.fact.score >= 20 ? `${m.name} ${rateTxt(x)} — ${x.fact.short.replace(`${m.name} `, "")}` : `${m.name} ${rateTxt(x)}, ${x.b.r.change > 0 ? "상승" : x.b.r.change < 0 ? "하락" : "보합"}`;
  // 한 문장씩 끊지 않는다 — 오늘 값·1주·1달 / 범위·연속·n일 만에, 두 문단으로 묶는다
  return { heading: head, paragraphs: [ps.slice(0, 2).join(" "), ps.slice(2).join(" ")].filter(Boolean) };
}
sections.push(currencySection(usd));
sections.push(currencySection(jpy));

// 다른 통화 한눈에
const others = rows.filter((x) => !["USD", "JPY"].includes(x.m.code));
if (others.length) {
  sections.push({
    heading: "유로·베트남 동·위안화·바트 한눈에",
    paragraphs: [
      others
        .map((x) => `${x.m.name} ${rateTxt(x)}${x.b.r.prevClose && typeof x.b.r.change === "number" ? `(${x.b.r.change > 0 ? "▲" : x.b.r.change < 0 ? "▼" : ""}${pct2(x.b.r.changePct ?? 0)}%)` : ""}`)
        .join(", ") + ".",
    ],
    table: {
      head: ["통화", "기준 환율", "전일 대비", "1주 전 대비", "1년 위치"],
      rows: rows.map((x) => [
        `${x.m.name} (${q(x)})`,
        `${fmt(x.b.rate)}원`,
        x.b.r.prevClose && typeof x.b.r.change === "number" ? `${x.b.r.change > 0 ? "+" : x.b.r.change < 0 ? "-" : ""}${fmt(Math.abs(x.b.r.change))}원` : "",
        x.st?.chg1w ? `${x.st.chg1w.diff >= 0 ? "+" : "-"}${pct2(x.st.chg1w.pct)}%` : "",
        x.st?.r1y ? `${x.st.r1y.pos}%` : x.st ? `30일 ${x.st.r30.pos}%` : "",
      ]),
      note: "1년 위치: 최근 1년 일별 종가의 최저를 0%, 최고를 100%로 둔 오늘 값의 자리.",
    },
  });
}

// 오늘 바꾸면
const exRows = rows.filter((x) => x.ex);
if (exRows.length) {
  const ps = [];
  if (usd.ex) {
    ps.push(
      `1,000달러를 현찰로 살 때 우대 없는 창구(은행 공시 수수료율 중간값 ${+usd.ex.fee.toFixed(2)}%)에서는 ${won(usd.ex.counter)}원, ` +
        `앱 최대 우대로는 ${josa(usd.ex.bestLabel, "이가")} ${won(usd.ex.bestPay)}원으로 가장 적다.` +
        (usd.ex.airport ? ` 인천공항 창구(공항점 공시 ${+usd.ex.airFee.toFixed(2)}%)에서 사면 ${won(usd.ex.airport)}원이다.` : "")
    );
    if (usd.ex.vsPrev != null && Math.abs(usd.ex.vsPrev) >= 1)
      ps.push(`같은 1,000달러를 어제 종가로 창구에서 샀다면 ${won(Math.abs(usd.ex.vsPrev))}원 ${usd.ex.vsPrev > 0 ? "덜" : "더"} 냈다.`);
  }
  if (jpy.ex) {
    ps.push(
      `10만 엔은 우대 없는 창구 ${won(jpy.ex.counter)}원, 앱 최대 우대 ${won(jpy.ex.bestPay)}원(${jpy.ex.bestLabel})` +
        (jpy.ex.airport ? `, 인천공항 창구 ${won(jpy.ex.airport)}원이다.` : "이다.")
    );
  }
  sections.push({
    heading: `오늘 환전하면 — 1,000달러 창구 ${usd.ex ? won(usd.ex.counter) : ""}원, 앱 우대 ${usd.ex ? won(usd.ex.bestPay) : ""}원`,
    paragraphs: ps,
    table: {
      head: ["통화 · 금액", "우대 없는 창구", "앱 최대 우대", "1위 은행", "인천공항 창구"],
      rows: exRows.map((x) => [
        `${x.m.name} ${x.m.sampleLabel}`,
        `${won(x.ex.counter)}원`,
        `${won(x.ex.bestPay)}원`,
        x.ex.bestLabel,
        x.ex.airport != null ? `${won(x.ex.airport)}원` : "",
      ]),
      note: "현찰로 살 때 낼 원화. 수수료율·최대 우대율·인천공항점 수수료율은 은행연합회 외환길잡이 공시(은행별 기준일이 다름), 최대 우대에는 앱·금액·실적 조건이 붙는다.",
    },
  });
}

// 어떻게 읽나(조립) — 모델이 성공하면 바뀐다
const readPs = [];
if (usd.st?.r1y) {
  readPs.push(
    `달러 값만 보면 오늘은 최근 1년 범위의 ${usd.st.r1y.pos}% 자리다. 이 위치는 지난 값과의 비교일 뿐 앞으로의 방향을 알려 주지 않는다. ` +
      `환전 금액이 정해져 있다면 날짜보다 어디서 바꾸느냐가 낼 돈을 더 크게 가른다.`
  );
}
if (usd.ex) {
  readPs.push(
    `1,000달러 기준으로 우대 없는 창구와 앱 최대 우대의 차이는 ${won(usd.ex.counter - usd.ex.bestPay)}원` +
      (usd.ex.airport ? `, 인천공항 창구와 앱 최대 우대의 차이는 ${won(usd.ex.airport - usd.ex.bestPay)}원이다.` : "이다.") +
      ` 같은 날 바꿔도 이만큼 달라지므로, 은행 앱의 우대 조건과 수령 장소를 먼저 확인하는 것이 계산의 출발점이다.`
  );
}
if (readPs.length) sections.push({ heading: "오늘 환율, 어떻게 읽나", paragraphs: readPs });

const faq = [
  { q: "오늘 달러 환율은 얼마인가요?", a: `${basisWhen} ${basisLabel} 기준 1달러 ${fmt(usd.b.rate)}원입니다.${chgTxt(usd) ? ` ${chgTxt(usd).replace(/다$/, "습니다")}.` : ""}` },
  { q: "오늘 엔화 환율은 얼마인가요?", a: `${basisWhen} 기준 100엔 ${fmt(jpy.b.rate)}원입니다.${chgTxt(jpy) ? ` ${chgTxt(jpy).replace(/다$/, "습니다")}.` : ""}` },
];
if (usd.ex) faq.push({ q: "오늘 1,000달러를 환전하면 얼마인가요?", a: `우대 없는 창구에서 현찰로 사면 ${won(usd.ex.counter)}원, 은행 공시 최대 우대로는 ${usd.ex.bestLabel} ${won(usd.ex.bestPay)}원입니다.${usd.ex.airport ? ` 인천공항 창구에서는 ${won(usd.ex.airport)}원입니다.` : ""}` });
faq.push({
  q: "기사 속 환율은 무엇 기준인가요?",
  a: official
    ? "한국수출입은행이 영업일마다 고시하는 매매기준율입니다. 서울외국환중개가 9시 전에 정하는 값과 같고, 은행 창구 값은 여기에 환전 수수료가 붙습니다."
    : "국제 외환시장의 시장 중간환율(Yahoo Finance)입니다. 은행이 고시하는 매매기준율과 몇 원 차이가 날 수 있고, 은행 창구 값은 여기에 환전 수수료가 붙습니다.",
});

const series = Object.fromEntries(["USD", "JPY"].map((c) => [c, seriesOf(c).slice(-260).map((p) => ({ d: p.date, r: p.rate }))]));

let doc = {
  v: 1,
  date: today,
  title,
  description: descBits.join(" "),
  publishedAt: existing?.publishedAt ?? kstNow(),
  updatedAt: fx.updatedAt ?? null,
  basis: { kind: official ? "official" : "mid", label: basisLabel, when: basisWhen },
  headline,
  cards: rows.map((x) => ({
    code: x.m.code,
    name: x.m.name,
    slug: x.m.slug,
    quote: q(x),
    rate: Math.round(x.b.rate * 100) / 100,
    change: x.b.r.change ?? null,
    changePct: x.b.r.changePct ?? null,
  })),
  series,
  lead,
  sections,
  faq,
  paragraphs: [lead, ...sections.flatMap((s) => s.paragraphs)],
  sources: [
    official ? "한국수출입은행 현재환율 Open API (매매기준율)" : "Yahoo Finance 시장 중간환율 (일별 종가·전일 종가)",
    "전국은행연합회 외환길잡이 — 은행별 주요통화 인터넷환전수수료 우대율 비교, 인천공항점 환전수수료 비교",
  ],
  analysis: null,
};

if (!NO_MODEL) {
  doc = await applyFxAnalysis(doc, { rows, usd, jpy, basisLabel, basisWhen, top }, { fmt, won, korDate, korDateY, pct2, model: MODEL });
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n", "utf8");
console.log(
  `생성: ${outPath}\n  제목: ${title}\n  기준: ${basisLabel} · 섹션 ${sections.length}개 · 달러 이력 ${series.USD.length}일${doc.analysis ? ` · 해석 문단 ${doc.analysis.model}` : " · 조립 문장"}`
);
