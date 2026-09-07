/**
 * 초안 사전 검사 — 카테고리 파일에 넣기 전에 JSON 상태로 잡을 수 있는 것을 잡는다.
 *
 * verify-evidence(숫자·인용)·verify-rendered(구조·비주얼·라벨) 의 규칙을 같은 식으로 옮겼다.
 * 여기서 걸리면 삽입·tsc·dev 서버·렌더까지 가지 않고 바로 고치기 루프로 간다.
 * 규칙이 바뀌면 원본 검사기와 함께 바꾼다. 최종 판정은 언제나 원본 검사기가 한다.
 */

/* ── verify-evidence 와 같은 규칙 ── */
export const NUM_TOKEN = /\d[\d,]*(?:\.\d+)?\s*(?:원|만원|천원|억원|억|%|퍼센트|일|개월|년|주|회|세|시간|배)/g;
const IGNORE_YEAR = /^(19|20)\d{2}년$/;
/** 사람이 읽는 본문이 아닌 필드 — 숫자 대조에서 뺀다 (verify-evidence 도 url·날짜 메타를 뺀다) */
const SKIP_KEYS = new Set(["url", "slug", "publishedAt", "lastVerified", "verifiedAt", "ogImage", "sourceIndex",
  "effectiveDate", "date", "component", "type", "status", "tagTone", "avatarChar", "id", "group", "params"]);

export function proseOf(article) {
  const out = [];
  (function walk(v, key) {
    if (v == null) return;
    if (typeof v === "string") { if (!SKIP_KEYS.has(key)) out.push(v); return; }
    if (Array.isArray(v)) { for (const x of v) walk(x, key); return; }
    if (typeof v === "object") { if (SKIP_KEYS.has(key)) return; for (const [k, x] of Object.entries(v)) walk(x, k); }
  })(article, "");
  return out.join("\n").replace(/https?:\/\/\S+/g, "");
}
export function numbersIn(text) {
  return [...new Set((text.match(NUM_TOKEN) || []).map((s) => s.replace(/\s+/g, "")))];
}
const norm = (s) => String(s || "").replace(/[,\s]/g, "");
export function evidenceHas(ev, token) {
  const t = norm(token);
  if ((ev.exampleValues || []).some((e) => norm(e) === t)) return true;
  if ((ev.facts || []).some((f) => norm(f.value).includes(t) || norm(f.quote).includes(t))) return true;
  return (ev.raws || []).some((r) => norm(r.text).includes(t));
}
export function unprovenNumbers(article, ev) {
  return numbersIn(proseOf(article)).filter((n) => !IGNORE_YEAR.test(n) && !evidenceHas(ev, n));
}

const qnorm = (x) => String(x || "").replace(/[\s,.·「」“”"'()]/g, "");
export function quoteInEvidence(ev, quote) {
  const q = qnorm(quote);
  if (q.length < 12) return true;
  const hay = qnorm((ev.raws || []).map((r) => r.text).join(" ") + (ev.facts || []).map((f) => f.quote).join(" "));
  if (hay.includes(q)) return true;
  for (let len = Math.floor(q.length * 0.6); len >= 20; len -= 10)
    for (let i = 0; i + len <= q.length; i += 5) if (hay.includes(q.slice(i, i + len))) return true;
  return false;
}
export function collectQuotes(article) {
  const out = [];
  for (const s of article.mainSections || []) {
    if (s.quote?.text) out.push({ where: s.heading, text: s.quote.text });
    if (s.sourceQuote?.excerpt) out.push({ where: s.heading, text: s.sourceQuote.excerpt });
    for (const sub of s.subsections || []) if (sub.quote?.text) out.push({ where: sub.heading, text: sub.quote.text });
  }
  return out;
}

/* ── verify-rendered 와 같은 규칙 ── */

/** 타이틀이 약속한 항목 수 — verify-rendered 의 계산을 그대로 옮김 */
export function promisedCount(title) {
  const h1 = String(title || "").replace(/\s*\|\s*머니위키\s*$/, "").replace(/\s*\(\d{4}\)\s*$/, "").trim();
  const conj = (x) => (x.match(/[가-힣0-9]\s*(?:와|과|·|및)\s*/g) || []).length;
  let promised = 0;
  for (const part of h1.split(/,\s*/)) {
    if (/부터[\s\S]*(까지|총정리|정리)/.test(part)) promised += 2 + conj(part.split("부터")[0]);
    else promised += 1 + conj(part);
  }
  return promised;
}

/** 섹션의 대표 비주얼 — verify-rendered 의 우선순위(판정>표>단계>산식>타임라인>체크리스트>통계) */
export function sectionKind(sec) {
  const widgets = [...(sec.widgets || []), ...(sec.subsections || []).flatMap((s) => s.widgets || [])];
  const has = (t) => widgets.some((w) => w?.type === t);
  const table = sec.compareTable || (sec.subsections || []).some((s) => s.compareTable);
  if (has("decide")) return "판정";
  if (table) return "표";
  if (has("stepbar")) return "단계";
  if (has("flow")) return "산식";
  if (has("timeline")) return "타임라인";
  if (has("checklist")) return "체크리스트";
  if (has("stat-box")) return "통계";
  return "";
}

function walkStrings(v, fn, key = "") {
  if (v == null) return;
  if (typeof v === "string") return fn(v, key);
  if (Array.isArray(v)) { for (const x of v) walkStrings(x, fn, key); return; }
  if (typeof v === "object") for (const [k, x] of Object.entries(v)) walkStrings(x, fn, k);
}

export function collectCtaUrls(article) {
  const out = [];
  const push = (where, cta) => { if (cta?.url) out.push({ where, url: cta.url, label: cta.label || "" }); };
  push("heroCta", article.heroCta);
  for (const s of article.mainSections || []) {
    push(s.heading, s.cta);
    for (const w of s.widgets || []) if (w.type === "stepbar") for (const st of w.steps || []) push(`${s.heading} › ${st.tab}`, st.action);
    for (const sub of s.subsections || []) {
      push(sub.heading, sub.cta);
      for (const w of sub.widgets || []) if (w.type === "stepbar") for (const st of w.steps || []) push(`${sub.heading} › ${st.tab}`, st.action);
    }
  }
  for (const st of article.resolution?.steps || []) push(`resolution › ${st.title}`, st.action);
  return out;
}

export function collectInternalSlugs(article) {
  const out = [];
  for (const r of article.relatedQuestions || []) out.push({ where: "relatedQuestions", slug: r.slug });
  for (const s of article.mainSections || []) {
    if (s.link?.slug) out.push({ where: s.heading, slug: s.link.slug });
    for (const w of s.widgets || []) if (w.type === "calc-cta") out.push({ where: s.heading, slug: w.slug });
    for (const sub of s.subsections || []) for (const w of sub.widgets || []) if (w.type === "calc-cta") out.push({ where: sub.heading, slug: w.slug });
  }
  for (const a of article.resolution?.alternatives || []) if (a.link?.slug) out.push({ where: "alternatives", slug: a.link.slug });
  for (const e of article.context?.edgeCases || []) if (e.link?.slug) out.push({ where: "edgeCases", slug: e.link.slug });
  if (article.heroWidget?.more?.slug) out.push({ where: "heroWidget.more", slug: article.heroWidget.more.slug });
  return out;
}

const HYPE = /축하|무조건|100\s*%\s*(보장|받)|확정적으로|반드시\s*받|대상이에요|당첨/;

/* ── types.ts 의 필드 목록 — tsc 의 "known properties" 검사를 삽입 전에 흉내낸다 (한 바퀴를 아낀다) ── */
const K = (s) => new Set(s.split(" "));
const SHAPES = {
  article: K("slug category primaryKeywords meta searchIntent heroHook heroCta keyFacts summary verify heroWidget heroStats mainSections resolution context sources lastVerified numericClaims relatedQuestions"),
  meta: K("title subtitle description ogImage author publishedAt"),
  author: K("name role bio avatarChar"),
  searchIntent: K("userQuestion directAnswer why"),
  cta: K("label url org note"),
  keyFact: K("label value"),
  verify: K("note date"),
  heroWidget: K("type component title hint formula more params"),
  more: K("slug label"),
  heroStat: K("label value unit note"),
  section: K("eyebrow heading answer body highlight subsections quote cta link sourceQuote compareTable widgets"),
  subsection: K("id heading answer body highlight compareTable widgets cta quote"),
  quote: K("law text"),
  link: K("slug label bridge"),
  sourceQuote: K("excerpt source"),
  compareTable: K("caption headers rows footnote cards"),
  cell: K("text status tag tagTone doc links hideOnMobile"),
  cellLink: K("label url"),
  resolution: K("steps alternatives"),
  step: K("title body action"),
  action: K("label url org"),
  alternative: K("condition description link"),
  altLink: K("slug label"),
  context: K("legalBasis edgeCases glossary faqList disclaimer"),
  legal: K("law url excerpt verifiedAt effectiveDate"),
  edge: K("scenario answer link"),
  glossary: K("term definition"),
  faq: K("question answer"),
  source: K("title url org group note"),
  related: K("question slug"),
  numericClaim: K("value sourceIndex location"),
  widget: {
    checklist: K("type items"), "calc-cta": K("type slug label note"), "stat-box": K("type label value note"),
    "case-example": K("type persona result note"), "def-box": K("type term definition"),
    decide: K("type items okText"), flow: K("type steps"), stepbar: K("type steps"), timeline: K("type items"),
  },
  decideItem: K("q sub next"), flowStep: K("cap val sub hi"), stepbarStep: K("tab title body prep time action"), stepbarAction: K("label url primary"), timelineItem: K("d t m pay"),
};
function unknownKeys(a) {
  const out = [];
  const chk = (obj, shape, where) => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
    for (const k of Object.keys(obj)) if (!shape.has(k)) out.push(`${where}.${k}`);
  };
  const widgets = (list, where) => (list || []).forEach((w, i) => {
    const shape = SHAPES.widget[w?.type];
    if (!shape) { out.push(`${where}.widgets[${i}].type="${w?.type}" (없는 위젯 종류)`); return; }
    chk(w, shape, `${where}.widgets[${i}]`);
    if (w.type === "decide") (w.items || []).forEach((x, j) => chk(x, SHAPES.decideItem, `${where}.widgets[${i}].items[${j}]`));
    if (w.type === "flow") (w.steps || []).forEach((x, j) => chk(x, SHAPES.flowStep, `${where}.widgets[${i}].steps[${j}]`));
    if (w.type === "timeline") (w.items || []).forEach((x, j) => chk(x, SHAPES.timelineItem, `${where}.widgets[${i}].items[${j}]`));
    if (w.type === "stepbar") (w.steps || []).forEach((x, j) => { chk(x, SHAPES.stepbarStep, `${where}.widgets[${i}].steps[${j}]`); chk(x?.action, SHAPES.stepbarAction, `${where}.widgets[${i}].steps[${j}].action`); });
  });
  const table = (t, where) => { chk(t, SHAPES.compareTable, where); (t?.rows || []).forEach((r, i) => (r || []).forEach((c, j) => { if (c && typeof c === "object") { chk(c, SHAPES.cell, `${where}.rows[${i}][${j}]`); (c.links || []).forEach((l, k) => chk(l, SHAPES.cellLink, `${where}.rows[${i}][${j}].links[${k}]`)); } })); };
  chk(a, SHAPES.article, "article");
  chk(a.meta, SHAPES.meta, "meta"); chk(a.meta?.author, SHAPES.author, "meta.author");
  chk(a.searchIntent, SHAPES.searchIntent, "searchIntent"); chk(a.heroCta, SHAPES.cta, "heroCta"); chk(a.verify, SHAPES.verify, "verify");
  chk(a.heroWidget, SHAPES.heroWidget, "heroWidget"); chk(a.heroWidget?.more, SHAPES.more, "heroWidget.more");
  (a.keyFacts || []).forEach((x, i) => chk(x, SHAPES.keyFact, `keyFacts[${i}]`));
  (a.heroStats || []).forEach((x, i) => chk(x, SHAPES.heroStat, `heroStats[${i}]`));
  (a.mainSections || []).forEach((s, i) => {
    const w = `mainSections[${i}]`;
    chk(s, SHAPES.section, w); chk(s?.quote, SHAPES.quote, `${w}.quote`); chk(s?.cta, SHAPES.cta, `${w}.cta`); chk(s?.link, SHAPES.link, `${w}.link`); chk(s?.sourceQuote, SHAPES.sourceQuote, `${w}.sourceQuote`);
    if (s?.compareTable) table(s.compareTable, `${w}.compareTable`);
    widgets(s?.widgets, w);
    (s?.subsections || []).forEach((sub, j) => {
      const ws = `${w}.subsections[${j}]`;
      chk(sub, SHAPES.subsection, ws); chk(sub?.quote, SHAPES.quote, `${ws}.quote`); chk(sub?.cta, SHAPES.cta, `${ws}.cta`);
      if (sub?.compareTable) table(sub.compareTable, `${ws}.compareTable`);
      widgets(sub?.widgets, ws);
    });
  });
  chk(a.resolution, SHAPES.resolution, "resolution");
  (a.resolution?.steps || []).forEach((x, i) => { chk(x, SHAPES.step, `resolution.steps[${i}]`); chk(x?.action, SHAPES.action, `resolution.steps[${i}].action`); });
  (a.resolution?.alternatives || []).forEach((x, i) => { chk(x, SHAPES.alternative, `resolution.alternatives[${i}]`); chk(x?.link, SHAPES.altLink, `resolution.alternatives[${i}].link`); });
  chk(a.context, SHAPES.context, "context");
  (a.context?.legalBasis || []).forEach((x, i) => chk(x, SHAPES.legal, `context.legalBasis[${i}]`));
  (a.context?.edgeCases || []).forEach((x, i) => { chk(x, SHAPES.edge, `context.edgeCases[${i}]`); chk(x?.link, SHAPES.altLink, `context.edgeCases[${i}].link`); });
  (a.context?.glossary || []).forEach((x, i) => chk(x, SHAPES.glossary, `context.glossary[${i}]`));
  (a.context?.faqList || []).forEach((x, i) => chk(x, SHAPES.faq, `context.faqList[${i}]`));
  (a.sources || []).forEach((x, i) => chk(x, SHAPES.source, `sources[${i}]`));
  (a.relatedQuestions || []).forEach((x, i) => chk(x, SHAPES.related, `relatedQuestions[${i}]`));
  (a.numericClaims || []).forEach((x, i) => chk(x, SHAPES.numericClaim, `numericClaims[${i}]`));
  return out;
}

/**
 * @returns {string[]} 문제 목록 (비어 있으면 통과)
 */
export function checkDraft({ article: a, plan, ev, live, ctaAllowed, quickComponents = [] }) {
  const p = [];
  if (!a || typeof a !== "object") return ["article 객체가 없습니다"];
  if (a.slug !== plan.slug) p.push(`slug 가 "${a.slug}" — 설계도는 "${plan.slug}"`);
  if (a.category !== plan.category) p.push(`category 가 "${a.category}" — 설계도는 "${plan.category}"`);
  if (!a.meta?.title) p.push("meta.title 없음");
  if (!a.meta?.description) p.push("meta.description 없음");
  for (const k of ["userQuestion", "directAnswer", "why"]) if (!a.searchIntent?.[k]) p.push(`searchIntent.${k} 없음`);
  if (!Array.isArray(a.primaryKeywords) || a.primaryKeywords.length < 2 || a.primaryKeywords.length > 3) p.push("primaryKeywords 는 2~3개");
  else if (a.primaryKeywords.filter((k) => (a.meta?.title || "").includes(k)).length < 2) p.push("primaryKeywords 중 2개 이상이 meta.title 에 들어가야 함");
  if (!a.lastVerified) p.push("lastVerified 없음");
  if (!a.verify?.date || !a.verify?.note) p.push("verify { note, date } 필요 (검증 배지)");
  if (!Array.isArray(a.sources) || !a.sources.length) p.push("sources 없음");
  if (!Array.isArray(a.resolution?.steps)) p.push("resolution 은 { steps: [] } 이어야 함");
  else if (a.resolution.steps.length) p.push(`resolution.steps 가 ${a.resolution.steps.length}개 — 빈 배열이어야 함 (채우면 옛 블록 '지금 바로 진행하는 방법'이 한 줄 답 없이 그려져 화면 검사에서 거부됨). 단계는 stepbar 위젯으로`);
  for (const k of ["legalBasis", "edgeCases", "glossary"]) if (a.context?.[k]?.length) p.push(`context.${k} 는 옛 블록 — 쓰지 않음 (faqList 만)`);

  // types.ts 에 없는 필드 — tsc 가 잡기 전에 잡는다
  const unknown = unknownKeys(a);
  if (unknown.length) p.push(`types.ts 에 없는 필드 ${unknown.length}개 (tsc 가 거부함): ${unknown.slice(0, 12).join(", ")}${unknown.length > 12 ? " …" : ""}`);

  // 금지 문자
  const bad = [];
  // 무엇이 걸렸는지 그 자리를 보여 준다. 앞 50자만 찍었더니 정작 걸린 낱말이 안 보여
  // 모델이 두 번을 고치고도 같은 자리에서 떨어졌다 (2026-09-07 보험금-청구 글).
  const around = (s, m) => { const i = s.indexOf(m); return `…${s.slice(Math.max(0, i - 25), i)}【${m}】${s.slice(i + m.length, i + m.length + 25)}…`; };
  walkStrings(a, (s, k) => {
    if (s.includes("—")) bad.push(`대시(—): "${s.slice(0, 40)}"`);
    if (s.includes("`")) bad.push(`백틱: "${s.slice(0, 40)}"`);
    if (k === "url") return;
    const h = s.match(HYPE);
    if (h) bad.push(`과장 표현 "${h[0]}" → ${around(s, h[0])}  (이 낱말을 빼거나 사실만 남기세요)`);
  });
  p.push(...[...new Set(bad)].slice(0, 8));

  // 구조
  const secs = a.mainSections || [];
  const want = (plan.clusters || []).length;
  if (secs.length !== want) p.push(`mainSections ${secs.length}개 — 설계도 군집 ${want}개와 같아야 함`);
  const promised = promisedCount(a.meta?.title);
  if (promised >= 2 && promised !== secs.length) p.push(`타이틀이 약속한 항목 ${promised}개, 대제목 ${secs.length}개 — 1:1 이어야 함 (타이틀: "${a.meta?.title}")`);
  secs.forEach((s, i) => {
    const id = `q${i + 1} "${(s.heading || "").slice(0, 30)}"`;
    if (!s.heading) p.push(`${id}: heading 없음`);
    if (!s.answer?.trim()) p.push(`${id}: answer(한 줄 답) 없음`);
    if (!s.body?.trim()) p.push(`${id}: body 없음`);
    if (!s.eyebrow?.trim()) p.push(`${id}: eyebrow(라벨) 없음`);
    else if ((s.heading || "").startsWith(s.eyebrow)) p.push(`${id}: eyebrow "${s.eyebrow}" 가 소제목을 자른 형태`);
    else if (s.eyebrow.length > 10) p.push(`${id}: eyebrow "${s.eyebrow}" 가 너무 김 (4~8자)`);
    for (const sub of s.subsections || []) {
      if (!sub.heading) p.push(`${id} › 소제목 heading 없음`);
      if (!sub.answer?.trim()) p.push(`${id} › "${(sub.heading || "").slice(0, 30)}": answer 없음`);
    }
    // 숫자(두 자리 이상)가 있는 섹션엔 근거 조문
    const text = proseOf(s);
    const hasQuote = Boolean(s.quote?.text) || (s.subsections || []).some((x) => x.quote?.text);
    if (/\d{2,}/.test(text) && !hasQuote) p.push(`${id}: 숫자가 있는데 근거 조문(quote)이 없음`);
    // 표 형식
    const tables = [s.compareTable, ...(s.subsections || []).map((x) => x.compareTable)].filter(Boolean);
    for (const t of tables) {
      if (!t.caption) p.push(`${id}: 표에 caption 없음`);
      if (!t.footnote) p.push(`${id}: 표에 footnote 없음`);
      if ((t.headers || []).length >= 4 && !t.cards) p.push(`${id}: 열 ${t.headers.length}개 표는 cards: true`);
      for (const row of t.rows || []) if (row.length !== (t.headers || []).length) { p.push(`${id}: 표의 행 길이 ${row.length} ≠ 헤더 ${t.headers.length}`); break; }
    }
  });
  // 비주얼
  const kinds = secs.map(sectionKind);
  const withViz = kinds.filter(Boolean).length;
  if (secs.length && withViz / secs.length < 0.5) p.push(`비주얼이 있는 섹션 ${withViz}/${secs.length} — 절반 이상 필요`);
  for (let i = 1; i < kinds.length; i++) if (kinds[i] && kinds[i] === kinds[i - 1]) p.push(`q${i}와 q${i + 1}이 같은 비주얼(${kinds[i]}) 연속`);
  // 정리·핵심콕콕·FAQ
  const sum = (a.summary || []).length;
  if (sum < 2 || sum > 5) p.push(`summary ${sum}개 — 2~5개(대제목 수)`);
  const kf = (a.keyFacts || []).length;
  if (kf < 5 || kf > 12) p.push(`keyFacts ${kf}행 — 7~9행`);
  const faq = (a.context?.faqList || []).length;
  if (faq && (faq < 3 || faq > 8)) p.push(`faqList ${faq}개 — 4~6개`);
  // 위젯 컴포넌트
  if (a.heroWidget && !quickComponents.includes(a.heroWidget.component)) p.push(`heroWidget.component "${a.heroWidget.component}" 는 없는 컴포넌트 (있는 것: ${quickComponents.join(", ") || "없음"})`);
  for (const s of secs) for (const w of [...(s.widgets || []), ...(s.subsections || []).flatMap((x) => x.widgets || [])]) {
    if (w?.type === "decide" && (!Array.isArray(w.items) || w.items.length < 3 || w.items.length > 5 || !w.okText)) p.push(`"${s.heading.slice(0, 30)}": decide 는 items 3~5개 + okText`);
    if (w?.type === "stepbar" && (!Array.isArray(w.steps) || w.steps.length < 3 || w.steps.length > 5)) p.push(`"${s.heading.slice(0, 30)}": stepbar 는 3~5단계`);
  }
  // 버튼·링크
  for (const c of collectCtaUrls(a)) {
    if (!ctaAllowed.has(c.url)) p.push(`CTA "${c.label}" (${c.where}) 의 주소가 허용 목록에 없음: ${c.url}`);
    if (/보기$/.test(c.label.trim())) p.push(`CTA "${c.label}" (${c.where}) 는 열람형 문구 — 행동형으로`);
  }
  // 같은 주소를 버튼 여러 개에 돌려 쓰면 "그 일을 하는 화면"이 아니다 — 허용 CTA 가 하나뿐일 때 단계마다 같은 버튼을 붙이는 것을 막는다
  const byUrl = new Map();
  for (const c of collectCtaUrls(a)) byUrl.set(c.url, [...(byUrl.get(c.url) || []), c.where]);
  for (const [url, wheres] of byUrl) if (wheres.length > 2) p.push(`같은 버튼 주소가 ${wheres.length}곳 (${wheres.slice(0, 4).join(" / ")}${wheres.length > 4 ? " …" : ""}) — 한 주소는 최대 2곳(첫 화면 + 관련 섹션 1곳). 그 일을 하는 화면이 아닌 단계에서는 버튼을 뺀다: ${url.slice(0, 60)}`);
  for (const l of collectInternalSlugs(a)) if (!live.has(l.slug)) p.push(`내부 링크 slug "${l.slug}" (${l.where}) 는 사이트에 없음`);
  // 숫자·인용
  const unproven = unprovenNumbers(a, ev);
  if (unproven.length) p.push(`증거 없는 수치 ${unproven.length}개: ${unproven.join(", ")}`);
  for (const q of collectQuotes(a)) if (!quoteInEvidence(ev, q.text)) p.push(`원문에 없는 인용 ("${q.where.slice(0, 25)}"): "${q.text.slice(0, 60)}…"`);
  return p;
}
