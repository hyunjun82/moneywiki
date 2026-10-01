/**
 * 환율 기사의 해석 문단 — 모델이 쓴다 (2026-10-01, 금 기사 scripts/gold/lib/news-analysis.mjs 와 같은 원칙).
 *
 *  - 구독 `claude -p` 로만 부른다(ANTHROPIC_API_KEY 가 있으면 headless.mjs 가 시작하지 않는다). 기본 opus.
 *  - 모델 답의 숫자는 전부 [사실] 목록의 표기 그대로여야 한다. 어긋나면 한 번 더 시키고, 그래도 틀리면 조립 문장으로 낸다.
 *  - 전망·권유·과장 금지(금 기사와 같은 FORBID). 등락의 원인은 이 데이터에 없으므로 쓰지 않는다.
 *  - 발행은 어떤 경우에도 막지 않는다. CI 에는 claude 가 없다 → 조립 문장.
 */
import { ask, extractJson } from "../../lib/headless.mjs";
import { FORBID, FREE, numbersIn } from "../../gold/lib/news-analysis.mjs";

/** 생성기가 고른 값으로 [사실] 목록을 만든다. 표기는 기사와 똑같이. */
export function factSheet(f, u) {
  const { fmt, won, korDate, korDateY, pct2 } = u;
  const L = [];
  L.push(`기준: ${f.basisWhen} ${f.basisLabel}. 은행 창구 값은 여기에 환전 수수료가 붙는다.`);
  for (const x of f.rows) {
    const r = x.b.r;
    const q = x.b.unit === 100 ? `100${x.m.unitWord}` : `1${x.m.unitWord}`;
    let line = `${x.m.name}: ${q} ${fmt(x.b.rate)}원`;
    if (r.prevClose && typeof r.change === "number")
      line += `, 전일 종가(${korDate(r.prevClose.date)} ${fmt(r.prevClose.rate)}원) 대비 ${r.change > 0 ? "상승" : r.change < 0 ? "하락" : "보합"} ${fmt(Math.abs(r.change))}원(${pct2(r.changePct ?? 0)}%)`;
    L.push(line + ".");
    const st = x.st;
    if (st && ["USD", "JPY"].includes(x.m.code)) {
      if (st.chg1w) L.push(`${x.m.name} 1주일 전(${korDate(st.chg1w.from)}) ${fmt(st.chg1w.rate)}원 → 차이 ${fmt(Math.abs(st.chg1w.diff))}원(${pct2(st.chg1w.pct)}%) ${st.chg1w.diff >= 0 ? "높음" : "낮음"}.`);
      if (st.chg1m) L.push(`${x.m.name} 한 달 전(${korDate(st.chg1m.from)}) ${fmt(st.chg1m.rate)}원 → 차이 ${fmt(Math.abs(st.chg1m.diff))}원(${pct2(st.chg1m.pct)}%) ${st.chg1m.diff >= 0 ? "높음" : "낮음"}.`);
      if (st.chg1y) L.push(`${x.m.name} 1년 전(${korDateY(st.chg1y.from)}) ${fmt(st.chg1y.rate)}원 → 차이 ${fmt(Math.abs(st.chg1y.diff))}원(${pct2(st.chg1y.pct)}%) ${st.chg1y.diff >= 0 ? "높음" : "낮음"}.`);
      L.push(`${x.m.name} 최근 30일 최저 ${fmt(st.r30.lo.rate)}원(${korDate(st.r30.lo.date)}), 최고 ${fmt(st.r30.hi.rate)}원(${korDate(st.r30.hi.date)}), 오늘은 아래에서 ${st.r30.pos}% 자리.`);
      if (st.r1y) L.push(`${x.m.name} 최근 1년 최저 ${fmt(st.r1y.lo.rate)}원(${korDateY(st.r1y.lo.date)}), 최고 ${fmt(st.r1y.hi.rate)}원(${korDateY(st.r1y.hi.date)}), 오늘은 아래에서 ${st.r1y.pos}% 자리.`);
      if (st.streak >= 2) L.push(`${x.m.name} ${st.streak}거래일 연속 ${st.streakDir > 0 ? "상승" : "하락"}.`);
      if (x.fact?.sentence) L.push(x.fact.sentence);
    }
    if (x.ex) {
      L.push(
        `${x.m.name} ${x.m.sampleLabel} 현찰 살 때: 우대 없는 창구(수수료율 중간값 ${+x.ex.fee.toFixed(2)}%) ${won(x.ex.counter)}원, 앱 최대 우대 ${won(x.ex.bestPay)}원(${x.ex.bestLabel}, 우대율 ${x.ex.bestPref}%)` +
          (x.ex.airport != null ? `, 인천공항 창구(공항점 수수료율 ${+x.ex.airFee.toFixed(2)}%) ${won(x.ex.airport)}원` : "") +
          `. 창구와 앱 차이 ${won(x.ex.counter - x.ex.bestPay)}원` +
          (x.ex.airport != null ? `, 공항과 앱 차이 ${won(x.ex.airport - x.ex.bestPay)}원` : "") +
          (x.ex.vsPrev != null && Math.abs(x.ex.vsPrev) >= 1 ? `, 어제 종가로 창구에서 샀을 때보다 ${won(Math.abs(x.ex.vsPrev))}원 ${x.ex.vsPrev > 0 ? "더 냄" : "덜 냄"}` : "") +
          "."
      );
    }
  }
  return L;
}

function prompt(facts, violations) {
  const head = `당신은 경제지 외환 담당 기자다. 아래 [사실]만으로 오늘 환율 기사의 두 부분을 쓴다. 독자는 여행·유학·송금으로 곧 환전할 일반인이다.

[규칙]
1. 숫자는 [사실]에 있는 것만, 표기까지 그대로 쓴다(예: 1,358.38원, 0.58%, 1,382,152원). 계산·반올림·만 단위 변환을 하지 않는다. 사실에 없는 숫자·날짜·사건·인물·기관 발표·뉴스·원인(금리, 외국인 매매 등)은 쓰지 않는다.
2. 전망·예측·권유를 쓰지 않는다. "오를 것", "전망", "예상", "기회", "지금 사야", 느낌표, 과장어(폭등·급락 등)를 쓰지 않는다. 등락의 이유를 추측하지 않는다.
3. 문어체 "~다"로 끝낸다. 숫자를 나열해 읽어 주지 말고, 숫자가 뜻하는 바를 한 문장으로 잇는다. 같은 숫자를 두 번 쓰지 않는다. 첫 문장은 정보로 시작한다("오늘", "환율이" 같은 상투 도입 금지).
4. 분량: lead 3~4문장(200~320자). read 문단 2개(각 150~300자).
5. 출력은 JSON 하나만: {"lead": "…", "read": ["…", "…"]}

[각 부분이 할 일]
- lead: 달러·엔화 오늘 값과 전일 대비 → 최근 흐름 속 위치(30일 또는 1년) → 다른 통화 한 가지. 첫 문장에 달러 값이 들어간다.
- read: 곧 환전할 사람이 오늘 숫자로 계산할 것 — ① 같은 금액을 창구·앱 최대 우대·인천공항에서 바꿀 때 차이(1위 은행 이름 포함), ② 1년 위치와 어제 대비 차이가 무엇을 말해 주고 무엇을 말해 주지 않는지. 권유가 아니라 계산 재료를 준다. 마지막 문장은 환전 계산기(아래)에 금액과 은행을 넣으면 오늘 값으로 계산된다는 안내로 닫는다.
`;
  const fix = violations?.length ? `\n[직전 답의 위반 — 반드시 고친다]\n${violations.map((v) => `- ${v}`).join("\n")}\n` : "";
  return `${head}${fix}\n[사실]\n${facts.map((l) => `- ${l}`).join("\n")}\n`;
}

export function validate(ans, allowed) {
  const v = [];
  if (!ans || typeof ans !== "object") return ["JSON 객체가 아니다"];
  const lead = typeof ans.lead === "string" ? ans.lead.trim() : "";
  const read = Array.isArray(ans.read) ? ans.read.filter((p) => typeof p === "string").map((p) => p.trim()) : [];
  if (lead.length < 150 || lead.length > 400) v.push(`lead 길이 ${lead.length}자 — 200~320자로`);
  if (read.length !== 2) v.push(`read 문단 ${read.length}개 — 2개로`);
  const all = [["lead", lead], ...read.map((p, i) => [`read[${i + 1}]`, p])];
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

/** doc.lead 와 "오늘 환율, 어떻게 읽나" 절을 모델 문장으로 바꾼다. 실패하면 doc 그대로. throw 없음. */
export async function applyFxAnalysis(doc, f, u) {
  const log = u.log ?? console.log;
  if (process.env.GITHUB_ACTIONS) {
    log("해석 문단: CI 에는 claude 가 없어 조립 문장으로 냅니다");
    return doc;
  }
  const facts = factSheet(f, u);
  const allowed = numbersIn(facts.join("\n"));
  const model = u.model || "opus";
  let violations = [];
  let ans = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const r = await ask(prompt(facts, violations), { model, timeoutMs: 6 * 60 * 1000, label: `fx-news-${attempt}`, logDir: u.logDir, expect: "900자" });
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
  const read = ans.read.map((p) => p.trim());
  doc.template = { lead: doc.lead };
  doc.lead = ans.lead.trim();
  const j = doc.sections.findIndex((s) => s.heading === "오늘 환율, 어떻게 읽나");
  if (j >= 0) {
    doc.template.read = doc.sections[j].paragraphs;
    doc.sections[j] = { ...doc.sections[j], paragraphs: read };
  } else {
    doc.sections.push({ heading: "오늘 환율, 어떻게 읽나", paragraphs: read });
  }
  doc.paragraphs = [doc.lead, ...doc.sections.flatMap((s) => s.paragraphs)];
  doc.analysis = { model, at: new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("Z", "+09:00"), parts: ["lead", "read"], numbersChecked: true };
  return doc;
}
