#!/usr/bin/env node
/**
 * 글 파이프라인 (2026-09-16 새로 씀) — 타이틀·소제목을 받아 한 번에 끝낸다.
 *
 *   수집(Playwright) → 작성(claude -p 1회, 캡처는 Read 로 직접 봄) → 삽입·검사 → 떨어지면 고치기 1회 → 다시 검사 → 끝.
 *   그래도 떨어지면 그 글은 버리고 보고서에 이유만 남긴다. 되풀이 루프·설계 단계·뜻 판정은 없다.
 *
 *   npm run article -- <slug> --title "…" --headings "A / B / C" [--category 법률] [--law 민법:840,841] [--url https://…] [--commit]
 *   npm run article -- --batch scripts/batch.txt [--parallel 3]
 *     줄마다: slug | 타이틀 | 소제목 A / B / C | 카테고리 | 조문(고용보험법:40,45; 민법:840) | URL(공백 구분)
 *   조문·URL 을 비우면 타이틀·소제목을 보고 고르는 짧은 호출이 하나 붙는다. 주는 쪽이 낫다.
 *   --draft scripts/reports/logs/<slug>/draft-0.json  쓰다 죽은 실행의 초안을 이어서 검사한다 (다시 쓰지 않는다)
 *   --prompt-only  수집까지 하고 지시문을 scripts/reports/logs/<slug>/prompt.txt 에 남긴 뒤 끝난다 (대화창 모드 1단계)
 *   --headless   브라우저 창을 띄우지 않는다 (기본은 띄운다 — 수집·검색·화면 검사가 보인다). 모델 호출은 도구 사용·쓴 글자 수가 30초마다 찍힌다
 *
 * 산출물
 *   scripts/evidence/<slug>.json (+ <slug>/*.png)   증거
 *   src/data/articles/<카테고리>.ts                   통과한 글만 남는다. 실패하면 원래대로
 *   scripts/reports/<slug>.md / .png                  보고서 한 장 + 렌더 캡처
 *   scripts/reports/logs/<slug>/                      지시문·답·초안 원문 (문제 추적용)
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn, spawnSync } from "node:child_process";
import { ask as askRaw, extractJson, assertSubscriptionOnly, newMeter, addUsage, fmtUsage } from "./lib/headless.mjs";
import * as io from "./lib/article-io.mjs";
import { ctaRegistry, buttonLabel } from "./lib/cta-rules.mjs";
import { evidenceDigest, writePrompt, fixPrompt, pickSourcesPrompt } from "./lib/prompts.mjs";

const PORT = 3111;
const isWin = process.platform === "win32";
const REPORTS = path.join("scripts", "reports");
fs.mkdirSync(REPORTS, { recursive: true });
let PARALLEL = 1;

const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const hms = () => new Date().toTimeString().slice(0, 8);
const mins = (ms) => `${(ms / 60000).toFixed(1)}분`;
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJson = (p, v) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n"); };
// 관련 글·등록부를 고를 때 쓰는 낱말. "방법·기준·요건" 같은 말은 모든 글에 있어 무관한 글(개인파산, 정리해고)을 끌어온다 (2026-09-16)
const GENERIC = new Set(["방법", "기준", "요건", "조건", "기간", "신청", "절차", "금액", "계산", "여부", "경우", "어떻게", "어떤", "어느", "무슨", "무엇", "언제", "얼마", "그리고", "부터", "까지", "되나요", "하나요", "인가요", "있나요", "가능", "확인", "정리", "총정리", "차이", "비교", "대상", "종류", "시기", "필요", "서류", "준비", "주의", "사항"]);
const tokens = (s) => [...new Set(String(s).split(/[\s\-·,()/?？]+/).filter((t) => t.length >= 2 && !GENERIC.has(t)))];

/* ── 인자 ── */
function parseArgs(argv) {
  const flags = {}; const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { positional.push(a); continue; }
    const k = a.slice(2); const nxt = argv[i + 1];
    const v = nxt !== undefined && !nxt.startsWith("--") ? (i++, nxt) : true;
    if (k === "law" || k === "url") (flags[k] = flags[k] || []).push(v); else flags[k] = v;
  }
  return { flags, positional };
}
function parseBatch(file) {
  return fs.readFileSync(file, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => {
    const [slug, title, headings, category, law, url] = l.split("|").map((s) => (s || "").trim());
    return { slug, title, headings, category, law: law ? law.split(";").map((s) => s.trim()).filter(Boolean) : [], url: url ? url.split(/\s+/).filter(Boolean) : [] };
  });
}

/* ── 자식 프로세스 ── */
function runCmd(cmd, args, { quiet = false, shell = false } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { shell, env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: "1" } });
    let out = "";
    const onData = (d) => { const s = d.toString(); out += s; if (!quiet) process.stdout.write(s); };
    child.stdout.on("data", onData); child.stderr.on("data", onData);
    child.on("close", (code) => resolve({ code, out }));
    child.on("error", (e) => resolve({ code: -1, out: `${out}\n${e.message}` }));
  });
}
const runNode = (args, opt) => runCmd(process.execPath, args, opt);

/* ── dev 서버 (화면 검사용) ── */
const ping = (url) => new Promise((res) => {
  const req = http.get(url, (r) => { r.resume(); res(r.statusCode === 200); });
  req.on("error", () => res(false));
  req.setTimeout(240000, () => { req.destroy(); res(false); });
});
function freePort() {
  if (!isWin) return;
  spawnSync("powershell", ["-NoProfile", "-Command", `$p = Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; if ($p) { $p | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }`], { stdio: "ignore" });
}
const dev = { proc: null, up: false, external: false };
let devPromise = null;
function ensureDev(firstUrl) {
  if (dev.up) return Promise.resolve();
  if (!devPromise) devPromise = startDev(firstUrl).catch((e) => { devPromise = null; throw e; });
  return devPromise;
}
async function startDev(firstUrl) {
  if (await ping(`http://localhost:${PORT}/`)) { dev.up = true; dev.external = true; return; }
  console.log(`[${hms()}] dev       서버 기동 (포트 ${PORT}) — 첫 컴파일 몇 분`);
  freePort();
  const start = () => spawn("npx", ["next", "dev", "--webpack", "-p", String(PORT)], { stdio: ["ignore", "pipe", "pipe"], shell: isWin, env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: "1" } });
  dev.proc = start();
  let portTaken = false;
  const wire = () => dev.proc.stderr.on("data", (d) => { if (/EADDRINUSE/.test(d.toString())) portTaken = true; });
  wire();
  const deadline = Date.now() + 300000;
  const t0 = Date.now(); let lastBeat = t0;
  while (Date.now() < deadline) {
    if (await ping(firstUrl)) { dev.up = true; console.log(`[${hms()}] dev       준비 완료 (${mins(Date.now() - t0)})`); return; }
    if (Date.now() - lastBeat >= 30000) { lastBeat = Date.now(); console.log(`[${hms()}] dev       컴파일 중 … ${mins(Date.now() - t0)} 경과 (보통 2~4분)`); }
    if (portTaken) { stopDev(); freePort(); portTaken = false; dev.proc = start(); wire(); }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error("dev 서버가 300초 안에 뜨지 않았습니다");
}
function stopDev() {
  if (!dev.proc || dev.external) return;
  if (isWin) spawnSync("taskkill", ["/pid", String(dev.proc.pid), "/T", "/F"], { stdio: "ignore" }); else dev.proc.kill("SIGTERM");
  dev.proc = null; dev.up = false;
}
process.on("exit", stopDev);
process.on("SIGINT", () => { stopDev(); process.exit(130); });

/* ── 카테고리 파일은 여러 글이 공유한다 — 삽입·검사·되돌림 구간만 한 줄로 ── */
let tail = Promise.resolve();
const locked = (fn) => { const run = tail.then(fn, fn); tail = run.then(() => {}, () => {}); return run; };

/* ── 모델 호출 (사용량을 적는다) ── */
const batchMeter = newMeter();
async function ask(ctx, prompt, opt) {
  const r = await askRaw(prompt, { ...opt, model: ctx.model, logDir: ctx.logDir, tag: PARALLEL > 1 ? ctx.slug : undefined });
  addUsage(ctx.meter, r.usage, opt.label); addUsage(batchMeter, r.usage, opt.label);
  ctx.log(opt.label, `${fmtUsage(r.usage)} · ${(r.ms / 1000).toFixed(0)}초`);
  return r;
}

/* ── 0. 문지기 ── */
function guard(ctx) {
  assertSubscriptionOnly();
  if (!ctx.slug) throw new Error("slug 가 필요합니다");
  if (io.protectedSlugs().has(ctx.slug)) throw new Error(`${ctx.slug} 는 계산기(불가침)입니다`);
  if (/^forms?(\/|$)/.test(ctx.slug)) throw new Error("양식은 건드리지 않습니다");
  if (!ctx.title) throw new Error("--title 이 필요합니다 (타이틀은 사용자가 줍니다)");
  if (ctx.headings.length < 2 || ctx.headings.length > 5) throw new Error(`--headings 는 2~5개 (지금 ${ctx.headings.length}개) — "A / B / C" 로 슬래시 구분`);
  const existing = io.articleSlugs();
  ctx.existingCategory = existing.get(ctx.slug) || "";
  if (!ctx.category) ctx.category = ctx.existingCategory;
  if (!ctx.category) throw new Error(`--category 가 필요합니다: ${io.categoryFiles().join(" / ")}`);
  if (!io.categoryFiles().includes(ctx.category)) throw new Error(`category "${ctx.category}" 는 ${io.categoryFiles().join(" / ")} 중 하나`);
  if (ctx.existingCategory) {
    try { ctx.originalArticle = io.loadCategory(ctx.existingCategory).articles.find((a) => a.slug === ctx.slug) || null; } catch { ctx.originalArticle = null; }
  }
  ctx.live = io.liveSlugs();
  const qdir = path.join("src", "components", "article", "quick");
  ctx.quickComponents = fs.existsSync(qdir) ? fs.readdirSync(qdir).filter((f) => /\.tsx$/.test(f) && !/^index/.test(f)).map((f) => f.replace(/\.tsx$/, "")) : [];
}

/* ── 1. 수집 ── */
const normArt = (a) => { const m = String(a).replace(/\s/g, "").match(/^제?(\d+)조?(?:(?:의|-)(\d+))?$/); return m ? `${m[1]}${m[2] ? `의${m[2]}` : ""}` : ""; };
const artLabel = (n) => { const m = String(n).match(/^(\d+)(?:의(\d+))?$/); return m ? `제${m[1]}조${m[2] ? `의${m[2]}` : ""}` : `제${n}조`; };
const okUrl = (u) => /^https?:\/\/[^/]+\.(go|or)\.kr(\/|$)/.test(u) && !/^https?:\/\/[^/]+\/?$/.test(u);
const dec = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
function parseLaws(list) {
  return list.map((s) => { const [name, arts] = String(s).split(":"); return { name: (name || "").trim(), articles: (arts || "").split(",").map(normArt).filter(Boolean) }; }).filter((l) => l.name && l.articles.length);
}
/**
 * 찾기쉬운 생활법령정보(easylaw.go.kr) 통합검색을 Playwright 로 열어 결과 주소를 모은다 — 실제로 있는 주소만 후보가 된다.
 * 정본 글의 두께는 근거 두께에서 왔다(6개 출처 96개 사실). 조문만으로 쓴 이혼 글은 얇았다 (2026-09-16).
 * 검색 결과 영역은 #result 안의 링크. 상단 "최근 본 법령정보" 같은 곳은 밖이라 안 잡힌다.
 */
async function easylawCandidates(ctx) {
  // 통합검색은 AND 검색이라 단어가 많으면 0건이 된다 — 2단어씩, 조사는 뗀다 ("사유가" → "사유")
  const bare = (s) => tokens(s).map((t) => t.replace(/(이면|으로|에서|부터|까지|에게|이란|란|가|는|은|을|를|의|에|로|도|만|와|과)$/, "")).filter((t) => t.length >= 2 && !/^\d/.test(t));
  const queries = [...new Set([bare(ctx.title).slice(0, 2).join(" "), ...ctx.headings.map((h) => bare(h).slice(0, 2).join(" "))])].filter((q) => q.includes(" ")).slice(0, 4);
  const out = new Map();
  try {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch({ headless: !process.env.PW_HEADED });
    const page = await browser.newPage();
    for (const q of queries) {
      ctx.log("sources", `생활법령 검색 "${q}"`);
      try {
        await page.goto(`https://www.easylaw.go.kr/CSP/UnScRlt.laf?search_put=${encodeURIComponent(q)}`, { waitUntil: "domcontentloaded", timeout: 60000 });
        const links = await page.locator("#result a").evaluateAll((as) => as.map((a) => ({ t: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 90), h: a.href })));
        for (const l of links) if (/CnpClsMain\.laf|OnhunqueansInfoRetrieve\.laf/.test(l.h) && l.t.length >= 4 && !out.has(l.h)) out.set(l.h, l.t);
      } catch (e) { ctx.notes.push(`생활법령 검색 실패 "${q}": ${e.message.split("\n")[0]}`); }
    }
    await browser.close();
  } catch (e) { ctx.notes.push(`생활법령 검색을 못 열었습니다: ${e.message.split("\n")[0]}`); }
  return [...out].slice(0, 40).map(([url, title]) => ({ url, title }));
}
async function pickSources(ctx) {
  const toks = tokens(`${ctx.title} ${ctx.headings.join(" ")}`);
  const hit = (s) => toks.some((t) => String(s).includes(t));
  // 등록부는 이 주제의 글이 쓴 적 있는 주소만 넘긴다. 무관한 것으로 채우면 모델이 그걸 고른다
  // (이혼 글에 실업급여 안내 페이지 3개가 근거로 들어갔다, 2026-09-16)
  const registry = io.sourceRegistry().filter((r) => r.usedBy.some(hit)).slice(0, 40);
  ctx.log("sources", "생활법령정보 검색 (Playwright)");
  const candidates = await easylawCandidates(ctx);
  ctx.log("sources", `검색 결과 ${candidates.length}건 — 조문·페이지를 고릅니다 (claude -p, 1분 안팎)`);
  const { text } = await ask(ctx, pickSourcesPrompt({ title: ctx.title, headings: ctx.headings, registry, candidates, givenLaws: ctx.laws, givenUrls: ctx.urls }), { label: "sources", expect: "1분" });
  const p = extractJson(text);
  if (!ctx.laws.length) ctx.laws = (p.laws || []).map((l) => ({ name: String(l?.name || "").trim(), articles: [...new Set((l?.articles || []).map(normArt).filter(Boolean))] })).filter((l) => l.name && l.articles.length);
  const picked = (p.urls || []).map((u) => String(u?.url || u || "").trim()).filter((u) => okUrl(u) && !/law\.go\.kr\/법령\//.test(dec(u)));
  ctx.urls = [...new Set([...ctx.urls, ...picked])].slice(0, 6);
  ctx.notes.push(`고른 출처: 조문 ${ctx.laws.map((l) => `${l.name} ${l.articles.join(",")}`).join(" / ") || "없음"} · 페이지 ${ctx.urls.join(" ") || "없음"}`);
}
function covered(ctx, ev) {
  const srcs = (ev.sources || []).map((s) => dec(s.url));
  for (const l of ctx.laws) for (const n of l.articles) if (!srcs.some((u) => u.includes(`/${l.name}/${artLabel(n)}`))) return false;
  for (const u of ctx.urls) if (!srcs.includes(dec(u))) return false;
  return true;
}
async function collect(ctx) {
  // 페이지를 안 줬을 때만 고른다. 페이지를 줬으면 그걸로 쓴다 — 조문까지 채우려고 호출 하나를 더 쓰지 않는다
  if (!ctx.urls.length) await pickSources(ctx);
  if (!ctx.laws.length && !ctx.urls.length) throw new Error("열 조문도 페이지도 없습니다 — --law / --url 을 주세요");
  let ev = io.loadEvidence(ctx.slug);
  const age = ev?.verifiedAt ? (Date.now() - new Date(ev.verifiedAt).getTime()) / 86400000 : Infinity;
  if (ev && age <= 25 && (ev.facts || []).length && covered(ctx, ev) && !ctx.recollect) {
    ctx.log("collect", `증거 재사용 (${ev.verifiedAt}, fact ${ev.facts.length}) — 다시 모으려면 --recollect`);
    return ev;
  }
  const args = [path.join("scripts", "collect-evidence.mjs"), ctx.slug];
  for (const l of ctx.laws) args.push("--law", `${l.name}:${l.articles.join(",")}`);
  for (const u of ctx.urls) args.push("--url", u);
  ctx.log("collect", `Playwright — 조문 ${ctx.laws.reduce((n, l) => n + l.articles.length, 0)}개 · 페이지 ${ctx.urls.length}개`);
  const before = ev ? structuredClone(ev) : null;
  const r = await runNode(args); // 페이지마다 한 줄씩 그대로 보인다
  ev = io.loadEvidence(ctx.slug);
  // 새로 고른 출처를 옛 증거가 덮어쓰면 안 된다 — 0건일 때만 이전 증거로 되돌린다 ("적으면 되돌림" 규칙이 새 판례 페이지를 버렸다, 2026-09-16)
  if (!(ev?.facts || []).length && (before?.facts || []).length) { ctx.notes.push(`새 수집이 0건이라 이전 증거(${before.facts.length}건)를 씁니다`); io.saveEvidence(ctx.slug, before); ev = before; }
  if (!ev || !(ev.facts || []).length) throw new Error(`증거 수집 실패 (exit ${r.code})\n${r.out.slice(-1500)}`);
  if (ev !== before) { ev.capturesReviewed = {}; io.saveEvidence(ctx.slug, ev); }
  const fails = r.out.split(/\r?\n/).filter((l) => /실패|✗|❌/.test(l)).slice(0, 12);
  if (fails.length) ctx.notes.push("수집 중 실패:\n" + fails.map((l) => "  " + l.trim()).join("\n"));
  ctx.log("collect", `fact ${ev.facts.length} · 원문 ${(ev.raws || []).length} · 출처 ${(ev.sources || []).length}`);
  return ev;
}

/* ── 2. 작성 ── */
/** 정본 템플릿의 <article> 본문을 뼈대만 남긴다 — CSS·스크립트를 빼고 블록 이름(<section.q>, <p.lead>, <div.kf> …)과 글자, 저자 주석만.
 *  모델이 정본 본문을 한 번도 못 보고 썼다 (머리말 기준 12개만 받았다, 2026-09-16) */
function templateOutline(html) {
  let s = html.slice(html.indexOf("<article"), html.indexOf("</article>") + 10);
  s = s.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<svg[\s\S]*?<\/svg>/g, "");
  const BLOCK = /^(section|article|div|h1|h2|h3|h4|p|ul|ol|li|table|thead|tbody|tr|th|td|figure|figcaption|details|summary|dl|dt|dd|blockquote|aside|nav|button|label|form|a)$/;
  s = s.replace(/<(\/?)(\w+)([^>]*)>/g, (m, close, tag, attrs) => {
    if (close) return /^(section|div|table|figure|details|ul|ol|dl)$/.test(tag) ? "\n" : " ";
    if (!BLOCK.test(tag)) return " ";
    const cls = (attrs.match(/class="([^"]+)"/) || [])[1];
    const id = (attrs.match(/id="([^"]+)"/) || [])[1];
    return `\n<${tag}${id ? "#" + id : ""}${cls ? "." + cls.split(/\s+/).join(".") : ""}> `;
  });
  return s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
}
function writerInputs(ctx, ev) {
  const toks = tokens(`${ctx.title} ${ctx.headings.join(" ")}`);
  const hit = (s) => toks.some((t) => s.includes(t));
  const links = [...ctx.live].filter((s) => s !== ctx.slug && hit(s)).slice(0, 60);
  const ctas = ctaRegistry().screens.map((s) => ({ label: s.label, url: s.url, org: s.org, button: s.button }));
  const dir = io.evidenceDir(ctx.slug);
  const pngs = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".png")).map((f) => path.resolve(dir, f).replace(/\\/g, "/")) : [];
  const cat = io.loadCategory(ctx.category);
  let arts = cat.articles.filter((a) => a.slug !== ctx.slug);
  if (!arts.length) arts = io.categoryFiles().filter((c) => c !== ctx.category).map((c) => io.loadCategory(c)).sort((x, y) => y.articles.length - x.articles.length)[0]?.articles || [];
  const example = arts[arts.length - 1];
  if (!example) throw new Error("예시로 쓸 통과 글이 없습니다");
  ctx.exampleUsed = example.slug;
  const html = fs.readFileSync(path.join("docs", "moneywiki-article-template.html"), "utf8");
  const criteria = (html.match(/<!--([\s\S]*?)-->/) || ["", ""])[1].trim();
  const outline = templateOutline(html);
  return {
    title: ctx.title, headings: ctx.headings, slug: ctx.slug, category: ctx.category, ev, digest: evidenceDigest(ev), pngs, links, ctas,
    quickComponents: ctx.quickComponents, typesSrc: fs.readFileSync(path.join("src", "data", "articles", "types.ts"), "utf8"), criteria, outline, example, today: today(),
    ctaAllowed: new Set(ctas.map((c) => c.url)), srcUrls: new Set((ev.sources || []).map((s) => dec(s.url))), pngNames: pngs.map((p) => path.basename(p)),
  };
}
function parseDraft(text) {
  const d = extractJson(text);
  if (!d?.article || typeof d.article !== "object") throw new Error("답에 article 객체가 없습니다");
  return { article: d.article, exampleValues: Array.isArray(d.exampleValues) ? d.exampleValues.map(String) : [], exampleNote: String(d.exampleNote || ""), captures: d.captures && typeof d.captures === "object" ? d.captures : {} };
}

/* ── 3. 삽입 + 검사 ── */
const HYPE = /축하|무조건|100\s*%\s*(보장|받)|확정적으로|반드시\s*받|대상이에요|당첨/;
/** 주어진 것은 주어진 대로 못박고, 기계로 고칠 수 있는 것만 고친 뒤 삽입 전에 잡을 수 있는 것을 잡는다 */
function enforce(ctx, draft, inputs) {
  const a = draft.article;
  const problems = [];
  const walk = (v, key) => {
    if (typeof v === "string") return key === "url" ? v : v.replace(/\s*—\s*/g, " · ");
    if (Array.isArray(v)) return v.map((x) => walk(x, key));
    if (v && typeof v === "object") { const o = {}; for (const [k, x] of Object.entries(v)) o[k] = walk(x, k); return o; }
    return v;
  };
  const art = walk(a, "");
  art.slug = ctx.slug; art.category = ctx.category;
  art.meta = art.meta || {}; art.meta.title = ctx.title;
  art.resolution = { steps: [] }; delete art.numericClaims; delete art.heroStats;
  if (art.context) art.context = { faqList: art.context.faqList || [] };
  const secs = art.mainSections || [];
  if (secs.length !== ctx.headings.length) problems.push(`mainSections ${secs.length}개 — 주어진 소제목 ${ctx.headings.length}개와 같아야 합니다 (순서대로 하나씩)`);
  else secs.forEach((s, i) => { s.heading = ctx.headings[i]; });
  // 버튼(heroCta·cta·stepbar action)은 등록부 주소만. 표 셀의 서류 링크(cell.links)는 증거 출처 주소도 된다 — 정본의 "준비 서류 (발급처)" 열
  const relabel = (v, inCell = false) => {
    if (Array.isArray(v)) return v.forEach((x) => relabel(x, inCell));
    if (!v || typeof v !== "object") return;
    if (typeof v.label === "string" && typeof v.url === "string" && /^https?:/.test(v.url)) {
      if (inCell) { if (!inputs.ctaAllowed.has(v.url) && !inputs.srcUrls.has(dec(v.url))) problems.push(`표 링크 "${v.label}" 주소가 허용 버튼·증거 출처에 없음: ${v.url}`); }
      else if (!inputs.ctaAllowed.has(v.url)) problems.push(`버튼 "${v.label}" 주소가 허용 목록에 없음: ${v.url}`);
      const b = buttonLabel(v.url); if (b && !inCell) v.label = b;
    }
    for (const [k, x] of Object.entries(v)) relabel(x, inCell || k === "rows");
  };
  relabel(art);
  const strings = [];
  (function all(v, k) { if (typeof v === "string") { if (k !== "url") strings.push(v); } else if (Array.isArray(v)) v.forEach((x) => all(x, k)); else if (v && typeof v === "object") for (const [kk, x] of Object.entries(v)) all(x, kk); })(art, "");
  // 질문 문장("…무조건 인정되나요?")은 주장이 아니다 — 거기 든 낱말로 글을 다시 쓰게 하지 않는다 (2026-09-16 오탐)
  // 걸린 곳을 전부 보고한다 — 첫 건만 보고하면 고치기가 하나만 고치고 다음 검사에서 또 떨어진다 (2026-09-16)
  const hyped = strings.filter((s) => !/[?？]\s*$|나요\s*$/.test(s.trim()) && HYPE.test(s));
  if (hyped.length) problems.push(`과장 표현 ${hyped.length}곳 (전부 고칠 것):\n` + hyped.slice(0, 8).map((s) => `    · "${s.match(HYPE)[0]}" → "${s.slice(0, 90)}"`).join("\n"));
  const slugs = [];
  for (const r of art.relatedQuestions || []) slugs.push(r.slug);
  for (const s of secs) { if (s.link?.slug) slugs.push(s.link.slug); for (const w of [...(s.widgets || []), ...(s.subsections || []).flatMap((x) => x.widgets || [])]) if (w?.type === "calc-cta") slugs.push(w.slug); }
  if (art.heroWidget?.more?.slug) slugs.push(art.heroWidget.more.slug);
  for (const s of slugs) if (s && !ctx.live.has(s)) problems.push(`내부 링크 slug "${s}" 는 사이트에 없음`);
  const missing = inputs.pngNames.filter((f) => !String(draft.captures[f] || "").trim());
  if (missing.length) problems.push(`캡처 설명 없음 ${missing.length}장 (Read 로 열어 captures 에 적을 것): ${missing.join(", ")}`);
  return { draft: { ...draft, article: art }, problems };
}
function trimOut(out, max = 5000) {
  const s = out.split(/\r?\n/).filter((l) => l.trim() && !/^\s*(▶|✅|✓ )/.test(l) && !/Compil|GET \/|○|▲ Next|- Local:|Ready in/.test(l)).join("\n");
  return s.length > max ? s.slice(-max) : s;
}
async function gates(ctx) {
  const results = [];
  const file = path.join(io.ART_DIR, `${ctx.category}.ts`);
  const tsc = path.join("node_modules", "typescript", "bin", "tsc");
  const flags = ["--noEmit", "--skipLibCheck", "--strict", "--target", "es2020", "--moduleResolution", "bundler", "--module", "esnext", file];
  ctx.log("gate", "tsc");
  const t = fs.existsSync(tsc) ? await runNode([tsc, ...flags], { quiet: true }) : await runCmd("npx", ["tsc", ...flags], { quiet: true, shell: isWin });
  results.push({ name: "tsc (타입)", ok: t.code === 0, out: t.out });
  if (t.code !== 0) return results;
  for (const [name, script, args] of [["숫자 근거 (verify-evidence)", "verify-evidence.mjs", [ctx.slug]], ["가려짐 (verify-no-shadow)", "verify-no-shadow.mjs", []], ["내부 링크 (verify-internal-links)", "verify-internal-links.mjs", []]]) {
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
function insert(ctx, art) {
  if (ctx.existingCategory && ctx.existingCategory !== ctx.category) io.removeArticle(ctx.existingCategory, ctx.slug);
  io.removeArticle(ctx.category, ctx.slug);
  io.insertArticle(ctx.category, art);
  ctx.inserted = true;
  const tsxDir = path.join(io.W_DIR, ctx.slug);
  if (fs.existsSync(tsxDir) && !ctx.deletedTsx) {
    ctx.tsxTracked = spawnSync("git", ["ls-files", "--error-unmatch", tsxDir], { stdio: "ignore" }).status === 0;
    fs.rmSync(tsxDir, { recursive: true, force: true });
    ctx.deletedTsx = true;
    ctx.log("insert", `옛 TSX 삭제: ${tsxDir}`);
  }
}
function rollback(ctx) {
  if (ctx.inserted) {
    io.removeArticle(ctx.category, ctx.slug);
    if (ctx.originalArticle && ctx.existingCategory) io.insertArticle(ctx.existingCategory, ctx.originalArticle);
    ctx.inserted = false;
  }
  if (ctx.deletedTsx && ctx.tsxTracked) { spawnSync("git", ["checkout", "--", path.join(io.W_DIR, ctx.slug)], { stdio: "ignore" }); ctx.deletedTsx = false; }
  if (ctx.evPristine) io.saveEvidence(ctx.slug, ctx.evPristine);
}
async function applyAndGate(ctx, draftIn, inputs, round) {
  const { draft, problems } = enforce(ctx, draftIn, inputs);
  writeJson(path.join(ctx.logDir, `draft-${round}.json`), draft);
  if (problems.length) {
    ctx.log("check", `사전 검사 ${problems.length}건 실패`);
    for (const p of problems) console.log(`           · ${p.length > 200 ? p.slice(0, 200) + "…" : p}`);
    return { ok: false, draft, results: [{ name: "사전 검사", ok: false, out: problems.map((p) => "❌ " + p).join("\n") }] };
  }
  const ev = structuredClone(ctx.evPristine);
  ev.capturesReviewed = { ...(ev.capturesReviewed || {}), ...draft.captures };
  ev.exampleValues = [...new Set([...(ev.exampleValues || []), ...draft.exampleValues])];
  const note = draft.exampleNote.trim();
  ev.exampleNote = [String(ev.exampleNote || "").trim(), note && !String(ev.exampleNote || "").includes(note) ? note : ""].filter(Boolean).join(" ");
  if (ev.exampleValues.length && !ev.exampleNote) ev.exampleNote = "예시: 본문의 가정값은 설명을 위한 예시다.";
  return locked(async () => {
    io.saveEvidence(ctx.slug, ev);
    insert(ctx, draft.article);
    const results = await gates(ctx);
    const ok = results.every((r) => r.ok);
    if (!ok) rollback(ctx);
    return { ok, draft, results };
  });
}

/* ── 4. 보고 ── */
async function screenshot(ctx) {
  if (ctx.skipRender || !dev.up) return "";
  try {
    const { chromium } = await import("playwright");
    const b = await chromium.launch({ headless: !process.env.PW_HEADED });
    const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto(`http://localhost:${PORT}/w/${encodeURIComponent(ctx.slug)}`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await p.waitForTimeout(1500);
    const out = path.join(REPORTS, `${ctx.slug}.png`);
    await p.screenshot({ path: out, fullPage: true });
    await b.close();
    return out;
  } catch (e) { ctx.notes.push("렌더 캡처 실패: " + e.message.split("\n")[0]); return ""; }
}
function writeReport(ctx, { ok, rounds, error, shot }) {
  const L = [`# ${ok ? "✅ 통과" : "❌ 실패"} — ${ctx.slug}`, "", `- 타이틀: ${ctx.title}`, `- 카테고리: ${ctx.category}`, `- 대제목: ${ctx.headings.join(" / ")}`,
    `- 실행: ${new Date().toLocaleString("ko-KR")} · 총 ${mins(Date.now() - ctx.t0)} · 고친 횟수 ${ctx.fixRounds}`];
  if (ctx.exampleUsed) L.push(`- 예시로 쓴 글: ${ctx.exampleUsed}`);
  if (ctx.deletedTsx) L.push(`- 옛 TSX 삭제: src/app/w/${ctx.slug}/${ok ? "" : " (실패라 되돌림)"}`);
  L.push("", "## 시간·사용량", "| 단계 | 시간 | 호출 | 입력 | 출력 | 환산 $ |", "|---|---|---|---|---|---|");
  const kk = (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n || 0));
  for (const [k, v] of Object.entries(ctx.timings)) { const u = ctx.meter.byStage[k]; L.push(`| ${k} | ${mins(v)} | ${u?.calls ?? "-"} | ${u ? kk(u.input) : "-"} | ${u ? kk(u.output) : "-"} | ${u?.cost ? u.cost.toFixed(2) : "-"} |`); }
  L.push(`| **합계** | **${mins(Date.now() - ctx.t0)}** | **${ctx.meter.calls}** | **${kk(ctx.meter.input)}** | **${kk(ctx.meter.output)}** | **${ctx.meter.cost.toFixed(2)}** |`, "");
  const ev = io.loadEvidence(ctx.slug);
  if (ev) {
    L.push("## 증거", `- 수집일 ${ev.verifiedAt} · fact ${(ev.facts || []).length} · 원문 ${(ev.raws || []).length} · 캡처 ${Object.keys(ev.capturesReviewed || {}).length}장`);
    L.push(`- 조문: ${ctx.laws.map((l) => `${l.name} ${l.articles.map(artLabel).join("·")}`).join(" / ") || "없음"} · 페이지: ${ctx.urls.join(" , ") || "없음"}`);
    for (const [f, l] of Object.entries(ev.capturesReviewed || {})) L.push(`  - ${f}: ${l}`);
    if ((ev.exampleValues || []).length) L.push(`- 파생값: ${ev.exampleValues.join(", ")}`, `  - 산식: ${ev.exampleNote}`);
    L.push("");
  }
  if (rounds.length) {
    L.push("## 검사", `| 검사 | ${rounds.map((_, i) => (i === 0 ? "초안" : `고침 ${i}`)).join(" | ")} |`, `|---|${rounds.map(() => "---").join("|")}|`);
    const names = [...new Set(rounds.flatMap((r) => r.map((x) => x.name)))];
    for (const n of names) L.push(`| ${n} | ${rounds.map((r) => { const x = r.find((y) => y.name === n); return x ? (x.ok ? "✓" : "✗") : "·"; }).join(" | ")} |`);
    L.push("");
    rounds.forEach((r, i) => {
      const bad = r.filter((x) => !x.ok);
      if (!bad.length) return;
      L.push(`## 실패 내용 — ${i === 0 ? "초안" : `고침 ${i}`}`);
      for (const x of bad) L.push(`### ${x.name}`, "```", trimOut(x.out, i === rounds.length - 1 ? 6000 : 1500), "```");
      L.push("");
    });
  }
  if (error) L.push("## 오류", "```", String(error), "```", "");
  if (ctx.notes.length) L.push("## 메모", ...ctx.notes.map((n) => `- ${n}`), "");
  if (shot) L.push("## 렌더 캡처", `![${ctx.slug}](${path.basename(shot)})`, "");
  L.push("## 다음");
  if (ok) L.push(`- 캡처를 보고 채점 → 통과면 \`git push\` (pre-push 게이트가 한 번 더 확인)`, ctx.committed ? `- 커밋됨: ${ctx.committed}` : `- 커밋: git add -A src/data/articles scripts/evidence && git commit`);
  else L.push(`- 이 글은 버렸습니다. 카테고리 파일은 원래대로입니다. 실패 내용을 보고 타이틀·소제목·조문을 바꿔 다시 실행하세요 (증거는 재사용됩니다)`);
  const file = path.join(REPORTS, `${ctx.slug}.md`);
  fs.writeFileSync(file, L.join("\n") + "\n");
  return file;
}
function commit(ctx) {
  const paths = [path.join(io.ART_DIR, `${ctx.category}.ts`), io.evidencePath(ctx.slug), io.evidenceDir(ctx.slug)];
  if (ctx.existingCategory && ctx.existingCategory !== ctx.category) paths.push(path.join(io.ART_DIR, `${ctx.existingCategory}.ts`));
  if (ctx.deletedTsx) paths.push(path.join(io.W_DIR, ctx.slug));
  const add = spawnSync("git", ["add", "-A", "--", ...paths.filter((p) => fs.existsSync(p) || ctx.deletedTsx)], { encoding: "utf8" });
  if (add.status !== 0) { ctx.notes.push("git add 실패: " + add.stderr); return; }
  const r = spawnSync("git", ["commit", "-m", `feat: ${ctx.title}`, "-m", `npm run article ${ctx.slug} · 고친 횟수 ${ctx.fixRounds}`], { encoding: "utf8" });
  if (r.status !== 0) { ctx.notes.push("git commit 실패: " + (r.stderr || r.stdout)); return; }
  ctx.committed = spawnSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).stdout.trim();
}

/* ── 한 편 ── */
async function timed(ctx, stage, fn) { const t = Date.now(); try { return await fn(); } finally { ctx.timings[stage] = (ctx.timings[stage] || 0) + (Date.now() - t); } }
async function runOne(slug, f) {
  const ctx = {
    slug, title: String(f.title || "").trim(), headings: String(f.headings || "").split("/").map((s) => s.trim()).filter(Boolean),
    category: f.category || "", laws: parseLaws(f.law || []), urls: (f.url || []).filter(okUrl),
    model: typeof f.model === "string" ? f.model : "sonnet", commit: Boolean(f.commit), skipRender: Boolean(f["skip-render"]), recollect: Boolean(f.recollect),
    draftFile: typeof f.draft === "string" ? f.draft : "", // 쓰다 죽은 실행의 초안(scripts/reports/logs/<slug>/draft-N.json)을 이어서 검사한다 — 8분을 다시 쓰지 않는다
    promptOnly: Boolean(f["prompt-only"]), // 수집까지만 하고 지시문을 파일로 남긴다 — 작성은 대화창에서 보이게 하고 --draft 로 이어서 검사 (2026-09-16 "안 보이면 불편하다")
    logDir: path.join(REPORTS, "logs", slug), t0: Date.now(), timings: {}, notes: [], fixRounds: 0, meter: newMeter(),
  };
  ctx.log = (stage, msg) => console.log(`[${hms()}] ${String(stage).padEnd(9)} ${PARALLEL > 1 ? slug.slice(0, 22).padEnd(22) + " " : ""}${msg}`);
  const rounds = [];
  let ok = false, error = null;
  console.log(`\n══════════ ${slug} ══════════`);
  console.log(`수집(1~2분) → 작성(7~9분) → 검사(2분) → 떨어지면 고치기 1번(3~4분) → 끝. 모델 ${ctx.model}.`);
  try {
    guard(ctx);
    const ev = await timed(ctx, "collect", () => collect(ctx));
    ctx.evPristine = structuredClone(ev);
    const inputs = writerInputs(ctx, ev);
    if (ctx.promptOnly) {
      fs.mkdirSync(ctx.logDir, { recursive: true });
      const promptFile = path.join(ctx.logDir, "prompt.txt");
      const draftFile = path.join(ctx.logDir, "draft-chat.json");
      fs.writeFileSync(promptFile, writePrompt(inputs));
      ctx.log("prompt", `지시문 저장 → ${promptFile} (캡처 ${inputs.pngs.length}장, 예시 ${ctx.exampleUsed})`);
      ctx.log("prompt", `다음: 대화창에서 지시문·캡처를 읽고 초안 JSON 을 ${draftFile} 에 쓴 뒤  npm run article -- ${slug} --title … --headings … --draft ${draftFile}`);
      return { slug, ok: true, title: ctx.title, report: promptFile, fixRounds: 0, ms: Date.now() - ctx.t0, usage: { ...ctx.meter }, error: "" };
    }
    ctx.log("write", `글 작성 (claude -p, 예시 ${ctx.exampleUsed}, 캡처 ${inputs.pngs.length}장) — 가장 긴 단계`);
    let draft;
    if (ctx.draftFile) { ctx.log("write", `저장된 초안 재사용: ${ctx.draftFile}`); draft = parseDraft(fs.readFileSync(ctx.draftFile, "utf8")); }
    else { const w = await timed(ctx, "write", () => ask(ctx, writePrompt(inputs), { label: "write", tools: ["Read"], expect: "7~9분" })); draft = parseDraft(w.text); }
    let res = await timed(ctx, "gates", () => applyAndGate(ctx, draft, inputs, 0));
    rounds.push(res.results);
    if (!res.ok) {
      ctx.fixRounds = 1;
      const failed = res.results.filter((r) => !r.ok);
      ctx.log("fix", `고치기 1/1 — ${failed.map((r) => r.name).join(", ")}`);
      const failures = failed.map((r) => `### ${r.name}\n${trimOut(r.out)}`).join("\n\n");
      const x = await timed(ctx, "fix", () => ask(ctx, fixPrompt({ ...inputs, draft: res.draft, failures }), { label: "fix", tools: ["Read"], expect: "3~4분" }));
      draft = parseDraft(x.text);
      res = await timed(ctx, "gates", () => applyAndGate(ctx, draft, inputs, 1));
      rounds.push(res.results);
    }
    ok = res.ok;
  } catch (e) {
    error = e.stack || e.message;
    console.error(`\n✗ ${slug}: ${e.message}`);
  }
  let shot = "";
  if (ok) { shot = await screenshot(ctx); if (ctx.commit) commit(ctx); }
  else await locked(() => rollback(ctx));
  const report = writeReport(ctx, { ok, rounds, error, shot });
  console.log(`\n${ok ? "✅ 통과" : "❌ 실패"} — ${report}${shot ? ` · ${shot}` : ""} · ${mins(Date.now() - ctx.t0)} · 호출 ${ctx.meter.calls}회 ${fmtUsage(ctx.meter)}`);
  return { slug, ok, title: ctx.title, report, fixRounds: ctx.fixRounds, ms: Date.now() - ctx.t0, usage: { ...ctx.meter }, error: error ? String(error).split("\n")[0] : "" };
}

/* ── 입구 ── */
const { flags, positional } = parseArgs(process.argv.slice(2));
if (flags.parallel) PARALLEL = Math.max(1, Math.min(6, Number(flags.parallel) || 1));
// 브라우저 창을 띄운다 — 수집·검색·화면 검사가 무엇을 여는지 눈으로 본다. 끄려면 --headless (2026-09-16 "뭘 하는지 볼 수 없다")
if (!flags.headless) process.env.PW_HEADED = "1";
try {
  if (flags.batch) {
    const items = parseBatch(String(flags.batch));
    const t0 = Date.now();
    console.log(`묶음 ${items.length}편 · 동시 ${PARALLEL}편`);
    const summary = new Array(items.length);
    let next = 0;
    const worker = async () => { while (next < items.length) { const i = next++; const it = items[i]; summary[i] = await runOne(it.slug, { ...flags, title: it.title, headings: it.headings, category: it.category || flags.category, law: it.law, url: it.url, batch: undefined }); } };
    await Promise.all(Array.from({ length: Math.min(PARALLEL, items.length) }, worker));
    const kk = (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n || 0));
    const L = [`# 묶음 결과 — ${new Date().toLocaleString("ko-KR")}`, "", "| slug | 결과 | 타이틀 | 고침 | 시간 | 호출 | 입력 | 출력 | 환산 $ | 보고서 |", "|---|---|---|---|---|---|---|---|---|---|"];
    for (const s of summary) L.push(`| ${s.slug} | ${s.ok ? "✅" : "❌"} | ${s.title} | ${s.fixRounds} | ${mins(s.ms)} | ${s.usage.calls} | ${kk(s.usage.input)} | ${kk(s.usage.output)} | ${s.usage.cost.toFixed(2)} | ${path.basename(s.report)}${s.error ? ` — ${s.error}` : ""} |`);
    L.push(`| **합계 ${summary.filter((s) => s.ok).length}/${summary.length} 통과** | | | | ${mins(Date.now() - t0)} | **${batchMeter.calls}** | **${kk(batchMeter.input)}** | **${kk(batchMeter.output)}** | **${batchMeter.cost.toFixed(2)}** | |`, "", "> 구독이라 실제 청구는 없습니다. 환산 $ 는 사용 한도를 얼마나 먹었는지의 척도입니다.");
    const file = path.join(REPORTS, `batch-${today()}.md`);
    fs.writeFileSync(file, L.join("\n") + "\n");
    console.log(`\n══════════ 묶음 끝: ${summary.filter((s) => s.ok).length}/${summary.length} 통과 · ${mins(Date.now() - t0)} · 호출 ${batchMeter.calls}회 ${fmtUsage(batchMeter)} — ${file}`);
    process.exitCode = summary.every((s) => s.ok) ? 0 : 1;
  } else {
    if (!positional[0]) { console.error("사용법: npm run article -- <slug> --title \"…\" --headings \"A / B / C\" [--category 법률] [--law 민법:840] [--url …]  |  --batch <파일>"); process.exit(1); }
    const r = await runOne(positional[0], flags);
    process.exitCode = r.ok ? 0 : 1;
  }
} finally { stopDev(); }
