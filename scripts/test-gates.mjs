#!/usr/bin/env node
/**
 * 게이트 시험대 — 일부러 망가뜨린 입력을 넣고 게이트가 잡는지 확인한다.
 *
 * 왜 필요한가 — 게이트가 "통과"라고 말해도 실제로는 아무것도 안 보고 있을 수 있다.
 * 실제로 그런 일이 있었다. verify-meaning-changed 가 CRLF 때문에 정규식이 0건을 반환해
 * '바뀐 글 없음 — 통과'를 뱉었는데, 그때 글 4편이 바뀌어 있었다.
 * 조용히 통과하는 검사가 가장 위험하므로, 게이트마다 "잡아야 할 것을 정말 잡는지" 시험한다.
 *
 * 방식: 파일을 백업 → 망가뜨림 → 게이트 실행 → 결과 확인 → 반드시 되돌림.
 * 되돌림은 finally 에서 하고, 끝나고 해시로 원상복구를 검증한다.
 *
 * 사용: node scripts/test-gates.mjs [--slow]
 *   --slow 를 붙이면 dev 서버와 판정 모델이 필요한 화면·뜻 검사까지 돌린다(느리다).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

const SLOW = process.argv.includes("--slow");
const SLUG = "실업급여-교육";
const ART = "src/data/articles/고용.ts";
const EV = `scripts/evidence/${SLUG}.json`;
const SHADOW_DIR = path.join("src", "app", "w", SLUG);

const files = [ART, EV];
const backup = new Map();
const sha = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const before = new Map(files.map((f) => [f, sha(f)]));

function snapshot() {
  for (const f of files) backup.set(f, fs.readFileSync(f, "utf8"));
}
function restore() {
  for (const [f, v] of backup) fs.writeFileSync(f, v);
  if (fs.existsSync(SHADOW_DIR)) fs.rmSync(SHADOW_DIR, { recursive: true, force: true });
}

/** 게이트를 돌리고 통과 여부만 돌려준다 */
function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32" });
  return { pass: r.status === 0, out: (r.stdout || "") + (r.stderr || "") };
}
const gates = {
  evidence: () => run("node", ["scripts/verify-evidence.mjs", SLUG]),
  evidenceAll: () => run("node", ["scripts/verify-evidence.mjs"]),
  shadow: () => run("node", ["scripts/verify-no-shadow.mjs"]),
  links: () => run("node", ["scripts/verify-internal-links.mjs"]),
  // 글 파일을 건드린 가장 최근 커밋의 부모를 기준으로 삼는다. HEAD~1 로 고정하면
  // 마지막 커밋이 스크립트만 바꿨을 때 '바뀐 글 없음'이 나와 시험이 헛돈다.
  changed: () => {
    const r = spawnSync("git", ["log", "-1", "--format=%H", "--", "src/data/articles"], { encoding: "utf8", shell: process.platform === "win32" });
    const c = (r.stdout || "").trim();
    return run("node", ["scripts/verify-meaning-changed.mjs", c ? `${c}~1` : "HEAD~1", "--detect-only"]);
  },
  // --base 를 빼면 라이브 사이트를 검사한다. 로컬 변형이 안 보여 전부 통과로 나온다.
  rendered: () => run("node", ["scripts/verify-rendered.mjs", "--base", "http://localhost:3111", SLUG]),
  meaning: () => run("npx", ["tsx", "scripts/verify-meaning.ts", SLUG]),
  omission: () => run("npx", ["tsx", "scripts/verify-omission.ts", SLUG]),
};

/** 글 파일에서 이 slug 블록만 손댄다 */
function editArticle(fn) {
  const s = fs.readFileSync(ART, "utf8");
  const i = s.indexOf(`      slug: "${SLUG}",`);
  if (i < 0) throw new Error("slug 블록을 못 찾음");
  let j = s.indexOf('      slug: "', i + 50);
  if (j < 0) j = s.length;
  const out = s.slice(0, i) + fn(s.slice(i, j)) + s.slice(j);
  fs.writeFileSync(ART, out);
}
function editEvidence(fn) {
  const j = JSON.parse(fs.readFileSync(EV, "utf8"));
  fs.writeFileSync(EV, JSON.stringify(fn(j) ?? j, null, 2));
}

const cases = [
  {
    n: "근거 없는 숫자를 본문에 넣으면",
    gate: "evidence",
    slow: false,
    break: () => editArticle((b) => b.replace('body: "', 'body: "무단으로 넣은 값 987,654원. ')),
  },
  {
    n: "캡처 확인 기록을 한 줄 지우면",
    gate: "evidence",
    slow: false,
    break: () => editEvidence((j) => { delete j.capturesReviewed[Object.keys(j.capturesReviewed)[0]]; return j; }),
  },
  {
    n: "파생값을 선언하고 산식을 안 적으면",
    gate: "evidence",
    slow: false,
    break: () => editEvidence((j) => { j.exampleValues = ["1,234원"]; j.exampleNote = ""; return j; }),
  },
  {
    n: "증거가 31일 넘게 낡으면",
    gate: "evidence",
    slow: false,
    break: () => editEvidence((j) => { j.verifiedAt = "2020-01-01"; return j; }),
  },
  {
    n: "fact 가 없는 캡처 파일을 가리키면",
    gate: "evidence",
    slow: false,
    break: () => editEvidence((j) => { j.facts[0].screenshot = "없는파일.png"; return j; }),
  },
  {
    n: "옛 TSX 폴더가 새 글을 가리면",
    gate: "shadow",
    slow: false,
    break: () => {
      fs.mkdirSync(SHADOW_DIR, { recursive: true });
      fs.writeFileSync(path.join(SHADOW_DIR, "page.tsx"), "export default function P(){return null}\n");
    },
  },
  {
    n: "죽은 내부 링크를 넣으면",
    gate: "links",
    slow: false,
    break: () => editArticle((b) => b.replace(/slug: "실업급여-구직활동"/, 'slug: "존재하지-않는-글-abcxyz"')),
  },
  {
    // 이 게이트는 push 대상인 '커밋된 변경'을 본다. 작업 파일을 고쳐도 보이지 않는 것이 맞다.
    // 그래서 글이 실제로 바뀐 커밋 구간을 주고, slug 를 하나라도 찾아내는지 본다.
    // CRLF 때문에 조용히 '바뀐 글 없음'을 뱉던 회귀를 다시 잡는 시험이다.
    n: "바뀐 글이 있는 커밋을 못 짚으면",
    gate: "changed",
    slow: false,
    break: () => {},
    expect: (r) => /바뀐 글 \d+편:/.test(r.out) && !/바뀐 글 없음/.test(r.out),
    expectLabel: "커밋 구간에서 바뀐 글을 짚음",
  },
  {
    n: "라벨을 소제목 자른 형태로 바꾸면",
    gate: "rendered",
    slow: true,
    break: () => editArticle((b) => b.replace('eyebrow: "미리 듣기"', 'eyebrow: "사전교육은"')),
  },
  {
    n: "타이틀 약속과 대제목 수가 어긋나면",
    gate: "rendered",
    slow: true,
    // 1개만 약속하는 타이틀은 규칙이 일부러 건너뛴다(확신 있게 셀 수 없어서).
    // 2개를 약속하는데 대제목이 4개인 상태로 만들어 규칙이 실제로 도는지 본다.
    break: () => editArticle((b) => b.replace(/title: "[^"]+"/, 'title: "실업급여 사전교육과 고용센터 출석"')),
  },
  {
    n: "버튼을 죽은 주소로 바꾸면",
    gate: "rendered",
    slow: true,
    break: () => editArticle((b) => b.replace(/url: "https:\/\/www\.work24\.go\.kr[^"]*"/, 'url: "https://www.work24.go.kr/존재하지-않는-경로-abcxyz.do"')),
  },
  {
    n: "근거를 넘어선 단정을 넣으면",
    gate: "meaning",
    slow: true,
    break: () => editArticle((b) => b.replace('body: "', 'body: "사전교육을 듣지 않으면 실업급여를 영원히 받을 수 없고 과태료 500만원이 부과됩니다. ')),
  },
  {
    n: "글 안에서 서로 어긋나는 말을 넣으면",
    gate: "meaning",
    slow: true,
    break: () => editArticle((b) => b.replace('body: "', 'body: "사전교육은 받지 않아도 됩니다. ')),
  },
  {
    // 교육 글이 인용한 제60조에서 정당한 사유 1호(능력에 맞지 않음)를 표·핵심콕콕 양쪽에서 뺀다.
    // 다른 검사는 전부 '쓴 것이 맞나'라서 못 본다. 누락 검사만 잡아야 한다.
    n: "인용한 조문의 항을 글에서 빼면",
    gate: "omission",
    slow: true,
    break: () => editArticle((b) => b
      .split("\n").filter((line) => !line.includes('[{ text: "능력에 맞지 않으면"')).join("\n")
      .replace("정당한 사유 **네 가지**는 예외", "정당한 사유는 예외")),
  },
];

console.log("게이트 시험대 — 망가뜨린 입력을 게이트가 잡는지 확인\n");

// 0) 무결 상태에서 빠른 게이트가 모두 통과하는지 (헛경보 확인)
snapshot();
const base = [];
for (const g of ["evidenceAll", "shadow", "links"]) {
  const r = gates[g]();
  base.push(`${r.pass ? "✅" : "❌"} ${g}`);
}
console.log("무결 상태 기준선:", base.join("  "), "\n");

let ok = 0, hole = 0, skipped = 0;
const rows = [];

for (const c of cases) {
  if (c.slow && !SLOW) { skipped++; rows.push(["⏭", c.n, c.gate, "건너뜀(--slow)"]); continue; }
  let verdict, detail;
  try {
    snapshot();
    c.break();
    const r = gates[c.gate]();
    if (c.expect) {
      const good = c.expect(r);
      verdict = good ? "잡음" : "놓침";
      detail = good ? c.expectLabel : "탐지 결과에 slug 없음";
    } else {
      verdict = r.pass ? "놓침" : "잡음";
      detail = r.pass ? "게이트가 통과시킴" : (r.out.match(/❌[^\n]{0,70}/) || ["차단"])[0].trim();
    }
  } catch (e) {
    verdict = "오류";
    detail = e.message.slice(0, 60);
  } finally {
    restore();
  }
  if (verdict === "잡음") ok++; else hole++;
  rows.push([verdict === "잡음" ? "✅" : "🔴", c.n, c.gate, detail]);
}

const w = Math.max(...rows.map((r) => r[1].length));
for (const [m, n, g, d] of rows) console.log(`${m} ${n.padEnd(w)}  [${g}]  ${d}`);

// 원상복구 검증
const dirty = files.filter((f) => sha(f) !== before.get(f));
console.log("\n원상복구:", dirty.length ? "❌ 바뀐 파일 " + dirty.join(", ") : "✅ 모든 파일 원래대로");
console.log(`결과: 잡음 ${ok} · 놓침 ${hole}${skipped ? ` · 건너뜀 ${skipped}` : ""}`);
process.exit(hole || dirty.length ? 1 : 0);
