/**
 * 금시세 일일 기사 생성기 v2.
 *
 * price-data 브랜치의 price.json(자체 갱신기 발행)을 읽어
 * src/data/gold-news/YYYY-MM-DD.json 을 만든다. 매일 아침 6시(KST)
 * gold-news 워크플로가 실행하고, main에 커밋되면 Cloudflare Pages가
 * 재빌드하면서 /gold/news/YYYY-MM-DD 페이지가 생긴다.
 *
 * v2: 상위 노출을 위한 기사 구조 개선.
 *  - 소제목(H2) 섹션 구조 (sections 필드)
 *  - 독자 문제 제기형 리드 + 단락 간 연결어
 *  - 날짜 기반으로 리드 문장을 순환시켜 매일 글이 달라지게 함
 *  - 살때·팔때 차이율, 1g 환산, 본전 계산 등 데이터에서 파생되는 인사이트
 *
 * 원칙: 모든 숫자는 price.json 에서만 온다. 등락의 "이유"처럼 데이터에
 * 없는 주장은 쓰지 않는다. 값이 없는 항목의 문장·섹션은 통째로 생략한다.
 *
 * 사용법: node scripts/gold/generate-news.mjs [출력 디렉토리]
 */

import fs from "node:fs";
import path from "node:path";

const PRICE_URL =
  "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data/price.json";
/** 출력 폴더. --force 같은 플래그를 경로로 오인하지 않도록 걸러낸다. */
const OUT_DIR =
  process.argv.slice(2).find((a) => !a.startsWith("--")) || "src/data/gold-news";
const GRAM_PER_DON = 3.75;

const won = (n) => Math.round(n).toLocaleString("ko-KR");
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const korDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : "";
};

const today = kstDate();
const outPath = path.join(OUT_DIR, `${today}.json`);

/**
 * 이미 오늘 기사가 있어도, 그 사이 국내 고시가가 새로 나왔으면 숫자를 정정한다.
 *
 * 새벽에는 아직 당일 고시가 없어 전 영업일 값으로 발행된다(언론사도 같은 방식).
 * 오전에 고시가 갱신되면 이 스크립트가 다시 돌면서 같은 날짜 기사를 최신 숫자로
 * 다시 쓴다. 발행 시각은 새벽 그대로 두고 내용만 정확해진다.
 */
let existingQuoteDate = null;
if (fs.existsSync(outPath)) {
  try {
    existingQuoteDate = JSON.parse(fs.readFileSync(outPath, "utf8")).quoteDate ?? null;
  } catch {
    existingQuoteDate = null;
  }
}

const res = await fetch(PRICE_URL, { signal: AbortSignal.timeout(20000) });
if (!res.ok) throw new Error(`price.json HTTP ${res.status}`);
const data = await res.json();

const incomingQuoteDate = data?.retail?.quoteDate ?? null;
/**
 * --force: 고시일이 그대로여도 기사를 다시 쓴다.
 * 생성기 문장·계산을 고친 날, 이미 발행된 오늘 기사에도 수정본을 반영할 때 쓴다.
 * 예약 실행에는 붙지 않으므로 평소 동작은 그대로다.
 */
const FORCE = process.argv.includes("--force");
if (FORCE) console.log("--force: 기존 기사가 있어도 다시 생성합니다");
if (existingQuoteDate !== null && !FORCE) {
  if (incomingQuoteDate && incomingQuoteDate !== existingQuoteDate) {
    console.log(
      `기사 정정: 고시일 ${existingQuoteDate} → ${incomingQuoteDate} — 같은 날짜 기사를 새 숫자로 다시 씁니다`
    );
  } else {
    console.log(`이미 존재하고 고시일(${existingQuoteDate}) 변동 없음 — 생성 생략`);
    process.exit(0);
  }
}

const items = data?.retail?.items ?? [];
const find = (k) => items.find((it) => it.key === k);
const g24 = find("gold24");
const buy = g24?.userBuy;
const sell = g24?.userSell;
if (!buy?.price || !sell?.price) {
  throw new Error("순금 24K 살 때/팔 때 값이 없음 — 기사 생성 중단");
}

const kd = korDate(today);
const quoteKd = korDate(data.retail?.quoteDate) || kd;
const dayNum = Number(today.slice(8, 10)); // 리드 문장 순환용

/* ── 파생 수치 (전부 데이터에서 계산) ──
 *
 * 등락률은 전일가를 분모로 쓴다. 하락일 때 전일가는 price + change 이고,
 * 상승일 때는 price - change 다. (예전 코드는 방향 구분 없이 price - change 로
 * 계산해 하락일에 등락률이 부풀려졌다.)
 */
const prevOf = (q) => (q.dir === "down" ? q.price + q.change : q.price - q.change);
const pctOf = (q) => {
  const p = prevOf(q);
  return q.change && p > 0 ? ((q.change / p) * 100).toFixed(2) : null;
};
const buyPct = pctOf(buy);
const sellPct = pctOf(sell);

/** 살 때 고시가는 부가세 별도다. 소비자가 실제 결제하는 금액은 10%가 더해진 값. */
const buyIncl = Math.round(buy.price * 1.1);
const gap = buy.price - sell.price;                 // 고시가끼리의 차이(부가세 별도)
const gapPct = ((gap / buy.price) * 100).toFixed(1);
const realGap = buyIncl - sell.price;               // 소비자가 체감하는 실제 간격
const realGapPct = ((realGap / buyIncl) * 100).toFixed(1);
const buyPerGram = won(buy.price / GRAM_PER_DON);
const sellPerGram = won(sell.price / GRAM_PER_DON);

const moveWord = (q) =>
  q.change === 0 || q.dir === "none"
    ? "전일과 같다"
    : `${won(Math.abs(q.change))}원 ${q.dir === "up" ? "올랐다" : "내렸다"}`;
/** 연결형: "24,000원 내렸고" */
const moveConn = (q) =>
  q.change === 0 || q.dir === "none"
    ? "전일과 같고"
    : `${won(Math.abs(q.change))}원 ${q.dir === "up" ? "올랐고" : "내렸고"}`;
/** "24,000원 내렸다(2.95%)" 형태 */
const moveFull = (q, p) =>
  q.change === 0 || q.dir === "none" ? "전일과 같다" : `${moveWord(q)}${p ? `(${p}%)` : ""}`;
/**
 * 살 때·팔 때 등락을 한 문장으로. 방향이 같으면 동사를 한 번만 써서
 * "…내렸다"가 두 번 반복되는 어색함을 없앤다.
 */
const moveBoth = () => {
  const amt = (q, p) => `${won(Math.abs(q.change))}원${p ? `(${p}%)` : ""}`;
  const moved = (q) => q.change !== 0 && q.dir !== "none";
  if (!moved(buy) && !moved(sell)) return "살 때와 팔 때 모두 전일과 같다";
  if (moved(buy) && moved(sell) && buy.dir === sell.dir) {
    const verb = buy.dir === "up" ? "올랐다" : "내렸다";
    return `전일 대비 살 때는 ${amt(buy, buyPct)}, 팔 때는 ${amt(sell, sellPct)} ${verb}`;
  }
  // 방향이 다르거나 한쪽만 움직인 날
  const conn = (q, p) =>
    moved(q) ? `${amt(q, p)} ${q.dir === "up" ? "올랐고" : "내렸고"}` : "변동이 없고";
  const end = (q, p) =>
    moved(q) ? `${amt(q, p)} ${q.dir === "up" ? "올랐다" : "내렸다"}` : "변동이 없다";
  return `전일 대비 살 때는 ${conn(buy, buyPct)}, 팔 때는 ${end(sell, sellPct)}`;
};

/* ── 리드: 날짜에 따라 순환 (매일 같은 문장 반복 방지) ── */
const LEADS = [
  `${kd} 순금 24K 한 돈은 살 때 ${won(buy.price)}원, 팔 때 ${won(sell.price)}원이다. ` +
    `살 때 고시가는 부가세가 빠진 금액이라 매장에서 실제 내는 돈은 ${won(buyIncl)}원이고, ` +
    `같은 금을 오늘 팔면 ${won(sell.price)}원을 받는다. 두 금액이 ${won(realGap)}원이나 ` +
    `벌어지는 이유부터 정리했다.`,
  `금을 사려는 사람과 팔려는 사람이 보는 숫자는 다르다. ${kd} 기준 순금 한 돈은 ` +
    `살 때 ${won(buy.price)}원(부가세 포함 ${won(buyIncl)}원), 팔 때 ${won(sell.price)}원이다. ` +
    `전일과 비교하면 살 때는 ${moveConn(buy)} 팔 때는 ${moveWord(sell)}.`,
  `${kd} 순금 한 돈 매입가는 ${won(sell.price)}원이다. 반지든 골드바든 오늘 팔면 이 값이 ` +
    `기준이 되고, 반대로 사려면 부가세까지 ${won(buyIncl)}원이 든다. 18K·14K 매입가와 ` +
    `도매·국제 시세까지 오늘 숫자를 한자리에 모았다.`,
];
const lead = LEADS[dayNum % LEADS.length];

/* ── 섹션 구성 ──
 * 소제목만 읽어도 핵심 숫자가 전달되도록 제목에 값을 넣는다.
 */
const sections = [];

// 1. 순금 24K
{
  sections.push({
    heading: `순금 한 돈 살 때 ${won(buyIncl)}원, 팔 때 ${won(sell.price)}원`,
    paragraphs: [
      `종로금거래소 ${quoteKd} 고시 기준 순금(24K) 1돈(3.75g)은 살 때 ${won(buy.price)}원, ` +
        `팔 때 ${won(sell.price)}원이다. ${moveBoth()}.`,
      `여기서 살 때 ${won(buy.price)}원은 부가가치세가 빠진 고시가다. 매장에서 실제 결제하는 ` +
        `금액은 부가세 10%가 더해진 ${won(buyIncl)}원이다. 다른 곳에서 본 시세와 숫자가 ` +
        `다르다면 대개 이 기준 차이 때문이다. 그램으로 환산하면 1g당 살 때 ${buyPerGram}원, ` +
        `팔 때 ${sellPerGram}원이라 소량 거래는 그램 기준으로 따져보는 편이 정확하다.`,
    ],
  });
}

// 1-2. 왜 움직였나 — 국제 시세 × 환율로 오늘 등락을 분해한다.
//      해석을 지어내지 않고, 이미 수집한 숫자만으로 계산되는 인과만 쓴다.
{
  const ig = data.intl?.gold;
  const fxPct = typeof data.fx?.changePct === "number" ? data.fx.changePct : null;
  const intlPct = typeof ig?.changePct === "number" ? ig.changePct : null;

  if (intlPct !== null && fxPct !== null) {
    // 원화 금값 ≈ 달러 금값 × 환율 → 두 변동률을 곱하면 이론 변동률이 나온다.
    const theory = ((1 + intlPct / 100) * (1 + fxPct / 100) - 1) * 100;
    const actual = buyPct
      ? buy.dir === "down"
        ? -Number(buyPct)
        : Number(buyPct)
      : 0;
    const diff = actual - theory;

    const sign = (v) => (v > 0 ? "상승" : v < 0 ? "하락" : "보합");
    const signVerb = (v) => (v > 0 ? "올랐고" : v < 0 ? "내렸고" : "움직이지 않았고");
    /** 2.80 → "2.8", 0.50 → "0.5" (불필요한 0 제거) */
    const abs1 = (v) => Number(Math.abs(v).toFixed(2)).toString();
    /** 부호를 앞에 붙인 표기: -2.95 → "-2.95%" */
    const pctStr = (v) => `${v >= 0 ? "+" : "-"}${abs1(v)}%`;
    /** 환율은 소수점이 의미 있다: 7.5원을 8원으로 반올림하지 않는다 */
    const fxWon = Number(Math.abs(data.fx.change ?? 0).toFixed(2)).toLocaleString("ko-KR");

    const domesticWord =
      actual > 0 ? "오른" : actual < 0 ? "내린" : "움직이지 않은";

    const paras = [];

    paras.push(
      `국내 금값은 국제 금값과 원/달러 환율 두 가지로 움직인다. 달러로 매겨진 금값에 ` +
        `환율을 곱해야 원화 값이 나오기 때문이다. 오늘은 국제 금값이 ${abs1(intlPct)}% ` +
        `${signVerb(intlPct)} 원/달러 환율도 ${fxWon}원(${abs1(fxPct)}%) ` +
        `${sign(fxPct)}했다.`
    );

    /* 이론치와 실제치의 관계를 사람 말로 옮긴다. 부호 조합마다 표현이 다르다. */
    let compareWord;
    if (Math.abs(diff) < 0.05) compareWord = "계산값과 사실상 같았다";
    else if (actual < 0 && theory < 0)
      compareWord = `계산값(${pctStr(theory)})보다 하락폭이 ${abs1(diff)}%p ${diff > 0 ? "작았다" : "컸다"}`;
    else if (actual > 0 && theory > 0)
      compareWord = `계산값(${pctStr(theory)})보다 상승폭이 ${abs1(diff)}%p ${diff > 0 ? "컸다" : "작았다"}`;
    else compareWord = `계산값(${pctStr(theory)})과 방향이 달랐다`;

    paras.push(
      `두 변동을 곱하면 원화 기준 금값은 이론상 ${pctStr(theory)} 수준이 된다. 실제 ` +
        `종로금거래소 고시가는 ${pctStr(actual)}로, ${compareWord}. 국제 시세는 24시간 ` +
        `움직이지만 국내 고시가는 하루 한 번 정해지므로 반영에 시차가 있고, 국내 실물 수급도 ` +
        `이 차이에 함께 반영된다.`
    );

    paras.push(
      `그래서 국제 금값이 내려도 환율이 그만큼 오르면 국내 금값은 잘 안 내린다. 반대로 ` +
        `국제 금값과 환율이 같은 방향으로 움직인 날은 국내 체감 변동이 커진다. 오늘은 ` +
        `${
          Math.abs(intlPct) < 0.05 || Math.abs(fxPct) < 0.05
            ? "한쪽이 거의 움직이지 않아 다른 한쪽이 값을 끌고 간"
            : intlPct * fxPct > 0
              ? "두 요인이 같은 방향이라 변동이 그대로 전달된"
              : "두 요인이 반대 방향이라 일부가 상쇄된"
        } 날이다.`
    );

    sections.push({
      heading:
        actual === 0
          ? `국제 금값 ${abs1(intlPct)}% ${sign(intlPct)}, 환율 ${fxWon}원 ${sign(fxPct)}`
          : `오늘 금값이 ${domesticWord} 이유 — 국제 금값 ${abs1(intlPct)}% ${sign(intlPct)}, 환율 ${fxWon}원 ${sign(fxPct)}`,
      paragraphs: paras,
    });
  }
}

// 2. 18K·14K
{
  const g18 = find("gold18")?.userSell;
  const g14 = find("gold14")?.userSell;
  if (g18?.price && g14?.price) {
    sections.push({
      heading: `18K ${won(g18.price)}원 · 14K ${won(g14.price)}원 — 제품 금 매입가`,
      paragraphs: [
        `장롱에 있는 반지나 목걸이를 정리한다면 순금 시세보다 이 값이 기준이 된다. 오늘 ` +
          `18K 1돈 매입가는 ${won(g18.price)}원, 14K는 ${won(g14.price)}원이다.`,
        `18K·14K에 살 때 가격이 없는 것은 제품 금이 세공비가 포함된 제품 시세로 팔리기 ` +
          `때문이다. 같은 무게라도 디자인과 매장에 따라 값이 달라져 하나의 고시가로 ` +
          `묶이지 않는다. 반대로 팔 때는 순도와 실중량으로만 계산하므로 위 매입가가 기준선이다.`,
      ],
    });
  }
}

// 3. 백금·은
{
  const pt = find("platinum");
  const ag = find("silver");
  if (pt?.userSell?.price && ag?.userSell?.price) {
    sections.push({
      heading: `백금 ${won(pt.userSell.price)}원 · 은 ${won(ag.userSell.price)}원`,
      paragraphs: [
        `백금 1돈 매입가는 ${won(pt.userSell.price)}원` +
          `${pt.userBuy?.price ? `, 살 때는 ${won(pt.userBuy.price)}원(부가세 별도)` : ""}이다. ` +
          `은 1돈은 매입가 ${won(ag.userSell.price)}원` +
          `${ag.userBuy?.price ? `, 살 때 ${won(ag.userBuy.price)}원(부가세 별도)` : ""}으로 ` +
          `단가가 낮아 그램이나 킬로그램 단위로 거래되는 경우가 많다.`,
        `여기 매입가는 일반 백금·은 제품을 기준으로 고시된 값이다. 업체가 자사 브랜드 ` +
          `바(bar)를 되사는 가격은 따로 두는 곳이 있어, 다른 곳에서 더 높은 매입가를 봤다면 ` +
          `기준이 다른 숫자일 수 있다. 순금·18K·14K와 달리 백금과 은은 업체별 편차가 크므로 ` +
          `실제 거래 전에 해당 매장의 적용 기준을 확인하는 편이 안전하다.`,
      ],
    });
  }
}

// 4. KRX 도매 + 국제
{
  const krx = data.krx?.latest;
  const ig = data.intl?.gold;
  const paras = [];
  if (krx?.krwPerGram) {
    const dirWord = krx.change > 0 ? "오른" : krx.change < 0 ? "내린" : "보합인";
    paras.push(
      `소매가의 바탕이 되는 도매 시장을 보면, 한국거래소(KRX) 금시장은 ${korDate(krx.date)} ` +
        `1g당 ${won(krx.krwPerGram)}원에 마감했다. 전 거래일보다 ${won(Math.abs(krx.change))}원 ` +
        `${dirWord} 수준으로 등락률은 ${krx.changePct}%, 한 돈으로 환산하면 ${won(krx.krwPerDon)}원이다. ` +
        `금융위원회가 공공데이터포털에 공개하는 전 영업일 종가이며 하루 한 번 갱신된다.`
    );
  }
  if (ig?.usdPerOz && data.fx?.usdkrw) {
    const dirWord = ig.dir === "up" ? "올랐다" : ig.dir === "down" ? "내렸다" : "보합이다";
    const overPct = ig.krwPerDon ? (((buy.price / ig.krwPerDon) - 1) * 100).toFixed(1) : null;
    paras.push(
      `국제 금값은 COMEX 선물 기준 트로이온스당 ${ig.usdPerOz.toLocaleString("en-US")}달러로 ` +
        `전일 대비 ${Math.abs(ig.changePct)}% ${dirWord}. 원/달러 환율 ${won(data.fx.usdkrw)}원을 ` +
        `적용해 한 돈으로 환산하면 약 ${won(ig.krwPerDon)}원이다.` +
        (overPct ? ` 오늘 국내 고시가(부가세 별도)는 이보다 ${overPct}% 높은 수준이다.` : "") +
        ` 국내가 더 비싼 것은 유통 마진과 부가가치세가 붙기 때문이고, 이 격차가 평소보다 ` +
        `벌어졌는지가 매수 시점을 재는 참고가 된다.`
    );
  }
  if (paras.length) {
    sections.push({
      heading: krx?.krwPerGram
        ? `KRX 도매 1g ${won(krx.krwPerGram)}원, 국제 금값 ${ig?.usdPerOz ? `${ig.usdPerOz.toLocaleString("en-US")}달러` : "동향"}`
        : `국제 금값 동향`,
      paragraphs: paras,
    });
  }
}

// 5. 실제 간격 + 계산기 안내
{
  sections.push({
    heading: `부가세까지 넣으면 실제 차이는 ${won(realGap)}원`,
    paragraphs: [
      `오늘 사서 오늘 되판다고 가정해 보자. 실제 결제액 ${won(buyIncl)}원에 매입가 ` +
        `${won(sell.price)}원이니 한 돈에 ${won(realGap)}원, 약 ${realGapPct}%가 비용으로 남는다. ` +
        `실물 금은 시세가 이만큼 오른 뒤에야 본전이라는 뜻이다.`,
      `고시가끼리만 비교하면 차이가 ${won(gap)}원(${gapPct}%)으로 보인다. 하지만 살 때는 ` +
        `부가세를 내고 팔 때는 돌려받지 못하므로, 실제로 체감하는 간격은 위쪽 숫자다. 시세 ` +
        `그래프만 보고 판단하면 이 부분을 놓치기 쉽다.`,
      `내 금이 실제 얼마인지는 중량과 순도에 따라 달라진다. 아래 금 계산기에 무게를 넣으면 ` +
        `오늘 고시가로 바로 환산되니, 매장에 가기 전에 기준 금액을 확인해 두면 협상이 쉬워진다.`,
    ],
  });
}

const doc = {
  date: today,
  title: `오늘의 금시세(금값) 살 때 팔 때 계산기까지 — ${kd}`,
  description:
    `${kd} 순금 24K 한 돈 살 때 ${won(buy.price)}원(부가세 포함 ${won(buyIncl)}원), ` +
    `팔 때 ${won(sell.price)}원. 18K·14K 매입가와 KRX 도매 종가, 국제 금값, 금 계산기까지 한 번에 확인하세요.`,
  updatedAt: data.updatedAt ?? null,
  quoteDate: data.retail?.quoteDate ?? today,
  retail: data.retail ?? null,
  krx: data.krx?.latest ? { latest: data.krx.latest, note: data.krx?.note ?? null } : null,
  fx: data.fx ?? null,
  intl: data.intl ?? null,
  lead,
  sections,
  // 구버전 렌더러 호환: 섹션을 평문단으로도 펼쳐둔다
  paragraphs: [lead, ...sections.flatMap((s) => s.paragraphs)],
  sources: [
    "종로금거래소 고시가 (https://www.jongrogx.com)",
    "한국거래소 KRX 금시장 — 금융위원회·공공데이터포털",
    "국제 시세·환율 — Yahoo Finance",
  ],
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n", "utf8");
console.log(`생성: ${outPath} (섹션 ${sections.length}개)`);

/* ─────────────────────────── 카페 원고 ───────────────────────────
 *
 * 같은 데이터로 네이버 카페용 원고(.md)를 함께 만든다.
 * 같은 디렉토리에 두면 워크플로의 `git add src/data/gold-news` 에 함께 잡힌다.
 * 파일명이 cafe-*.md 라 페이지 라우트(YYYY-MM-DD.json 만 인식)에는 영향이 없다.
 */

const g18s = find("gold18")?.userSell;
const g14s = find("gold14")?.userSell;
const pt = find("platinum");
const ag = find("silver");
const ig = data.intl?.gold;

// 후킹 도입부 — 날짜별 순환
const HOOKS = [
  `순금 한 돈을 사려니 얼마고, 막상 팔면 얼마나 손에 쥘지 헷갈리셨죠. 저도 예물 반지를 정리하려다 ` +
    `살 때와 팔 때 값이 부가세까지 넣으면 한 돈에 ${won(realGap)}원이나 벌어진다는 걸 알고 한참을 다시 계산했습니다.`,
  `금값이 오른다는 얘기는 계속 들리는데, 정작 오늘 내 금이 얼마인지는 검색해도 제각각이라 헷갈리셨을 겁니다. ` +
    `기준이 되는 고시가부터 정확히 보고 시작하는 게 빠릅니다.`,
  `장롱 속 반지 하나 팔러 갔다가 생각보다 적은 금액에 놀라신 적 있으신가요. 살 때 가격과 팔 때 가격은 ` +
    `애초에 다른 숫자이고, 부가세까지 더하면 오늘은 그 차이가 한 돈에 ${won(realGap)}원입니다.`,
];
const hook = HOOKS[dayNum % HOOKS.length];

const cafeTitles = [
  `오늘 금시세 (금값) 순금 1돈 가격 (${today.slice(0, 4)}년 ${kd}) 살때 팔때`,
  `오늘 금시세 순금 한 돈 살 때 팔 때, ${kd} 금값 총정리`,
  `금값 오늘 시세 (${kd}) 순금 1돈 살때 ${won(buy.price)}원 팔때 ${won(sell.price)}원`,
];

const cafeLines = [];
cafeLines.push(`## 제목 (하나 골라서 사용)`, ``);
cafeTitles.forEach((t, i) => cafeLines.push(`${i + 1}. ${t}`));
cafeLines.push(``, `---`, ``, `## 본문`, ``);

cafeLines.push(
  `${hook} 오늘 시세만 정확히 알고 움직여도 몇만원은 아낄 수 있으니, ${kd} 순금 1돈 살 때·팔 때 ` +
    `가격부터 함께 확인해 보겠습니다.`,
  ``,
  ``,
  `더 자세한 내용을 빠르게 확인해보세요`,
  ``,
  `▼ ▼ ▼`,
  ``,
  `👉 오늘 순금 1돈 실시간 시세 바로 확인하기`,
  `https://www.jjyu.co.kr/gold`,
  ``,
  ``,
  `### 오늘 순금 1돈 가격 (살 때·팔 때 기준가)`,
  ``,
  `종로금거래소 고시 기준, 오늘 ${kd} 순금(24K) 1돈(3.75g) 가격은 살 때 ${won(buy.price)}원, ` +
    `팔 때 ${won(sell.price)}원입니다. 그램 단위로는 1g당 살 때 약 ${buyPerGram}원, 팔 때 약 ` +
    `${sellPerGram}원이니 소량 거래라면 그램 시세로 계산해 두는 편이 정확합니다.`,
  ``,
  `여기서 살 때 ${won(buy.price)}원은 부가가치세 별도로 고시된 금액입니다. 실제 매장에서 결제할 때는 ` +
    `부가세 10%가 더해져 약 ${won(buy.price * 1.1)}원 수준이 되므로, 다른 곳 시세와 비교할 때 부가세 ` +
    `포함인지 별도인지부터 확인해야 착각을 피할 수 있습니다.`,
  ``
);

if (g18s?.price && g14s?.price) {
  cafeLines.push(
    `### 18K·14K 금시세와 살 때 팔 때 차이`,
    ``,
    `집에 있는 금을 팔 계획이라면 함량별 매입가가 더 중요합니다. 오늘 18K 1돈은 팔 때 ` +
      `${won(g18s.price)}원, 14K 1돈은 팔 때 ${won(g14s.price)}원입니다. 18K·14K는 순금이 아니라 ` +
      `세공비가 붙는 제품 시세로 판매되기 때문에 살 때 가격이 별도로 표기되지 않는다는 점만 기억하면 됩니다.`,
    ``,
    `순금 고시가만 보면 살 때 ${won(buy.price)}원, 팔 때 ${won(sell.price)}원으로 한 돈에 ` +
      `${won(gap)}원(${gapPct}%) 차이입니다. 그런데 살 때 가격은 부가세 별도라, 실제로는 ` +
      `${won(buyIncl)}원을 내고 사서 ${won(sell.price)}원에 팔게 됩니다. 체감하는 간격은 ` +
      `한 돈에 ${won(realGap)}원, 약 ${realGapPct}%입니다.`,
    ``,
    `오늘 사서 오늘 되팔면 이 ${won(realGap)}원이 고스란히 비용입니다. 부가세는 살 때 내고 ` +
      `팔 때 돌려받지 못하기 때문에, 실물 금은 시세가 이만큼 올라야 본전에 도달합니다.`,
    ``
  );
}

if (pt?.userSell?.price && ag?.userSell?.price) {
  const intlLine =
    ig?.usdPerOz && ig.krwPerDon
      ? `국제 금값은 온스당 ${ig.usdPerOz.toLocaleString("en-US")}달러 선으로 전일 대비 ` +
        `${Math.abs(ig.changePct)}% ${ig.dir === "up" ? "올랐고" : ig.dir === "down" ? "내렸고" : "보합이고"}, ` +
        `국내 환산으로는 한 돈에 약 ${won(ig.krwPerDon)}원 수준입니다. 국내 소매가가 이보다 높은 것은 ` +
        `유통 마진과 부가가치세가 더해지기 때문입니다.`
      : "";
  cafeLines.push(
    `### 백금·은 시세와 국제 금값 흐름`,
    ``,
    `금과 함께 움직이는 백금·은 시세도 참고하면 판단이 쉬워집니다. 오늘 백금 1돈은 ` +
      `${pt.userBuy?.price ? `살 때 ${won(pt.userBuy.price)}원, ` : ""}팔 때 ${won(pt.userSell.price)}원, ` +
      `은 1돈은 ${ag.userBuy?.price ? `살 때 ${won(ag.userBuy.price)}원, ` : ""}팔 때 ` +
      `${won(ag.userSell.price)}원입니다. 은은 단가가 낮아 그램·킬로그램 단위 거래가 많으니 수량을 ` +
      `넉넉히 잡고 확인하는 편이 좋습니다.`,
    ``,
    `한 가지만 짚어두면, 백금·은 매입가는 일반 제품 기준입니다. 자사 브랜드 바를 따로 ` +
      `더 높게 매입하는 곳도 있어서 사이트마다 숫자가 다르게 보일 수 있습니다. 순금·18K·14K는 ` +
      `기준이 같아 어디서 보셔도 값이 비슷하지만, 백금과 은은 매장 기준을 꼭 확인하세요.`,
    ``,
    intlLine,
    ``
  );
}

cafeLines.push(
  `### 금 살 때 팔 때, 수수료·세금 손해 줄이는 법`,
  ``,
  `같은 금이라도 어떻게 사고파느냐에 따라 실수령액이 크게 달라집니다. 실물 골드바는 살 때 부가세 10%에 ` +
    `매장 수수료가 붙어, 시세가 최소 15% 이상 올라야 본전에 이릅니다. 반면 KRX 금시장은 계좌 안에서만 ` +
    `거래하면 매매차익 세금이 면제되고 온라인 수수료도 낮은 편입니다.`,
  ``,
  `금 통장은 매매차익에 배당소득세 15.4%가 붙는 점을 함께 따져야 합니다. 실물이 꼭 필요하면 부가세와 ` +
    `수수료를 감안해 되팔 시점의 시세 폭을 넉넉히 잡고, 차익이 목적이라면 세금 부담이 낮은 방식을 ` +
    `우선 검토하는 게 손해를 줄이는 길입니다.`,
  ``,
  ``,
  `오늘 ${kd} 순금 1돈은 살 때 ${won(buy.price)}원, 팔 때 ${won(sell.price)}원으로 한 돈에 ` +
    `${won(gap)}원이 벌어집니다.${
      g18s?.price && g14s?.price
        ? ` 함량별로는 18K가 팔 때 ${won(g18s.price)}원, 14K가 ${won(g14s.price)}원이니 팔 계획이라면 함량부터 확인하세요.`
        : ""
    } 파는 곳만 바꿔도 한 돈에 몇만원이 갈리는 만큼, 여러 매입처의 시세를 비교하고 거래 시점을 정하는 ` +
    `습관이 결국 이득으로 이어집니다.`,
  ``,
  `내 금이 얼마인지 무게만 넣으면 바로 계산됩니다`,
  `👉 https://www.jjyu.co.kr/gold/calculator`,
  ``
);

const cafePath = path.join(OUT_DIR, `cafe-${today}.md`);
fs.writeFileSync(cafePath, cafeLines.join("\n"), "utf8");
console.log(`카페 원고 생성: ${cafePath}`);
