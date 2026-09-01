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
