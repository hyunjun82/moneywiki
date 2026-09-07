#!/usr/bin/env node
/**
 * 글 한 편 검사.
 *
 * 결정적 검사 (기본 — 같은 입력이면 같은 답):
 *   1. verify-evidence   본문 숫자 ↔ 증거 JSON (근거 없는 숫자 차단)
 *   2. verify-rendered   Playwright 로 실제 화면을 열어 정본 블록·표 색·한 줄 답·CTA 실접속
 * LLM 판정 (--audit — 돌릴 때마다 다른 것을 잡는다. 글 쓰는 루프에 넣지 않고 따로 읽는다):
 *   3. verify-meaning    훅↔버튼·소제목↔본문·근거 초과 단언·검색 의도 누락
 *   4. verify-omission   인용한 조문의 항·호 전수 대조 ("써야 했는데 안 썼나")
 *
 * 화면 검사는 로컬 dev 서버를 띄워 본다 (빌드 15분을 기다리지 않는다).
 *   node scripts/verify.mjs <slug>            # 숫자·화면. dev 서버 자동 기동 → 검사 → 종료
 *   node scripts/verify.mjs <slug> --live     # 배포된 화면으로
 *   node scripts/verify.mjs <slug> --audit    # 뜻·누락만 (npm run audit <slug>)
 *   node scripts/verify.mjs <slug> --all      # 넷 다
 * 하나라도 실패하면 exit 1.
 * 파이프라인(scripts/article.mjs)은 이 파일을 거치지 않고 검사기를 직접 부른다 — 출력을 고치기 지시문에 넣어야 해서.
 */
import { spawn, spawnSync } from "node:child_process";
import http from "node:http";

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
if (!slug) { console.error("사용법: node scripts/verify.mjs <slug> [--live] [--audit | --all]"); process.exit(1); }
const live = argv.includes("--live");
const audit = argv.includes("--audit");
const all = argv.includes("--all");
const deterministic = !audit || all;
const llm = (audit || all) && !argv.includes("--no-meaning");
const PORT = 3111;
const isWin = process.platform === "win32";

const run = (label, cmd, args) => {
  console.log(`\n▶ ${label}`);
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: isWin });
  return r.status === 0;
};

const ping = (url) => new Promise((res) => {
  const req = http.get(url, (r) => { r.resume(); res(r.statusCode === 200); });
  req.on("error", () => res(false));
  req.setTimeout(240000, () => { req.destroy(); res(false); });
});

function freePort() {
  if (!isWin) return;
  const r = spawnSync("powershell", ["-NoProfile", "-Command",
    `$p = Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; if ($p) { $p | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }`],
    { stdio: "ignore" });
  return r.status === 0;
}

let dev = null;
async function startDev(firstUrl) {
  if (await ping(`http://localhost:${PORT}/`)) { console.log(`dev 서버가 이미 ${PORT} 에 있음 — 그대로 씁니다`); return; }
  console.log(`\n▶ dev 서버 기동 (포트 ${PORT})`);
  // 응답은 못 하는데 포트만 잡고 있는 좀비가 남아 있으면 EADDRINUSE 로 죽는다(실제로 겪음).
  // ping 이 실패한 시점이므로 정상 서버가 아니다 — 정리하고 띄운다.
  freePort();
  dev = spawn("npx", ["next", "dev", "--webpack", "-p", String(PORT)], { stdio: ["ignore", "pipe", "pipe"], shell: isWin, env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: "1" } });
  dev.stdout.on("data", (d) => { const s = d.toString(); if (/error/i.test(s)) process.stdout.write(s); });
  dev.stderr.on("data", (d) => process.stderr.write(d));
  let portTaken = false;
  dev.stderr.on("data", (d) => { if (/EADDRINUSE/.test(d.toString())) portTaken = true; });
  const deadline = Date.now() + 300000; // 옛 페이지 1,500개라 첫 컴파일이 느리다
  while (Date.now() < deadline) {
    if (await ping(firstUrl)) return;
    if (portTaken) {
      console.log("  포트가 잡혀 있어 정리하고 한 번 더 띄웁니다");
      stopDev();
      freePort();
      portTaken = false;
      dev = spawn("npx", ["next", "dev", "--webpack", "-p", String(PORT)], { stdio: ["ignore", "pipe", "pipe"], shell: isWin, env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: "1" } });
      dev.stdout.on("data", (d) => { const t = d.toString(); if (/error/i.test(t)) process.stdout.write(t); });
      dev.stderr.on("data", (d) => process.stderr.write(d));
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error("dev 서버가 300초 안에 뜨지 않았습니다");
}
function stopDev() {
  if (!dev) return;
  if (isWin) spawnSync("taskkill", ["/pid", String(dev.pid), "/T", "/F"], { stdio: "ignore" });
  else dev.kill("SIGTERM");
}

const results = {};
try {
  if (deterministic) {
    results["숫자 근거"] = run("verify-evidence (본문 숫자 ↔ 증거 JSON)", "node", ["scripts/verify-evidence.mjs", slug]);

    if (live) {
      results["화면"] = run("verify-rendered (라이브)", "node", ["scripts/verify-rendered.mjs", slug]);
    } else {
      await startDev(`http://localhost:${PORT}/w/${encodeURIComponent(slug)}`);
      results["화면"] = run("verify-rendered (로컬 dev)", "node", ["scripts/verify-rendered.mjs", "--base", `http://localhost:${PORT}`, slug]);
    }
  }

  if (llm) {
    results["뜻"] = run("verify-meaning (훅↔버튼·소제목↔본문·근거 초과·의도 누락)", "npx", ["tsx", "scripts/verify-meaning.ts", slug]);
    // 누락 검사 — 위 셋은 전부 "쓴 것이 맞나"를 본다. 이건 "써야 했는데 안 썼나"를 본다.
    // 조문이 통째로 빠진 글 7편이 세 검사를 전부 통과한 채 배포된 뒤(2026-09-04) 만들었다.
    results["누락"] = run("verify-omission (인용 조문 항·호 전수 대조)", "npx", ["tsx", "scripts/verify-omission.ts", slug]);
  }
} finally {
  stopDev();
}

console.log("\n══════════ 결과 ══════════");
for (const [k, v] of Object.entries(results)) console.log(`${v ? "✓" : "✗"} ${k}`);
process.exit(Object.values(results).every(Boolean) ? 0 : 1);
