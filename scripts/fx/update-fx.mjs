/**
 * 환율 갱신기 — fx.json 을 price-data 브랜치에 발행.
 *
 * 실행 환경: GitHub Actions (Node 22+). 로컬 실행:
 *   node scripts/fx/update-fx.mjs <이전파일경로> <출력파일경로>
 *
 * 데이터 출처
 *  - 시장환율(mid): Yahoo Finance. 원화 직결 심볼(XXXKRW=X)이 있으면 그것을,
 *    없으면 USD 교차(USDKRW ÷ USDXXX)로 계산한다.
 *  - 공식 매매기준율: 한국수출입은행 현재환율 API (EXIM_API_KEY 가 있을 때만).
 *    영업일 11시 전후 1회 갱신, 일 1,000회 제한이라 하루 1회만 호출한다.
 *
 * 원칙
 *  - 값을 못 받은 통화는 이전 값을 유지하고, 이전 값도 없으면 목록에서 뺀다.
 *  - USD/KRW 가 통째로 실패하면 파일을 쓰지 않고 실패로 끝낸다(화면 붕괴 방지).
 *  - 추정치를 만들어 넣지 않는다.
 */

import fs from "node:fs";
import path from "node:path";

const [, , prevPath, outPath] = process.argv;
if (!outPath) {
  console.error("usage: node update-fx.mjs <prev fx.json> <out path>");
  process.exit(1);
}

/** 화면에 내보낼 통화 목록. unit=100 은 100단위로 고시하는 통화. */
const CURRENCIES = [
  { code: "USD", name: "미국 달러", unit: 1, symbol: "KRW=X", region: "미주" },
  { code: "JPY", name: "일본 엔", unit: 100, symbol: "JPYKRW=X", region: "일본·중화권" },
  { code: "EUR", name: "유로", unit: 1, symbol: "EURKRW=X", region: "유럽" },
  { code: "CNY", name: "중국 위안", unit: 1, symbol: "CNYKRW=X", region: "일본·중화권" },
  { code: "GBP", name: "영국 파운드", unit: 1, symbol: "GBPKRW=X", region: "유럽" },
  { code: "AUD", name: "호주 달러", unit: 1, symbol: "AUDKRW=X", region: "미주" },
  { code: "CAD", name: "캐나다 달러", unit: 1, symbol: "CADKRW=X", region: "미주" },
  { code: "CHF", name: "스위스 프랑", unit: 1, symbol: "CHFKRW=X", region: "유럽" },
  { code: "HKD", name: "홍콩 달러", unit: 1, symbol: "HKDKRW=X", region: "일본·중화권" },
  { code: "TWD", name: "대만 달러", unit: 1, cross: "TWD=X", region: "일본·중화권" },
  { code: "SGD", name: "싱가포르 달러", unit: 1, symbol: "SGDKRW=X", region: "동남아" },
  { code: "THB", name: "태국 바트", unit: 1, symbol: "THBKRW=X", region: "동남아" },
  { code: "VND", name: "베트남 동", unit: 100, cross: "VND=X", region: "동남아" },
  { code: "PHP", name: "필리핀 페소", unit: 1, cross: "PHP=X", region: "동남아" },
  { code: "IDR", name: "인도네시아 루피아", unit: 100, cross: "IDR=X", region: "동남아" },
  { code: "MYR", name: "말레이시아 링깃", unit: 1, symbol: "MYRKRW=X", region: "동남아" },
  { code: "NZD", name: "뉴질랜드 달러", unit: 1, symbol: "NZDKRW=X", region: "미주" },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

function kstNow() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00");
}
function kstDateStr() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}
function dirOf(change) {
  if (change > 0.00001) return "up";
  if (change < -0.00001) return "down";
  return "none";
}
function round(n, d = 2) {
  const p = 10 ** d;
  return Math.round(n * p) / p;
}

async function yahoo(symbol) {
  const r = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`,
    { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) }
  );
  if (!r.ok) throw new Error(`${symbol} HTTP ${r.status}`);
  const j = await r.json();
  const meta = j?.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  const prev = meta?.chartPreviousClose ?? meta?.previousClose;
  if (!Number.isFinite(price)) throw new Error(`${symbol}: 가격 없음`);
  return { price, prev: Number.isFinite(prev) ? prev : null };
}

/* ── 이전 값 ── */
let prev = {};
try {
  prev = JSON.parse(fs.readFileSync(prevPath, "utf8"));
  console.log("이전 fx.json 로드됨");
} catch {
  console.log("이전 fx.json 없음 — 새로 생성");
}
const prevByCode = new Map((prev.rates ?? []).map((r) => [r.code, r]));

/* ── USD/KRW 먼저 (교차 계산의 기준) ── */
let usdkrw;
try {
  usdkrw = await yahoo("KRW=X");
} catch (e) {
  const p = prevByCode.get("USD");
  if (!p) {
    console.error(`USD/KRW 실패하고 이전 값도 없음 — 종료: ${e.message}`);
    process.exit(1);
  }
  usdkrw = { price: p.rate, prev: p.rate - (p.change ?? 0) };
  console.warn(`USD/KRW 실패 — 이전 값 사용: ${e.message}`);
}

/* ── 통화별 수집 ── */
const rates = [];
const failed = [];

for (const c of CURRENCIES) {
  try {
    let perUnit; // 1단위당 원화
    let prevPerUnit;

    if (c.symbol) {
      const q = await yahoo(c.symbol);
      perUnit = q.price;
      prevPerUnit = q.prev;
    } else {
      // USD 교차: 1 XXX = USDKRW / (XXX per USD)
      const q = await yahoo(c.cross);
      perUnit = usdkrw.price / q.price;
      prevPerUnit =
        usdkrw.prev && q.prev ? usdkrw.prev / q.prev : null;
    }

    const rate = perUnit * c.unit; // 고시 단위(1 또는 100) 기준 원화
    const prevRate = prevPerUnit != null ? prevPerUnit * c.unit : null;
    const change = prevRate != null ? rate - prevRate : 0;
    const changePct = prevRate ? (change / prevRate) * 100 : 0;

    rates.push({
      code: c.code,
      name: c.name,
      unit: c.unit,
      region: c.region,
      rate: round(rate, c.unit === 100 || rate < 100 ? 2 : 2),
      change: round(change, 2),
      changePct: round(changePct, 2),
      dir: dirOf(change),
    });
  } catch (e) {
    failed.push(`${c.code}: ${e.message}`);
    const p = prevByCode.get(c.code);
    if (p) rates.push(p); // 이전 값 유지
  }
}

if (!rates.find((r) => r.code === "USD")) {
  console.error("USD 항목이 없음 — 파일을 쓰지 않고 종료");
  process.exit(1);
}

/* ── 공식 매매기준율 (수출입은행, 키가 있을 때만 · 하루 1회) ── */
let official = prev.official ?? null;
const today = kstDateStr();
const eximKey = process.env.EXIM_API_KEY;

if (eximKey && official?.fetchedDate !== today) {
  try {
    const sd = today.replace(/-/g, "");
    const url =
      `https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON` +
      `?authkey=${encodeURIComponent(eximKey)}&searchdate=${sd}&data=AP01`;
    const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
    const arr = await r.json();
    if (Array.isArray(arr) && arr.length && arr[0]?.result === 1) {
      const num = (s) => Number(String(s).replace(/,/g, "")) || null;
      const items = arr
        .filter((x) => x.cur_unit && x.deal_bas_r)
        .map((x) => {
          const m = /^([A-Z]{3})(?:\((\d+)\))?$/.exec(x.cur_unit);
          return {
            code: m ? m[1] : x.cur_unit,
            unit: m && m[2] ? Number(m[2]) : 1,
            name: x.cur_nm,
            dealBasR: num(x.deal_bas_r), // 매매기준율
            ttb: num(x.ttb), // 송금 받으실 때
            tts: num(x.tts), // 송금 보내실 때
          };
        })
        .filter((x) => x.dealBasR);
      if (items.length) {
        official = {
          source: "한국수출입은행 현재환율 (영업일 11시 전후 고시)",
          sourceUrl: "https://www.koreaexim.go.kr/ir/HPHKIR020M01?apino=2&viewtype=C",
          quoteDate: today,
          fetchedDate: today,
          items,
        };
        console.log(`공식 매매기준율 OK — ${items.length}개 통화`);
      }
    } else {
      // result 2=DATA코드 오류, 3=인증키 파기, 4=일일한도 초과
      console.warn(`수출입은행 응답 이상: ${JSON.stringify(arr).slice(0, 200)}`);
    }
  } catch (e) {
    console.warn(`수출입은행 호출 실패(무시하고 진행): ${e.message}`);
  }
} else if (!eximKey) {
  console.log("EXIM_API_KEY 없음 — 공식 매매기준율 생략(시장환율만 발행)");
}

/* ── 출력 ── */
const out = {
  updatedAt: kstNow(),
  base: "KRW",
  source: "Yahoo Finance (시장 중간환율)",
  note: "시장 중간환율입니다. 은행 창구·앱의 현찰 환전가는 여기에 수수료와 우대율이 적용됩니다.",
  rates,
  official,
};

if (failed.length) console.warn("일부 통화 실패:\n - " + failed.join("\n - "));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`쓰기 완료: ${outPath} (${rates.length}개 통화, USD ${out.rates[0]?.rate})`);
