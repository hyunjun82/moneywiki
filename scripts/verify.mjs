#!/usr/bin/env node
/**
 * 글 한 편 검사 — 결정적 검사 둘. 같은 입력이면 같은 답.
 *   1. verify-evidence   본문 숫자·인용 ↔ 증거 JSON (근거 없는 숫자 차단)
 *   2. verify-rendered   Playwright 로 실제 화면을 열어 정본 블록·표 색·한 줄 답·CTA 실접속
 *
 * 화면 검사는 로컬 dev 서버를 띄워 본다 (빌드 15분을 기다리지 않는다).
 *   node scripts/verify.mjs <slug>            # dev 서버 자동 기동 → 검사 → 종료
 *   node scripts/verify.mjs <slug> --live     # 배포된 화면으로
 * 하나라도 실패하면 exit 1.
 * 파이프라인(scripts/article.mjs)은 이 파일을 거치지 않고 검사기를 직접 부른다 — 출력을 고치기 지시문에 넣어야 해서.
 */
import { spawn, spawnSync } from "node:child_process";
import http from "node:http";

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
if (!slug) { console.error("사용법: node scripts/verify.mjs <slug> [--live]"); process.exit(1); }
const live = argv.includes("--live");
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
  spawnSync("powershell", ["-NoProfile", "-Command",
    `$p = Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; if ($p) { $p | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }`],
    { stdio: "ignore" });
}

let dev = null;
const spawnDev = () => {
  const d = spawn("npx", ["next", "dev", "--webpack", "-p", String(PORT)], { stdio: ["ignore", "pipe", "pipe"], shell: isWin, env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: "1" } });
  d.stdout.on("data", (x) => { const s = x.toString(); if (/error/i.test(s)) process.stdout.write(s); });
  d.stderr.on("data", (x) => process.stderr.write(x));
  return d;
};
async function startDev(firstUrl) {
  if (await ping(`http://localhost:${PORT}/`)) { console.log(`dev 서버가 이미 ${PORT} 에 있음 — 그대로 씁니다`); return; }
  console.log(`\n▶ dev 서버 기동 (포트 ${PORT})`);
  freePort();
  dev = spawnDev();
  let portTaken = false;
  dev.stderr.on("data", (d) => { if (/EADDRINUSE/.test(d.toString())) portTaken = true; });
  const deadline = Date.now() + 300000;
  while (Date.now() < deadline) {
    if (await ping(firstUrl)) return;
    if (portTaken) { stopDev(); freePort(); portTaken = false; dev = spawnDev(); }
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
  results["숫자 근거"] = run("verify-evidence (본문 숫자 ↔ 증거 JSON)", "node", ["scripts/verify-evidence.mjs", slug]);
  if (live) {
    results["화면"] = run("verify-rendered (라이브)", "node", ["scripts/verify-rendered.mjs", slug]);
  } else {
    await startDev(`http://localhost:${PORT}/w/${encodeURIComponent(slug)}`);
    results["화면"] = run("verify-rendered (로컬 dev)", "node", ["scripts/verify-rendered.mjs", "--base", `http://localhost:${PORT}`, slug]);
  }
} finally {
  stopDev();
}

console.log("\n══════════ 결과 ══════════");
for (const [k, v] of Object.entries(results)) console.log(`${v ? "✓" : "✗"} ${k}`);
process.exit(Object.values(results).every(Boolean) ? 0 : 1);
