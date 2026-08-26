#!/usr/bin/env node
/**
 * 글 한 편을 처음부터 끝까지 — 주제만 주면 검사 통과 상태까지 간다.
 *
 * 그동안 조각은 다 있었는데 이어 붙이질 않아서, 매번 내가 손으로 옮기고
 * 검사에 걸리고 대화로 왕복했다. 글 하나에 하루가 갔다. 이 명령어가 그 왕복을 없앤다.
 *
 *   1) 검색어 수집 (Playwright, 네이버 자동완성·연관검색어)
 *   2) 기관 게시판 검색 → 근거 페이지 수집 (Playwright, 텍스트·표·이미지alt·캡처)
 *   3) CTA 후보를 전부 열어 '행동 화면'인지 판정
 *   4) 브리프 — 이 글에서 쓸 수 있는 문장·숫자·주소 목록
 *   5) 골격 — 타이틀 항목 수만큼 섹션. 개수가 어긋날 수 없다
 *   6) 초안 — 브리프 목록 밖으로 나가지 못하게 하고 문장만 채운다
 *   7) 검사 5종 → autofix 루프 → 통과할 때까지
 *
 * 사용:
 *   node scripts/write.mjs <slug> \
 *     --main "위고비 마운자로" --items "실비청구,실비조건,BMI 기준" --hook "동반질환까지" \
 *     --category 보험 \
 *     --q "위고비 실비" --q "마운자로 실비" \
 *     [--site fsc.go.kr] [--url 공식URL ...] [--law 법령명:조]
 *
 * 통과하면 src/data/articles/<category>.ts 에 들어가 있다. 실패하면 어디서 막혔는지 말하고 멈춘다.
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const slug = argv[0];
if (!slug || slug.startsWith("--")) {
  console.error('사용법: node scripts/write.mjs <slug> --main "메인키워드" --items "항목,항목,항목" --category 보험 --q "검색어" [--site fsc.go.kr] [--url URL]');
  process.exit(1);
}
const opt = { q: [], url: [], law: [], site: [] };
for (let i = 1; i < argv.length; i++) {
  const k = argv[i].startsWith("--") ? argv[i].slice(2) : null;
  if (!k) continue;
  if (k in opt && Array.isArray(opt[k])) opt[k].push(argv[++i]);
  else opt[k] = argv[++i];
}
const ROOT = process.cwd();
const category = opt.category || "금융";
const catFile = path.join(ROOT, "src", "data", "articles", `${category}.ts`);
if (!fs.existsSync(catFile)) {
  console.error(`카테고리 파일이 없습니다: ${catFile}`);
  process.exit(1);
}

function sh(cmd, args, quiet) {
  const r = spawnSync(cmd, args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    shell: process.platform === "win32",
    stdio: quiet ? "pipe" : ["ignore", "inherit", "inherit"],
  });
  return { code: r.status, out: `${r.stdout || ""}${r.stderr || ""}` };
}

function step(n, label) {
  console.log(`\n${"─".repeat(60)}\n${n}. ${label}\n${"─".repeat(60)}`);
}

// ── 1~4. 브리프 (검색어·근거·CTA 판정을 한 번에) ─────────────────────
step(1, "브리프 — 검색어 · 근거 · CTA 후보");
{
  const args = [
    "scripts/brief.mjs", slug,
    ...opt.q.flatMap((q) => ["--q", q]),
    ...opt.url.flatMap((u) => ["--url", u]),
    ...opt.law.flatMap((l) => ["--law", l]),
    ...opt.site.flatMap((s) => ["--site", s]),
  ];
  if (sh("node", args).code !== 0) {
    console.error("\n브리프에서 막혔습니다 — 근거가 없으면 글을 쓸 수 없습니다.");
    process.exit(1);
  }
}

// ── 5. 골격 ──────────────────────────────────────────────────────────
step(2, "골격 — 타이틀 항목 수만큼 섹션");
{
  const args = ["scripts/scaffold.mjs", slug, "--category", category];
  if (opt.main) args.push("--main", opt.main);
  if (opt.items) args.push("--items", opt.items);
  if (opt.hook) args.push("--hook", opt.hook);
  if (sh("node", args).code !== 0) process.exit(1);
}

// ── 6. 초안 — 브리프 밖으로 나가지 못한다 ────────────────────────────
step(3, "초안 — 브리프 목록 안에서만 문장을 채운다");

const brief = fs.readFileSync(path.join(ROOT, "scripts", "briefs", `${slug}.md`), "utf8");
const skeleton = fs.readFileSync(path.join(ROOT, "scripts", "scaffolds", `${slug}.ts`), "utf8");

const RULES = `너는 머니위키 글을 쓰는 사람이다. 아래에 브리프(재료)와 골격(구조)이 온다.
골격의 TODO 자리를 문장으로 채워 완성된 TypeScript ArticleData 조각 하나를 돌려준다.

절대 규칙
 · 브리프의 "쓸 수 있는 숫자" 밖의 수치를 쓰지 마라. 없으면 그 문장을 쓰지 마라.
 · 브리프의 "쓸 수 있는 문장" 밖의 인용을 하지 마라. 출처를 붙여 없는 말을 하면 안 된다.
 · 버튼(cta)은 브리프의 "행동 화면"으로 판정된 주소만 쓴다. 골격에 이미 박힌 주소를 바꾸지 마라.
 · 섹션을 늘리거나 줄이지 마라. 골격의 섹션 수가 곧 타이틀이 약속한 항목 수다.

글쓰기 규칙
 · 톤은 합니다체. 각 섹션 첫 문장이 소제목 질문을 곧바로 답한다(배경·정의로 시작 금지).
 · 훅은 두 문단. 마지막 문장은 아래 버튼을 누를 이유이지 퀴즈가 아니다.
   "…맞춰 보시죠" 같은 문제 내기 금지. 무엇을 하라는 건지 분명해야 한다.
 · 글 안에서 앞뒤가 맞아야 한다. 훅이 조건을 빼고 단정했는데 본문이 조건을 달면 안 된다.
 · 번역체·AI 양산형 문구 금지: "~에 대해서", "~를 통해", "중요한 것은", "결론적으로".
 · 뜻이 안 통하는 표현 금지. 읽는 사람이 무엇을 하는지 알 수 있어야 한다.
 · 조건을 빼먹어 "받을 수 있습니다"로 읽히게 하지 마라. 단서를 같은 문장에 붙인다.
 · meta.description 과 각 소제목에 메인키워드를 넣는다.
 · searchIntent.why 에는 조문(제N조) 또는 보도자료·고시·공고 표기를 넣는다.
 · summary 는 정확히 3줄, keyFacts 는 7~9행.

타입을 지켜라. 없는 필드나 타입을 지어내면 되돌려진다.
 · widgets[].type 은 다섯 개뿐: 'checklist'{items} · 'stat-box'{label,value,note?} ·
   'calc-cta'{slug,label?,note?} · 'case-example'{persona,result,note?} · 'def-box'{term,definition}
 · 표는 위젯이 아니다. 섹션의 compareTable{headers, rows} 를 쓴다.
   셀은 문자열이거나 {text, status?:'ok'|'no'|'warn'|'key'|'sub'} 이다.
 · 섹션 속성: eyebrow, heading, body, widgets?, compareTable?, cta?, link?{slug,label,bridge}, sourceQuote?

출력은 완성된 조각 하나뿐. 설명·머리말·코드펜스 금지.
"    {" 로 시작하고 "    }," 로 끝난다. TODO 를 하나도 남기지 마라.`;

function ask(input) {
  return new Promise((resolve, reject) => {
    const child = spawn("claude", ["-p", "--output-format", "text"], { shell: process.platform === "win32" });
    let out = "", err = "";
    const t = setTimeout(() => child.kill(), 15 * 60 * 1000);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", reject);
    child.on("close", (c) => { clearTimeout(t); (c !== 0 && !out.trim()) ? reject(new Error(err.slice(0, 300))) : resolve(out); });
    child.stdin.end(input);
  });
}

let draft;
try {
  draft = (await ask(`${RULES}\n\n── 브리프 ──\n${brief}\n\n── 골격 ──\n${skeleton}`)).trim();
} catch (e) {
  console.error(`초안 실패: ${e.message}`);
  process.exit(1);
}
draft = draft.replace(/^```[a-z]*\n?|```$/g, "").trim();
if (!draft.startsWith("{")) {
  const i = draft.indexOf("\n    {");
  if (i >= 0) draft = draft.slice(i + 1);
}
if (!/^\s*\{/.test(draft)) { console.error("초안이 객체 형태가 아닙니다 — 중단"); process.exit(1); }
if (!draft.trimEnd().endsWith(",")) draft = draft.trimEnd() + ",";

// ── 카테고리 파일에 넣는다 (같은 slug 가 있으면 갈아 끼운다) ─────────
const src = fs.readFileSync(catFile, "utf8");
const backup = `${catFile}.write-bak`;
fs.writeFileSync(backup, src);

const head = `\n    {\n      slug: "${slug}",`;
let next;
if (src.includes(head)) {
  const i = src.indexOf(head) + 1;
  const nxt = src.indexOf('\n    {\n      slug: "', i + 10);
  const end = nxt > 0 ? nxt + 1 : src.lastIndexOf("\n  ],\n};") + 1;
  next = src.slice(0, i) + "    " + draft.replace(/^\s+/, "") + "\n" + src.slice(end);
} else {
  const anchor = `  articles: [\n`;
  const i = src.indexOf(anchor) + anchor.length;
  next = src.slice(0, i) + "    " + draft.replace(/^\s+/, "") + "\n" + src.slice(i);
}
fs.writeFileSync(catFile, next);

const tsc = sh("npx", ["tsc", "--noEmit", path.relative(ROOT, catFile)], true);
if (/error TS/.test(tsc.out)) {
  fs.writeFileSync(catFile, src);
  fs.unlinkSync(backup);
  console.error("초안이 타입 오류를 냈습니다 — 되돌렸습니다.\n" + tsc.out.split("\n").slice(0, 3).join("\n"));
  process.exit(1);
}
fs.unlinkSync(backup);
console.log(`   ${path.relative(ROOT, catFile)} 에 넣었습니다.`);

// ── 7. 검사 → 자동 수정 루프 ─────────────────────────────────────────
step(4, "검사 5종 → 자동 수정");
const fix = sh("node", ["scripts/autofix.mjs", slug, "--max", "4"]);

console.log(`\n${"═".repeat(60)}`);
const v = sh("npm", ["run", "--silent", "verify:articles"], true);
const e = sh("node", ["scripts/verify-evidence.mjs", slug], true);
const okArticles = !v.out.split("\n").some((l) => /✗ \[ERROR\]/.test(l) && l.includes(slug));
const okEvidence = !/❌/.test(e.out);
if (fix.code === 0 && okArticles && okEvidence) {
  console.log(`✅ ${slug} — 통과. 읽어 보시고 이상하면 말씀해 주세요.`);
  console.log(`   https://www.jjyu.co.kr/w/${slug} (배포 후)`);
} else {
  console.log(`⚠ ${slug} — 남은 지적이 있습니다. 위 로그를 보고 사람이 판단해야 합니다.`);
  process.exit(1);
}
