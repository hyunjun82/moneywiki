#!/usr/bin/env node
/**
 * 자동 수정 루프 — 검사기가 뱉은 지적을 받아 글을 고치고 다시 검사한다.
 *
 * 지금까지 이 왕복을 대화로 했다. 검사기가 "description에 키워드가 없다"고 하면
 * 내가 읽고 고치고 다시 돌렸다. 글 하나에 6번 왕복했고 30분이 갔다.
 * 그 왕복에는 판단이 거의 없다 — 지적이 이미 무엇을 어떻게 고치라고 말해 준다.
 *
 * 이 명령어는 그 왕복을 사람 없이 돌린다.
 *   verify-articles / verify-evidence / verify-meaning 을 돌려
 *   ERROR 를 모아 판정자(claude -p)에게 글과 함께 주고,
 *   고친 ArticleData 조각을 받아 파일에 써 넣고, 다시 검사한다.
 *
 * 통과하거나 --max 회를 채우면 멈춘다. 고쳐지지 않으면 그대로 보고하고 끝낸다 —
 * 억지로 통과시키려고 내용을 지우지 않는다.
 *
 * 사용:
 *   node scripts/autofix.mjs <slug> [--max 4] [--file src/data/articles/금융.ts]
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const slug = argv[0];
if (!slug || slug.startsWith("--")) {
  console.error("사용법: node scripts/autofix.mjs <slug> [--max 4] [--file <카테고리 .ts>]");
  process.exit(1);
}
const opt = {};
for (let i = 1; i < argv.length; i++) if (argv[i].startsWith("--")) opt[argv[i].slice(2)] = argv[++i];
const MAX = Number(opt.max ?? 4);
const ROOT = process.cwd();

/** slug 가 든 카테고리 파일을 찾는다 */
function findFile() {
  if (opt.file) return path.join(ROOT, opt.file);
  const dir = path.join(ROOT, "src", "data", "articles");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts") && x !== "types.ts")) {
    const p = path.join(dir, f);
    if (fs.readFileSync(p, "utf8").includes(`slug: "${slug}"`)) return p;
  }
  return null;
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024, shell: process.platform === "win32" });
  return `${r.stdout || ""}${r.stderr || ""}`;
}

/** 이 글에 걸린 ERROR 줄만 추린다 */
function errorsFor(text) {
  const lines = text.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (/✗ \[ERROR\]/.test(lines[i]) && lines[i].includes(slug)) {
      out.push(lines[i].trim(), (lines[i + 1] || "").trim());
    }
    if (/🔴/.test(lines[i])) out.push(lines[i].trim(), (lines[i + 1] || "").trim(), (lines[i + 2] || "").trim());
  }
  return out.filter(Boolean).join("\n");
}

function collectErrors() {
  const a = run("npm", ["run", "--silent", "verify:articles"]);
  const e = run("node", ["scripts/verify-evidence.mjs"]);
  const m = run("npx", ["tsx", "scripts/verify-meaning.ts", slug]);
  const evLine = e.split("\n").find((l) => l.includes(slug) && l.includes("❌")) || "";
  return [errorsFor(a), evLine.trim(), errorsFor(m)].filter(Boolean).join("\n");
}

/** 파일에서 이 글의 ArticleData 조각을 잘라 낸다 */
function sliceArticle(file) {
  const s = fs.readFileSync(file, "utf8");
  // slug 는 다른 글의 relatedQuestions 안에도 나온다. 글의 첫 속성으로 오는 자리만 잡는다.
  const head = `\n    {\n      slug: "${slug}",`;
  const i = s.indexOf(head);
  if (i < 0) return null;
  const start = i + 1;
  const nxt = s.indexOf('\n    {\n      slug: "', start + 10);
  const end = nxt > 0 ? nxt + 1 : s.lastIndexOf("\n  ],\n};") + 1;
  return { s, start, end, block: s.slice(start, end) };
}

const RUBRIC = `너는 머니위키 글을 고치는 편집자다. 아래에 글 조각(TypeScript ArticleData)과 검사기가 뱉은 ERROR 목록이 온다.

지켜야 할 것
 · ERROR 를 전부 해소한다. 지적문에 이미 고칠 방법이 적혀 있다.
 · 근거 없는 숫자나 인용을 새로 만들지 않는다. 증거에 없는 값이 문제라면 그 문장을 지운다.
 · 통과만을 위해 내용을 통째로 지우지 않는다. 조건을 붙이거나 표현을 좁히는 쪽을 먼저 쓴다.
 · 타이틀이 나열한 항목 수와 소제목 수는 같아야 한다.
   개수가 안 맞으면 **소제목을 줄여서 맞춘다.** 타이틀에 항목을 더 넣어 맞추지 마라 —
   타이틀에 항목 8개를 나열하면 읽을 수 없는 제목이 된다.
   줄이는 방법은 합치기다. 어떤 소제목이 다른 소제목의 세부 질문이면 그 안으로 넣는다.
   (예: '신청 기간'과 '구비서류'는 '신청 방법'의 세부 질문이므로 신청 방법 섹션 본문으로 합친다)
   합칠 자리가 없으면 그 섹션을 FAQ 항목으로 내린다. 내용을 버리지 않는다.
   타이틀은 항목 3~5개가 적당하다.
 · 버튼 문구는 사용자가 할 행동 그대로. 열람형(보기·펼쳐 보기·요약표) 금지.
 · 톤은 합니다체. 훅의 마지막 문장은 행동 유도이지 퀴즈가 아니다.

타입을 지키지 않으면 되돌려진다. 없는 필드나 타입을 지어내지 마라.
 · widgets[].type 은 다음 다섯 개뿐이다:
   'checklist'{items:string[]} · 'stat-box'{label,value,note?} · 'calc-cta'{slug,label?,note?}
   'case-example'{persona,result,note?} · 'def-box'{term,definition}
 · 표는 위젯이 아니다. 섹션의 compareTable{headers:string[], rows:Cell[][]} 속성을 쓴다.
   Cell 은 문자열이거나 {text, status?:'ok'|'no'|'warn'|'key'|'sub'} 이다.
 · 섹션이 쓸 수 있는 속성: eyebrow, heading, body, highlight?, widgets?, compareTable?,
   cta?{label,url,org,note?}, link?{slug,label,bridge}, sourceQuote?{excerpt,source}
 · summary 는 정확히 3개. keyFacts 는 7~9개. 그 밖의 최상위 필드는 그대로 둔다.

출력은 고친 TypeScript 조각 하나뿐이다. 설명·머리말·코드펜스 금지.
반드시 "    {" 로 시작하고 "    }," 로 끝나는, 원래와 같은 형태의 객체 하나를 그대로 돌려준다.`;

function askFix(block, errors) {
  return new Promise((resolve, reject) => {
    const child = spawn("claude", ["-p", "--output-format", "text"], { shell: process.platform === "win32" });
    let out = "";
    let err = "";
    const t = setTimeout(() => child.kill(), 10 * 60 * 1000);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", reject);
    child.on("close", (c) => {
      clearTimeout(t);
      if (c !== 0 && !out.trim()) reject(new Error(err.slice(0, 300)));
      else resolve(out);
    });
    child.stdin.end(`${RUBRIC}\n\n── ERROR ──\n${errors}\n\n── 글 조각 ──\n${block}`);
  });
}

const file = findFile();
if (!file) {
  console.error(`${slug} 가 든 카테고리 파일을 찾지 못했습니다.`);
  process.exit(1);
}
console.log(`대상 ${path.relative(ROOT, file)}`);

for (let round = 1; round <= MAX; round++) {
  const errors = collectErrors();
  if (!errors.trim()) {
    console.log(`\n✅ ${round - 1}회 수정 후 통과`);
    process.exit(0);
  }
  console.log(`\n── ${round}회차 ── ERROR ${errors.split("\n").filter((l) => /✗|❌|🔴/.test(l)).length}건`);
  console.log(errors.split("\n").slice(0, 8).map((l) => "   " + l).join("\n"));

  const cut = sliceArticle(file);
  if (!cut) { console.error("글 조각을 잘라내지 못했습니다."); process.exit(1); }

  let fixed;
  try {
    fixed = (await askFix(cut.block, errors)).trim();
  } catch (e) {
    console.error(`수정 실패: ${e.message}`);
    process.exit(1);
  }
  fixed = fixed.replace(/^```[a-z]*\n?|```$/g, "").trim();
  if (!fixed.startsWith("{")) {
    const i = fixed.indexOf("\n    {");
    if (i >= 0) fixed = fixed.slice(i + 1);
  }
  if (!/^\s*\{/.test(fixed)) { console.error("돌아온 조각이 객체 형태가 아닙니다 — 중단"); process.exit(1); }
  if (!fixed.endsWith(",")) fixed += ",";

  const backup = `${file}.autofix-bak`;
  fs.writeFileSync(backup, cut.s);
  fs.writeFileSync(file, cut.s.slice(0, cut.start) + "    " + fixed.replace(/^\s+/, "") + "\n" + cut.s.slice(cut.end));

  // 타입이 깨졌으면 되돌린다 — 통과시키려다 파일을 망가뜨리지 않는다
  const tsc = run("npx", ["tsc", "--noEmit", path.relative(ROOT, file)]);
  if (/error TS/.test(tsc)) {
    fs.writeFileSync(file, cut.s);
    fs.unlinkSync(backup);
    console.error("고친 조각이 타입 오류를 냈습니다 — 되돌렸습니다.\n" + tsc.split("\n").slice(0, 3).join("\n"));
    process.exit(1);
  }
  fs.unlinkSync(backup);
}

const left = collectErrors();
if (left.trim()) {
  console.error(`\n${MAX}회를 돌았지만 남은 ERROR 가 있습니다 — 사람이 봐야 합니다.\n${left}`);
  process.exit(1);
}
console.log(`\n✅ 통과`);
