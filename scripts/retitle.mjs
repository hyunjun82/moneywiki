#!/usr/bin/env node
/**
 * 타이틀만 줄인다 — 본문은 건드리지 않는다.
 *
 * 규칙 세 가지를 전부 지키는지 확인하고 바꾼다. 하나라도 어기면 그 글은 건너뛴다.
 *   1. 42자 이하 (검색 결과에서 30~35자쯤 잘린다. scripts/plan-articles.md 예시가 30~40자)
 *   2. 타이틀이 약속한 항목 수 = 대제목(h2) 수  ← 이게 정본 규칙이다. 이걸 깨면 안 된다
 *   3. primaryKeywords 중 2개 이상이 타이틀에 글자 그대로 남아 있을 것
 *
 *   node scripts/retitle.mjs            검사만 (42자 넘는 글 목록)
 *   node scripts/retitle.mjs --apply    scripts/retitles.json 의 새 타이틀을 적용
 */
import fs from "node:fs";
import path from "node:path";
import * as io from "./lib/article-io.mjs";
import { promisedCount } from "./lib/check-draft.mjs";

const apply = process.argv.includes("--apply");
const MAP_FILE = path.join("scripts", "retitles.json");
const LIMIT = 42;

const all = [];
for (const cat of io.categoryFiles()) {
  for (const a of io.loadCategory(cat).articles) {
    all.push({ cat, slug: a.slug, title: a.meta.title, h2: (a.mainSections || []).length, pk: a.primaryKeywords || [] });
  }
}

/** 새 타이틀이 규칙을 지키는지 */
export function checkTitle(t, h2, pk) {
  const errs = [];
  if (t.length > LIMIT) errs.push(`${t.length}자 (${LIMIT}자 이하)`);
  const promised = promisedCount(t);
  if (promised !== h2) errs.push(`항목 ${promised}개 ≠ 대제목 ${h2}개`);
  const kept = pk.filter((k) => t.includes(k)).length;
  if (kept < 2) errs.push(`primaryKeywords 유지 ${kept}개 (2개 이상)`);
  return errs;
}

if (!apply) {
  const long = all.filter((a) => a.title.length > LIMIT).sort((x, y) => y.title.length - x.title.length);
  console.log(`전체 ${all.length}편 · ${LIMIT}자 초과 ${long.length}편\n`);
  for (const a of long) console.log(`${String(a.title.length).padStart(3)}자  대제목 ${a.h2}개  [${a.cat}] ${a.slug}\n      ${a.title}\n      키워드: ${a.pk.join(" · ")}`);
  console.log(`\n새 타이틀을 ${MAP_FILE} 에 { "<slug>": "<새 타이틀>" } 로 적고 --apply 로 실행하세요.`);
  process.exit(0);
}

const map = JSON.parse(fs.readFileSync(MAP_FILE, "utf8"));
let done = 0, skipped = 0;
for (const [slug, val] of Object.entries(map)) {
  // { slug: "새 타이틀" } 또는 { slug: { title, keywords } }
  const newTitle = typeof val === "string" ? val : val.title;
  const newKw = typeof val === "string" ? null : val.keywords;
  const a = all.find((x) => x.slug === slug);
  if (!a) { console.log(`✗ ${slug} — 글이 없습니다`); skipped++; continue; }
  if (newKw) {
    if (!Array.isArray(newKw) || newKw.length < 2 || newKw.length > 3) { console.log(`✗ ${slug} — keywords 는 2~3개`); skipped++; continue; }
    const tooLong = newKw.filter((k) => k.length > 12);
    if (tooLong.length) { console.log(`✗ ${slug} — 검색어가 깁니다(12자 이내): ${tooLong.join(", ")}`); skipped++; continue; }
  }
  const errs = checkTitle(newTitle, a.h2, newKw || a.pk);
  if (errs.length) { console.log(`✗ ${slug} — ${errs.join(" · ")}\n     "${newTitle}"`); skipped++; continue; }
  const file = path.join(io.ART_DIR, `${a.cat}.ts`);
  const src = fs.readFileSync(file, "utf8");
  // 이 글의 meta.title 한 줄만 바꾼다 (slug 로 위치를 잡고 그 뒤 첫 title 만)
  const at = src.indexOf(`\n      slug: ${JSON.stringify(slug)},`);
  if (at < 0) { console.log(`✗ ${slug} — 파일에서 못 찾음`); skipped++; continue; }
  const rel = src.slice(at, at + 4000);
  const m = rel.match(/(\n\s*title:\s*)"((?:[^"\\]|\\.)*)"/);
  if (!m) { console.log(`✗ ${slug} — meta.title 을 못 찾음`); skipped++; continue; }
  let replaced = rel.replace(m[0], m[1] + JSON.stringify(newTitle));
  if (newKw) {
    const pkm = replaced.match(/(\n\s*primaryKeywords:\s*)\[[^\]]*\]/);
    if (!pkm) { console.log(`✗ ${slug} — primaryKeywords 를 못 찾음`); skipped++; continue; }
    replaced = replaced.replace(pkm[0], pkm[1] + "[" + newKw.map((k) => JSON.stringify(k)).join(", ") + "]");
  }
  fs.writeFileSync(file, src.slice(0, at) + replaced + src.slice(at + 4000));
  console.log(`✓ ${slug}\n     ${a.title.length}자 → ${newTitle.length}자  "${newTitle}"`);
  done++;
}
console.log(`\n바꾼 글 ${done}편 · 건너뛴 글 ${skipped}편`);
process.exit(skipped ? 1 : 0);
