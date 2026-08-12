// 통합 맵 생성기: 유사 슬러그 클러스터를 찾아 대표/흡수 목록을 만든다.
// 분석 전용 — 사이트를 변경하지 않음. 결과: scripts/consolidation-map.json
const fs = require("fs");

const md = fs.readdirSync("content/wiki").filter(f => f.endsWith(".md")).map(f => f.slice(0, -3));
const tsx = fs.readdirSync("src/app/w", { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const calcRaw = JSON.parse(fs.readFileSync("scripts/calc-protected-slugs.json", "utf8"));
const calc = new Set(Array.isArray(calcRaw) ? calcRaw : calcRaw.slugs);

const all = [...new Set([...md, ...tsx])].filter(s => !calc.has(s));

// 토큰화: 하이픈 분리 + 불용어(수식어) 제거
const STOP = new Set([
  "및", "수", "방법", "조건", "기준", "규정", "요건", "제도", "가능여부", "가능", "여부",
  "정리", "총정리", "완벽", "가이드", "언제", "어떻게", "하는법", "확인", "하기", "찾기",
  "방법은", "이유", "종류", "차이", "비교", "계산", "신청", "절차", "서류",
]);
const tokens = s => new Set(s.split("-").filter(t => t && !STOP.has(t)));

const jaccard = (a, b) => {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
};
const isSubset = (a, b) => [...a].every(t => b.has(t));

// 인덱스: 토큰 → 슬러그 (전수 비교 회피)
const tok = new Map(all.map(s => [s, tokens(s)]));
const inv = new Map();
for (const s of all) for (const t of tok.get(s)) {
  if (!inv.has(t)) inv.set(t, []);
  inv.get(t).push(s);
}

// Union-Find
const parent = new Map(all.map(s => [s, s]));
const find = x => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent.set(ra, rb); };

// 보수적 병합: Jaccard >= 0.75, 또는 한쪽 토큰이 다른쪽의 부분집합(2토큰 이상)
for (const s of all) {
  const ts = tok.get(s);
  const cand = new Set();
  for (const t of ts) for (const o of inv.get(t)) if (o !== s) cand.add(o);
  for (const o of cand) {
    if (find(s) === find(o)) continue;
    const to = tok.get(o);
    const j = jaccard(ts, to);
    const sub = (ts.size >= 2 && isSubset(ts, to)) || (to.size >= 2 && isSubset(to, s === o ? ts : to.size <= ts.size ? ts : to) && isSubset(to, ts));
    if (j >= 0.75 || (ts.size >= 2 && to.size >= 2 && (isSubset(ts, to) || isSubset(to, ts)))) union(s, o);
  }
}

const groups = new Map();
for (const s of all) {
  const r = find(s);
  if (!groups.has(r)) groups.set(r, []);
  groups.get(r).push(s);
}
const clusters = [...groups.values()].filter(g => g.length > 1);

// 대표 선정: 가장 짧은 슬러그(머리 키워드일 확률 높음), 동률이면 MD 우선
const mdSet = new Set(md);
const map = clusters.map(g => {
  const sorted = [...g].sort((a, b) => a.length - b.length || (mdSet.has(b) ? 1 : 0) - (mdSet.has(a) ? 1 : 0));
  return { canonical: sorted[0], absorbed: sorted.slice(1), size: g.length };
}).sort((a, b) => b.size - a.size);

const absorbedTotal = map.reduce((a, c) => a + c.absorbed.length, 0);
fs.writeFileSync("scripts/consolidation-map.json", JSON.stringify({
  generatedAt: "2026-08-12",
  note: "분석 전용. 적용 전 검토 필수. canonical=남길 글, absorbed=301 대상",
  totalSlugs: all.length, clusters: map.length, absorbedPages: absorbedTotal, map,
}, null, 2));

console.log(`대상 ${all.length}개 → 클러스터 ${map.length}개, 흡수(301) 대상 ${absorbedTotal}개`);
console.log("\n=== 상위 15개 클러스터 ===");
for (const c of map.slice(0, 15)) {
  console.log(`\n[${c.size}개] 대표: ${c.canonical}`);
  c.absorbed.forEach(s => console.log(`   ← ${s}`));
}
