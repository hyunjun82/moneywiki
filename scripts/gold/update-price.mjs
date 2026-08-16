/**
 * 금시세 갱신기 — price.json 생성
 *
 * 실행 환경: GitHub Actions (Node 20+). 로컬 실행도 가능:
 *   DATA_GO_KR_KE=<키> node scripts/gold/update-price.mjs <이전파일경로> <출력파일경로>
 *
 * 출처 (quiz.jjyu.co.kr/price.json 과 동일 규격):
 *  - retail : 종로금거래소 http://www.jongrogx.com/  (내가팔때/내가살때, 살때는 VAT별도)
 *  - krx    : 공공데이터포털 금융위원회_일반상품시세정보 getGoldPriceInfo (하루 1회만 호출)
 *  - fx/intl: Yahoo Finance (KRW=X, GC=F, SI=F)
 *
 * 원칙:
 *  - 어떤 소스가 실패하면 그 섹션은 이전 값을 유지한다. 검증 안 된 값을 쓰지 않는다.
 *  - retail 순금 24K가 비정상(누락·10만원 미만)이면 파일을 덮어쓰지 않고 실패로 종료한다.
 */

const GRAM_PER_DON = 3.75;
const OZ_TO_GRAM = 31.1034768;

const [, , prevPath, outPath] = process.argv;
if (!outPath) {
  console.error("usage: node update-price.mjs <prev price.json path> <out path>");
  process.exit(1);
}

const fs = await import("node:fs");
const path = await import("node:path");

/* ───────────── 공통 유틸 ───────────── */

function kstNow() {
  // KST ISO 문자열 (+09:00)
  const kst = new Date(Date.now() + 9 * 3600 * 1000);
  return kst.toISOString().replace("Z", "+09:00");
}
function kstDateStr(offsetDays = 0) {
  const kst = new Date(Date.now() + 9 * 3600 * 1000 + offsetDays * 86400 * 1000);
  return kst.toISOString().slice(0, 10); // YYYY-MM-DD
}
function num(s) {
  const n = Number(String(s).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}
async function getText(url, opts = {}) {
  const r = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
      ...opts.headers,
    },
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error(`${url} -> HTTP ${r.status}`);
  return r.text();
}
async function getJson(url, opts) {
  return JSON.parse(await getText(url, opts));
}

/* ───────────── 1. retail: 종로금거래소 ───────────── */

async function fetchRetail() {
  const html = await getText("http://www.jongrogx.com/");

  // 고시 날짜: "오늘의 금시세 ... 2026. 08. 16"
  const dm = /(\d{4})\.\s*(\d{2})\.\s*(\d{2})/.exec(html);
  const quoteDate = dm ? `${dm[1]}-${dm[2]}-${dm[3]}` : kstDateStr();

  // 시세 표: <td>순금시세</td> <td><span class="point up">4,000</span> <span class="price">731,000원</span></td> ...
  const rowRe =
    /<td>\s*(순금시세|18K 금시세|14K 금시세|백금시세|은시세)\s*<\/td>\s*<td>[^<]*<span class="point (up|down|none)">([\d,]+)<\/span>\s*<span class="price">([\d,]+)원<\/span>[\s\S]*?<\/td>\s*<td>[^<]*<span class="point (up|down|none)">([\d,]+)<\/span>\s*<span class="price">([\d,]+)원<\/span>/g;

  const KEYMAP = {
    순금시세: { key: "gold24", name: "순금 24K" },
    "18K 금시세": { key: "gold18", name: "18K" },
    "14K 금시세": { key: "gold14", name: "14K" },
    백금시세: { key: "platinum", name: "백금" },
    은시세: { key: "silver", name: "은" },
  };

  const items = [];
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const [, label, sellDir, sellChg, sellPrice, buyDir, buyChg, buyPrice] = m;
    const meta = KEYMAP[label];
    if (!meta) continue;
    const quote = (dir, chg, price) => {
      const p = num(price);
      if (!p || p <= 0) return null; // 0원 = 고시 없음(제품시세적용)
      const c = num(chg) ?? 0;
      return { price: p, change: c, dir: c === 0 ? "none" : dir };
    };
    items.push({
      key: meta.key,
      name: meta.name,
      userSell: quote(sellDir, sellChg, sellPrice),
      userBuy: quote(buyDir, buyChg, buyPrice),
    });
  }

  const g24 = items.find((it) => it.key === "gold24");
  if (!g24 || !g24.userSell || g24.userSell.price < 100000) {
    throw new Error("retail: gold24 값이 비정상 — 페이지 구조 변경 가능성");
  }

  return {
    source: "종로금거래소",
    sourceUrl: "https://www.jongrogx.com/",
    quoteDate,
    unit: "원/돈",
    note: "내가 살 때 가격은 원문에 부가세 별도로 표기되어 있습니다.",
    items,
  };
}

/* ───────────── 2. krx: 공공데이터포털 (하루 1회) ───────────── */

async function fetchKrx(prevKrx) {
  const key = process.env.DATA_GO_KR_KE;
  if (!key) throw new Error("krx: DATA_GO_KR_KE 환경변수 없음");

  const begin = kstDateStr(-220).replace(/-/g, ""); // 약 7개월 전부터
  const url =
    "https://apis.data.go.kr/1160100/service/GetGeneralProductInfoService/getGoldPriceInfo" +
    `?serviceKey=${encodeURIComponent(key)}&resultType=json&numOfRows=500&pageNo=1&beginBasDt=${begin}`;

  const json = await getJson(url);
  const rows = json?.response?.body?.items?.item;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`krx: 응답에 데이터 없음 — ${JSON.stringify(json).slice(0, 300)}`);
  }

  // 종목: "금 99.99_1kg" (미니금 1g 제외)
  const gold = rows
    .filter((r) => String(r.itmsNm).includes("금 99.99") && String(r.itmsNm).includes("1kg"))
    .map((r) => {
      const clpr = num(r.clpr);
      const d = String(r.basDt);
      return {
        date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
        krwPerGram: clpr,
        krwPerDon: clpr ? Math.round(clpr * GRAM_PER_DON) : null,
        change: num(r.vs) ?? 0,
        changePct: num(r.fltRt) ?? 0,
      };
    })
    .filter((p) => p.krwPerGram)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (gold.length === 0) throw new Error("krx: '금 99.99_1kg' 종목을 찾지 못함");

  return {
    source: "한국거래소 KRX 금시장 (공공데이터포털)",
    sourceUrl: "https://www.data.go.kr/data/15094805/openapi.do",
    item: "금 99.99_1kg",
    unit: "원/그램",
    note: "하루 1회 갱신되는 전 영업일 종가입니다. 실시간 시세가 아닙니다.",
    latest: gold[gold.length - 1],
    history: gold,
    fetchedDate: kstDateStr(), // 하루 1회 호출 판단용
  };
}

/* ───────────── 3. fx / intl: Yahoo Finance ───────────── */

async function yahooQuote(symbol) {
  const j = await getJson(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`
  );
  const meta = j?.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  const prev = meta?.chartPreviousClose ?? meta?.previousClose;
  if (!Number.isFinite(price)) throw new Error(`yahoo ${symbol}: 가격 없음`);
  const change = Number.isFinite(prev) ? price - prev : 0;
  const changePct = Number.isFinite(prev) && prev ? (change / prev) * 100 : 0;
  return { price, change, changePct };
}

function dirOf(change) {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "none";
}

async function fetchFxIntl() {
  const [fx, gold, silver] = await Promise.all([
    yahooQuote("KRW=X"),
    yahooQuote("GC=F"),
    yahooQuote("SI=F"),
  ]);

  const intlItem = (name, q, source) => {
    const krwPerGram = Math.round((q.price / OZ_TO_GRAM) * fx.price);
    return {
      name,
      usdPerOz: Math.round(q.price * 100) / 100,
      changePct: Math.round(q.changePct * 100) / 100,
      dir: dirOf(q.change),
      krwPerGram,
      krwPerDon: Math.round(krwPerGram * GRAM_PER_DON),
      source,
    };
  };

  return {
    fx: {
      usdkrw: Math.round(fx.price * 100) / 100,
      change: Math.round(fx.change * 100) / 100,
      changePct: Math.round(fx.changePct * 100) / 100,
      dir: dirOf(fx.change),
      source: "Yahoo Finance (KRW=X)",
    },
    intl: {
      gold: intlItem("금", gold, "COMEX 금 선물 (GC=F)"),
      silver: intlItem("은", silver, "COMEX 은 선물 (SI=F)"),
    },
  };
}

/* ───────────── 조립 ───────────── */

let prev = {};
try {
  prev = JSON.parse(fs.readFileSync(prevPath, "utf8"));
  console.log("이전 price.json 로드됨");
} catch {
  console.log("이전 price.json 없음 — 새로 생성");
}

const out = {
  updatedAt: kstNow(),
  sources: ["retail:jongrogx", "krx:data.go.kr", "fx:yahoo", "intl.gold:yahoo", "intl.silver:yahoo"],
};
const failures = [];

// retail — 실패하면 이전 값 유지
try {
  out.retail = await fetchRetail();
  console.log(`retail OK — 24K 팔때 ${out.retail.items[0]?.userSell?.price}`);
} catch (e) {
  failures.push(`retail: ${e.message}`);
  if (prev.retail) out.retail = prev.retail;
}

// krx — 하루 1회만 실제 호출, 그 외에는 이전 값 유지
const today = kstDateStr();
if (prev.krx?.fetchedDate === today) {
  out.krx = prev.krx;
  console.log("krx: 오늘 이미 호출됨 — 이전 값 유지");
} else {
  try {
    out.krx = await fetchKrx(prev.krx);
    console.log(`krx OK — ${out.krx.latest.date} 종가 ${out.krx.latest.krwPerGram}`);
  } catch (e) {
    failures.push(`krx: ${e.message}`);
    if (prev.krx) out.krx = prev.krx;
  }
}

// fx / intl — 실패하면 이전 값 유지
try {
  const { fx, intl } = await fetchFxIntl();
  out.fx = fx;
  out.intl = intl;
  console.log(`fx/intl OK — 환율 ${fx.usdkrw}, 금 $${intl.gold.usdPerOz}`);
} catch (e) {
  failures.push(`fx/intl: ${e.message}`);
  if (prev.fx) out.fx = prev.fx;
  if (prev.intl) out.intl = prev.intl;
}

if (failures.length) console.warn("일부 소스 실패:\n - " + failures.join("\n - "));

// retail이 이전 값도 없이 실패하면 파일을 쓰지 않는다
if (!out.retail) {
  console.error("retail 데이터가 전혀 없음 — 파일을 쓰지 않고 실패 종료");
  process.exit(1);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`쓰기 완료: ${outPath}`);
