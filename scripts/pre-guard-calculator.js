#!/usr/bin/env node
/**
 * PreToolUse 훅: 계산기 페이지 수정 차단
 * stdin으로 JSON 입력 받음 (Claude Code hooks 표준)
 * exit 0 = 허용, exit 2 = 차단
 */
const path = require("path");
const CALC_SLUGS = require(path.join(__dirname, "calc-protected-slugs.json"));

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { input += chunk; });
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input);
    const toolInput = data.tool_input || {};
    const filePath = toolInput.file_path || toolInput.path || "";

    const hit = CALC_SLUGS.find(s => filePath.includes(`src/app/w/${s}/`));
    if (hit) {
      process.stderr.write(`\n🚫 계산기 페이지 수정 차단: ${hit}\n`);
      process.stderr.write(`계산기 로직은 절대 불가침이에요. 수정이 필요하면 사용자에게 확인하세요.\n`);
      process.exit(2);
    }
    process.exit(0);
  } catch {
    process.exit(0);
  }
});
