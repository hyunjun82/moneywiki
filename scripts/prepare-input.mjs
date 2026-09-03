#!/usr/bin/env node
/**
 * 입력 변환기 — 사용자가 준 키워드 묶음을 keywords JSON 으로.
 *
 * 두 가지를 받는다.
 *   1) 엑셀 (권장): 연관검색어 워크북 + 지식iN 워크북
 *        node scripts/prepare-input.mjs <slug> --xlsx "C:/…/실업급여_연관검색어.xlsx" --xlsx "C:/…/실업급여_지식인.xlsx"
 *      · 연관검색어: "키워드" 열 + "스포크"(주제 묶음) 열을 그대로 읽는다 — 묶음이 이미 나뉘어 있으면 그것을 쓴다
 *      · 지식iN: "질문제목" + "답변수"(많이 물은 순) + 답변 발췌를 읽는다
 *   2) 텍스트 (대충 붙여넣기)
 *        node scripts/prepare-input.mjs <slug>            ← scripts/inputs/<slug>.txt
 *      "메인:" "자동완성:" "연관검색어:" "지식인:" 머리말 아래 줄들. 머리말이 없으면 전부 검색어로 본다.
 *
 * 산출: scripts/keywords/<slug>.json  (collect-keywords 결과와 합쳐진다. questions·spokes 가 더 붙는다)
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { readBook } = require("./lib-xlsx.cjs");

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1] !== "--xlsx");
if (!slug) { console.error('사용법: node scripts/prepare-input.mjs <slug> [--xlsx <파일>]...'); process.exit(1); }
const xlsxFiles = argv.reduce((acc, a, i) => (a === "--xlsx" ? [...acc, argv[i + 1]] : acc), []);

const clean = (s) => String(s ?? "").replace(/^\s*(?:[-*·•]|\d+[.)])\s*/, "").replace(/\s+/g, " ").trim();
// 정확히 같은 이름을 먼저 찾는다 — "스포크"가 "스포크코드"에 먼저 걸리면 코드(A1)만 들어온다
const col = (head, ...names) => {
  const norm = (x) => String(x).replace(/\s/g, "");
  for (const n of names) { const i = head.findIndex((h) => norm(h) === n); if (i >= 0) return i; }
  return head.findIndex((h) => names.some((n) => norm(h).includes(n)));
};

const out = { main: "", autocomplete: [], related: [], questions: [], spokes: {} };

/* ── 1. 엑셀 ── */
for (const file of xlsxFiles) {
  if (!fs.existsSync(file)) { console.error(`파일이 없습니다: ${file}`); process.exit(1); }
  const book = readBook(file);
  for (const [sheet, rows] of Object.entries(book)) {
    if (rows.length < 2) continue;
    const head = rows[0].map(clean);
    const iKw = col(head, "키워드");
    const iSpoke = col(head, "스포크");
    const iIntent = col(head, "검색의도");
    const iQ = col(head, "질문제목", "질문(롱테일", "롱테일");
    const iAns = col(head, "답변수");
    const iBody = col(head, "답변발췌", "질문본문");

    // 연관검색어 시트: 키워드 + (있으면) 스포크 묶음
    if (iKw >= 0 && iQ < 0) {
      for (const r of rows.slice(1)) {
        const kw = clean(r[iKw]);
        if (!kw) continue;
        const intent = iIntent >= 0 ? clean(r[iIntent]) : "";
        if (/메인/.test(intent) && !out.main) { out.main = kw; continue; }
        out.related.push(kw);
        if (iSpoke >= 0) {
          const g = clean(r[iSpoke]) || "기타";
          (out.spokes[g] = out.spokes[g] || []).push(kw);
        }
      }
    }

    // 지식iN 시트: 질문제목 (답변수 많은 순 = 많이 물은 것)
    if (iQ >= 0) {
      const qs = rows.slice(1)
        .map((r) => ({ q: clean(r[iQ]), n: +(r[iAns] ?? 0) || 0, body: iBody >= 0 ? clean(r[iBody]) : "" }))
        .filter((x) => x.q);
      qs.sort((a, b) => b.n - a.n);
      for (const x of qs) out.questions.push(x.n ? `${x.q} (답변 ${x.n})` : x.q);
      if (!out.qDetail) out.qDetail = qs.slice(0, 60);
    }
  }
}

/* ── 2. 텍스트 ── */
const txt = path.join("scripts", "inputs", `${slug}.txt`);
if (fs.existsSync(txt)) {
  const HEAD = {
    main: /^(메인|주제|main|topic)\s*[:：]/i,
    autocomplete: /^(자동\s*완성|자음|자모|autocomplete)\s*[:：]?/i,
    related: /^(연관\s*검색어|연관|함께\s*많이\s*찾는|related)\s*[:：]?/i,
    questions: /^(지식\s*인|지식iN|질문|questions?)\s*[:：]?/i,
  };
  let mode = "autocomplete";
  for (const raw of fs.readFileSync(txt, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    let matched = false;
    for (const [k, re] of Object.entries(HEAD)) {
      const m = line.match(re);
      if (m) {
        matched = true;
        const rest = clean(line.slice(m[0].length));
        if (k === "main") { out.main = rest || out.main; mode = "autocomplete"; }
        else { mode = k; if (rest) out[k].push(rest); }
        break;
      }
    }
    if (!matched) out[mode].push(clean(line));
  }
} else if (!xlsxFiles.length) {
  console.error(`입력이 없습니다. scripts/inputs/${slug}.txt 를 만들거나 --xlsx 로 엑셀을 주세요.`);
  process.exit(1);
}

for (const k of ["autocomplete", "related", "questions"]) out[k] = [...new Set(out[k].filter(Boolean))];
for (const g of Object.keys(out.spokes)) out.spokes[g] = [...new Set(out.spokes[g])];
if (!out.main) out.main = out.related[0] ?? out.autocomplete[0] ?? slug.replace(/-/g, " ");

const keywPath = path.join("scripts", "keywords", `${slug}.json`);
const prev = fs.existsSync(keywPath) ? JSON.parse(fs.readFileSync(keywPath, "utf8")) : { slug, queries: [] };
const merged = {
  slug,
  collectedAt: new Date().toISOString().slice(0, 10),
  topic: out.main,
  queries: [
    ...(prev.queries ?? []).filter((q) => q.source !== "user"),
    { q: out.main, source: "user", autocomplete: out.autocomplete, related: out.related },
  ],
  spokes: Object.keys(out.spokes).length ? out.spokes : prev.spokes,
  questions: [...new Set([...(prev.questions ?? []), ...out.questions])],
  questionDetail: out.qDetail ?? prev.questionDetail,
};
fs.mkdirSync(path.dirname(keywPath), { recursive: true });
fs.writeFileSync(keywPath, JSON.stringify(merged, null, 2) + "\n", "utf8");

console.log(`주제: ${merged.topic}`);
console.log(`자동완성 ${out.autocomplete.length} · 연관검색어 ${out.related.length} · 지식iN 질문 ${out.questions.length}`);
if (merged.spokes) {
  console.log("주제 묶음(엑셀 스포크 열):");
  for (const [g, v] of Object.entries(merged.spokes).sort((a, b) => b[1].length - a[1].length)) console.log(`  ${String(v.length).padStart(3)}  ${g}`);
}
console.log(`기록: ${keywPath}`);
