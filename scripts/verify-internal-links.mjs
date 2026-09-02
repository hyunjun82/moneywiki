/**
 * 사이트가 죽은 내부 주소로 링크를 내보내지 않는지 검사한다.
 *
 * 왜 있는가 —
 * 2026-09-01, 네이버 웹마스터도구에 "접근 불가한 페이지" 470건이 잡혔다.
 * 원인은 전부 사이트가 스스로 만들어 내보내던 링크였다.
 *   · 관련 키워드 태그가 keywords 문구를 /w/<키워드> 로 걸었다 (잠재 6,883개)
 *   · 본문·relatedDocs 가 슬러그 변경 전 옛 주소를 가리켰다
 *   · /category/ 옛 이름 35종이 살아 있는 카테고리가 아니었다
 * 링크는 1월부터 나가고 있었는데 8개월간 아무도 몰랐다. 검사가 없었기 때문이다.
 *
 * 이 검사기는 렌더링과 같은 규칙으로 "실제로 나갈 링크"를 계산해서 죽은 것이 있으면 막는다.
 * 규칙이 바뀌면 여기도 같이 바꿔야 한다 — 그러라고 한곳에 모아 놓았다.
 *
 * 실행: node scripts/verify-internal-links.mjs
 * 통과하면 0, 죽은 링크가 있으면 1 을 반환한다.
 */
import fs from "node:fs";
import path from "node:path";

const WIKI = "content/wiki";
const TSX_ROOT = "src/app/w";

const read = (p, fallback = null) => {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return fallback; }
};
const dec = (s) => { try { return decodeURIComponent(s); } catch { return s; } };

/* ── 실제로 있는 주소 ── */
const live = new Set();
for (const f of fs.readdirSync(WIKI)) if (f.endsWith(".md")) live.add(f.replace(/\.md$/, ""));
try { for (const e of fs.readdirSync(TSX_ROOT, { withFileTypes: true })) if (e.isDirectory()) live.add(e.name); } catch {}
try {
  for (const f of fs.readdirSync("src/data/articles")) {
    if (!f.endsWith(".ts") || f === "types.ts") continue;
    const t = fs.readFileSync(path.join("src/data/articles", f), "utf8");
    for (const m of t.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) live.add(m[1]);
  }
} catch {}

/* ── 카테고리: 실제 slug + _redirects 로 넘겨주는 옛 이름 ── */
const catSrc = fs.readFileSync("src/data/categories.ts", "utf8");
const validCats = new Set([...catSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
const redirected = new Set(
  [...fs.readFileSync("public/_redirects", "utf8").matchAll(/^\/category\/(\S+)\s/gm)].map((m) => m[1])
);

/* ── 렌더링이 참고하는 해석표 ── */
const keywordLinks = read("src/data/keyword-links.json", {});
const linkFixes = read("src/data/link-fixes.json", {});
const relatedFixes = read("src/data/related-fixes.json", {});

const problems = [];
const add = (where, href, why) => problems.push({ where, href, why });

/* ── 1. MD 글 ── */
for (const f of fs.readdirSync(WIKI)) {
  if (!f.endsWith(".md")) continue;
  const slug = f.replace(/\.md$/, "");
  const text = fs.readFileSync(path.join(WIKI, f), "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = m ? m[1] : "";
  const body = m ? text.slice(m[0].length) : text;

  // 관련 키워드 태그 — keyword-links 에 있는 것만 링크가 된다
  let inKw = false;
  for (const line of fm.split(/\r?\n/)) {
    if (/^keywords:\s*$/.test(line)) { inKw = true; continue; }
    if (!inKw) continue;
    const item = line.match(/^\s+-\s*(.+?)\s*$/);
    if (!item) { inKw = false; continue; }
    const kw = item[1].replace(/^["']|["']$/g, "").trim();
    const target = keywordLinks[slug]?.[kw];
    if (target && !live.has(target)) add(`${f} (관련 키워드)`, `/w/${target}`, "가리키는 글이 없다");
  }

  // 본문 링크 — 살아 있으면 그대로, 아니면 link-fixes 로 돌리고, 그것도 없으면 링크가 풀린다
  for (const mm of body.matchAll(/\]\((\/w\/[^)\s]+)\)/g)) {
    const s = dec(mm[1]).slice(3).split(/[#?]/)[0];
    if (live.has(s)) continue;
    const fixed = linkFixes[s];
    if (fixed && !live.has(fixed)) add(`${f} (본문)`, `/w/${s}`, `연결 대상 ${fixed} 이 없다`);
  }

  // 본문의 카테고리 링크
  for (const mm of body.matchAll(/\]\((\/category\/[^)\s]+)\)/g)) {
    const c = dec(mm[1]).slice(10);
    if (!validCats.has(c) && !redirected.has(c)) add(`${f} (본문)`, `/category/${c}`, "카테고리도 리다이렉트도 없다");
  }
}

/* ── 2. 직접 작성 TSX 페이지 ── */
for (const e of fs.readdirSync(TSX_ROOT, { withFileTypes: true })) {
  if (!e.isDirectory()) continue;
  const p = path.join(TSX_ROOT, e.name, "page.tsx");
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, "utf8");

  // RELATED 배열의 slug — related-fixes 가 감추거나(빈 값) 다른 글로 돌린다
  for (const m of t.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) {
    const s = m[1];
    if (live.has(s) || s === "$") continue;
    const fixed = relatedFixes[s];
    if (fixed === undefined) add(`${e.name}/page.tsx (RELATED)`, `/w/${s}`, "해석표에 없다 — build-link-fixes 를 다시 돌려라");
    else if (fixed !== "" && !live.has(fixed)) add(`${e.name}/page.tsx (RELATED)`, `/w/${s}`, `연결 대상 ${fixed} 이 없다`);
  }

  // href 로 직접 쓴 주소 — 걸러 주는 장치가 없다. 살아 있어야 한다.
  for (const m of t.matchAll(/href:\s*["'`]\/w\/([^"'`]+)["'`]/g)) {
    const s = dec(m[1]).split(/[#?]/)[0];
    if (!live.has(s)) add(`${e.name}/page.tsx (href)`, `/w/${s}`, "그런 글이 없다");
  }
  for (const m of t.matchAll(/href=["'{`]+\/w\/([^"'`)\s>{}]+)/g)) {
    let s = m[1].replace(/[.,)]+$/, "");
    // `/w/${...}` 처럼 값이 실행 시 정해지는 것은 검사할 수 없다
    if (s.includes("${") || s.startsWith("$")) continue;
    s = dec(s).split(/[#?]/)[0];
    if (!live.has(s)) add(`${e.name}/page.tsx (href=)`, `/w/${s}`, "그런 글이 없다");
  }
  // 카테고리
  for (const m of t.matchAll(/\/category\/([^"'`)\s>{}]+)/g)) {
    let c = m[1].replace(/[.,)]+$/, "");
    if (c.includes("${")) continue;
    c = dec(c);
    if (!validCats.has(c) && !redirected.has(c)) add(`${e.name}/page.tsx`, `/category/${c}`, "카테고리도 리다이렉트도 없다");
  }
}

/* ── 3. 홈·레이아웃·공통 컴포넌트 (src/app 의 w/ 바깥 + src/components) ──
 * 2026-09-02, 홈페이지 메인 CTA 가 /w/연말정산-환급(없는 글)으로 나가고 있었다.
 * 1·2절은 글만 봤고 홈은 아무도 안 봤다. 여기서는 /w/·/category/ 뿐 아니라
 * 루트 상대 주소 전부(/guides, /search …)가 실제 라우트·public 파일·리다이렉트 중 하나인지 본다. */
const APP = "src/app";

// src/app 의 라우트: 디렉터리를 따라 내려가며 [param] 은 무엇이든 받는다. 끝에 page/route 가 있어야 한다.
function routeExists(p) {
  const segs = p.split("/").filter(Boolean);
  const walk = (dir, i) => {
    if (i === segs.length) {
      return ["page.tsx", "page.ts", "page.mdx", "route.ts", "route.tsx"].some((f) => fs.existsSync(path.join(dir, f)));
    }
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()); } catch { return false; }
    for (const e of entries) {
      if (e.name === segs[i] || /^\[.+\]$/.test(e.name)) {
        if (walk(path.join(dir, e.name), i + 1)) return true;
      }
    }
    return false;
  };
  return walk(APP, 0);
}
const redirectSources = new Set(
  [...fs.readFileSync("public/_redirects", "utf8").matchAll(/^(\/\S*)\s+\S+/gm)].map((m) => dec(m[1]))
);
function internalPathExists(raw) {
  const p = dec(raw).split(/[#?]/)[0] || "/";
  if (p === "/") return true;
  if (p.startsWith("/w/")) return live.has(p.slice(3));
  if (p.startsWith("/category/")) { const c = p.slice(10); return validCats.has(c) || redirected.has(c); }
  if (p === "/sitemap.xml" && fs.existsSync(path.join(APP, "sitemap.ts"))) return true;
  if (p === "/robots.txt" && fs.existsSync(path.join(APP, "robots.ts"))) return true;
  if (redirectSources.has(p)) return true;
  if (fs.existsSync(path.join("public", p))) return true;
  return routeExists(p);
}

// 검사 대상 = 실제 라우트(src/app 의 page/layout, w/ 바깥)에서 import 로 닿는 파일만.
// src/components 에는 어디서도 안 부르는 옛 코드(checkers·hub·spoke·Sidebar 등)가 많다 —
// 그것까지 보면 화면에 안 나가는 링크로 게이트가 막힌다. 반대로 나중에 누가 연결하면 자동으로 검사 대상이 된다.
function* routeFiles(dir, skip) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (skip && path.resolve(full) === path.resolve(skip)) continue; yield* routeFiles(full, skip); }
    else if (/\.tsx?$/.test(e.name)) yield full;
  }
}
const resolveImport = (from, spec) => {
  let base;
  if (spec.startsWith("@/")) base = path.join("src", spec.slice(2));
  else if (spec.startsWith(".")) base = path.join(path.dirname(from), spec);
  else return null; // node_modules
  for (const c of [base, `${base}.tsx`, `${base}.ts`, path.join(base, "index.tsx"), path.join(base, "index.ts")]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
};
const reachable = new Set();
const queue = [...routeFiles(APP, TSX_ROOT), path.join(TSX_ROOT, "[slug]", "page.tsx")].filter((p) => fs.existsSync(p));
while (queue.length) {
  const p = path.normalize(queue.pop());
  if (reachable.has(p) || !/\.tsx?$/.test(p)) continue;
  reachable.add(p);
  const t = fs.readFileSync(p, "utf8");
  for (const m of t.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)) {
    const r = resolveImport(p, m[1]);
    if (r) queue.push(r);
  }
}
// CalculatorLoader 는 `import(\`@/components/calculators/${name}\`)` 로 실행 시에 고른다 — 살아 있는 슬러그에 매핑된 것만 실제로 뜬다
try {
  const loader = fs.readFileSync("src/components/CalculatorLoader.tsx", "utf8");
  for (const m of loader.matchAll(/^\s*"([^"]+)":\s*"([^"]+)",?\s*$/gm)) {
    if (live.has(m[1])) { const c = path.join("src/components/calculators", `${m[2]}.tsx`); if (fs.existsSync(c)) reachable.add(path.normalize(c)); }
  }
} catch {}

for (const p of [...reachable].filter((f) => !path.resolve(f).startsWith(path.resolve(TSX_ROOT) + path.sep) || f.includes("[slug]"))) {
  const t = fs.readFileSync(p, "utf8");
  const rel = p.replace(/\\/g, "/");
  const seen = new Set();
  // href="/..." · href={"/..."} · href: "/..."  — 값이 실행 시 정해지는 `${}` 는 검사할 수 없다
  for (const m of t.matchAll(/href(?:=[{]?|:\s*)["'`](\/[^"'`\s]*)["'`]/g)) {
    const raw = m[1];
    if (raw.startsWith("//") || raw.includes("${") || seen.has(raw)) continue;
    seen.add(raw);
    if (!internalPathExists(raw)) add(rel, raw, "그런 페이지가 없다 (라우트·public·_redirects 어디에도)");
  }
  // `const LIST = [{ slug: "..." }]` 를 `LIST.map((v) => <Link href={`/w/${v.slug}`}>` 로 뿌리는 꼴 (홈 TRENDS·GUIDES).
  // 같은 slug 필드라도 /category/·/forms/ 로 조립되는 배열은 대상이 아니다 — 실제로 /w/ 에 넣는 배열만 본다.
  for (const arr of t.matchAll(/const\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*\[([\s\S]*?)\];/g)) {
    const [, name, body] = arr;
    const use = new RegExp(`\\b${name}\\.map\\(\\s*\\(?\\s*([A-Za-z_$][\\w$]*)`).exec(t);
    if (!use) continue;
    const v = use[1];
    // 변수 이름(c, item …)은 다른 배열의 map 에서도 재사용된다 — 이 map 부터 다음 .map( 전까지만 본다
    const start = use.index + use[0].length;
    const next = t.indexOf(".map(", start);
    const region = t.slice(start, next === -1 ? undefined : next);
    const tpl = new RegExp(`\`(/[^\`$]*)\\$\\{(?:[\\w.]+\\()?${v}\\.slug\\)?\\}`).exec(region);
    if (!tpl || tpl[1] !== "/w/") continue;
    for (const m of body.matchAll(/slug:\s*["'`]([^"'`$]+)["'`]/g)) {
      if (!live.has(m[1]) && !seen.has(`slug:${m[1]}`)) { seen.add(`slug:${m[1]}`); add(rel, `/w/${m[1]}`, `${name} 의 slug 로 조립되는 링크인데 그런 글이 없다`); }
    }
  }
}

/* ── 결과 ── */
console.log(`살아 있는 주소 ${live.size}개 · 카테고리 ${validCats.size}개(+옛 이름 ${redirected.size}개)`);
if (problems.length === 0) {
  console.log("✓ 죽은 내부 링크 없음");
  process.exit(0);
}
console.error(`\n✗ 죽은 내부 링크 ${problems.length}개`);
const shown = problems.slice(0, 40);
for (const p of shown) console.error(`  ${p.href}\n      ${p.where} — ${p.why}`);
if (problems.length > shown.length) console.error(`  … 외 ${problems.length - shown.length}개`);
console.error("\n고치는 법: 주소를 살아 있는 글로 바꾸거나 그 링크를 지운다.");
console.error("해석표가 낡았을 뿐이면 `node scripts/build-link-fixes.mjs --write` 를 돌린다.");
process.exit(1);
