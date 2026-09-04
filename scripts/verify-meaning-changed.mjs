#!/usr/bin/env node
/**
 * push 하려는 커밋에서 바뀐 글만 골라 뜻 검사를 돌린다.
 *
 * 왜 필요한가 — 뜻 검사는 손으로 돌렸고, 한 번 통과한 뒤 문장을 고쳐도 다시 돌리지 않았다.
 * 그래서 상한액 글의 "2027년엔 월급과 무관하게 68,480원"이 근거를 넘어선 채로 배포됐다.
 * (그 문장은 나중에 같은 검사기가 ERROR 로 잡았다. 한 번 통과가 검증이 아니라는 뜻이다.)
 *
 * 사용: node scripts/verify-meaning-changed.mjs [upstream]
 */
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";

const argvAll = process.argv.slice(2);
const detectOnly = argvAll.includes("--detect-only");
const upstream = argvAll.find((a) => !a.startsWith("--")) || "origin/main";

function sh(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" });
  } catch {
    return "";
  }
}

const files = sh(`git diff --name-only ${upstream}..HEAD -- src/data/articles`)
  .split("\n")
  .map((f) => f.trim())
  .filter((f) => f.endsWith(".ts") && !f.endsWith("types.ts"));

if (!files.length) {
  console.log("바뀐 글 파일 없음 — 통과");
  process.exit(0);
}

/** 바뀐 줄이 어느 slug 블록에 속하는지 찾는다 */
const changed = new Set();
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  // CRLF 파일이 섞여 있다. 줄 단위로 쪼갠 뒤에는 $ 가 \r 앞을 못 잡아 조용히 0건이 된다.
  const src = fs.readFileSync(file, "utf8").split(/\r?\n/);
  // slug 시작 줄 목록
  const marks = [];
  src.forEach((line, i) => {
    const m = /^ {6}slug: "([^"]+)",$/.exec(line);
    if (m) marks.push({ line: i + 1, slug: m[1] });
  });
  if (!marks.length) continue;

  const diff = sh(`git diff --unified=0 ${upstream}..HEAD -- "${file}"`);
  for (const m of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]);
    const count = m[2] === undefined ? 1 : Number(m[2]);
    for (let ln = start; ln < start + Math.max(count, 1); ln++) {
      let owner = null;
      for (const mark of marks) {
        if (mark.line <= ln) owner = mark.slug;
        else break;
      }
      if (owner) changed.add(owner);
    }
  }
}

if (!changed.size) {
  console.log("바뀐 글 없음 (설명·주석만 바뀜) — 통과");
  process.exit(0);
}

const slugs = [...changed];
console.log(`바뀐 글 ${slugs.length}편: ${slugs.join(", ")}`);
if (detectOnly) process.exit(0);

const r = spawnSync("npx", ["tsx", "scripts/verify-meaning.ts", ...slugs], {
  stdio: "inherit",
  shell: process.platform === "win32",
});
if (r.status !== 0) process.exit(1);
// 누락 검사 — 바뀐 글이 인용한 조문의 항·호를 전수 대조한다
const o = spawnSync("npx", ["tsx", "scripts/verify-omission.ts", ...slugs], {
  stdio: "inherit",
  shell: process.platform === "win32",
});
process.exit(o.status === 0 ? 0 : 1);
