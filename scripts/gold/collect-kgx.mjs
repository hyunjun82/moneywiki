/**
 * 한국금거래소 고시 수집기 — kgx-quotes.json (price-data 브랜치)
 *
 * 실행 환경: 사용자 PC(국내 IP). 한국금거래소 API 는 해외 IP 를 403 으로 막아
 * GitHub Actions 러너(미국)에서는 돌지 않는다 (2026-09-09 실측). 이 파일을 Actions 에 올리지 않는다.
 * 예약: scripts/gold/collect-kgx.ps1 을 작업 스케줄러(또는 Cowork 예약 작업)로
 *       평일 09:30~18:30 30분마다 실행 → 값이 바뀌었을 때만 price-data 에 push.
 *
 * 사용법:
 *   node scripts/gold/collect-kgx.mjs --out <price-data 폴더> [--backfill 2025.09.01] [--dry]
 *
 * API: POST https://www.koreagoldx.co.kr/api/price/chart/list
 *      {"srchDt":"SEARCH","type":"Au","dataDateStart":"2026.09.01","dataDateEnd":"2026.09.09"}
 * 응답 {"list":[...]} 최신순, 한 행 = 고시 1회. 한 번의 호출에 금(순금·18K·14K)·백금·은이 전부 오므로
 * 금속별 호출이 필요 없다. 1년 범위(약 1,100행)도 한 번에 온다 — 백필도 이 호출 하나로 끝난다.
 *
 * 원문 필드 → 저장 필드 (원/돈, 살 때는 원문부터 부가세 포함)
 *   s_pure/p_pure   순금 살 때/팔 때 → buy/sell
 *   p_18k/p_14k     18K/14K 팔 때   → k18/k14
 *   s_18k/s_14k     18K/14K 살 때(웹엔 "제품시세적용"으로 숨김) → s18/s14 (참고값)
 *   s_white/p_white 백금 살/팔      → platinum.buy/sell
 *   s_silver/p_silver 은 살/팔      → silver.buy/sell
 *
 * 원칙: 순금 값이 비정상(10만원 미만, 살 때 ≤ 팔 때)이면 파일을 쓰지 않고 실패로 끝낸다.
 *       최신 고시가 저장된 것과 같으면 파일을 건드리지 않는다(커밋 없음).
 */

import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const flagValue = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : null;
};
const OUT_DIR = flagValue("--out") ?? "price-data";
const BACKFILL = flagValue("--backfill");
const DRY = argv.includes("--dry");
const OUT_PATH = path.join(OUT_DIR, "kgx-quotes.json");

const API = "https://www.koreagoldx.co.kr/api/price/chart/list";
const PAGE = "https://www.koreagoldx.co.kr/price/gold";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

const kstNow = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00");
const kstDate = (offsetDays = 0) =>
  new Date(Date.now() + 9 * 3600 * 1000 + offsetDays * 86400 * 1000).toISOString().slice(0, 10);
/** "2026-09-09" → "2026.09.09" (API 날짜 형식) */
const dotted = (iso) => iso.split("-").join(".");

/* ── 이전 파일 ── */
let prev = null;
try {
  prev = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
} catch {
  prev = null;
}
const prevQuotes = Array.isArray(prev?.quotes) ? prev.quotes : [];
const prevLatestKey = prev?.latest ? `${prev.latest.date} ${prev.latest.time}` : null;

/* ── 조회 범위 ──
 * 백필이면 그 날부터. 아니면 저장된 마지막 날짜 3일 전부터(휴일·누락 대비). 처음이면 1년. */
let start;
if (BACKFILL) {
  start = BACKFILL;
} else if (prevQuotes.length) {
  const last = new Date(`${prevQuotes[prevQuotes.length - 1].date}T00:00:00Z`);
  last.setUTCDate(last.getUTCDate() - 3);
  start = dotted(last.toISOString().slice(0, 10));
} else {
  start = dotted(kstDate(-370));
}
const end = dotted(kstDate());

/* ── 호출 ── */
const r = await fetch(API, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Referer: PAGE,
    "User-Agent": UA,
  },
  body: JSON.stringify({ srchDt: "SEARCH", type: "Au", dataDateStart: start, dataDateEnd: end }),
  signal: AbortSignal.timeout(30000),
});
if (!r.ok) {
  console.error(`한국금거래소 HTTP ${r.status} — 403 이면 해외 IP 입니다. 국내 PC 에서 실행하세요.`);
  process.exit(1);
}
const json = await r.json();
const list = Array.isArray(json?.list) ? json.list : [];
if (!list.length) {
  console.error(`응답에 list 가 없음 (${start}~${end}) — ${JSON.stringify(json).slice(0, 200)}`);
  process.exit(1);
}

/* ── 정규화 ── */
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};
const rows = list
  .map((x) => {
    const [date, time] = String(x.date ?? "").split(" ");
    return {
      date,
      time: time ?? "00:00:00",
      buy: num(x.s_pure),
      sell: num(x.p_pure),
      k18: num(x.p_18k),
      k14: num(x.p_14k),
      s18: num(x.s_18k),
      s14: num(x.s_14k),
      platinum: { buy: num(x.s_white), sell: num(x.p_white) },
      silver: { buy: num(x.s_silver), sell: num(x.p_silver) },
    };
  })
  .filter((q) => q.date && q.buy && q.sell);

if (!rows.length) {
  console.error("순금 살 때/팔 때가 있는 행이 없음 — 응답 구조 변경 가능성");
  process.exit(1);
}
const bad = rows.find((q) => q.buy < 100000 || q.sell < 100000 || q.buy <= q.sell);
if (bad) {
  console.error(`비정상 값 — 파일을 쓰지 않음: ${JSON.stringify(bad)}`);
  process.exit(1);
}

/* ── 병합 (키 = 날짜+시각), 오래된 → 최신 ── */
const byKey = new Map(prevQuotes.map((q) => [`${q.date} ${q.time}`, q]));
for (const q of rows) byKey.set(`${q.date} ${q.time}`, q);
const quotes = [...byKey.values()].sort((a, b) =>
  `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
);
const latest = quotes[quotes.length - 1];
const latestKey = `${latest.date} ${latest.time}`;

if (latestKey === prevLatestKey && quotes.length === prevQuotes.length) {
  console.log(`변경 없음 — 최신 고시 ${latestKey} 그대로 (${quotes.length}행)`);
  process.exit(0);
}

const out = {
  updatedAt: kstNow(),
  source: "한국금거래소",
  sourceUrl: PAGE,
  unit: "KRW/3.75g",
  /** 살 때(buy)는 원문부터 부가세 포함 금액이다. */
  vatIncludedBuy: true,
  note: "한국금거래소 고시. 하루 여러 차례 고시되며 한 행이 고시 1회다. 살 때는 부가세 포함, 18K·14K 살 때(s18·s14)는 제품 시세 참고값이다.",
  latest,
  quotes,
};

if (DRY) {
  console.log(JSON.stringify({ ...out, quotes: out.quotes.slice(-3) }, null, 2));
  console.log(`(dry) 조회 ${start}~${end} ${rows.length}행 · 누적 ${quotes.length}행 · 최신 ${latestKey}`);
  process.exit(0);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(
  `쓰기 완료: ${OUT_PATH} — 조회 ${start}~${end} ${rows.length}행, 누적 ${quotes.length}행, ` +
    `최신 ${latestKey} 살 ${latest.buy.toLocaleString("ko-KR")} / 팔 ${latest.sell.toLocaleString("ko-KR")}`
);
