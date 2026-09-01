/**
 * 관련 키워드 태그의 링크 대상을 미리 계산한다.
 *
 * 왜 필요한가 —
 * 글 페이지의 "관련 키워드" 태그는 `keywords` 프론트매터를 그대로 `/w/<키워드>` 로
 * 걸고 있었다. keywords 는 검색어 문구지 문서 이름이 아니라서 그 주소는 없다.
 * 7,747개 태그 링크가 전부 404 였고, 네이버가 8/21부터 이걸 따라 들어와
 * "접근 불가한 페이지"로 쌓고 있었다(8/31 기준 449개, 잠재 6,883개).
 *
 * 그래서 갈 곳이 분명한 것만 링크로 남기고 나머지는 글자로 둔다.
 * 여기서 만드는 것은 그 "갈 곳이 분명한" 목록이다.
 *
 * 링크로 인정하는 경우는 둘뿐이다.
 *   ① 키워드가 실제 슬러그와 정확히 일치한다
 *   ② 그 키워드를 keywords 에 가진 글이 (자기 자신을 빼고) 딱 하나다
 * 후보가 여럿이면(#퇴직금 지급 → 9개 글) 무엇을 고르든 근거가 없으니 링크하지 않는다.
 * 자기 자신을 가리키는 것도 링크하지 않는다 — 지금 보고 있는 글이다.
 *
 * 실행: node scripts/build-keyword-links.mjs [--write]
 * 결과: src/data/keyword-links.json  { "<글 slug>": { "<키워드>": "<가리킬 slug>" } }
 */
import fs from "node:fs";
import path from "node:path";

const WIKI_DIR = "content/wiki";
const TSX_DIR = "src/app/w";
const OUT = "src/data/keyword-links.json";

/** 공백·중점·괄호는 표기 흔들림이라 비교에서 제외한다. */
const norm = (s) => String(s).toLowerCase().replace(/[\s·\-—()[\]]/g, "");

function readDocs() {
  const docs = [];
  for (const file of fs.readdirSync(WIKI_DIR)) {
    if (!file.endsWith(".md")) continue;
    const text = fs.readFileSync(path.join(WIKI_DIR, file), "utf8");
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const keywords = [];
    let inKeywords = false;
    for (const line of fm[1].split(/\r?\n/)) {
      if (/^keywords:\s*$/.test(line)) { inKeywords = true; continue; }
      if (inKeywords) {
        const item = line.match(/^\s+-\s*(.+?)\s*$/);
        if (item) { keywords.push(item[1].replace(/^["']|["']$/g, "").trim()); continue; }
        inKeywords = false;
      }
      const inline = line.match(/^keywords:\s*\[(.+)\]\s*$/);
      if (inline) {
        for (const raw of inline[1].split(",")) {
          const k = raw.trim().replace(/^["']|["']$/g, "");
          if (k) keywords.push(k);
        }
      }
    }
    docs.push({ slug: file.replace(/\.md$/, ""), keywords: keywords.filter(Boolean) });
  }
  return docs;
}

/** /w/ 아래에 실제로 존재하는 주소. MD 와 직접 작성한 TSX 페이지를 합친다. */
function readSlugs(docs) {
  const slugs = new Set(docs.map((d) => d.slug));
  try {
    for (const e of fs.readdirSync(TSX_DIR, { withFileTypes: true })) {
      if (e.isDirectory()) slugs.add(e.name);
    }
  } catch { /* 디렉터리가 없으면 MD 만으로 본다 */ }
  return slugs;
}

const docs = readDocs();
const slugs = readSlugs(docs);
const slugByNorm = new Map();
for (const s of slugs) if (!slugByNorm.has(norm(s))) slugByNorm.set(norm(s), s);

/** 키워드 → 그 키워드를 가진 글들 */
const owners = new Map();
for (const d of docs) {
  for (const k of d.keywords) {
    const n = norm(k);
    if (!owners.has(n)) owners.set(n, new Set());
    owners.get(n).add(d.slug);
  }
}

const links = {};
const stat = { total: 0, bySlug: 0, byOwner: 0, self: 0, ambiguous: 0, nowhere: 0 };

for (const d of docs) {
  for (const k of d.keywords) {
    stat.total++;
    const n = norm(k);

    // ① 키워드가 곧 슬러그인 경우
    const exact = slugByNorm.get(n);
    if (exact) {
      if (exact === d.slug) { stat.self++; continue; }
      (links[d.slug] ??= {})[k] = exact;
      stat.bySlug++;
      continue;
    }

    // ② 그 키워드를 가진 글이 자기 말고 하나뿐인 경우
    const others = [...(owners.get(n) ?? [])].filter((s) => s !== d.slug);
    if (others.length === 1) {
      (links[d.slug] ??= {})[k] = others[0];
      stat.byOwner++;
    } else if (others.length > 1) {
      stat.ambiguous++;
    } else {
      stat.nowhere++;
    }
  }
}

const linked = stat.bySlug + stat.byOwner;
console.log("글:", docs.length, "| 실제 /w/ 주소:", slugs.size);
console.log("키워드 태그 총개수:", stat.total);
console.log("  링크로 남김 — 슬러그 일치 :", stat.bySlug);
console.log("  링크로 남김 — 유일한 글   :", stat.byOwner);
console.log("  글자로 둠 — 자기 자신     :", stat.self);
console.log("  글자로 둠 — 후보 여럿     :", stat.ambiguous);
console.log("  글자로 둠 — 갈 곳 없음    :", stat.nowhere);
console.log(`\n링크 ${linked}개 (${((linked / stat.total) * 100).toFixed(1)}%) · 나머지 ${stat.total - linked}개는 글자`);

// 안전 점검: 가리키는 주소가 실제로 있어야 한다.
let broken = 0;
for (const [from, map] of Object.entries(links)) {
  for (const [kw, to] of Object.entries(map)) {
    if (!slugs.has(to)) { broken++; console.error("깨진 대상:", from, kw, "→", to); }
    if (to === from) { broken++; console.error("자기 링크:", from, kw); }
  }
}
console.log("깨진 대상 / 자기 링크:", broken);
if (broken > 0) { console.error("\n문제가 있어 기록하지 않습니다."); process.exit(1); }

if (process.argv.includes("--write")) {
  const sorted = {};
  for (const k of Object.keys(links).sort()) sorted[k] = links[k];
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2).replace(/\r?\n/g, "\r\n") + "\r\n", "utf8");
  console.log("\n기록:", OUT, `(글 ${Object.keys(sorted).length}개)`);
} else {
  console.log("\n(시뮬레이션 — --write 를 붙이면 기록합니다)");
  const sample = Object.entries(links).slice(0, 3);
  for (const [from, map] of sample) {
    console.log(`\n[${from}]`);
    for (const [kw, to] of Object.entries(map)) console.log(`   #${kw} → ${to}`);
  }
}
