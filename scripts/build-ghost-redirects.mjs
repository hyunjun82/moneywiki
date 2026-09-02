/**
 * 네이버가 "접근 불가한 페이지"로 잡은 유령 주소를 실제 글로 301 보내는 목록을 만든다 (Cloudflare Bulk Redirects CSV).
 *
 * 왜 필요한가 —
 * 2026-09-01, 네이버 웹마스터도구 사이트진단에 404 가 540건 잡혔다. 거의 전부 관련 키워드 태그가
 * 키워드 문구를 /w/<문구> 로 걸어 만든 주소로, 그 자리에 페이지가 있었던 적이 없다.
 * 링크는 끊었지만(cf9e0d36, d8a52191) 주소 자체는 여전히 404 라서 네이버가 다시 와도 "접근 불가"로 남는다.
 * 그래서 각 주소를 그 키워드를 달고 있던 글로 301 보낸다 — 키워드는 원래 그 글이 자기를 설명하려고 붙인 꼬리표다.
 *
 * 입력
 *   scripts/naver-404-urls.txt            네이버 CSV 의 경로 그대로 (퍼센트 인코딩)
 *   scripts/ghost-redirect-overrides.json  규칙으로 못 정한 것을 손으로 정한 표 (규칙보다 먼저 본다)
 * 규칙 (위에서부터)
 *   1. 살아 있는 주소면 규칙을 만들지 않는다 — 나중에 그 slug 로 글이 생기면 자동으로 빠진다
 *   2. 손으로 정한 표
 *   3. related-fixes / link-fixes 가 아는 옛 slug 면 그 대상
 *   4. 그 문구를 keywords 로 단 글 (여럿이면 slug 토큰이 가장 많이 겹치는 글)
 *   5. 그래도 없으면 실패 — 조용히 홈으로 보내지 않는다. overrides 에 적어라.
 * 이중 인코딩된 깨진 주소(Ã«Â¯Â¸…)는 원래 글자로 되돌려 같은 규칙을 태우되, 규칙의 출발지는 깨진 그대로 쓴다.
 *
 * 실행: node scripts/build-ghost-redirects.mjs [--write]   → scripts/naver-404-bulk-redirects.csv (Cloudflare Bulk Redirects 업로드용)
 */
import fs from "node:fs";
import path from "node:path";

const LIST = "scripts/naver-404-urls.txt";
const OVERRIDES = "scripts/ghost-redirect-overrides.json";
const OUT = "public/_redirects";
const CSV_OUT = "scripts/naver-404-bulk-redirects.csv";
const BEGIN = "# --- 네이버 접근불가 유령 주소 → 실제 글 (scripts/build-ghost-redirects.mjs 가 생성) ---";
const END = "# --- 네이버 접근불가 유령 주소 끝 ---";

const dec = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
const read = (p, fb) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return fb; } };

/* ── 살아 있는 주소 ── */
const live = new Set();
for (const f of fs.readdirSync("content/wiki")) if (f.endsWith(".md")) live.add(f.replace(/\.md$/, ""));
for (const e of fs.readdirSync("src/app/w", { withFileTypes: true })) if (e.isDirectory() && !/^\[.*\]$/.test(e.name)) live.add(e.name);
for (const f of fs.readdirSync("src/data/articles")) {
  if (!f.endsWith(".ts") || f === "types.ts") continue;
  for (const m of fs.readFileSync(path.join("src/data/articles", f), "utf8").matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) live.add(m[1]);
}
const validCats = new Set([...fs.readFileSync("src/data/categories.ts", "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

// 기존 _redirects (이 스크립트가 만든 구간은 빼고) — 이미 다른 규칙이 받는 주소는 건너뛴다
let text = fs.readFileSync(OUT, "utf8");
const eol = text.includes("\r\n") ? "\r\n" : "\n";
{
  const b = text.indexOf(BEGIN);
  if (b !== -1) {
    const e = text.indexOf(END);
    if (e === -1) { console.error("시작 표시는 있는데 끝 표시가 없습니다."); process.exit(1); }
    text = text.slice(0, b) + text.slice(e + END.length);
  }
}
const existing = new Map(); // 디코딩된 출발지 → 도착지
for (const m of text.matchAll(/^(\/\S*)\s+(\S+)(?:\s+\d{3})?\s*$/gm)) existing.set(dec(m[1]), m[2]);

// 어떤 경로가 실제로 200 인가 (라우트·public·리다이렉트 포함) — 도착지 검증용
const targetOk = (t) => {
  if (t === "/" || t === "/sitemap.xml") return true;
  if (t.startsWith("/w/")) return live.has(t.slice(3));
  if (t.startsWith("/category/")) return validCats.has(t.slice(10));
  return fs.existsSync(path.join("public", t));
};

/* ── 해석표 ── */
const overrides = read(OVERRIDES, {});
const relatedFixes = read("src/data/related-fixes.json", {});
const linkFixes = read("src/data/link-fixes.json", {});

/* ── 키워드 → 그 키워드를 단 글 ── */
const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
const kwIndex = new Map();
const addKw = (kw, slug) => { const k = norm(kw); if (!k) return; if (!kwIndex.has(k)) kwIndex.set(k, new Set()); kwIndex.get(k).add(slug); };
for (const f of fs.readdirSync("content/wiki")) {
  if (!f.endsWith(".md")) continue;
  const slug = f.replace(/\.md$/, "");
  const m = fs.readFileSync(path.join("content/wiki", f), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;
  let inKw = false;
  for (const line of m[1].split(/\r?\n/)) {
    const inline = line.match(/^keywords:\s*\[(.*)\]\s*$/);
    if (inline) { for (const k of inline[1].split(",")) addKw(k.replace(/^["'\s]+|["'\s]+$/g, ""), slug); continue; }
    if (/^keywords:\s*$/.test(line)) { inKw = true; continue; }
    if (!inKw) continue;
    const item = line.match(/^\s+-\s*(.+?)\s*$/);
    if (!item) { inKw = false; continue; }
    addKw(item[1].replace(/^["']|["']$/g, ""), slug);
  }
}
for (const e of fs.readdirSync("src/app/w", { withFileTypes: true })) {
  if (!e.isDirectory()) continue;
  const p = path.join("src/app/w", e.name, "page.tsx");
  if (!fs.existsSync(p)) continue;
  const km = fs.readFileSync(p, "utf8").match(/keywords:\s*\[([^\]]*)\]/);
  if (km) for (const k of km[1].matchAll(/["'`]([^"'`]+)["'`]/g)) addKw(k[1], e.name);
}
const overlap = (kw, slug) => { const a = new Set(norm(kw).split(/[\s-]+/)); let n = 0; for (const t of slug.toLowerCase().split("-")) if (a.has(t)) n++; return n; };
const pickSource = (kw) => {
  const set = kwIndex.get(norm(kw));
  if (!set) return null;
  return [...set].filter((s) => live.has(s)).sort((a, b) => overlap(kw, b) - overlap(kw, a) || a.length - b.length || a.localeCompare(b))[0] || null;
};

/* ── 이중 인코딩 복원: "ë¯¸" 처럼 Latin-1 범위 글자만 있으면 UTF-8 바이트를 잘못 읽은 것 ── */
const unmojibake = (s) => {
  if (!/[-ÿ]/.test(s) || /[Ā-￿]/.test(s)) return s;
  const fixed = Buffer.from(s, "latin1").toString("utf8");
  return fixed.includes("�") ? s : fixed;
};

/* ── 규칙 만들기 ── */
const rules = [];
const stats = {};
const failures = [];
const seenSrc = new Set();
for (const raw of fs.readFileSync(LIST, "utf8").split(/\r?\n/)) {
  const rawPath = raw.trim();
  if (!rawPath || rawPath.startsWith("#")) continue;
  const decoded = dec(rawPath);
  const logical = unmojibake(decoded);
  if (seenSrc.has(decoded)) continue;
  seenSrc.add(decoded);

  const count = (k) => { stats[k] = (stats[k] || 0) + 1; };
  let to = null, why = null;

  if (existing.has(decoded)) { count("existing-rule-skip"); continue; }        // 카테고리 옛 이름 등 이미 다른 구간이 받는다
  if (existing.has(logical)) { to = existing.get(logical); why = "existing-rule-mojibake"; }
  else if (logical.startsWith("/w/") && live.has(logical.slice(3))) {
    if (logical === decoded) { count("live-skip"); continue; }
    to = logical; why = "mojibake-live";
  }
  else if (logical.startsWith("/category/") && validCats.has(logical.slice(10))) {
    if (logical === decoded) { count("live-skip"); continue; }
    to = logical; why = "mojibake-live";
  }
  else if (logical === "/about" || (fs.existsSync(path.join("public", logical)) && logical !== "/")) { count("live-skip"); continue; }
  else if (overrides[logical]) { to = overrides[logical]; why = "override"; }
  else if (logical.startsWith("/w/")) {
    const x = logical.slice(3);
    if (relatedFixes[x] && live.has(relatedFixes[x])) { to = `/w/${relatedFixes[x]}`; why = "related-fixes"; }
    else if (linkFixes[x] && live.has(linkFixes[x])) { to = `/w/${linkFixes[x]}`; why = "link-fixes"; }
    else { const s = pickSource(x); if (s) { to = `/w/${s}`; why = "keyword-source"; } }
  }

  if (!to) { failures.push(decoded); continue; }
  if (!targetOk(to)) { failures.push(`${decoded} → ${to} (도착지가 살아 있지 않다)`); continue; }
  if (to === decoded) { failures.push(`${decoded} → 자기 자신`); continue; }
  count(why);

  // 출발지: 한글은 그대로(기존 규칙과 같은 방식으로 이미 동작 확인), 공백·%·따옴표 등 구분자를 깨는 글자만 인코딩.
  // 깨진(이중 인코딩) 주소는 눈에 안 보이는 제어문자가 섞여 있어 네이버가 요청한 퍼센트 인코딩 그대로 쓴다.
  const src = logical !== decoded
    ? rawPath
    : decoded.split("/").map((seg) => seg.replace(/[\s%"'#?]/g, (c) => encodeURIComponent(c))).join("/");
  const dst = to.split("/").map((seg) => seg.replace(/[\s%"'#?]/g, (c) => encodeURIComponent(c))).join("/");
  rules.push(`${src} ${dst} 301`);
}
rules.sort();

console.log("목록:", seenSrc.size, "| 규칙:", rules.length, "|", JSON.stringify(stats));
if (failures.length) {
  console.error(`\n✗ 보낼 곳을 못 정한 주소 ${failures.length}개 — scripts/ghost-redirect-overrides.json 에 적어라`);
  for (const f of failures) console.error("  ", f);
  process.exit(1);
}

/* ── 출력: Cloudflare Bulk Redirects CSV ──
 * 처음엔 public/_redirects 에 넣었다. 두 번 배포해 540개를 실측한 결과 Cloudflare Pages 는 이 프로젝트의
 * _redirects 를 141줄(규칙 131개)까지만 적용하고 뒤는 전부 무시했다 — 순서를 뒤집어도 같은 줄에서 잘렸다.
 * 공식 문서 한도(정적 2,000)와 다른 실제 동작이다. 그래서 계정 단 Bulk Redirects(무료 10,000건)로 옮긴다.
 * CSV 규격(공식 문서): 헤더 없음, <소스 호스트+경로>,<대상 URL>,<코드>. 소스는 네이버가 요청하는 그대로 퍼센트 인코딩.
 * 대시보드: 계정 홈 → Bulk Redirects → 목록 만들기 → CSV 업로드 → 규칙 만들어 목록 연결.
 */
const HOST = "www.jjyu.co.kr";
const encPath = (p) => p.split("/").map((seg) => encodeURIComponent(dec(seg))).join("/");
const csvRows = rules.map((r) => {
  const [src, dst, code] = r.split(/\s+/);
  const s = /%C3%A[A-F0-9]%C2/i.test(src) ? src : encPath(src); // 깨진 주소는 이미 네이버 원형
  return `${HOST}${s},https://${HOST}${encPath(dst)},${code || 301}`;
});

/* ── 예외: 주소에 % 기호(%25)가 든 것 ──
 * Bulk Redirects 업로드 후 540개 실측: 534개 301, 남은 6개가 전부 "5%" "40%" 처럼 % 기호가 든 주소였다.
 * Bulk 쪽 정규화가 %25 를 다르게 다루는 것으로 보이나 원인은 미확정. 이 소수만 _redirects 로 받는다.
 * _redirects 는 규칙 131개까지만 적용되므로(실측) 전체 규칙 수를 반드시 그 아래로 지킨다. */
const REDIRECTS_APPLY_LIMIT = 131;
const pctRules = rules.filter((r) => /%25/.test(r.split(/\s+/)[0]));
const existingCount = (text.match(/^\/\S+\s+\S+/gm) || []).length;
if (existingCount + pctRules.length > REDIRECTS_APPLY_LIMIT - 5) {
  console.error(`✗ _redirects 규칙이 ${existingCount + pctRules.length}개 — 실측 적용 상한(${REDIRECTS_APPLY_LIMIT})에 닿는다`);
  process.exit(1);
}
let redirectsText = text.replace(/(\r?\n){3,}$/, eol);
if (pctRules.length) {
  if (!redirectsText.endsWith(eol)) redirectsText += eol;
  redirectsText += eol + [BEGIN, ...pctRules, END].join(eol) + eol;
}

if (process.argv.includes("--write")) {
  fs.writeFileSync(CSV_OUT, csvRows.join("\n") + "\n", "utf8");
  if (redirectsText !== fs.readFileSync(OUT, "utf8")) fs.writeFileSync(OUT, redirectsText, "utf8");
  console.log("기록:", CSV_OUT, `(${csvRows.length}행)`, `| _redirects 에 % 포함 ${pctRules.length}개 (총 규칙 ${existingCount + pctRules.length}/${REDIRECTS_APPLY_LIMIT})`);
} else {
  console.log(`\n(시뮬레이션 — CSV ${csvRows.length}행, _redirects % 포함 ${pctRules.length}개)\n` + pctRules.join("\n"));
}
