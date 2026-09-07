/**
 * 카테고리 파일 입출력 — src/data/articles/<카테고리>.ts 에 글을 넣고 빼고 읽는다.
 *
 * 파일은 816KB 짜리 하나에 글 186편이 들어 있고 CRLF 다. 그래서 통째로 다시 쓰지 않고
 * 마지막 `  ],\r\n};` 앞에 한 편을 끼워 넣는다. 들여쓰기(글 4칸·slug 6칸)는 검사기들이
 * 정규식으로 의존하므로 여기서 고정한다.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const ART_DIR = path.join("src", "data", "articles");
export const W_DIR = path.join("src", "app", "w");
export const WIKI_DIR = path.join("content", "wiki");

export function categoryFiles() {
  return fs.readdirSync(ART_DIR).filter((f) => f.endsWith(".ts") && f !== "types.ts").map((f) => f.replace(/\.ts$/, ""));
}

/** 카테고리 파일을 tsx 로 실제 import 해서 JSON 으로 — 정규식 파싱이 아니라 진짜 값이다 */
export function loadCategory(name) {
  const dump = path.join("scripts", "lib", "dump-category.mts");
  const tsx = path.join("node_modules", "tsx", "dist", "cli.mjs");
  const r = fs.existsSync(tsx)
    ? spawnSync(process.execPath, [tsx, dump, name], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 })
    : spawnSync("npx", ["tsx", dump, name], { encoding: "utf8", shell: process.platform === "win32", maxBuffer: 256 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`카테고리 ${name} 을 읽지 못했습니다:\n${(r.stderr || "").slice(0, 1500)}`);
  return JSON.parse(r.stdout);
}

/** 사이트에 실제로 있는 주소 — verify-internal-links 와 같은 규칙 */
export function liveSlugs() {
  const live = new Set();
  try { for (const f of fs.readdirSync(WIKI_DIR)) if (f.endsWith(".md")) live.add(f.replace(/\.md$/, "")); } catch {}
  try { for (const e of fs.readdirSync(W_DIR, { withFileTypes: true })) if (e.isDirectory()) live.add(e.name); } catch {}
  for (const f of categoryFiles()) {
    const t = fs.readFileSync(path.join(ART_DIR, `${f}.ts`), "utf8");
    for (const m of t.matchAll(/^ {6}slug: "([^"]+)",\r?$/gm)) live.add(m[1]);
  }
  return live;
}

/** articles 에 이미 있는 글: slug → 카테고리 파일명 */
export function articleSlugs() {
  const out = new Map();
  for (const f of categoryFiles()) {
    const t = fs.readFileSync(path.join(ART_DIR, `${f}.ts`), "utf8");
    for (const m of t.matchAll(/^ {6}slug: "([^"]+)",\r?$/gm)) out.set(m[1], f);
  }
  return out;
}

export function protectedSlugs() {
  const raw = JSON.parse(fs.readFileSync(path.join("scripts", "calc-protected-slugs.json"), "utf8"));
  return new Set((Array.isArray(raw) ? raw : raw.slugs ?? []).map((s) => (typeof s === "string" ? s : s?.slug)).filter(Boolean));
}

/* ── JSON → TS 객체 리터럴 (결정적 서식) ── */
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
export function serializeTs(v, indent = 0) {
  const pad = " ".repeat(indent);
  const pad2 = " ".repeat(indent + 2);
  if (v === null || v === undefined) return "undefined";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    const simple = v.every((x) => typeof x !== "object" || x === null) && JSON.stringify(v).length < 80;
    if (simple) return `[${v.map((x) => serializeTs(x, indent + 2)).join(", ")}]`;
    return `[\n${v.map((x) => `${pad2}${serializeTs(x, indent + 2)},`).join("\n")}\n${pad}]`;
  }
  const keys = Object.keys(v).filter((k) => v[k] !== undefined);
  if (!keys.length) return "{}";
  const inline = keys.every((k) => typeof v[k] !== "object" || v[k] === null) && JSON.stringify(v).length < 90;
  const kv = (k) => `${IDENT.test(k) ? k : JSON.stringify(k)}: ${serializeTs(v[k], indent + 2)}`;
  if (inline) return `{ ${keys.map(kv).join(", ")} }`;
  return `{\n${keys.map((k) => `${pad2}${kv(k)},`).join("\n")}\n${pad}}`;
}

function eolOf(src) { return src.includes("\r\n") ? "\r\n" : "\n"; }

/** 글 한 편을 카테고리 파일 끝에 끼운다. 이전 내용을 돌려주므로 실패 시 되돌릴 수 있다 */
export function insertArticle(category, articleObj) {
  const file = path.join(ART_DIR, `${category}.ts`);
  const before = fs.readFileSync(file, "utf8");
  const EOL = eolOf(before);
  const anchor = before.lastIndexOf(`${EOL}  ],${EOL}};`);
  if (anchor < 0) throw new Error(`${file} 의 끝(  ],\\n};)을 찾지 못했습니다 — 파일 구조가 바뀌었나요?`);
  // slug·category 가 첫 두 줄이어야 verify-evidence 가 글 경계를 잡는다
  const { slug, category: cat, ...rest } = articleObj;
  const ordered = { slug, category: cat, ...rest };
  const body = serializeTs(ordered, 4).split("\n").map((l, i) => (i === 0 ? `    ${l}` : l)).join(EOL);
  const after = before.slice(0, anchor) + EOL + body + "," + before.slice(anchor);
  fs.writeFileSync(file, after);
  return { file, before };
}

/** 문자열·주석을 건너뛰며 중괄호 짝을 찾는다 */
function matchBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      const q = c;
      i++;
      while (i < src.length && src[i] !== q) { if (src[i] === "\\") i++; i++; }
      continue;
    }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "/" && src[i + 1] === "*") { i = src.indexOf("*/", i) + 1; if (i < 1) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) return i; }
  }
  return -1;
}

/** 기존 글 한 편을 카테고리 파일에서 뺀다 (리라이트용). 없으면 removed:false */
export function removeArticle(category, slug) {
  const file = path.join(ART_DIR, `${category}.ts`);
  const src = fs.readFileSync(file, "utf8");
  const EOL = eolOf(src);
  const mark = src.indexOf(`${EOL}      slug: ${JSON.stringify(slug)},${EOL}`);
  if (mark < 0) return { file, before: src, removed: false };
  const open = src.lastIndexOf("{", mark);
  const close = matchBrace(src, open);
  if (close < 0) throw new Error(`${slug} 의 객체 끝을 찾지 못했습니다`);
  const lineStart = src.lastIndexOf(EOL, open); // `    {` 줄 시작 직전의 EOL
  let end = close + 1;
  if (src[end] === ",") end++;
  const after = src.slice(0, lineStart) + src.slice(end);
  fs.writeFileSync(file, after);
  return { file, before: src, removed: true };
}

export function restore(file, content) { fs.writeFileSync(file, content); }

/* ── 증거 JSON ── */
export function evidencePath(slug) { return path.join("scripts", "evidence", `${slug}.json`); }
export function evidenceDir(slug) { return path.join("scripts", "evidence", slug); }
export function loadEvidence(slug) {
  const p = evidencePath(slug);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
export function saveEvidence(slug, ev) { fs.writeFileSync(evidencePath(slug), JSON.stringify(ev, null, 2) + "\n"); }

/** 지금까지 수집에 성공한 공식 주소들 — 계획 단계가 여기서 고른다 (기억으로 URL 을 짓지 않게) */
export function sourceRegistry() {
  const dir = path.join("scripts", "evidence");
  const seen = new Map();
  const dec = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    let j; try { j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); } catch { continue; }
    for (const s of j.sources || []) {
      if (!s?.url || !/^https?:\/\/[^/]+\.(go|or)\.kr(\/|$)/.test(s.url)) continue;
      if (/law\.go\.kr\/법령\//.test(dec(s.url))) continue; // 조문은 --law 로 만든다
      const facts = (j.facts || []).filter((x) => x.url === s.url).length;
      const raw = (j.raws || []).find((x) => x.url === s.url);
      const cur = seen.get(s.url) || { url: s.url, org: s.org, usedBy: [], facts: 0, preview: "" };
      cur.usedBy.push(j.slug); cur.facts += facts;
      if (!cur.preview && raw?.text) cur.preview = raw.text.replace(/\s+/g, " ").slice(0, 140);
      seen.set(s.url, cur);
    }
  }
  return [...seen.values()].sort((a, b) => b.usedBy.length - a.usedBy.length);
}
