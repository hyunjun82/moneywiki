#!/usr/bin/env node
/**
 * PreToolUse 훅 — WebSearch / WebFetch 전면 차단.
 *
 * 머니위키의 근거는 Playwright가 연 실제 페이지의 텍스트와 스크린샷에서만 나온다.
 * 검색 스니펫과 요약은 출처가 흐려지고 수치가 오염되므로 도구 자체를 막는다.
 */
import fs from "node:fs";

const BLOCKED = new Set(["WebSearch", "WebFetch"]);

function main() {
  let raw = "";
  try {
    raw = fs.readFileSync(0, "utf8");
  } catch {
    return;
  }

  let toolName = "";
  try {
    toolName = JSON.parse(raw).tool_name ?? "";
  } catch {
    return;
  }

  if (!BLOCKED.has(toolName)) return;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason:
          `${toolName}는 머니위키에서 사용할 수 없습니다. ` +
          `근거는 Playwright로 실제 페이지를 열어서만 수집합니다.\n` +
          `  npm run evidence <slug> -- --law <법령명>:<조,조> --url <공식URL>\n` +
          `산출된 scripts/evidence/<slug>.json 의 quote/value 안에 있는 값만 본문에 쓰세요.`,
      },
    })
  );
}

try {
  main();
} catch {
  /* 파싱 실패 시 조용히 통과 */
}
process.exit(0);
