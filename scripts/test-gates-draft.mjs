#!/usr/bin/env node
/**
 * 사전 검사(check-draft)를 밖에서 돌려 보는 얇은 껍데기 — 시험대 전용.
 *
 * checkDraft 는 파이프라인 안에서만 불려서 시험대(test-gates)가 볼 수 없었다.
 * 그 사이 "설계도 title 과 글 meta.title 이 같은가" 를 아무도 대조하지 않아,
 * --title 로 못박은 타이틀을 고치기 단계가 42자 규칙에 맞춰 줄여 버렸다 (2026-09-14, 28편 중 18편).
 *
 * 설계도는 scripts/plans/<slug>.json 을 쓰고, 없으면 **커밋된(git HEAD) 글의 타이틀**을 설계도로 본다.
 * working tree 의 글을 설계도로 삼으면 타이틀을 망가뜨려도 설계도까지 같이 망가져 조용히 통과한다.
 * 타이틀 대조만 보고한다 — 나머지 항목은 파이프라인이 이미 본다.
 *
 * 사용: node scripts/test-gates-draft.mjs <slug>
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { checkDraft } from "./lib/check-draft.mjs";

const slug = process.argv[2];
if (!slug) { console.error("사용법: node scripts/test-gates-draft.mjs <slug>"); process.exit(2); }

/** 카테고리 파일들에서 이 글의 meta.title·category 를 뽑는다 (TS 파싱 없이 문자열 스캔) */
function articleFromFiles(slug, fromHead = false) {
  const dir = path.join("src", "data", "articles");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts") && x !== "types.ts")) {
    const rel = `${dir.split(path.sep).join("/")}/${f}`;
    let src;
    if (fromHead) {
      const r = spawnSync("git", ["show", `HEAD:${rel}`], { encoding: "utf8", maxBuffer: 1 << 28 });
      if (r.status !== 0) continue;
      src = r.stdout;
    } else src = fs.readFileSync(path.join(dir, f), "utf8");
    const marks = [...src.matchAll(/^[ \t]*slug:\s*["']([^"']+)["'],\s*\r?\n[ \t]*category:/gm)];
    const i = marks.findIndex((m) => m[1] === slug);
    if (i < 0) continue;
    const body = src.slice(marks[i].index, i + 1 < marks.length ? marks[i + 1].index : src.length);
    const title = (body.match(/title:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || "";
    const category = (body.match(/category:\s*"([^"]+)"/) || [])[1] || "";
    return { slug, category, meta: { title, description: "x" } };
  }
  return null;
}

const article = articleFromFiles(slug);
if (!article) { console.error(`❌ ${slug}: 카테고리 파일에서 글을 못 찾음`); process.exit(1); }

const planFile = path.join("scripts", "plans", `${slug}.json`);
let plan;
if (fs.existsSync(planFile)) {
  plan = JSON.parse(fs.readFileSync(planFile, "utf8"));
} else {
  const head = articleFromFiles(slug, true);
  if (!head) { console.error(`❌ ${slug}: 설계도도 없고 커밋된 글도 없어 대조 기준이 없음`); process.exit(2); }
  plan = { slug, category: head.category, title: head.meta.title };
}

const problems = checkDraft({
  article, plan,
  ev: { facts: [], raws: [] }, live: new Set(), ctaAllowed: new Set(),
}).filter((x) => x.startsWith("meta.title") || x.startsWith("slug ") || x.startsWith("category "));

if (problems.length) {
  for (const p of problems) console.error("❌ [" + slug + "] " + p);
  process.exit(1);
}
console.log(`✅ [${slug}] 설계도와 글의 slug·category·meta.title 일치`);
