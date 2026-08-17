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
const OUT_DIR = process.argv[2] || "src/data/gold-news";
const GRAM_PER_DON = 3.75;

const won = (n) => Math.round(n).toLocaleString("ko-KR");
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const korDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : "";
};

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

/* ── 파생 수치 (전부 데이터에서 계산) ── */
const buyPct =
  buy.change && buy.price - buy.change > 0
    ? ((buy.change / (buy.price - buy.change)) * 100).toFixed(2)
    : null;
const sellPct =
  sell.change && sell.price - sell.change > 0
    ? ((sell.change / (sell.price - sell.change)) * 100).toFixed(2)
    : null;
const gap = buy.price - sell.price;
const gapPct = ((gap / buy.price) * 100).toFixed(1);
const buyPerGram = won(buy.price / GRAM_PER_DON);
const sellPerGram = won(sell.price / GRAM_PER_DON);

const moveEnd = (q) =>
  q.dir === "up" ? "올랐다" : q.dir === "down" ? "내렸다" : "전일과 같다";
const moveWord = (q) =>
  q.change === 0 || q.dir === "none"
    ? "보합"
    : `${won(Math.abs(q.change))}원 ${q.dir === "up" ? "상승" : "하락"}`;

/* ── 리드: 날짜에 따라 순환 (매일 같은 문장 반복 방지) ── */
const LEADS = [
  `순금 한 돈을 사려면 얼마가 필요하고, 갖고 있는 금을 팔면 얼마를 손에 쥘 수 있을까. ` +
    `${kd} 기준으로 두 가격의 차이는 한 돈에 ${won(gap)}원이다. 오늘 시세를 정확히 알고 ` +
    `움직이면 같은 거래에서도 몇만 원이 달라진다.`,
  `금값이 궁금해서 검색했다면 결론부터 보자. ${kd} 순금 24K 한 돈은 살 때 ${won(buy.price)}원, ` +
    `팔 때 ${won(sell.price)}원이다. 그런데 이 두 숫자의 차이가 왜 ${won(gap)}원이나 나는지, ` +
    `내 금은 실제로 얼마를 받을 수 있는지는 표만 봐서는 알기 어렵다. 오늘 기준으로 하나씩 짚어본다.`,
  `예물을 정리하려는 사람도, 골드바를 사려는 사람도 결국 궁금한 건 하나다 — 오늘 한 돈에 얼마인가. ` +
    `${kd} 고시가를 살 때와 팔 때로 나눠 정리하고, 도매·국제 시세까지 한 번에 확인한다.`,
];
const lead = LEADS[dayNum % LEADS.length];

/* ── 섹션 구성 ── */
const sections = [];

// 1. 순금 24K
{
  const paras = [
    `먼저 기준이 되는 순금부터 보자. ${kd} 순금(24K) 1돈(3.75g)은 살 때 ${won(buy.price)}원, ` +
      `팔 때 ${won(sell.price)}원이다(종로금거래소 ${quoteKd} 고시). 살 때 가격은 전일 대비 ` +
      `${moveWord(buy)}${buyPct && buy.dir !== "none" ? `(${buyPct}%)` : ""}이고, 팔 때 가격은 ` +
      `${moveWord(sell)}${sellPct && sell.dir !== "none" ? `(${sellPct}%)` : ""}이다.`,
    `그램 단위로 환산하면 1g당 살 때 약 ${buyPerGram}원, 팔 때 약 ${sellPerGram}원이다. ` +
      `소량 거래라면 그램 시세로 계산해 두는 편이 정확하다. 한 가지 주의할 점은 살 때 가격이 ` +
      `부가가치세 별도로 고시된다는 것이다. 매장에서 실제로 내는 금액은 여기에 부가세 10%가 ` +
      `더해지므로, 견적을 비교할 때 이 기준부터 맞춰야 착각을 피할 수 있다.`,
  ];
  sections.push({ heading: `오늘 순금 1돈 살 때·팔 때 가격`, paragraphs: paras });
}

// 2. 18K·14K
{
  const g18 = find("gold18")?.userSell;
  const g14 = find("gold14")?.userSell;
  if (g18?.price && g14?.price) {
    sections.push({
      heading: `18K·14K 제품 금은 얼마에 매입되나`,
      paragraphs: [
        `집에 있는 반지나 목걸이를 팔 계획이라면 순금보다 이쪽이 더 중요하다. 오늘 18K 1돈은 ` +
          `팔 때 ${won(g18.price)}원, 14K 1돈은 팔 때 ${won(g14.price)}원이다. 18K·14K의 살 때 ` +
          `가격이 따로 표기되지 않는 이유는, 제품 금은 세공비가 붙는 제품 시세로 판매되어 매장과 ` +
          `디자인에 따라 값이 달라지기 때문이다. 파는 쪽 기준으로는 위 매입가가 오늘의 기준선이 된다.`,
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
      heading: `백금·은 시세도 함께 확인`,
      paragraphs: [
        `금과 함께 움직이는 귀금속 시세도 참고하면 판단이 쉬워진다. 오늘 백금 1돈은 팔 때 ` +
          `${won(pt.userSell.price)}원${pt.userBuy?.price ? `, 살 때 ${won(pt.userBuy.price)}원` : ""}이고, ` +
          `은 1돈은 팔 때 ${won(ag.userSell.price)}원${ag.userBuy?.price ? `, 살 때 ${won(ag.userBuy.price)}원` : ""}이다. ` +
          `은은 단가가 낮아 그램·킬로그램 단위로 거래되는 일이 많으니 수량을 넉넉히 잡고 계산하는 편이 좋다.`,
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
      `한편 소매가의 바탕이 되는 도매 시장을 보면, 한국거래소(KRX) 금시장은 ${korDate(krx.date)} ` +
        `1g당 ${won(krx.krwPerGram)}원에 마감했다. 전 거래일보다 ${won(Math.abs(krx.change))}원 ` +
        `${dirWord} 수준으로 등락률은 ${krx.changePct}%였고, 한 돈으로 환산하면 ${won(krx.krwPerDon)}원이다. ` +
        `이 수치는 금융위원회가 공공데이터포털에 공개하는 전 영업일 종가로, 하루 1회 갱신된다.`
    );
  }
  if (ig?.usdPerOz && data.fx?.usdkrw) {
    const dirWord = ig.dir === "up" ? "상승했다" : ig.dir === "down" ? "하락했다" : "보합이다";
    paras.push(
      `시야를 국제 시장으로 넓히면, 국제 금값은 트로이온스당 ${ig.usdPerOz.toLocaleString("en-US")}달러로 ` +
        `전일 대비 ${Math.abs(ig.changePct)}% ${dirWord}. 원/달러 환율 ${won(data.fx.usdkrw)}원을 적용해 ` +
        `한 돈으로 환산하면 약 ${won(ig.krwPerDon)}원이다. 국내 소매가가 이보다 높은 것은 유통 마진과 ` +
        `부가가치세가 더해지기 때문이며, 그 간격이 평소보다 크게 벌어졌는지가 매수 타이밍을 재는 참고점이 된다.`
    );
  }
  if (paras.length) {
    sections.push({ heading: `KRX 도매 종가와 국제 금값 흐름`, paragraphs: paras });
  }
}

// 5. 차이·본전 계산 + 계산기 안내
{
  sections.push({
    heading: `살 때 팔 때 ${won(gap)}원 차이, 오늘 팔면 얼마 받나`,
    paragraphs: [
      `정리하면 오늘 살 때와 팔 때의 간격은 한 돈에 ${won(gap)}원, 살 때 가격의 약 ${gapPct}%다. ` +
        `오늘 사서 오늘 되판다면 그만큼이 고스란히 비용이라는 뜻이고, 실물 금은 시세가 이 간격 ` +
        `이상 올라야 본전에 도달한다. 실물 보유가 목적이 아니라면 이 차이를 감안해 거래 방식을 ` +
        `고르는 것이 손해를 줄이는 길이다.`,
      `내 금이 실제로 얼마인지는 중량과 순도에 따라 달라진다. 아래 금 계산기에 무게만 입력하면 ` +
        `오늘 고시가 기준으로 바로 계산되니, 매장에 가기 전에 기준 금액을 확인해 두자. 여러 매입처 ` +
        `시세를 비교하는 습관이 결국 한 돈에 몇만 원을 아끼는 방법이다.`,
    ],
  });
}

const doc = {
  date: today,
  title: `오늘의 금시세(금값) 살 때 팔 때 계산기까지 — ${kd}`,
  description:
    `${kd} 순금 24K 한 돈 살 때 ${won(buy.price)}원, 팔 때 ${won(sell.price)}원. ` +
    `18K·14K 매입가, KRX 도매 종가, 국제 금값과 금 계산기까지 한눈에 정리했습니다.`,
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
    `살 때와 팔 때 값이 한 돈에 ${won(gap)}원이나 벌어진다는 걸 알고 한참을 다시 계산했습니다.`,
  `금값이 오른다는 얘기는 계속 들리는데, 정작 오늘 내 금이 얼마인지는 검색해도 제각각이라 헷갈리셨을 겁니다. ` +
    `기준이 되는 고시가부터 정확히 보고 시작하는 게 빠릅니다.`,
  `장롱 속 반지 하나 팔러 갔다가 생각보다 적은 금액에 놀라신 적 있으신가요. 살 때 가격과 팔 때 가격은 ` +
    `애초에 다른 숫자이고, 오늘은 그 차이가 한 돈에 ${won(gap)}원입니다.`,
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
    `순금은 살 때 ${won(buy.price)}원, 팔 때 ${won(sell.price)}원으로 한 돈에 ${won(gap)}원, ` +
      `약 ${gapPct}%의 차이가 납니다. 오늘 사서 오늘 되팔면 그만큼이 고스란히 비용이라는 뜻이라, ` +
      `실물 금은 시세가 이 간격 이상 올라야 본전에 도달합니다.`,
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
