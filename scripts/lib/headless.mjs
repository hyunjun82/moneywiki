/**
 * 헤드리스 호출기 — 대화창 없이 `claude -p` 를 부른다.
 *
 * 구독 로그인으로만 돈다. ANTHROPIC_API_KEY 가 있으면 API 과금이 되므로 시작 전에 막는다.
 * 프롬프트는 stdin 으로, 답은 --output-format json 의 result 로 받는다.
 * 도구는 기본 0개(입력→출력만). 캡처를 읽을 때만 Read 를 허용한다.
 *
 * 긴 단계(글 작성 8분)가 멈춘 것처럼 보이지 않게 20초마다 경과를 찍는다 —
 * 화면에 아무것도 안 나오면 30분이 걸리는지 한 시간이 걸리는지 알 수 없다.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/** 이 세션이 Claude Code 안에서 시작됐을 때 중첩 실행을 막는 변수들 — 지워야 자식이 뜬다 */
const NEST_VARS = [
  "CLAUDECODE", "CLAUDE_CODE_CHILD_SESSION", "CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_MESSAGING_SOCKET",
  "CLAUDE_CODE_MESSAGING_TOKEN", "CLAUDE_CODE_TASK_LIST_ID", "CLAUDE_PID", "CLAUDE_CODE_ENTRYPOINT",
  "CLAUDE_AGENT_SDK_VERSION", "CLAUDE_CODE_ENABLE_TASKS", "CLAUDE_CODE_EXECPATH",
];

export function assertSubscriptionOnly() {
  if (process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROOPIC_API_KEY 가 설정되어 있습니다. 이 파이프라인은 구독으로만 돕니다 — 변수를 지우고 다시 실행하세요.".replace("ANTHROOPIC", "ANTHROPIC"));
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** MCP 를 끄는 빈 설정 파일 경로 (한 번만 만든다) */
let mcpPath = "";
function emptyMcpConfig() {
  if (mcpPath && fs.existsSync(mcpPath)) return mcpPath;
  mcpPath = path.join("scripts", ".no-mcp.json");
  fs.writeFileSync(mcpPath, JSON.stringify({ mcpServers: {} }));
  return mcpPath;
}

/**
 * 호출 하나가 먹은 양 — `claude -p --output-format json` 이 돌려주는 usage 를 그대로 읽는다.
 * 구독이라 실제 청구는 없지만 cost 는 사용 한도를 얼마나 먹었는지의 척도다.
 * 이걸 안 찍어서 "글 하나에 얼마 쓰는지 모른다" 는 말을 들었다 (2026-09-06).
 */
function usageOf(meta) {
  const u = meta?.usage || {};
  const inTok = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0);
  return {
    calls: 1,
    input: inTok,
    output: u.output_tokens || 0,
    cost: meta?.total_cost_usd || 0,
    models: Object.keys(meta?.modelUsage || {}),
  };
}

/** 사용량 누적기 — 글 한 편, 묶음 전체가 얼마를 먹었는지 센다 */
export function newMeter() {
  return { calls: 0, input: 0, output: 0, cost: 0, byStage: {} };
}
export function addUsage(meter, usage, stage) {
  if (!meter || !usage) return meter;
  meter.calls += usage.calls; meter.input += usage.input; meter.output += usage.output; meter.cost += usage.cost;
  const s = (meter.byStage[stage] = meter.byStage[stage] || { calls: 0, input: 0, output: 0, cost: 0 });
  s.calls += usage.calls; s.input += usage.input; s.output += usage.output; s.cost += usage.cost;
  return meter;
}
const k = (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
export function fmtUsage(u) {
  return `입력 ${k(u.input)}·출력 ${k(u.output)} 토큰${u.cost ? ` · 환산 $${u.cost.toFixed(2)}` : ""}`;
}

/**
 * @param {string} prompt
 * @param {{tools?: string[], model?: string, timeoutMs?: number, label?: string, logDir?: string, expect?: string}} opt
 * @returns {Promise<{text: string, ms: number}>}
 */
export async function ask(prompt, opt = {}) {
  assertSubscriptionOnly();
  const { tools = [], timeoutMs = 25 * 60 * 1000, label = "ask", logDir, expect, tag } = opt;
  // 모델은 반드시 못박는다. 비워 두면 CLI 기본값(계정 기본 모델)을 상속하는데,
  // 그래서 2026-09-06 에 글쓰기 7회가 전부 Fable 로 나가 주간 Fable 한도를 45% 먹었다.
  // 사용자는 대화창에서 Opus 로 글을 쓴다 — 파이프라인이 Fable 을 몰래 쓰면 안 된다.
  const candidates = [opt.model ?? process.env.ARTICLE_MODEL ?? "sonnet"];
  let lastErr = null;
  for (let i = 0; i < candidates.length; i++) {
    try {
      return await askOnce(prompt, { tools, model: candidates[i], timeoutMs, label: i ? `${label}-${candidates[i]}` : label, logDir, expect, tag });
    } catch (e) {
      lastErr = e;
      const msg = String(e.message);
      if (/hit your limit|usage limit|rate limit|too many requests|429/i.test(msg)) {
        throw new Error(`구독 사용 한도에 닿았습니다 (${label}). 창이 풀린 뒤 같은 명령을 다시 실행하세요 — 끝난 단계는 파일로 남아 이어서 돕니다.\n${msg.slice(0, 600)}`);
      }
      if (/does not support this model|is required|unknown model|not found.*model|invalid model/i.test(msg)) {
        for (const m of ["sonnet", "opus"]) if (!candidates.includes(m)) { candidates.push(m); break; }
        console.log(`  ↻ ${label}: 모델 문제 — ${candidates[i + 1] ? `${candidates[i + 1]} 로 다시 시도` : "대체 모델 없음"}`);
        continue;
      }
      if (/overloaded|529|ECONNRESET|ETIMEDOUT|timed out|socket hang up/i.test(msg) && candidates.length < 4) {
        console.log(`  ↻ ${label}: 일시 오류 — 30초 뒤 한 번 더`);
        await sleep(30000);
        candidates.push(candidates[i]);
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
}

function askOnce(prompt, { tools, model, timeoutMs, label, logDir, expect, tag }) {
  return new Promise((resolve, reject) => {
    const env = { ...process.env };
    for (const k of NEST_VARS) delete env[k];

    // 호출 하나에 붙는 고정 비용이 4만~5만 토큰이다 (도구 정의·시스템 프롬프트·전역 명령 목록).
    // MCP 서버 정의는 이 파이프라인이 안 쓰므로 끈다 — 재 보니 호출당 4~5천 토큰이 줄었다.
    // JSON 을 인자로 넘기면 Windows 셸이 따옴표를 먹어 파일 경로로 오해한다 → 빈 설정 파일을 만들어 그 경로를 준다.
    const args = ["-p", "--output-format", "json", "--strict-mcp-config", "--mcp-config", emptyMcpConfig()];
    if (model) args.push("--model", model);
    if (tools.length) args.push("--allowedTools", tools.join(","));

    const t0 = Date.now();
    const child = spawn("claude", args, { env, shell: process.platform === "win32" });
    let out = "", err = "", finished = false;

    // 진행 표시 — 긴 단계가 멈춘 것처럼 보이지 않게
    // 동시 실행이면 여러 호출이 같은 줄을 덮어써 뒤엉킨다 → 그때는 줄을 새로 찍는다
    const beat = setInterval(() => {
      const s = Math.round((Date.now() - t0) / 1000);
      const line = `${tag ? tag + " " : ""}${label} … ${s}초 경과${expect ? ` (보통 ${expect})` : ""}`;
      if (tag) console.log(`           ${line}`);
      else process.stdout.write(`\r           ${line}   `);
    }, tag ? 60000 : 20000);
    const done = (fn, arg) => {
      if (finished) return;
      finished = true;
      clearInterval(beat);
      clearTimeout(killer);
      if (!tag && Date.now() - t0 > 20000) process.stdout.write("\r" + " ".repeat(78) + "\r");
      fn(arg);
    };

    const killer = setTimeout(() => {
      child.kill("SIGKILL");
      done(reject, new Error(`claude 가 ${Math.round(timeoutMs / 60000)}분 안에 끝나지 않았습니다 (${label})`));
    }, timeoutMs);

    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", (e) => done(reject, new Error(`claude 실행 실패 (${label}): ${e.message}`)));

    child.on("close", (code) => {
      const ms = Date.now() - t0;
      const stderr = err.split(/\r?\n/).filter((l) => l && !/Ignoring \d+ permissions\.allow/.test(l)).join("\n");

      let text = out, meta = null;
      try {
        meta = JSON.parse(out);
        if (meta && typeof meta === "object" && "result" in meta) text = String(meta.result ?? "");
      } catch { /* json 이 아니면 원문 그대로 */ }

      if (logDir) {
        try {
          fs.mkdirSync(logDir, { recursive: true });
          const stamp = new Date().toISOString().replace(/[:.]/g, "-");
          fs.writeFileSync(path.join(logDir, `${stamp}-${label}.txt`),
            `### PROMPT (${prompt.length} chars)\n${prompt}\n\n### RESULT (${ms} ms, exit ${code}${model ? `, model ${model}` : ""})\n${text}\n\n### STDERR\n${stderr}\n`);
        } catch {}
      }

      if (code !== 0 || (meta && meta.is_error)) {
        return done(reject, new Error(`claude 가 실패를 돌려줬습니다 (${label}, exit ${code}, ${(ms / 1000).toFixed(0)}초)\n${(text || stderr).slice(0, 2000)}`));
      }
      if (!String(text).trim()) return done(reject, new Error(`claude 가 빈 답을 돌려줬습니다 (${label})`));
      done(resolve, { text, ms, usage: usageOf(meta), label });
    });

    child.stdin.on("error", () => {});
    child.stdin.end(prompt, "utf8");
  });
}

/** 답 속의 JSON 하나를 꺼낸다 — 코드 펜스·앞뒤 말은 버린다 */
export function extractJson(text) {
  let s = String(text).trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) s = fence[1].trim();
  // 앞뒤에 말이 붙거나 JSON 이 두 덩어리로 나오는 일이 있다.
  // 첫 { 부터 마지막 } 까지 통으로 자르면 그런 답이 전부 실패한다 → 균형 잡힌 덩어리를 찾아 가장 큰 것을 쓴다.
  const blocks = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "{" && s[i] !== "[") continue;
    const end = matchBracket(s, i);
    if (end > i) { blocks.push(s.slice(i, end + 1)); i = end; }
  }
  if (!blocks.length) throw new Error("답에 닫힌 JSON 덩어리가 없습니다 (잘렸을 수 있습니다):\n" + s.slice(0, 400) + "\n…\n" + s.slice(-400));
  blocks.sort((a, b) => b.length - a.length);
  let lastErr = null;
  for (const b of blocks.slice(0, 5)) {
    try { return JSON.parse(b); } catch (e) { lastErr = e; }
  }
  throw new Error(`답의 JSON 을 읽을 수 없습니다 (${lastErr?.message}):\n${blocks[0].slice(0, 600)}`);
}

/** 문자열 안의 괄호는 세지 않는다 */
function matchBracket(s, open) {
  const close = s[open] === "{" ? "}" : "]";
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (c === '"') { i++; while (i < s.length && s[i] !== '"') { if (s[i] === "\\") i++; i++; } continue; }
    if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") { depth--; if (depth === 0) return c === close ? i : -1; }
  }
  return -1;
}
