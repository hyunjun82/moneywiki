/**
 * 금시세 기사의 해석 문단 — 모델이 쓴다 (2026-09-21).
 *
 * 왜: 조립식 문장은 숫자가 틀릴 일이 없지만 매일 같은 골격에 숫자만 바뀐다("살 때는 5,000원 내렸고 팔 때는 2,000원 내렸다").
 *     사용자 판정 — "자동화가 중요한 게 아니라 품질이 좋아야 노출된다". 숫자는 계속 조립기가 고르고,
 *     리드·왜 움직였나·오늘 어떻게 읽나 세 부분의 문장만 모델이 쓴다.
 *
 * 원칙:
 *  - 구독 `claude -p` 로만 부른다(scripts/lib/headless.mjs — ANTHROPIC_API_KEY 가 있으면 시작하지 않는다).
 *    모델은 기본 opus. 사용자가 "글쓰기에 Fable 은 쓰지 않는다"고 했다. GOLD_NEWS_MODEL 또는 --model 로 바꾼다.
 *  - 모델 답의 숫자는 전부 [사실] 목록에 있는 것이어야 한다. 하나라도 없으면 위반 목록을 붙여 한 번 더 시키고,
 *    그래도 틀리면 모델 문단을 버리고 조립 문장 그대로 낸다. 발행은 어떤 경우에도 막지 않는다.
 *  - 전망·권유·과장(폭등·기회·사야 한다·전망) 금지 — AdSense·YMYL. 정규식으로 잡는다.
 *  - CI(GitHub Actions 예비 워크플로)에는 claude 가 없다 → 조립 문장으로 낸다.
 */
import { ask, extractJson } from "../../lib/headless.mjs";

/* 사실 목록에 없어도 되는 숫자: 날짜·순도·단위·연도 */
const FREE = new Set([
  ...Array.from({ length: 32 }, (_, i) => String(i)),
  "100", "1000", "10", "24", "18", "14", "3.75", "1.875", "75", "58.5", "30", "365", "12", "52",
  "2024", "2025", "2026", "2027",
]);
const FORBID =
  /(반드시|확실|틀림없|무조건|폭등|폭락|급등|급락|추천|사야 |팔아야 |사세요|파세요|기회|보장|전망|예상|예측|것이다|것으로 보인다|가능성이 (크|높)|!|[\u{1F300}-\u{1FAFF}])/u;

const norm = (t) => {
  let s = t.replace(/,/g, "").replace(/^0+(?=\d)/, "");
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  return s;
};
export function numbersIn(text) {
  const out = new Set();
  for (const m of String(text).matchAll(/\d[\d,]*(?:\.\d+)?/g)) out.add(norm(m[0]));
  return out;
}

/** 조립기의 값으로 [사실] 목록을 만든다. 값이 없는 줄은 뺀다. 표기는 기사와 똑같이(won·pct). */
export function factSheet(f, u) {
  const { won, signed, signedPct, korDate, korDateY } = u;
  const L = [];
  const q = (x) => (x.dir === "none" || !x.change ? "보합" : `${x.dir === "up" ? "▲" : "▼"}${won(x.change)}원(${Math.abs(Math.round((x.change / (x.dir === "down" ? x.price + x.change : x.price - x.change)) * 10000) / 100)}%)`);
  L.push(`기준: 한국금거래소 ${f.quoteKd}${f.round ? ` ${f.round}차` : ""} 고시${f.time ? `(${String(f.time).slice(0, 5)})` : ""}. 살 때는 부가세 10% 포함 결제가, 팔 때는 매입가.`);
  if (f.intraday?.rounds >= 2) L.push(`오늘 고시 ${f.intraday.rounds}차례: 1차(${String(f.intraday.first.time).slice(0, 5)}) 살 때 ${won(f.intraday.first.buy)}원 → ${f.intraday.last.round}차 ${won(f.intraday.last.buy)}원.`);
  L.push(`순금 24K 한 돈(3.75g): 살 때 ${won(f.buyIncl)}원(부가세 ${won(f.vatWon)}원 포함, 부가세 뺀 고시가 ${won(f.buyEx)}원), 팔 때 ${won(f.sell)}원. 전일 대비 살 때 ${q(f.buy)}, 팔 때 ${q(f.sellQ)}.`);
  L.push(`그램당: 살 때 ${won(f.buyPerGram)}원, 팔 때 ${won(f.sellPerGram)}원. 반 돈(1.875g) 팔 때 ${won(f.sell / 2)}원.`);
  if (f.k18 || f.k14) {
    const bits = [];
    if (f.k18) bits.push(`18K 한 돈 팔 때 ${won(f.k18.price)}원(순금 팔 때의 ${Math.round((f.k18.price / f.sell) * 1000) / 10}%)`);
    if (f.k14) bits.push(`14K 한 돈 팔 때 ${won(f.k14.price)}원`);
    L.push(`제품 금 매입가: ${bits.join(", ")}.`);
    const d = f.derived;
    if (d && Number.isFinite(d.k18Theory) && Number.isFinite(d.k18Gap)) L.push(`18K 이론값(순금 팔 때×75%) ${won(d.k18Theory)}원, 실제 고시가 그보다 ${won(Math.abs(d.k18Gap))}원 ${d.k18Gap >= 0 ? "높음" : "낮음"}.`);
  }
  const s = f.stats;
  if (s) {
    L.push(`최근 30일 살 때: 최고 ${won(s.hi30.buy)}원(${korDate(s.hi30.date)}), 최저 ${won(s.lo30.buy)}원(${korDate(s.lo30.date)}). 오늘은 그 범위의 ${s.pos30}% 지점(0%=최저, 100%=최고). 팔 때는 ${won(s.lo30Sell.sell)}~${won(s.hi30Sell.sell)}원.`);
    if (s.covered >= 300) L.push(`최근 1년 살 때: 최고 ${won(s.hi1y.buy)}원(${korDateY(s.hi1y.date)}), 최저 ${won(s.lo1y.buy)}원(${korDateY(s.lo1y.date)}).`);
    const c = [];
    if (s.chg1w) c.push(`1주일 전(${korDate(s.chg1w.from)})보다 ${signed(s.chg1w.won, "원")}(${signedPct(s.chg1w.pct)})`);
    if (s.chg1m) c.push(`한 달 전보다 ${signed(s.chg1m.won, "원")}(${signedPct(s.chg1m.pct)})`);
    if (s.chgYtd) c.push(`올해 초보다 ${signed(s.chgYtd.won, "원")}(${signedPct(s.chgYtd.pct)})`);
    if (s.chg1y) c.push(`1년 전보다 ${signed(s.chg1y.won, "원")}(${signedPct(s.chg1y.pct)})`);
    if (c.length) L.push(`기간별 살 때 변동: ${c.join(", ")}.`);
    if (s.streak?.days >= 2) L.push(`살 때 값 ${s.streak.days}거래일 연속 ${s.streak.dir === "up" ? "상승" : "하락"} 중.`);
    else if (s.streak?.days === 1) L.push(`오늘은 어제까지의 방향과 반대로 움직인 첫날.`);
  }
  if (f.hl?.sentence) L.push(`오늘의 두드러진 사실: ${f.hl.sentence}`);
  const ig = f.ig, fx = f.fx;
  if (ig) L.push(`국제 금값: 온스당 ${won(ig.usdPerOz)}달러, 전일 종가 대비 ${signedPct(ig.dir === "down" ? -Math.abs(ig.changePct ?? 0) : Math.abs(ig.changePct ?? 0))}${ig.krwPerDon ? `. 환율로 환산한 한 돈 ${won(ig.krwPerDon)}원(국내 팔 때보다 ${won(Math.abs(f.sell - ig.krwPerDon))}원 ${f.sell >= ig.krwPerDon ? "낮음" : "높음"})` : ""}.`);
  if (fx) L.push(`원/달러 환율: ${Number(fx.usdkrw).toLocaleString("ko-KR")}원, 전일 대비 ${signed(fx.dir === "down" ? -Math.abs(fx.change ?? 0) : Math.abs(fx.change ?? 0), "원").replace(/(\d)원$/, "$1원")}(${signedPct(fx.dir === "down" ? -Math.abs(fx.changePct ?? 0) : Math.abs(fx.changePct ?? 0))}).`);
  if (ig && fx && f.theoryPct != null) L.push(`국제 금값×환율로 계산한 이론상 원화 금값 변동 ${signedPct(f.theoryPct)}, 실제 국내 살 때 고시 변동 ${signedPct(f.actualPct)}.`);
  const m = [];
  if (f.dxy) m.push(`달러인덱스 ${f.dxy.price}(${signedPct(f.dxy.changePct ?? 0)})`);
  if (f.us10) m.push(`미 10년물 국채금리 ${Number(f.us10.price).toFixed(2)}%(${f.us10.change > 0 ? "+" : ""}${Number(f.us10.change ?? 0).toFixed(2)}%p)`);
  if (f.wti) m.push(`WTI 유가 배럴당 ${f.wti.price}달러(${signedPct(f.wti.changePct ?? 0)})`);
  if (m.length) L.push(`거시 지표(전일 종가 대비): ${m.join(", ")}. 일반적으로 달러 강세·금리 상승은 금값에 부담, 약세·하락은 힘이 된다.`);
  if (f.krx?.krwPerGram) L.push(`KRX 금시장(도매, 전 영업일 ${korDate(f.krx.date)} 종가): 1g ${won(f.krx.krwPerGram)}원, 한 돈 ${won(f.krx.krwPerDon)}원, 전 거래일 대비 ${signed(f.krx.change ?? 0, "원")}(${signedPct(f.krx.changePct ?? 0)}).`);
  L.push(`살 때·팔 때 간격: 오늘 사서 오늘 팔면 한 돈에 ${won(f.realGap)}원(${f.realGapPct}%) 손실. 팔 때 값이 ${f.breakevenPct}% 올라야 본전. 부가세 뺀 고시가끼리 간격은 ${won(f.gapEx)}원(${f.gapExPct}%).`);
  if (s?.chg1m) L.push(`한 달 전에 사서 오늘 팔았다면: 한 달 살 때 변동 ${signedPct(s.chg1m.pct)} 대 간격 ${f.breakevenPct}% → ${s.chg1m.pct >= f.breakevenPct ? "이익 구간" : "손실 구간"}.`);
  return L;
}

function prompt(facts, violations) {
  const head = `당신은 경제지 금 시장 담당 기자다. 아래 [사실]만으로 오늘 금시세 기사의 세 부분을 쓴다. 독자는 금을 사거나 팔려는 일반인이다.

[규칙]
1. 숫자는 [사실]에 있는 것만, 표기까지 그대로 쓴다(예: 855,000원, 0.58%, 1,383.88원). 계산·반올림·만 단위 변환("85만 5,000원")을 하지 않는다. 사실에 없는 숫자·날짜·사건·인물·기관 발표·뉴스는 쓰지 않는다.
2. 전망·예측·권유를 쓰지 않는다. "오를 것", "전망", "예상", "기회", "사야/팔아야", 느낌표, 과장어(폭등·급락 등)를 쓰지 않는다. 등락의 원인은 단정하지 않는다. 지표가 실제로 어떻게 움직였는지와 일반적으로 알려진 기제("달러가 강해지면 금값에 부담이 되는 것이 일반적이다")로만 쓴다.
3. 문어체 "~다"로 끝낸다. 숫자를 나열해 읽어 주는 문장("살 때는 5,000원 내렸고 팔 때는 2,000원 내렸다")을 피하고, 숫자가 뜻하는 바를 한 문장으로 잇는다. 같은 숫자를 두 번 쓰지 않는다. 첫 문장은 정보로 시작한다("오늘", "금값이" 같은 상투 도입 금지).
4. 분량: lead 3~4문장(200~320자). why 문단 2개(각 150~300자). read 문단 2~3개(각 150~300자).
5. 출력은 JSON 하나만: {"lead": "…", "why": ["…", "…"], "read": ["…", "…"]}

[각 부분이 할 일]
- lead: 오늘 값 → 최근 흐름 속 위치 → 밤사이 배경, 세 걸음. 첫 문장에 살 때·팔 때 값이 들어간다.
- why: ① 국제 금값과 환율이 국내 고시에 어떻게 옮겨졌는지(이론값 대 실제, 차이가 나면 국내 고시는 하루 몇 차례만 정해지고 실물 수급이 함께 반영된다는 점). ② 달러·금리·유가가 각각 금값에 어느 방향으로 작용하는 지표였는지.
- read: 오늘 숫자로 실물 금을 사고팔 때 무엇을 계산해야 하는지 — 살 때·팔 때 간격과 본전, 한 달 전에 샀다면 어느 구간인지, 그램·반 돈 환산, 18K·14K 매입가. 권유가 아니라 계산 재료를 준다. 이 부분은 "사자마자 팔면 … 손해" 절의 본문이 되므로 간격·본전·그램·18K 숫자는 lead·why 에서 쓰지 말고 여기서만 쓴다. 마지막 문장은 금 계산기(아래)에 무게와 순도를 넣으면 오늘 고시가로 환산된다는 안내로 닫는다.
`;
  const fix = violations?.length
    ? `\n[직전 답의 위반 — 반드시 고친다]\n${violations.map((v) => `- ${v}`).join("\n")}\n`
    : "";
  return `${head}${fix}\n[사실]\n${facts.map((l) => `- ${l}`).join("\n")}\n`;
}

/** 답을 검사한다. 통과면 [] , 아니면 위반 문장 목록. */
export function validate(ans, allowed) {
  const v = [];
  if (!ans || typeof ans !== "object") return ["JSON 객체가 아니다"];
  const lead = typeof ans.lead === "string" ? ans.lead.trim() : "";
  const why = Array.isArray(ans.why) ? ans.why.filter((p) => typeof p === "string").map((p) => p.trim()) : [];
  const read = Array.isArray(ans.read) ? ans.read.filter((p) => typeof p === "string").map((p) => p.trim()) : [];
  if (lead.length < 150 || lead.length > 400) v.push(`lead 길이 ${lead.length}자 — 200~320자로`);
  if (why.length < 2) v.push(`why 문단 ${why.length}개 — 2개로`);
  if (read.length < 2 || read.length > 3) v.push(`read 문단 ${read.length}개 — 2~3개로`);
  const all = [["lead", lead], ...why.map((p, i) => [`why[${i + 1}]`, p]), ...read.map((p, i) => [`read[${i + 1}]`, p])];
  for (const [name, p] of all) {
    if (!p) continue;
    if (name !== "lead" && (p.length < 100 || p.length > 380)) v.push(`${name} 길이 ${p.length}자 — 150~300자로`);
    if (!/다\.$/.test(p)) v.push(`${name} 이 "다."로 끝나지 않는다`);
    const bad = p.match(FORBID);
    if (bad) v.push(`${name} 에 금지 표현 "${bad[0]}"`);
    for (const n of numbersIn(p)) if (!allowed.has(n) && !FREE.has(n)) v.push(`${name} 의 숫자 ${n} 이(가) [사실]에 없다 — 사실의 표기 그대로만 쓴다`);
  }
  return v;
}

/**
 * doc 의 lead·"왜 움직였나" 를 모델 문장으로 바꾸고 "오늘 금값, 어떻게 읽나" 절을 넣는다.
 * 실패하면 doc 을 건드리지 않는다. 항상 돌아온다(throw 없음).
 */
export async function applyModelAnalysis(doc, f, u) {
  const log = u.log ?? console.log;
  if (process.env.GITHUB_ACTIONS) { log("해석 문단: CI 에는 claude 가 없어 조립 문장으로 냅니다"); return doc; }
  const facts = factSheet(f, u);
  const allowed = numbersIn(facts.join("\n"));
  const model = u.model || "opus";
  let violations = [];
  let ans = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const r = await ask(prompt(facts, violations), { model, timeoutMs: 6 * 60 * 1000, label: `news-${attempt}`, logDir: u.logDir, expect: "1,200자" });
      ans = extractJson(r.text);
      log(`해석 문단: ${model} ${Math.round(r.ms / 1000)}초 · 입력 ${r.usage.input}·출력 ${r.usage.output} 토큰`);
    } catch (e) {
      log(`해석 문단: 모델 호출 실패 — 조립 문장으로 냅니다 (${String(e.message).split("\n")[0].slice(0, 200)})`);
      return doc;
    }
    violations = validate(ans, allowed);
    if (!violations.length) break;
    log(`해석 문단: 검사 ${violations.length}건 위반${attempt === 1 ? " — 한 번 더 시킵니다" : " — 버리고 조립 문장으로 냅니다"}\n  · ${violations.slice(0, 8).join("\n  · ")}`);
    if (attempt === 2) return doc;
  }

  const why = ans.why.map((p) => p.trim());
  const read = ans.read.map((p) => p.trim());
  doc.template = { lead: doc.lead };
  doc.lead = ans.lead.trim();
  const i = doc.sections.findIndex((s) => s.heading.startsWith("왜 움직였나"));
  if (i >= 0) {
    const keep = doc.sections[i].paragraphs.filter((p) => p.startsWith("도매 시장인 한국거래소")); // KRX 종가는 데이터 문장 — 그대로 둔다
    doc.template.why = doc.sections[i].paragraphs;
    doc.sections[i] = { ...doc.sections[i], paragraphs: [...why, ...keep] };
  }
  /* read 는 "사자마자 팔면 …" 절의 문단을 대신한다(제목은 숫자를 품고 있어 그대로). 따로 절을 더하면 같은 숫자가 두 번 나온다(시험 생성에서 확인). */
  const j = doc.sections.findIndex((s) => s.heading.startsWith("사자마자 팔면"));
  if (j >= 0) {
    doc.template.read = doc.sections[j].paragraphs;
    doc.sections[j] = { ...doc.sections[j], paragraphs: read };
  } else {
    doc.sections.push({ heading: "오늘 금값, 어떻게 읽나", paragraphs: read });
  }
  doc.paragraphs = [doc.lead, ...doc.sections.flatMap((s) => s.paragraphs)];
  doc.analysis = { model, at: new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00"), parts: ["lead", "why", "read"], numbersChecked: true };
  return doc;
}
