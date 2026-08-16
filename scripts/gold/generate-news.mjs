/**
 * 금시세 일일 기사 생성기.
 *
 * price-data 브랜치의 price.json(자체 갱신기 발행)을 읽어
 * src/data/gold-news/YYYY-MM-DD.json 을 만든다. 매일 아침 6시(KST)
 * gold-news 워크플로가 실행하고, main에 커밋되면 Cloudflare Pages가
 * 재빌드하면서 /gold/news/YYYY-MM-DD 페이지가 생긴다.
 *
 * 원칙: 모든 숫자는 price.json 에서만 온다. 문장은 템플릿이며,
 * 값이 없는 항목의 문장은 통째로 생략한다. 추정치를 쓰지 않는다.
 *
 * 사용법: node scripts/gold/generate-news.mjs [출력 디렉토리]
 */

import fs from "node:fs";
import path from "node:path";

const PRICE_URL =
  "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/price.json";
const OUT_DIR = process.argv[2] || "src/data/gold-news";

const won = (n) => Math.round(n).toLocaleString("ko-KR");
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const korDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : "";
};
const moveWord = (dir, n) =>
  dir === "up" ? `${won(n)}원 올랐다` : dir === "down" ? `${won(n)}원 내렸다` : "보합이다";

const today = kstDate();
const outPath = path.join(OUT_DIR, `${today}.json`);
if (fs.existsSync(outPath)) {
  console.log(`이미 존재: ${outPath} — 생성 생략`);
  process.exit(0);
}

const res = await fetch(PRICE_URL, { signal: AbortSignal.timeout(20000) });
if (!res.ok) throw new Error(`price.json HTTP ${res.status}`);
const data = await res.json();

const items = data?.retail?.items ?? [];
const g24 = items.find((it) => it.key === "gold24");
const buy = g24?.userBuy;
const sell = g24?.userSell;
if (!buy?.price || !sell?.price) {
  throw new Error("순금 24K 살 때/팔 때 값이 없음 — 기사 생성 중단");
}

const kd = korDate(today);
const quoteKd = korDate(data.retail?.quoteDate) || kd;

/* ── 본문 문단 (숫자는 전부 price.json 값) ── */
const paragraphs = [];

// 1. 리드
const buyPct =
  buy.change && buy.price - buy.change > 0
    ? ((buy.change / (buy.price - buy.change)) * 100).toFixed(2)
    : null;
paragraphs.push(
  `${kd} 오늘의 금시세는 순금 24K 한 돈(3.75g) 기준 살 때 ${won(buy.price)}원, ` +
    `팔 때 ${won(sell.price)}원이다(종로금거래소 ${quoteKd} 고시, 살 때는 부가세 별도). ` +
    `살 때 가격은 전일 대비 ${moveWord(buy.dir, buy.change)}` +
    (buyPct && buy.dir !== "none" ? ` (${buyPct}%).` : ".") +
    ` 팔 때 가격은 전일 대비 ${moveWord(sell.dir, sell.change)}.`
);

// 2. 순도별
const g18 = items.find((it) => it.key === "gold18")?.userSell;
const g14 = items.find((it) => it.key === "gold14")?.userSell;
if (g18?.price && g14?.price) {
  paragraphs.push(
    `제품 금 매입가는 18K가 한 돈 ${won(g18.price)}원, 14K가 ${won(g14.price)}원이다. ` +
      `18K·14K 살 때 가격은 세공비가 붙는 제품 시세로 적용되어 매장마다 다르다.`
  );
}

// 3. 백금·은
const pt = items.find((it) => it.key === "platinum");
const ag = items.find((it) => it.key === "silver");
if (pt?.userSell?.price && ag?.userSell?.price) {
  paragraphs.push(
    `귀금속 시장에서는 백금이 한 돈 기준 팔 때 ${won(pt.userSell.price)}원` +
      (pt.userBuy?.price ? `, 살 때 ${won(pt.userBuy.price)}원` : "") +
      `에 고시됐다. 은은 팔 때 ${won(ag.userSell.price)}원` +
      (ag.userBuy?.price ? `, 살 때 ${won(ag.userBuy.price)}원` : "") +
      `이다.`
  );
}

// 4. KRX 도매
const krx = data.krx?.latest;
if (krx?.krwPerGram) {
  const dirWord = krx.change > 0 ? "올라" : krx.change < 0 ? "내려" : "보합으로";
  paragraphs.push(
    `도매 기준인 한국거래소(KRX) 금시장에서는 ${korDate(krx.date)} 1g당 ` +
      `${won(krx.krwPerGram)}원에 마감했다. 전 거래일보다 ${won(Math.abs(krx.change))}원 ` +
      `${dirWord} 등락률은 ${krx.changePct}%였다. 한 돈으로 환산하면 ${won(krx.krwPerDon)}원이다 ` +
      `(자료: 금융위원회·공공데이터포털, 하루 1회 갱신되는 전 영업일 종가).`
  );
}

// 5. 국제
const ig = data.intl?.gold;
if (ig?.usdPerOz && data.fx?.usdkrw) {
  const dirWord = ig.dir === "up" ? "상승" : ig.dir === "down" ? "하락" : "보합";
  paragraphs.push(
    `국제 금값은 트로이온스당 ${ig.usdPerOz.toLocaleString("en-US")}달러로 ` +
      `전일 대비 ${Math.abs(ig.changePct)}% ${dirWord}했다. 원/달러 환율 ` +
      `${won(data.fx.usdkrw)}원 기준으로 한 돈에 약 ${won(ig.krwPerDon)}원 수준이다. ` +
      `국내 소매가와의 차이는 유통 마진과 부가가치세에서 나온다.`
  );
}

// 6. 마무리 — 내부 안내
const gap = buy.price - sell.price;
paragraphs.push(
  `오늘 기준 살 때와 팔 때의 가격 차이는 한 돈에 ${won(gap)}원이다. ` +
    `내 금을 팔면 얼마를 받는지는 중량과 순도에 따라 달라지므로, 아래 금 계산기에서 ` +
    `무게를 입력하면 오늘 고시가로 바로 계산할 수 있다.`
);

const doc = {
  date: today,
  title: `금시세(금값) ${kd} — 오늘의 금값 살 때 팔 때`,
  description:
    `${kd} 순금 24K 한 돈 살 때 ${won(buy.price)}원, 팔 때 ${won(sell.price)}원. ` +
    `18K·14K 매입가와 KRX 도매 종가, 국제 금값까지 한눈에 정리했습니다.`,
  updatedAt: data.updatedAt ?? null,
  quoteDate: data.retail?.quoteDate ?? today,
  retail: data.retail ?? null,
  krx: krx ? { latest: krx, note: data.krx?.note ?? null } : null,
  fx: data.fx ?? null,
  intl: data.intl ?? null,
  paragraphs,
  sources: [
    "종로금거래소 고시가 (https://www.jongrogx.com)",
    "한국거래소 KRX 금시장 — 금융위원회·공공데이터포털",
    "국제 시세·환율 — Yahoo Finance",
  ],
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n", "utf8");
console.log(`생성: ${outPath} (${paragraphs.length}문단)`);
