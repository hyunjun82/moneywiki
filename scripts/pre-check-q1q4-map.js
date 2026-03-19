#!/usr/bin/env node
/**
 * PreToolUse 훅: Write/Edit 전 Q1-Q4 + MAP 블록 사전 검증
 * src/app/w/{slug}/page.tsx 파일만 대상
 *
 * stdin으로 JSON 입력 받음 (Claude Code hooks 표준)
 * exit 0 = 허용, exit 2 = 차단 (stderr 메시지가 Claude에게 전달됨)
 */

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
    const CALC_SLUGS = [
      "실업급여-계산기","퇴직금-계산기","연말정산-계산기","4대보험료-계산기",
      "DSR-계산기","건강보험료-계산기","국민연금-수령액-계산기","근로소득세-계산기",
      "대출상환-계산기","대출이자-계산기","양도소득세-계산기","연봉-계산기",
      "시급-계산기","주휴수당-계산기","취득세-계산기","증여세-계산기",
      "상속세-계산기","종합부동산세-계산기","재산세-계산기",
    ];
    if (CALC_SLUGS.some(s => filePath.includes(`/w/${s}/`))) {
      process.exit(0);
    }

    // Write → content, Edit → new_string
    const content = toolInput.content || toolInput.new_string || "";

    // Edit의 경우 부분 수정이므로 Q1-Q4 체크 불필요 (전체 파일이 아님)
    if (toolInput.old_string && toolInput.new_string) {
      process.exit(0);
    }

    // Write(전체 파일 쓰기)만 Q1-Q4 + MAP 검증
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
  } catch (e) {
    // 파싱 실패 시 허용 (안전하게)
    process.exit(0);
  }
});
