/**
 * 은행별 환전 우대율 수집기 — banks.json 을 price-data 브랜치에 발행.
 *
 * 출처: 전국은행연합회 외환길잡이
 *   "은행별 주요통화 인터넷환전수수료 우대율 비교"
 *   https://exchange.kfb.or.kr/page/on_commission.php
 *   실데이터: /page/on_commission_list.php?cur=USD (EUC-KR, 표 HTML)
 *
 * 이 표는 은행이 공시한 값이고 **기준일**이 함께 나온다. 화면에도 반드시
 * 기준일과 출처를 표기한다. 우대율은 등급·이벤트에 따라 달라질 수 있으므로
 * 우리가 임의로 보정하거나 추정하지 않는다 — 공시된 숫자만 그대로 옮긴다.
 *
 * 사용법: node scripts/fx/update-banks.mjs <이전파일> <출력파일>
 */

import fs from "node:fs";
import path from "node:path";

const [, , prevPath, outPath] = process.argv;
if (!outPath) {
  console.error("usage: node update-banks.mjs <prev banks.json> <out path>");
  process.exit(1);
}

const BASE = "https://exchange.kfb.or.kr/page";
const LIST = `${BASE}/on_commission_list.php`;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

/** 화면에서 쓰는 통화. 은행연합회가 비교공시하는 주요통화 범위 안에서 고른다. */
const CURRENCIES = ["USD", "JPY", "EUR", "CNY", "GBP", "AUD", "CAD", "CHF", "HKD", "SGD", "THB", "VND", "TWD", "PHP", "NZD"];

function kstNow() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00");
}
function kstDateStr() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

/** EUC-KR 응답을 문자열로 */
async function getEuckr(url) {
  const r = await fetch(url, {
    headers: { "User-Agent": UA, Referer: `${BASE}/on_commission.php` },
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = await r.arrayBuffer();
  return new TextDecoder("euc-kr").decode(buf);
}

const strip = (s) =>
  s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();

/** "1.75%" → 1.75 / "80% (올원뱅크 앱 90%)" → 80, note는 원문 유지 */
function pct(s) {
  const m = /(\d+(?:\.\d+)?)\s*%/.exec(s);
  return m ? Number(m[1]) : null;
}
/** "2026.08.07" → "2026-08-07" */
function isoDate(s) {
  const m = /(\d{4})\.(\d{2})\.(\d{2})/.exec(s);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

async function fetchCurrency(cur) {
  const html = await getEuckr(`${LIST}?cur=${encodeURIComponent(cur)}`);
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  const out = [];

  for (const r of rows) {
    const cells = [...r.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((m) => strip(m[1]));
    if (cells.length < 6) continue;
    const [bank, feeRaw, baseRaw, maxRaw, noteRaw, dateRaw] = cells;
    if (!bank || /^은행$/.test(bank)) continue; // 헤더 행

    const fee = pct(feeRaw);
    const basePref = pct(baseRaw);
    const maxPref = pct(maxRaw);
    if (fee == null && basePref == null) continue;

    out.push({
      bank,
      /** 환전수수료율(%) — 매매기준율에 가산되는 현찰 스프레드 */
      feeRate: fee,
      /** 기본 우대율(%) */
      basePref,
      /** 최대 우대율(%) */
      maxPref,
      /** 최대우대율 칸의 원문 (예: "80% (올원뱅크 앱 90%)") */
      maxPrefText: maxRaw || null,
      /** 우대사항·환전이벤트 원문 (길어서 그대로 보관, 화면에서 접어 보여준다) */
      note: noteRaw && noteRaw !== "-" ? noteRaw : null,
      /** 은행이 공시한 기준일 */
      asOf: isoDate(dateRaw),
    });
  }

  if (out.length === 0) throw new Error("표를 읽지 못함 — 페이지 구조 변경 가능성");
  return out;
}

/* ── 이전 값 ── */
let prev = {};
try {
  prev = JSON.parse(fs.readFileSync(prevPath, "utf8"));
  console.log("이전 banks.json 로드됨");
} catch {
  console.log("이전 banks.json 없음 — 새로 생성");
}

/* ── 수집 ── */
const byCurrency = {};
const failed = [];

for (const cur of CURRENCIES) {
  try {
    byCurrency[cur] = await fetchCurrency(cur);
    console.log(`${cur}: ${byCurrency[cur].length}개 은행`);
  } catch (e) {
    failed.push(`${cur}: ${e.message}`);
    if (prev.byCurrency?.[cur]) byCurrency[cur] = prev.byCurrency[cur]; // 이전 값 유지
  }
  await new Promise((r) => setTimeout(r, 400)); // 상대 서버 배려
}

if (!byCurrency.USD?.length) {
  console.error("USD 데이터가 없음 — 파일을 쓰지 않고 종료");
  process.exit(1);
}

/* 화면 상단에 쓸 공시 기준일: 수집된 값 중 가장 최근 */
const allDates = Object.values(byCurrency)
  .flat()
  .map((b) => b.asOf)
  .filter(Boolean)
  .sort();
const latestAsOf = allDates[allDates.length - 1] ?? null;

const out = {
  updatedAt: kstNow(),
  fetchedDate: kstDateStr(),
  source: "전국은행연합회 외환길잡이 — 은행별 주요통화 인터넷환전수수료 우대율 비교",
  sourceUrl: "https://exchange.kfb.or.kr/page/on_commission.php",
  note:
    "환전수수료율과 우대율은 각 은행이 공시한 값입니다. 고객 등급·환전 금액·이벤트에 따라 " +
    "실제 적용 우대율은 달라질 수 있으므로 거래 전 해당 은행에서 확인하세요.",
  latestAsOf,
  currencies: Object.keys(byCurrency),
  byCurrency,
};

if (failed.length) console.warn("일부 통화 실패:\n - " + failed.join("\n - "));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`쓰기 완료: ${outPath} (통화 ${Object.keys(byCurrency).length}종, 공시 최신 ${latestAsOf})`);
