#!/usr/bin/env node
/**
 * 입력 변환기 — 사용자가 붙여넣은 키워드 묶음(txt)을 keywords JSON 으로.
 *
 * 글쓰기의 입력은 사용자가 준다: 주제 + 자동완성 + 연관검색어 + 지식iN 실제 질문.
 * 형식은 대충이어도 된다. "메인:" "자동완성:" "연관검색어:" "지식인:" 같은 머리말 아래 줄들을 읽고,
 * 머리말이 없으면 전부 검색어로 본다. 빈 줄·글머리 기호(-, ·, 1.)는 무시한다.
 *
 * 사용:
 *   node scripts/prepare-input.mjs <slug> [scripts/inputs/<slug>.txt]
 *   → scripts/keywords/<slug>.json  (collect-keywords 와 같은 형식 + questions)
 *
 * 네이버를 직접 긁고 싶으면 collect-keywords.mjs 를 따로 돌린다. 둘은 같은 파일에 합쳐진다.
 */
import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) { console.error("사용법: node scripts/prepare-input.mjs <slug> [입력 txt]"); process.exit(1); }
const input = process.argv[3] ?? path.join("scripts", "inputs", `${slug}.txt`);
if (!fs.existsSync(input)) { console.error(`입력 파일이 없습니다: ${input}\n  scripts/inputs/${slug}.txt 에 키워드 묶음을 붙여넣으세요.`); process.exit(1); }

const HEAD = {
  main: /^(메인|주제|main|topic)\s*[:：]/i,
  autocomplete: /^(자동\s*완성|자음|자모|autocomplete)\s*[:：]?/i,
  related: /^(연관\s*검색어|연관|함께\s*많이\s*찾는|related)\s*[:：]?/i,
  questions: /^(지식\s*인|지식iN|질문|questions?)\s*[:：]?/i,
};
const clean = (l) => l.replace(/^\s*(?:[-*·•]|\d+[.)])\s*/, "").replace(/\s+/g, " ").trim();

let mode = "autocomplete";
const out = { main: "", autocomplete: [], related: [], questions: [] };
for (const raw of fs.readFileSync(input, "utf8").split(/\r?\n/)) {
  const line = raw.trim();
  if (!line) continue;
  let matched = false;
  for (const [k, re] of Object.entries(HEAD)) {
    const m = line.match(re);
    if (m) {
      matched = true;
      const rest = clean(line.slice(m[0].length));
      if (k === "main") { out.main = rest; mode = "autocomplete"; }
      else { mode = k; if (rest) out[k].push(rest); }
      break;
    }
  }
  if (!matched) out[mode].push(clean(line));
}
for (const k of ["autocomplete", "related", "questions"]) out[k] = [...new Set(out[k].filter(Boolean))];
if (!out.main) out.main = out.autocomplete[0] ?? slug.replace(/-/g, " ");

const keywPath = path.join("scripts", "keywords", `${slug}.json`);
const prev = fs.existsSync(keywPath) ? JSON.parse(fs.readFileSync(keywPath, "utf8")) : { slug, queries: [] };
const merged = {
  slug,
  collectedAt: new Date().toISOString().slice(0, 10),
  topic: out.main,
  queries: [
    ...prev.queries.filter((q) => q.source !== "user"),
    { q: out.main, source: "user", autocomplete: out.autocomplete, related: out.related },
  ],
  questions: [...new Set([...(prev.questions ?? []), ...out.questions])],
};
fs.mkdirSync(path.dirname(keywPath), { recursive: true });
fs.writeFileSync(keywPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
console.log(`주제: ${out.main}`);
console.log(`자동완성 ${out.autocomplete.length} · 연관검색어 ${out.related.length} · 지식iN 질문 ${out.questions.length}`);
console.log(`기록: ${keywPath}`);
