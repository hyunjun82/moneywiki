#!/usr/bin/env node
/**
 * PreToolUse 훅: Write 전 Q1-Q4 + MAP 블록 사전 검증
 * src/app/w/{slug}/page.tsx 파일만 대상
 *
 * stdin으로 JSON 입력 받음 (Claude Code hooks 표준)
 * exit 0 = 허용, exit 2 = 차단 (stderr 메시지가 Claude에게 전달됨)
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

    // page.tsx 파일만 대상
    if (!filePath.includes("src/app/w/") || !filePath.endsWith("page.tsx")) {
      process.exit(0);
    }

    // 계산기 페이지 제외
    if (CALC_SLUGS.some(s => filePath.includes(`/w/${s}/`))) {
      process.exit(0);
    }

    // Edit(부분 수정)은 Q1-Q4 체크 불필요
    if (toolInput.old_string && toolInput.new_string) {
      process.exit(0);
    }

    // Write(전체 파일 쓰기)만 검증
    const content = toolInput.content || "";
    if (!content) {
      process.exit(0);
    }

    const errors = [];

    // Q1-Q4 존재 체크
    if (!/\/\/\s*Q1[.:]?\s*.{10,}/.test(content)) errors.push("Q1 주석 없거나 너무 짧음");
    if (!/\/\/\s*Q2[.:]?\s*.{10,}/.test(content)) errors.push("Q2 주석 없거나 너무 짧음");
    if (!/\/\/\s*Q3[.:]?\s*.{10,}/.test(content)) errors.push("Q3 주석 없거나 너무 짧음");
    if (!/\/\/\s*Q4[.:]?\s*.{10,}/.test(content)) errors.push("Q4 주석 없거나 너무 짧음");

    // MAP 블록 존재 체크
    if (!/\/\/\s*MAP-INTRO:\s*.{5,}/.test(content)) errors.push("MAP-INTRO 없음");
    if (!/\/\/\s*MAP-TYPE:\s*.{2,}/.test(content)) errors.push("MAP-TYPE 없음");
    if (!/\/\/\s*MAP-H2:\s*.{5,}/.test(content)) errors.push("MAP-H2 없음");
    if (!/\/\/\s*MAP-COMP:\s*.{5,}/.test(content)) errors.push("MAP-COMP 없음");

    if (errors.length > 0) {
      const slug = filePath.match(/src\/app\/w\/([^/]+)\/page\.tsx/)?.[1] || filePath;
      process.stderr.write(`\n🚫 [${slug}] Write 차단 — Q1-Q4 + MAP 블록 필수!\n`);
      process.stderr.write(`누락 항목: ${errors.join(", ")}\n\n`);
      process.stderr.write(`파일 상단에 아래 포맷을 반드시 포함해야 해요:\n`);
      process.stderr.write(`// Q1. 독자 상황 (10자 이상)\n`);
      process.stderr.write(`// Q2. 독자 행동 (10자 이상)\n`);
      process.stderr.write(`// Q3. 필수 정보 (10자 이상)\n`);
      process.stderr.write(`// Q4. 전달 형태 (10자 이상)\n`);
      process.stderr.write(`// MAP-INTRO: 서론 첫 문장\n`);
      process.stderr.write(`// MAP-TYPE: 비교표|절차|텍스트|계산기|자격확인\n`);
      process.stderr.write(`// MAP-H2: 섹션1 > 섹션2 > ... > FAQ\n`);
      process.stderr.write(`// MAP-COMP: GreenBox > Steps > BorderBox > FAQ\n`);
      process.exit(2);
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
});
