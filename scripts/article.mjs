#!/usr/bin/env node
/**
 * 글 파이프라인 — 키워드·주제 → 계획 → 수집(Playwright) → 캡처 읽기 → 작성 → 삽입 → 검사 → 보고.
 * 대화창 없이 돈다. 판단이 필요한 세 단계(계획·캡처 읽기·작성)는 `claude -p` (구독 로그인) 가 한다.
 * 나머지는 전부 이미 있던 결정적 스크립트다: collect-evidence · verify-evidence · verify-no-shadow ·
 * verify-internal-links · verify-rendered · tsc.
 *
 *   npm run article -- <slug> --topic "주제 한 줄" [--category 고용] [--keywords scripts/keywords/실업급여.json]
 *                     [--rewrite] [--commit] [--from plan|collect|captures|write|gates] [--max-fix 2]
 *                     [--model <m>] [--writer-model <m>] [--capture-model sonnet] [--skip-render] [--keep-on-fail]
 *   npm run article -- --batch scripts/batch.txt         # 줄마다: slug | 주제 | 카테고리 | 키워드파일 | 타이틀(뒤 둘은 생략 가능)
 *   --title "…"  타이틀을 고정한다. 설계 단계가 타이틀을 짓지 않고, 그 타이틀이 약속한 항목 수에 군집 수를 맞춘다
 *
 * 산출물
 *   scripts/plans/<slug>.json        설계도 (타이틀·군집·조문·URL·CTA)
 *   scripts/evidence/<slug>.json     증거 (+ <slug>/*.png, capturesReviewed, exampleValues/Note)
 *   scripts/drafts/<slug>.json       글 JSON (실패해도 남는다 — 다음 실행이 이어서 쓴다)
 *   src/data/articles/<카테고리>.ts   통과한 글만 남는다. 실패하면 원래대로 되돌린다
 *   scripts/reports/<slug>.md/.png    보고서 한 장 + 렌더 캡처. 사람이 보는 건 이것만
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn, spawnSync } from "node:child_process";
import { ask as askRaw, extractJson, assertSubscriptionOnly, newMeter, addUsage, fmtUsage } from "./lib/headless.mjs";
import * as io from "./lib/article-io.mjs";
import { checkDraft, promisedCount, titleItems } from "./lib/check-draft.mjs";
import { planPrompt, capturesPrompt, writePrompt, fixPrompt, evidenceDigest } from "./lib/prompts.mjs";

const STAGES = ["plan", "collect", "captures", "write", "gates"];
const PORT = 3111;
/** 묶음에서 몇 편을 동시에 돌릴지. --parallel 로 바꾼다 */
let PARALLEL = 1;
const isWin = process.platform === "win32";
const PLANS = path.join("scripts", "plans");
const DRAFTS = path.join("scripts", "drafts");
const REPORTS = path.join("scripts", "reports");
for (const d of [PLANS, DRAFTS, REPORTS]) fs.mkdirSync(d, { recursive: true });

const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const hms = () => new Date().toTimeString().slice(0, 8);
const log = (stage, msg) => console.log(`[${hms()}] ${String(stage).padEnd(9)} ${msg}`);
/** 동시 실행이면 어느 글의 줄인지 앞에 붙인다 */
const mklog = (ctx) => (stage, msg) => log(stage, PARALLEL > 1 ? `${ctx.slug.slice(0, 22).padEnd(22)} ${msg}` : msg);
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
const mins = (ms) => `${(ms / 60000).toFixed(1)}분`;
const tokens = (s) => [...new Set(String(s).split(/[\s\-·,()/]+/).filter((t) => t.length >= 2))];

/* ── 동시 실행 ── */
/**
 * 글끼리는 서로 상관이 없다 — 설계·수집·작성은 동시에 돌려도 된다.
 * 딱 하나 공유하는 것이 카테고리 파일(고용.ts 한 파일에 38편)이다.
 * 거기에 넣고 검사하고 되돌리는 구간만 한 줄로 세운다. 안 그러면 A 를 되돌릴 때 B 가 날아간다.
 */
function makeLock() {
  let tail = Promise.resolve();
  return (fn) => {
    const run = tail.then(fn, fn);
    tail = run.then(() => {}, () => {});
    return run;
  };
}
const gateLock = makeLock();

/* ── 사용량 계량 ── */
const batchMeter = newMeter();
/** 사용량 상한 — 넘으면 멈춘다. 기본 글당 $6, 묶음 $20. --budget / --batch-budget 으로 바꾼다 */
let budget = { perArticle: 6, batch: 20 };
class BudgetError extends Error {}
/** ask 를 감싸 호출마다 사용량을 적고, 그 자리에서 얼마 먹었는지 찍는다 */
async function ask(ctx, prompt, opt = {}) {
  const meter = ctx.meter;
  if (meter.cost >= budget.perArticle) throw new BudgetError(`이 글이 상한 $${budget.perArticle} 를 넘었습니다 (지금 $${meter.cost.toFixed(2)}, 호출 ${meter.calls}회). 상한을 올리려면 --budget <숫자>`);
  if (batchMeter.cost >= budget.batch) throw new BudgetError(`묶음이 상한 $${budget.batch} 를 넘었습니다 (지금 $${batchMeter.cost.toFixed(2)}). 상한을 올리려면 --batch-budget <숫자>`);
  const r = await askRaw(prompt, { ...opt, tag: ctx.slug });
  const stage = String(opt.label || "ask").replace(/\d+$/, "").replace(/-.*$/, "");
  addUsage(meter, r.usage, stage);
  addUsage(batchMeter, r.usage, stage);
  if (r.usage?.input) log(opt.label, `${ctx.slug} [${(r.usage.models || []).filter((m) => !/haiku/.test(m)).join(",") || opt.model || "?"}] ${fmtUsage(r.usage)} · ${(r.ms / 1000).toFixed(0)}초 (이 글 ${meter.calls}회 ${fmtUsage(meter)})`);
  return r;
}

/* ── 인자 ── */
function parseArgs(argv) {
  const flags = {}; const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2); const nxt = argv[i + 1];
      if (nxt !== undefined && !nxt.startsWith("--")) { flags[k] = nxt; i++; } else flags[k] = true;
    } else positional.push(a);
  }
  return { flags, positional };
}

/* ── 자식 프로세스 (출력을 화면에도 보이고 버퍼에도 담는다) ── */
function runCmd(cmd, args, { quiet = false, shell = false } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { shell, env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: "1" } });
    let out = "";
    const onData = (d) => { const s = d.toString(); out += s; if (!quiet) process.stdout.write(s); };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("close", (code) => resolve({ code, out }));
    child.on("error", (e) => resolve({ code: -1, out: `${out}\n${e.message}` }));
  });
}
const runNode = (args, opt) => runCmd(process.execPath, args, opt);

/* ── dev 서버 (verify.mjs 와 같은 방식) ── */
const ping = (url) => new Promise((res) => {
  const req = http.get(url, (r) => { r.resume(); res(r.statusCode === 200); });
  req.on("error", () => res(false));
  req.setTimeout(240000, () => { req.destroy(); res(false); });
});
function freePort() {
  if (!isWin) return;
  spawnSync("powershell", ["-NoProfile", "-Command",
    `$p = Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; if ($p) { $p | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }`],
    { stdio: "ignore" });
}
const dev = { proc: null, up: false, external: false };
/** 동시 실행이면 여러 글이 한꺼번에 부른다 — 한 번만 띄우고 나머지는 같은 약속을 기다린다 */
let devPromise = null;
function ensureDev(firstUrl) {
  if (dev.up) return Promise.resolve();
  if (!devPromise) devPromise = startDev(firstUrl).catch((e) => { devPromise = null; throw e; });
  return devPromise;
}
async function startDev(firstUrl) {
  if (dev.up) return;
  if (await ping(`http://localhost:${PORT}/`)) { log("dev", `dev 서버가 이미 ${PORT} 에 있음 — 그대로 씁니다`); dev.up = true; dev.external = true; return; }
  log("dev", `dev 서버 기동 (포트 ${PORT}) — 옛 페이지가 많아 첫 컴파일이 몇 분 걸립니다`);
  freePort();
  const start = () => spawn("npx", ["next", "dev", "--webpack", "-p", String(PORT)], { stdio: ["ignore", "pipe", "pipe"], shell: isWin, env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: "1" } });
  dev.proc = start();
  let portTaken = false;
  const wire = () => { dev.proc.stderr.on("data", (d) => { if (/EADDRINUSE/.test(d.toString())) portTaken = true; }); };
  wire();
  const deadline = Date.now() + 300000;
  while (Date.now() < deadline) {
    if (await ping(firstUrl)) { dev.up = true; return; }
    if (portTaken) { stopDev(); freePort(); portTaken = false; dev.proc = start(); wire(); }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error("dev 서버가 300초 안에 뜨지 않았습니다");
}
function stopDev() {
  if (!dev.proc || dev.external) return;
  if (isWin) spawnSync("taskkill", ["/pid", String(dev.proc.pid), "/T", "/F"], { stdio: "ignore" });
  else dev.proc.kill("SIGTERM");
  dev.proc = null; dev.up = false;
}
process.on("exit", stopDev);
process.on("SIGINT", () => { stopDev(); process.exit(130); });

/* ── 문맥 ── */
function makeCtx(slug, flags) {
  const ctx = {
    slug,
    topic: flags.topic || "",
    category: flags.category || "",
    keywordsFile: flags.keywords || "",
    exampleSlug: flags.example || "",
    fixedTitle: typeof flags.title === "string" ? flags.title : "",
    rewrite: Boolean(flags.rewrite),
    commit: Boolean(flags.commit),
    from: typeof flags.from === "string" ? flags.from : "",
    maxFix: Number(flags["max-fix"] ?? 2),
    // 모델은 단계마다 못박는다 (비워 두면 계정 기본 모델을 상속해 Fable 한도를 먹는다 — 2026-09-06).
    // 판단이 얕은 단계는 sonnet, 글을 쓰는 단계만 opus. Fable 은 사용자 대화창 몫으로 남긴다.
    model: typeof flags.model === "string" ? flags.model : "sonnet",
    writerModel: typeof flags["writer-model"] === "string" ? flags["writer-model"] : (typeof flags.model === "string" ? flags.model : "opus"),
    captureModel: typeof flags["capture-model"] === "string" ? flags["capture-model"] : "sonnet",
    skipRender: Boolean(flags["skip-render"]),
    keepOnFail: Boolean(flags["keep-on-fail"]),
    logDir: path.join(REPORTS, "logs", slug),
    t0: Date.now(), timings: {}, notes: [], fixRounds: 0, deletedTsx: false, tsxTracked: false,
    meter: newMeter(),
  };
  ctx.log = mklog(ctx);
  if (ctx.from && !STAGES.includes(ctx.from)) throw new Error(`--from 은 ${STAGES.join("|")} 중 하나`);
  ctx.redo = (stage) => Boolean(ctx.from) && STAGES.indexOf(ctx.from) <= STAGES.indexOf(stage);
  return ctx;
}
async function timed(ctx, stage, fn) {
  const t = Date.now();
  try { return await fn(); } finally { ctx.timings[stage] = (ctx.timings[stage] || 0) + (Date.now() - t); }
}

/* ── 0. 문지기 ── */
async function guard(ctx) {
  assertSubscriptionOnly();
  if (!ctx.slug) throw new Error("slug 가 필요합니다: npm run article -- <slug> --topic \"…\"");
  if (io.protectedSlugs().has(ctx.slug)) throw new Error(`${ctx.slug} 는 계산기(불가침)입니다. 파이프라인이 건드리지 않습니다.`);
  if (/^forms?(\/|$)/.test(ctx.slug)) throw new Error("양식은 건드리지 않습니다");
  const existing = io.articleSlugs();
  if (existing.has(ctx.slug)) {
    if (!ctx.rewrite) throw new Error(`${ctx.slug} 는 이미 articles 에 있습니다 (${existing.get(ctx.slug)}.ts). 다시 쓰려면 --rewrite`);
    ctx.existingCategory = existing.get(ctx.slug);
    // 실패하면 되돌려 놓을 원본. 파일 전체가 아니라 이 글 한 덩어리만 보관한다 (동시 실행 안전)
    try { ctx.originalArticle = io.loadCategory(ctx.existingCategory).articles.find((a) => a.slug === ctx.slug) || null; } catch { ctx.originalArticle = null; }
  }
  if (!ctx.keywordsFile) {
    const own = path.join("scripts", "keywords", `${ctx.slug}.json`);
    const txt = path.join("scripts", "inputs", `${ctx.slug}.txt`);
    if (fs.existsSync(own)) ctx.keywordsFile = own;
    else if (fs.existsSync(txt)) {
      log("input", `${txt} → keywords JSON`);
      const r = await runNode([path.join("scripts", "prepare-input.mjs"), ctx.slug]);
      if (r.code !== 0 || !fs.existsSync(own)) throw new Error("키워드 변환 실패\n" + r.out.slice(-800));
      ctx.keywordsFile = own;
    } else {
      throw new Error(`키워드 자료가 없습니다. 셋 중 하나:\n  · --keywords scripts/keywords/<파일>.json  (같은 주제의 큰 키워드 파일을 함께 써도 됩니다)\n  · scripts/inputs/${ctx.slug}.txt 에 키워드를 붙여 넣기 (메인:/자동완성:/연관검색어:/지식인: 머리말)\n  · npm run input -- ${ctx.slug} --xlsx <연관검색어.xlsx> --xlsx <지식인.xlsx>`);
    }
  }
  if (!fs.existsSync(ctx.keywordsFile)) throw new Error(`키워드 파일이 없습니다: ${ctx.keywordsFile}`);
  ctx.keywords = readJson(ctx.keywordsFile);
  if (!ctx.topic) ctx.topic = ctx.keywords.slug === ctx.slug && ctx.keywords.topic ? ctx.keywords.topic : ctx.slug.replace(/-/g, " ");
  ctx.live = io.liveSlugs();
  ctx.quickComponents = fs.existsSync(path.join("src", "components", "article", "quick"))
    ? fs.readdirSync(path.join("src", "components", "article", "quick")).filter((f) => f.endsWith(".tsx") && f !== "index.tsx").map((f) => f.replace(/\.tsx$/, ""))
    : [];
}

/* ── 1. 계획 ── */
function keywordsForPrompt(kw, topic) {
  const toks = tokens(topic);
  const hit = (s) => toks.some((t) => String(s).includes(t));
  const questions = (kw.questions || []);
  let qs = questions.filter(hit);
  if (qs.length < 25) qs = questions.slice(0, 150); else qs = qs.slice(0, 200);
  const detail = (kw.questionDetail || kw.qDetail || []).filter((d) => hit(d.q || d.question || "")).slice(0, 40);
  return { topic: kw.topic, main: kw.main, queries: kw.queries, spokes: kw.spokes, autocomplete: kw.autocomplete, related: kw.related, questions: qs, questionDetail: detail.length ? detail : undefined };
}
async function stagePlan(ctx, deadCtas = []) {
  const file = path.join(PLANS, `${ctx.slug}.json`);
  // 타이틀을 고정해 불렀는데 저장된 설계도가 다른 타이틀이면 재사용하지 않는다 — 군집이 그 타이틀의 항목과 어긋난다
  const stale = ctx.fixedTitle && fs.existsSync(file) && readJson(file).title !== ctx.fixedTitle;
  if (fs.existsSync(file) && !ctx.redo("plan") && !stale) { const p = readJson(file); ctx.log("plan", `설계도 재사용 — "${p.title}" (군집 ${p.clusters.length})`); return p; }
  if (stale) ctx.log("plan", `저장된 설계도의 타이틀이 고정 타이틀과 달라 다시 세웁니다`);
  const toks = tokens(ctx.topic);
  const hit = (s) => toks.some((t) => String(s).includes(t));
  let registry = io.sourceRegistry();
  const rel = registry.filter((r) => hit(r.org) || hit(r.preview) || r.usedBy.some(hit));
  registry = [...rel, ...registry.filter((r) => !rel.includes(r)).slice(0, Math.max(0, 25 - rel.length))].slice(0, 70);
  const related = [...ctx.live].filter((s) => s !== ctx.slug && hit(s)).slice(0, 120);
  // 리라이트면 지금 노출 중인 제목을 넘긴다 — 순위를 만든 검색어를 타이틀에 남기기 위해
  let oldTitle = "";
  if (ctx.existingCategory) { try { oldTitle = io.loadCategory(ctx.existingCategory).articles.find((a) => a.slug === ctx.slug)?.meta?.title || ""; } catch {} }
  if (!oldTitle) {
    const md = path.join(io.WIKI_DIR, `${ctx.slug}.md`);
    if (fs.existsSync(md)) oldTitle = (fs.readFileSync(md, "utf8").match(/^title:\s*["']?(.+?)["']?\s*$/m) || [])[1] || "";
  }
  if (!oldTitle) {
    const tsx = path.join(io.W_DIR, ctx.slug, "page.tsx");
    if (fs.existsSync(tsx)) oldTitle = (fs.readFileSync(tsx, "utf8").match(/title:\s*["'`]([^"'`\n]{8,})["'`]/) || [])[1] || "";
  }
  const base = { slug: ctx.slug, topic: ctx.topic, category: ctx.category, categories: io.categoryFiles(), keywords: keywordsForPrompt(ctx.keywords, ctx.topic), registry, related, today: today(), rewrite: ctx.rewrite || ctx.live.has(ctx.slug), oldTitle, titleRule: io.titleRule(), titleExamples: io.titleExamples(), fixedTitle: ctx.fixedTitle, fixedItems: titleItems(ctx.fixedTitle) };
  // 다시 세우는 설계도라면, 지난 설계도에서 죽어 있던 버튼 주소를 알려 준다 (같은 주소를 또 고르지 않게)
  let retryNote = "";
  const known = [...deadCtas];
  if (fs.existsSync(file)) { try { known.push(...(readJson(file).deadCtas || [])); } catch {} }
  if (known.length) {
    const seen = new Set();
    const lines = known.filter((c) => !seen.has(c.url) && seen.add(c.url)).map((c) => `- ${c.url} — ${c.why}`);
    retryNote = `이 버튼 주소들은 Playwright 로 열어 보니 죽어 있었습니다. 다시 고르지 마세요:\n${lines.join("\n")}\n주소가 확실하지 않으면 그 버튼을 넣지 마세요. 버튼이 하나도 없어도 됩니다 — 없는 주소를 지어내는 것보다 낫습니다.`;
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    ctx.log("plan", `설계도 작성 ${attempt}/3 (claude -p)`);
    const { text, ms } = await ask(ctx, planPrompt({ ...base, retryNote }), { label: `plan${attempt}`, model: ctx.model, logDir: ctx.logDir, expect: "1~2분" });
    let plan;
    try { plan = extractJson(text); } catch (e) { retryNote = e.message; continue; }
    const errs = validatePlan(plan, ctx);
    if (!errs.length) {
      writeJson(file, plan);
      ctx.log("plan", `"${plan.title}" — 군집 ${plan.clusters.length} · 조문 ${plan.laws.reduce((n, l) => n + l.articles.length, 0)} · 페이지 ${plan.urls.length} · CTA ${plan.ctas.length} (${mins(ms)})`);
      return plan;
    }
    retryNote = errs.map((e) => `- ${e}`).join("\n");
    ctx.log("plan", `설계도 거부:\n${retryNote}`);
  }
  throw new Error("설계도를 3번 만들어도 규칙을 못 맞췄습니다:\n" + retryNote);
}
function validatePlan(plan, ctx) {
  const errs = [];
  plan.slug = ctx.slug;
  // 타이틀을 고정했으면 모델이 뭘 냈든 그 타이틀로 못박고, 군집이 그 항목 수와 맞는지만 본다
  if (ctx.fixedTitle) plan.title = ctx.fixedTitle;
  if (ctx.category) plan.category = ctx.category;
  const cats = io.categoryFiles();
  if (!cats.includes(plan.category)) errs.push(`category "${plan.category}" 는 ${cats.join(" / ")} 중 하나여야 합니다`);
  const cl = Array.isArray(plan.clusters) ? plan.clusters : [];
  if (cl.length < 2 || cl.length > 4) errs.push(`clusters ${cl.length}개 — 2~4개`);
  for (const c of cl) {
    if (!c?.h2 || !c?.eyebrow || !Array.isArray(c.h3) || !c.h3.length) errs.push(`군집 "${c?.h2 || "?"}" 에 eyebrow·h2·h3 가 모두 필요`);
    else if (c.h2.startsWith(c.eyebrow)) errs.push(`eyebrow "${c.eyebrow}" 가 대제목 "${c.h2}" 의 앞부분과 같음`);
    else if (c.eyebrow.length > 10) errs.push(`eyebrow "${c.eyebrow}" 가 너무 김 (4~8자)`);
  }
  for (let i = 1; i < cl.length; i++) if (cl[i]?.visual && cl[i].visual !== "none" && cl[i].visual === cl[i - 1]?.visual) errs.push(`군집 ${i}·${i + 1} 의 visual 이 같음 (${cl[i].visual})`);
  const h3n = cl.reduce((n, c) => n + (c?.h3?.length || 0), 0);
  if (h3n < 4 || h3n > 10) errs.push(`h3 총 ${h3n}개 — 6~9개`);
  const promised = promisedCount(plan.title || "");
  if (!plan.title) errs.push("title 없음");
  // 검색 결과에서 30~35자쯤에서 잘린다. 군집을 나열하라는 규칙만 있고 길이 제한이 없어
  // 62자짜리 타이틀이 나갔다 (2026-09-07). 항목 수는 그대로 두고 각 항목을 짧게 만든다.
  else if (!ctx.fixedTitle && plan.title.length > 42) errs.push(`타이틀이 ${plan.title.length}자 — 42자 이하 (저장된 예시는 30~40자). 항목 수 ${promised}개는 그대로 두고 항목마다 낱말을 줄이세요. 예) "지역가입 전환 기준, 임의계속가입 보험료 비교, 국민연금 실업크레딧 신청" → "지역가입 전환, 임의계속가입, 실업크레딧 신청". 현재: "${plan.title}"`);
  else if (ctx.fixedTitle && promised !== cl.length) errs.push(`타이틀이 고정돼 있습니다("${plan.title}"). 이 타이틀이 약속한 항목은 ${promised}개인데 군집이 ${cl.length}개입니다 — 타이틀은 그대로 두고 **군집을 ${promised}개로** 다시 나누세요. 항목: ${titleItems(plan.title).map((x, i) => `${i + 1}) ${x}`).join(" / ") || "(쉼표 조각 1개씩 + 와/과/·/및 마다 +1, '부터…까지' 조각은 2개)"}`)
  else if (promised >= 2 && promised !== cl.length) errs.push(`타이틀이 약속한 항목 ${promised}개 ≠ 군집 ${cl.length}개. 타이틀: "${plan.title}" (쉼표 조각 1개씩 + 와/과/·/및 마다 +1, '부터…까지' 조각은 2개)`);
  else if (promised < 2) errs.push(`타이틀 "${plan.title}" 이 항목을 나열하지 않음 — 군집 ${cl.length}개를 타이틀에 나열`);
  if (/—/.test(plan.title || "")) errs.push("타이틀에 대시(—) 금지");
  const pk = Array.isArray(plan.primaryKeywords) ? plan.primaryKeywords : [];
  if (pk.length < 2 || pk.length > 3) errs.push("primaryKeywords 2~3개");
  else if (pk.filter((k) => (plan.title || "").includes(k)).length < 2) errs.push(`primaryKeywords(${pk.join(", ")}) 중 2개 이상이 타이틀에 글자 그대로 들어가야 함`);
  // 조 표기 정규화: 19 · "제19조" · "19의2" · "제19조의2" · "19-2" → "19" / "19의2"
  const normArt = (a) => { const m = String(a).replace(/\s/g, "").match(/^제?(\d+)조?(?:(?:의|-)(\d+))?$/); return m ? `${m[1]}${m[2] ? `의${m[2]}` : ""}` : ""; };
  plan.laws = (Array.isArray(plan.laws) ? plan.laws : [])
    .map((l) => ({ name: String(l?.name || "").trim(), articles: [...new Set((l?.articles || []).map(normArt).filter(Boolean))] }))
    .filter((l) => l.name && l.articles.length);
  const okUrl = (u) => /^https?:\/\/[^/]+\.(go|or)\.kr(\/|$)/.test(u);
  const dec = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
  const home = (u) => /^https?:\/\/[^/]+\/?$/.test(u);
  plan.urls = (Array.isArray(plan.urls) ? plan.urls : []).filter((u) => u?.url && okUrl(u.url) && !/law\.go\.kr\/법령\//.test(dec(u.url)) && !home(u.url));
  plan.ctas = (Array.isArray(plan.ctas) ? plan.ctas : []).filter((c) => c?.url && c?.label && okUrl(c.url));
  // CTA 0개도 통과시킨다 — 정부 신청 화면이 없는 주제가 있고, 없는 주소를 지어내는 것보다 낫다.
  // 살아 있는지는 다음 단계에서 Playwright 가 실제로 열어 확인한다.
  for (const c of plan.ctas) {
    if (/보기$/.test(c.label.trim())) errs.push(`CTA "${c.label}" 는 열람형 문구 — 행동형으로`);
    // 주소가 도메인만 있다고 기관 홈으로 단정하지 않는다. 실손24(insu24.or.kr)처럼 홈이 곧 청구 화면인
    // 곳이 있는데, 그 추측 규칙이 맞는 주소를 세 번 걷어차 글 한 편을 통째로 떨어뜨렸다 (2026-09-06).
    // 판정은 다음 단계 stageCtaCheck 가 한다 — Playwright 로 열어 신청·조회 요소가 있는지 실제로 본다.
  }
  plan.relatedSlugs = (Array.isArray(plan.relatedSlugs) ? plan.relatedSlugs : []).filter((s) => ctx.live.has(s) && s !== ctx.slug);
  if (!plan.laws.length && !plan.urls.length) errs.push("laws 또는 urls 가 있어야 증거를 모을 수 있음");
  return errs;
}

/* ── 1b. 버튼 주소 실접속 — 글을 쓰기 전에 죽은 CTA 를 걸러낸다 (verify-rendered 와 같은 잣대) ── */
const CTA_ACTION = /신청|조회|검색|로그인|인증|시작|다운로드|발급|계산|내려받기|첨부/;
const CTA_BAD_TITLE = /^(안내|공지|점검|오류|error|404|페이지를 찾을 수 없)|개편\s*안내|서비스\s*종료|이전\s*안내/i;
async function stageCtaCheck(ctx, plan) {
  const file = path.join(PLANS, `${ctx.slug}.json`);
  const todo = plan.ctas.filter((c) => !c.checked);
  if (!todo.length) return plan;
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  for (const c of todo) {
    const page = await browser.newPage();
    let title = "", action = false, ok = false, why = "";
    try {
      await page.goto(c.url, { waitUntil: "commit", timeout: 90000 });
      await page.waitForLoadState("domcontentloaded", { timeout: 60000 }).catch(() => {});
      await page.waitForTimeout(1500);
      const probe = async () => {
        title = (await page.title().catch(() => "")).trim();
        const text = (await page.locator("body").innerText({ timeout: 15000 }).catch(() => "")).replace(/\s+/g, " ").slice(0, 3000);
        let labels = null;
        try { labels = await page.locator("a,button,input[type=submit]").allInnerTexts(); } catch { labels = null; }
        return labels ? labels.some((t) => CTA_ACTION.test(t)) : CTA_ACTION.test(text);
      };
      action = await probe();
      if (!action) { await page.waitForTimeout(3000); action = await probe(); }
      if (CTA_BAD_TITLE.test(title)) why = `안내·점검·개편 페이지 (제목: ${title})`;
      else if (!action) why = `신청·조회 요소가 없는 페이지 (제목: ${title})`;
      else ok = true;
    } catch (e) { why = `열리지 않음: ${e.message.split("\n")[0]}`; }
    finally { await page.close().catch(() => {}); }
    c.checked = { ok, title, why: ok ? "" : why, at: today() };
    ctx.log("cta", `${ok ? "✓" : "✗"} ${c.label} → ${c.url}${ok ? ` (${title.slice(0, 40)})` : ` — ${why}`}`);
  }
  await browser.close();
  const dead = plan.ctas.filter((c) => !c.checked.ok);
  plan.ctas = plan.ctas.filter((c) => c.checked.ok);
  if (dead.length) {
    plan.deadCtas = [...(plan.deadCtas || []), ...dead.map((c) => ({ label: c.label, url: c.url, why: c.checked.why }))];
    ctx.notes.push(`죽은 CTA 제거 ${dead.length}개:\n${dead.map((c) => `  · ${c.label} → ${c.url} — ${c.checked.why}`).join("\n")}`);
  }
  if (plan.ctas.length && !plan.ctas.some((c) => c.hero)) plan.ctas[0].hero = true;
  writeJson(file, plan);
  // 버튼이 하나도 안 살아남았다 — 죽은 주소를 알려 주고 설계를 한 번 다시 시킨다.
  // 그래도 없으면 버튼 없이 쓴다. 정부 신청 화면이 아예 없는 주제(민간보험 청구 등)가 있고,
  // 그런 글을 통째로 버리는 것보다 버튼 없는 글이 낫다 (템플릿도 CTA 를 필수로 요구하지 않는다).
  if (!plan.ctas.length) {
    if (ctx.ctaReplanned) {
      ctx.notes.push("살아 있는 CTA 가 없어 버튼 없이 씁니다. 죽은 주소:\n" + (plan.deadCtas || []).map((c) => `  · ${c.url} — ${c.why}`).join("\n"));
      ctx.log("cta", "살아 있는 버튼이 없습니다 — 버튼 없이 씁니다");
      return plan;
    }
    ctx.ctaReplanned = true;
    ctx.log("cta", "살아 있는 버튼이 없습니다 — 죽은 주소를 알려 주고 설계를 다시 세웁니다");
    const deadAll = plan.deadCtas || [];
    fs.rmSync(file, { force: true });
    const next = await stagePlan(ctx, deadAll);
    next.deadCtas = deadAll;
    return stageCtaCheck(ctx, next);
  }
  return plan;
}

/* ── 2. 수집 ── */
/** 조 표기: "19" → 제19조, "19의2" → 제19조의2 */
const artLabel = (n) => { const m = String(n).match(/^(\d+)(?:의(\d+))?$/); return m ? `제${m[1]}조${m[2] ? `의${m[2]}` : ""}` : `제${n}조`; };
function planCovered(plan, ev) {
  const dec = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
  const srcs = (ev.sources || []).map((s) => dec(s.url));
  for (const l of plan.laws) for (const n of l.articles) if (!srcs.some((u) => u.includes(`/${l.name}/${artLabel(n)}`))) return false;
  for (const u of plan.urls) if (!u.failed && !srcs.includes(dec(u.url))) return false;
  return true;
}
/** 수집이 끝난 뒤, 열리지 않은/숫자가 없던 페이지는 설계도에 failed 표시 — 다음 실행이 같은 실패로 또 수집하지 않게 */
function markFailedUrls(ctx, plan, ev) {
  const dec = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
  const srcs = (ev.sources || []).map((s) => dec(s.url));
  let changed = false;
  for (const u of plan.urls) if (!srcs.includes(dec(u.url)) && !u.failed) { u.failed = true; changed = true; }
  if (changed) writeJson(path.join(PLANS, `${ctx.slug}.json`), plan);
}
async function stageCollect(ctx, plan) {
  let ev = io.loadEvidence(ctx.slug);
  const ageDays = ev?.verifiedAt ? (Date.now() - new Date(ev.verifiedAt).getTime()) / 86400000 : Infinity;
  const usable = ev && ageDays <= 25 && (ev.facts || []).length > 0;
  if (usable && planCovered(plan, ev) && !ctx.redo("collect")) { ctx.log("collect", `증거 재사용 (${ev.verifiedAt}, fact ${ev.facts.length})`); return ev; }
  const args = [path.join("scripts", "collect-evidence.mjs"), ctx.slug];
  for (const l of plan.laws) args.push("--law", `${l.name}:${l.articles.join(",")}`);
  for (const u of plan.urls) args.push("--url", u.url);
  ctx.log("collect", `Playwright 수집 — 조문 ${plan.laws.reduce((n, l) => n + l.articles.length, 0)}개 · 페이지 ${plan.urls.length}개`);
  // 수집이 실패하면 빈 증거 파일이 좋은 증거를 덮어쓴다 (fact 96개가 0개가 된 적이 있다, 2026-09-06).
  // 먼저 보관해 두고, 새로 모은 것이 더 적으면 되돌린다.
  const evBefore = ev ? structuredClone(ev) : null;
  const r = await runNode(args);
  ctx.collectTail = r.out.slice(-2500);
  ev = io.loadEvidence(ctx.slug);
  const gotFacts = (ev?.facts || []).length;
  const hadFacts = (evBefore?.facts || []).length;
  if (gotFacts < hadFacts) {
    ctx.log("collect", `새 수집이 ${gotFacts}건뿐이라 이전 증거(${hadFacts}건, ${evBefore.verifiedAt})로 되돌립니다`);
    ctx.notes.push(`수집이 ${gotFacts}건뿐이라 이전 증거 ${hadFacts}건(${evBefore.verifiedAt})을 그대로 씁니다`);
    io.saveEvidence(ctx.slug, evBefore);
    ev = evBefore;
  }
  if (!ev || !(ev.facts || []).length) throw new Error(`증거 수집 실패 (exit ${r.code})\n${r.out.slice(-1500)}`);
  const fails = r.out.split(/\r?\n/).filter((l) => /실패|✗|❌/.test(l)).slice(0, 12);
  if (fails.length) ctx.notes.push("수집 중 실패 항목:\n" + fails.map((l) => "  " + l.trim()).join("\n"));
  markFailedUrls(ctx, plan, ev);
  ctx.log("collect", `fact ${ev.facts.length} · 원문 ${(ev.raws || []).length} · 출처 ${(ev.sources || []).length}`);
  return ev;
}

/* ── 3. 캡처 읽기 (vision) ── */
async function stageCaptures(ctx, ev) {
  const dir = io.evidenceDir(ctx.slug);
  const pngs = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".png")) : [];
  ev.capturesReviewed = ev.capturesReviewed || {};
  let unread = pngs.filter((f) => !String(ev.capturesReviewed[f] || "").trim());
  if (!unread.length) { ctx.log("captures", `캡처 ${pngs.length}장 전부 읽음 (기록 있음)`); return; }
  for (let attempt = 1; attempt <= 3 && unread.length; attempt++) {
    ctx.log("captures", `캡처 ${unread.length}장 읽기 ${attempt}/3 (claude -p + Read)`);
    const files = unread.map((f) => path.resolve(dir, f).replace(/\\/g, "/"));
    const { text } = await ask(ctx, capturesPrompt({ files }), { tools: ["Read"], model: ctx.captureModel, label: `captures${attempt}`, logDir: ctx.logDir, expect: "30초~1분" });
    let obj = {};
    try { obj = extractJson(text); } catch (e) { ctx.notes.push(`캡처 답 JSON 실패 ${attempt}: ${e.message.split("\n")[0]}`); continue; }
    for (const [k, v] of Object.entries(obj)) {
      const name = path.basename(String(k).replace(/\\/g, "/"));
      if (unread.includes(name) && String(v).trim().length >= 10) ev.capturesReviewed[name] = String(v).trim();
    }
    io.saveEvidence(ctx.slug, ev);
    unread = pngs.filter((f) => !String(ev.capturesReviewed[f] || "").trim());
  }
  if (unread.length) throw new Error(`캡처 ${unread.length}장을 읽지 못했습니다: ${unread.join(", ")}`);
  ctx.capturesAdded = pngs.length;
  ctx.log("captures", `capturesReviewed ${pngs.length}장 기록`);
}

/* ── 4. 작성 ── */
function criteriaFromTemplate() {
  const html = fs.readFileSync(path.join("docs", "moneywiki-article-template.html"), "utf8");
  const m = html.match(/<!--([\s\S]*?)-->/);
  return (m ? m[1] : "").trim();
}
function pickExample(ctx, plan) {
  const cat = io.loadCategory(plan.category);
  const arts = cat.articles.filter((a) => a.slug !== ctx.slug);
  const ex = ctx.exampleSlug ? arts.find((a) => a.slug === ctx.exampleSlug) : arts[arts.length - 1];
  if (!ex) throw new Error(`예시로 쓸 글이 없습니다 (카테고리 ${plan.category}${ctx.exampleSlug ? `, --example ${ctx.exampleSlug}` : ""})`);
  return ex;
}
function writerInputs(ctx, plan, ev) {
  const toks = tokens(ctx.topic);
  const hit = (s) => toks.some((t) => s.includes(t));
  const linkCandidates = [...new Set([...plan.relatedSlugs, ...[...ctx.live].filter((s) => s !== ctx.slug && hit(s))])].slice(0, 80);
  const ctas = plan.ctas;
  const ctaAllowed = new Set(ctas.map((c) => c.url));
  return { linkCandidates, ctas, ctaAllowed, digest: evidenceDigest(ev) };
}
async function stageWrite(ctx, plan, ev, inputs) {
  const file = path.join(DRAFTS, `${ctx.slug}.json`);
  if (fs.existsSync(file) && !ctx.redo("write")) { ctx.log("write", "초안 재사용 (scripts/drafts)"); return readJson(file); }
  const example = pickExample(ctx, plan);
  ctx.exampleUsed = example.slug;
  const prompt = writePrompt({
    plan, ev, digest: inputs.digest, typesSrc: fs.readFileSync(path.join("src", "data", "articles", "types.ts"), "utf8"),
    criteria: criteriaFromTemplate(), example, linkCandidates: inputs.linkCandidates, ctas: inputs.ctas, quickComponents: ctx.quickComponents, today: today(),
  });
  ctx.log("write", `글 작성 (claude -p, 지시문 ${(prompt.length / 1000).toFixed(0)}k자, 예시 ${example.slug}) — 이 단계가 가장 깁니다`);
  const { text, ms } = await ask(ctx, prompt, { label: "write", model: ctx.writerModel, logDir: ctx.logDir, expect: "7~9분" });
  const draft = normalizeDraft(extractJson(text));
  writeJson(file, draft);
  ctx.log("write", `초안 저장 — 대제목 ${draft.article.mainSections?.length ?? 0} · ${mins(ms)}`);
  return draft;
}
function normalizeDraft(d) {
  if (d && d.article) return { article: d.article, exampleValues: Array.isArray(d.exampleValues) ? d.exampleValues.map(String) : [], exampleNote: String(d.exampleNote || "") };
  if (d && d.slug && d.mainSections) return { article: d, exampleValues: [], exampleNote: "" };
  throw new Error("답에 article 객체가 없습니다");
}

/* ── 5. 삽입 + 6. 게이트 ── */
function applyDraft(ctx, plan, draft) {
  // 파일 전체를 스냅샷했다가 되돌리면, 동시 실행에서 그 사이에 들어온 다른 글이 지워진다.
  // 그래서 이 글의 slug 한 덩어리만 빼고 넣는다 (2026-09-06, 병렬 도입).
  if (ctx.existingCategory && ctx.existingCategory !== plan.category) io.removeArticle(ctx.existingCategory, ctx.slug);
  io.removeArticle(plan.category, ctx.slug);
  io.insertArticle(plan.category, draft.article);
  ctx.inserted = plan.category;
  // 옛 TSX 폴더 — 남아 있으면 새 글이 화면에 안 나온다
  const tsxDir = path.join(io.W_DIR, ctx.slug);
  if (fs.existsSync(tsxDir) && !ctx.deletedTsx) {
    ctx.tsxTracked = spawnSync("git", ["ls-files", "--error-unmatch", tsxDir], { stdio: "ignore" }).status === 0;
    fs.rmSync(tsxDir, { recursive: true, force: true });
    ctx.deletedTsx = true;
    ctx.log("insert", `옛 TSX 삭제: ${tsxDir}`);
  }
}
/** 이 글이 만든 자국만 지운다 — 다른 글이 같은 파일에 넣어 둔 것은 건드리지 않는다 */
function rollback(ctx) {
  if (ctx.inserted) {
    io.removeArticle(ctx.inserted, ctx.slug);
    // 리라이트였다면 원래 글을 도로 넣는다
    if (ctx.originalArticle && ctx.existingCategory) io.insertArticle(ctx.existingCategory, ctx.originalArticle);
    ctx.inserted = null;
  }
  if (ctx.deletedTsx && ctx.tsxTracked) { spawnSync("git", ["checkout", "--", path.join(io.W_DIR, ctx.slug)], { stdio: "ignore" }); ctx.deletedTsx = false; }
  if (ctx.evPristine) io.saveEvidence(ctx.slug, ctx.evPristine);
}
function trimOut(out, max = 5000) {
  const lines = out.split(/\r?\n/).filter((l) => l.trim() && !/^\s*(▶|✅|✓ )/.test(l) && !/Compil|GET \/|○|▲ Next|- Local:|Ready in/.test(l));
  const s = lines.join("\n");
  return s.length > max ? s.slice(-max) : s;
}
async function gates(ctx, plan) {
  const results = [];
  const tsc = path.join("node_modules", "typescript", "bin", "tsc");
  const file = path.join(io.ART_DIR, `${plan.category}.ts`);
  const tscFlags = ["--noEmit", "--skipLibCheck", "--strict", "--target", "es2020", "--moduleResolution", "bundler", "--module", "esnext", file];
  ctx.log("gate", "tsc");
  const t = fs.existsSync(tsc) ? await runNode([tsc, ...tscFlags], { quiet: true }) : await runCmd("npx", ["tsc", ...tscFlags], { quiet: true, shell: isWin });
  results.push({ name: "tsc (타입)", ok: t.code === 0, out: t.out });
  if (t.code !== 0) return results; // 타입이 깨지면 나머지는 의미가 없다
  for (const [name, script, args] of [
    ["숫자 근거 (verify-evidence)", "verify-evidence.mjs", [ctx.slug]],
    ["가려짐 (verify-no-shadow)", "verify-no-shadow.mjs", []],
    ["내부 링크 (verify-internal-links)", "verify-internal-links.mjs", []],
  ]) {
    ctx.log("gate", name);
    const r = await runNode([path.join("scripts", script), ...args], { quiet: true });
    results.push({ name, ok: r.code === 0, out: r.out });
  }
  if (!ctx.skipRender) {
    const url = `http://localhost:${PORT}/w/${encodeURIComponent(ctx.slug)}`;
    await ensureDev(url);
    ctx.log("gate", "화면 (verify-rendered, 로컬 dev)");
    const r = await runNode([path.join("scripts", "verify-rendered.mjs"), "--base", `http://localhost:${PORT}`, ctx.slug], { quiet: true });
    results.push({ name: "화면 (verify-rendered)", ok: r.code === 0, out: r.out });
  }
  return results;
}
/** 기계적으로 고칠 수 있는 것은 고쳐 쓰기(3~4분)에 넘기지 않고 여기서 바로 고친다. 뜻을 바꾸는 치환은 하지 않는다 */
function normalizeText(draft, ctx) {
  let dashes = 0;
  const walk = (v, key) => {
    if (typeof v === "string") {
      if (key === "url") return v;
      const n = (v.match(/—/g) || []).length;
      if (n) { dashes += n; return v.replace(/\s*—\s*/g, " · ").replace(/\s{2,}/g, " ").trim(); }
      return v;
    }
    if (Array.isArray(v)) return v.map((x) => walk(x, key));
    if (v && typeof v === "object") { const o = {}; for (const [k, x] of Object.entries(v)) o[k] = walk(x, k); return o; }
    return v;
  };
  const article = walk(draft.article, "");
  if (dashes) { ctx.notes.push(`자동 정규화: 대시(—) ${dashes}곳 → 중점(·)`); ctx.log("check", `대시 ${dashes}곳을 중점으로 바꿈`); }
  // heroStats(첫 화면 숫자 박스)는 마크다운을 그리지 않는다 — **강조** 가 글자 그대로 찍힌다 (2026-09-06 첫 글에서 확인)
  let stars = 0;
  for (const s of article.heroStats || []) for (const k of ["label", "value", "unit", "note"]) {
    if (typeof s[k] === "string" && s[k].includes("**")) { stars++; s[k] = s[k].replace(/\*\*/g, ""); }
  }
  if (stars) { ctx.notes.push(`자동 정규화: heroStats 의 ** 강조 ${stars}곳 제거 (그 칸은 마크다운을 그리지 않음)`); ctx.log("check", `heroStats 강조 표시 ${stars}곳 제거`); }
  return { ...draft, article };
}

async function applyAndGate(ctx, plan, draftIn, inputs) {
  const draft = normalizeText(draftIn, ctx);
  if (JSON.stringify(draft) !== JSON.stringify(draftIn)) writeJson(path.join(DRAFTS, `${ctx.slug}.json`), draft);
  const evNow = { ...ctx.evPristine, exampleValues: [...new Set([...(ctx.evPristine.exampleValues || []), ...draft.exampleValues])] };
  const pre = checkDraft({ article: draft.article, plan, ev: evNow, live: ctx.live, ctaAllowed: inputs.ctaAllowed, quickComponents: ctx.quickComponents });
  if (pre.length) {
    ctx.log("check", `사전 검사 ${pre.length}건 실패`);
    for (const p of pre) console.log(`           · ${p.length > 220 ? p.slice(0, 220) + "…" : p}`);
    return { ok: false, results: [{ name: "사전 검사 (check-draft)", ok: false, out: pre.map((p) => "❌ " + p).join("\n") }] };
  }
  ctx.log("check", "사전 검사 통과");
  const ev = structuredClone(ctx.evPristine);
  ev.exampleValues = evNow.exampleValues;
  const baseNote = String(ctx.evPristine.exampleNote || "").trim();
  const newNote = String(draft.exampleNote || "").trim();
  ev.exampleNote = [baseNote, newNote && !baseNote.includes(newNote) ? newNote : ""].filter(Boolean).join(" ");
  if (ev.exampleValues.length && !ev.exampleNote) ev.exampleNote = "예시: 본문의 가정값은 설명을 위한 예시다.";
  io.saveEvidence(ctx.slug, ev);
  // 여기부터가 유일한 공유 구간 — 카테고리 파일에 넣고 검사하고 통과/되돌림까지 한 줄로 세운다.
  // 동시에 두 글이 이 구간에 들어오면 A 를 되돌릴 때 B 가 지워진다.
  return gateLock(async () => {
    if (PARALLEL > 1) ctx.log("gate", "차례 잡음 (삽입·검사 구간)");
    applyDraft(ctx, plan, draft);
    const results = await gates(ctx, plan);
    const ok = results.every((r) => r.ok);
    // 실패하면 이 자리에서 되돌린다 — 잠금을 놓기 전에 파일을 원래대로 만들어야 다음 글이 깨끗한 파일을 본다
    if (!ok) rollback(ctx);
    return { ok, results };
  });
}

/* ── 7. 보고 ── */
async function screenshot(ctx) {
  if (ctx.skipRender || !dev.up) return "";
  try {
    const { chromium } = await import("playwright");
    const b = await chromium.launch();
    const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto(`http://localhost:${PORT}/w/${encodeURIComponent(ctx.slug)}`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await p.waitForTimeout(1500);
    const out = path.join(REPORTS, `${ctx.slug}.png`);
    await p.screenshot({ path: out, fullPage: true });
    await b.close();
    return out;
  } catch (e) { ctx.notes.push("렌더 캡처 실패: " + e.message.split("\n")[0]); return ""; }
}
function writeReport(ctx, { ok, plan, results, error, shot }) {
  const L = [];
  L.push(`# ${ok ? "✅ 통과" : "❌ 실패"} — ${ctx.slug}`);
  L.push("");
  L.push(`- 타이틀: ${plan?.title || "(설계도 없음)"}`);
  L.push(`- 카테고리: ${plan?.category || ctx.category || "?"} · 주제: ${ctx.topic}`);
  L.push(`- 실행: ${new Date().toLocaleString("ko-KR")} · 총 ${mins(Date.now() - ctx.t0)} · 고친 횟수 ${ctx.fixRounds}`);
  if (ctx.exampleUsed) L.push(`- 예시로 쓴 글: ${ctx.exampleUsed}`);
  if (ctx.deletedTsx) L.push(`- 옛 TSX 삭제: src/app/w/${ctx.slug}/${ok ? "" : " (실패라 되돌림)"}`);
  L.push("");
  L.push("## 단계별 시간·사용량");
  L.push("| 단계 | 시간 | 모델 호출 | 입력 토큰 | 출력 토큰 | 환산 $ |", "|---|---|---|---|---|---|");
  const kk = (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n || 0));
  for (const [k, v] of Object.entries(ctx.timings)) {
    const u = ctx.meter?.byStage?.[k];
    L.push(`| ${k} | ${mins(v)} | ${u?.calls ?? "-"} | ${u ? kk(u.input) : "-"} | ${u ? kk(u.output) : "-"} | ${u?.cost ? u.cost.toFixed(2) : "-"} |`);
  }
  const m = ctx.meter;
  if (m) L.push(`| **합계** | **${mins(Date.now() - ctx.t0)}** | **${m.calls}** | **${kk(m.input)}** | **${kk(m.output)}** | **${m.cost.toFixed(2)}** |`);
  L.push("");
  L.push("> 구독이라 실제 청구는 없습니다. 환산 $ 는 사용 한도를 얼마나 먹었는지의 척도입니다.");
  L.push("");
  if (plan) {
    L.push("## 설계도");
    plan.clusters.forEach((c, i) => L.push(`${i + 1}. [${c.eyebrow}] ${c.h2}${c.visual ? ` (${c.visual})` : ""}`, ...c.h3.map((h) => `   - ${h}`)));
    L.push(`- 조문: ${plan.laws.map((l) => `${l.name} ${l.articles.map((a) => `제${a}조`).join("·")}`).join(" / ") || "없음"}`);
    L.push(`- 페이지: ${plan.urls.map((u) => u.url).join(" , ") || "없음"}`);
    L.push(`- CTA: ${plan.ctas.map((c) => `${c.label} → ${c.url}`).join(" / ")}`);
    L.push("");
  }
  const ev = io.loadEvidence(ctx.slug);
  if (ev) {
    L.push("## 증거");
    L.push(`- 수집일 ${ev.verifiedAt} · fact ${(ev.facts || []).length} · 원문 ${(ev.raws || []).length} · 캡처 ${Object.keys(ev.capturesReviewed || {}).length}장`);
    for (const [f, l] of Object.entries(ev.capturesReviewed || {})) L.push(`  - ${f}: ${l}`);
    if ((ev.exampleValues || []).length) L.push(`- 파생값: ${ev.exampleValues.join(", ")}`, `  - 산식: ${ev.exampleNote}`);
    L.push("");
  }
  if (ctx.rounds?.length) {
    L.push("## 검사 (회차별)");
    L.push(`| 검사 | ${ctx.rounds.map((_, i) => (i === 0 ? "초안" : `고침 ${i}`)).join(" | ")} |`, `|---|${ctx.rounds.map(() => "---").join("|")}|`);
    const names = [...new Set(ctx.rounds.flatMap((r) => r.map((x) => x.name)))];
    for (const n of names) L.push(`| ${n} | ${ctx.rounds.map((r) => { const x = r.find((y) => y.name === n); return x ? (x.ok ? "✓" : "✗") : "·"; }).join(" | ")} |`);
    L.push("");
    ctx.rounds.forEach((r, i) => {
      const bad = r.filter((x) => !x.ok);
      if (!bad.length) return;
      L.push(`## 실패 내용 — ${i === 0 ? "초안" : `고침 ${i}`}`);
      for (const x of bad) L.push(`### ${x.name}`, "```", trimOut(x.out, i === ctx.rounds.length - 1 ? 6000 : 1500), "```");
      L.push("");
    });
  } else if (results?.length) {
    L.push("## 검사");
    L.push("| 검사 | 결과 |", "|---|---|");
    for (const r of results) L.push(`| ${r.name} | ${r.ok ? "✓" : "✗"} |`);
    L.push("");
  }
  if (error) L.push("## 오류", "```", String(error), "```", "");
  if (ctx.notes.length) L.push("## 메모", ...ctx.notes.map((n) => `- ${n}`), "");
  if (shot) L.push(`## 렌더 캡처`, `![${ctx.slug}](${path.basename(shot)})`, "");
  L.push("## 다음");
  if (ok) L.push(`- 캡처를 보고 채점 → 통과면 \`git push\` (pre-push 게이트가 한 번 더 확인)`, ctx.committed ? `- 커밋됨: ${ctx.committed}` : `- 커밋하려면: npm run article -- ${ctx.slug} --commit  (초안·증거는 재사용되어 검사만 다시 돕니다)`);
  else if (fs.existsSync(path.join(DRAFTS, `${ctx.slug}.json`))) L.push(`- 초안은 scripts/drafts/${ctx.slug}.json 에 남아 있습니다. 실패 내용을 보고: npm run article -- ${ctx.slug} (초안 재사용, 검사만) · --from write (다시 쓰기) · --from plan (설계부터)`);
  else L.push(`- 같은 명령을 다시 실행하면 끝난 단계(설계도·증거)는 재사용하고 멈춘 곳부터 이어서 돕니다`);
  const file = path.join(REPORTS, `${ctx.slug}.md`);
  fs.writeFileSync(file, L.join("\n") + "\n");
  return file;
}
function commit(ctx, plan) {
  const paths = [path.join(io.ART_DIR, `${plan.category}.ts`), io.evidencePath(ctx.slug), io.evidenceDir(ctx.slug), path.join(PLANS, `${ctx.slug}.json`)];
  if (ctx.existingCategory && ctx.existingCategory !== plan.category) paths.push(path.join(io.ART_DIR, `${ctx.existingCategory}.ts`));
  if (ctx.deletedTsx) paths.push(path.join(io.W_DIR, ctx.slug));
  const add = spawnSync("git", ["add", "-A", "--", ...paths.filter((p) => fs.existsSync(p) || ctx.deletedTsx)], { encoding: "utf8" });
  if (add.status !== 0) { ctx.notes.push("git add 실패: " + add.stderr); return ""; }
  const r = spawnSync("git", ["commit", "-m", `feat: ${plan.title}`, "-m", `npm run article ${ctx.slug} · 계획→수집→캡처 읽기→작성→검사 자동 · 고친 횟수 ${ctx.fixRounds}`], { encoding: "utf8" });
  if (r.status !== 0) { ctx.notes.push("git commit 실패: " + (r.stderr || r.stdout)); return ""; }
  const sha = spawnSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).stdout.trim();
  ctx.committed = sha;
  return sha;
}

/* ── 한 편 ── */
async function runOne(slug, flags) {
  const ctx = makeCtx(slug, flags);
  let plan = null, results = null, ok = false, error = null;
  const meter = ctx.meter;
  console.log(`\n══════════ ${slug} ══════════`);
  console.log(`한 편에 보통 12~18분입니다. 단계: 설계(1~2분) → 버튼 확인 → 수집(1분) → 캡처 읽기 → 작성(7~9분) → 검사(2분) → 필요하면 고쳐 쓰기(3~4분).`);
  console.log(`모델: 설계·캡처·고치기 ${ctx.model} · 글 작성 ${ctx.writerModel} (Fable 은 쓰지 않습니다 — 대화창 몫)`);
  console.log(`모델 호출 8~11회 · 호출마다 고정비 4만~5만 토큰이 붙습니다. 상한 이 글 $${budget.perArticle}${flags.batch ? ` / 묶음 $${budget.batch}` : ""} — 넘으면 멈춥니다.`);
  try {
    await timed(ctx, "guard", () => guard(ctx));
    plan = await timed(ctx, "plan", () => stagePlan(ctx));
    plan = await timed(ctx, "cta", () => stageCtaCheck(ctx, plan));
    const ev = await timed(ctx, "collect", () => stageCollect(ctx, plan));
    await timed(ctx, "captures", () => stageCaptures(ctx, ev));
    ctx.evPristine = structuredClone(io.loadEvidence(ctx.slug));
    const inputs = writerInputs(ctx, plan, ctx.evPristine);
    let draft = await timed(ctx, "write", () => stageWrite(ctx, plan, ctx.evPristine, inputs));
    ctx.rounds = [];
    let res = await timed(ctx, "gates", () => applyAndGate(ctx, plan, draft, inputs));
    ctx.rounds.push(res.results);
    while (!res.ok && ctx.fixRounds < ctx.maxFix) {
      ctx.fixRounds++;
      const failed = res.results.filter((r) => !r.ok);
      ctx.log("fix", `고치기 ${ctx.fixRounds}/${ctx.maxFix} — ${failed.map((r) => r.name).join(", ")}`);
      const failures = failed.map((r) => `### ${r.name}\n${trimOut(r.out)}`).join("\n\n");
      const { text } = await timed(ctx, "fix", async () => ask(ctx, fixPrompt({ draft, failures, plan, ev: ctx.evPristine, digest: inputs.digest, linkCandidates: inputs.linkCandidates, ctas: inputs.ctas, quickComponents: ctx.quickComponents, today: today() }), { label: `fix${ctx.fixRounds}`, model: ctx.writerModel, logDir: ctx.logDir, expect: "3~4분" }));
      const draftFile = path.join(DRAFTS, `${ctx.slug}.json`);
      fs.copyFileSync(draftFile, `${draftFile}.r${ctx.fixRounds - 1}`);
      draft = normalizeDraft(extractJson(text));
      writeJson(draftFile, draft);
      res = await timed(ctx, "gates", () => applyAndGate(ctx, plan, draft, inputs));
      ctx.rounds.push(res.results);
    }
    results = res.results; ok = res.ok;
  } catch (e) {
    error = e.stack || e.message;
    console.error(`\n✗ ${slug}: ${e.message}`);
  }
  let shot = "";
  if (ok) {
    shot = await screenshot(ctx);
    if (ctx.commit) commit(ctx, plan);
  } else if (!ctx.keepOnFail) {
    // 되돌리기도 공유 파일을 건드리므로 같은 잠금 안에서 한다
    await gateLock(async () => rollback(ctx));
  }
  const report = writeReport(ctx, { ok, plan, results, error, shot });
  console.log(`\n${ok ? "✅ 통과" : "❌ 실패"} — 보고서 ${report}${shot ? ` · 캡처 ${shot}` : ""}`);
  console.log(`   이 글이 쓴 양: 모델 호출 ${meter.calls}회 · ${fmtUsage(meter)} · ${mins(Date.now() - ctx.t0)}`);
  return { slug, ok, title: plan?.title || "", report, shot, error: error ? String(error).split("\n")[0] : "", fixRounds: ctx.fixRounds, ms: Date.now() - ctx.t0, usage: { ...meter } };
}

/* ── 묶음 ── */
function parseBatch(file) {
  return fs.readFileSync(file, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => {
    const [slug, topic, category, keywords, title] = l.split("|").map((s) => s.trim());
    return { slug, topic, category, keywords, title };
  });
}

const { flags, positional } = parseArgs(process.argv.slice(2));
if (flags.budget) budget.perArticle = Number(flags.budget);
if (flags["batch-budget"]) budget.batch = Number(flags["batch-budget"]);
if (flags.parallel) PARALLEL = Math.max(1, Math.min(8, Number(flags.parallel) || 1));
try {
  if (flags.batch) {
    const items = parseBatch(String(flags.batch));
    const t0 = Date.now();
    console.log(`묶음 ${items.length}편 · 동시 실행 ${PARALLEL}편 (설계·수집·작성은 동시에, 파일 삽입·검사는 한 줄로)`);
    const summary = new Array(items.length);
    let next = 0;
    const worker = async () => {
      while (next < items.length) {
        const i = next++;
        const it = items[i];
        const f = { ...flags, topic: it.topic || flags.topic, category: it.category || flags.category, keywords: it.keywords || flags.keywords, title: it.title || flags.title };
        delete f.batch;
        summary[i] = await runOne(it.slug, f);
      }
    };
    await Promise.all(Array.from({ length: Math.min(PARALLEL, items.length) }, worker));
    const kk = (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n || 0));
    const L = [`# 묶음 결과 — ${new Date().toLocaleString("ko-KR")}`, "", "| slug | 결과 | 타이틀 | 고침 | 시간 | 호출 | 입력 | 출력 | 환산 $ | 보고서 |", "|---|---|---|---|---|---|---|---|---|---|"];
    for (const s of summary) L.push(`| ${s.slug} | ${s.ok ? "✅" : "❌"} | ${s.title} | ${s.fixRounds} | ${mins(s.ms)} | ${s.usage.calls} | ${kk(s.usage.input)} | ${kk(s.usage.output)} | ${s.usage.cost.toFixed(2)} | ${path.basename(s.report)}${s.error ? ` — ${s.error}` : ""} |`);
    L.push(`| **합계 ${summary.filter((s) => s.ok).length}/${summary.length} 통과** | | | | | **${batchMeter.calls}** | **${kk(batchMeter.input)}** | **${kk(batchMeter.output)}** | **${batchMeter.cost.toFixed(2)}** | |`);
    L.push("", "> 구독이라 실제 청구는 없습니다. 환산 $ 는 사용 한도를 얼마나 먹었는지의 척도입니다.");
    const file = path.join(REPORTS, `batch-${today()}.md`);
    const wall = Date.now() - t0;
    const cpu = summary.reduce((n, s) => n + s.ms, 0);
    L.push("", `- 실제 걸린 시간 ${mins(wall)} · 글 시간 합계 ${mins(cpu)} · 동시 실행 ${PARALLEL}편 (${(cpu / wall).toFixed(1)}배 겹침)`);
    fs.writeFileSync(file, L.join("\n") + "\n");
    console.log(`\n══════════ 묶음 끝: ${summary.filter((s) => s.ok).length}/${summary.length} 통과 · ${mins(wall)} (합계 ${mins(cpu)}, ${(cpu / wall).toFixed(1)}배 겹침) · 모델 호출 ${batchMeter.calls}회 · ${fmtUsage(batchMeter)} — ${file}`);
    process.exitCode = summary.every((s) => s.ok) ? 0 : 1;
  } else {
    const r = await runOne(positional[0], flags);
    process.exitCode = r.ok ? 0 : 1;
  }
} finally {
  stopDev();
}
