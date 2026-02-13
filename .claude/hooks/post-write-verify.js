#!/usr/bin/env node
/**
 * PostToolUse(Write|Edit) hook wrapper
 * stdin JSON에서 file_path 추출 → spoke 파일이면 verify-spoke-quality.js 실행
 */
const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const VERIFY = path.join(ROOT, '.claude/hooks/verify-spoke-quality.js');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const fp = data.tool_input?.file_path || '';

    // spoke + hub TSX 파일 검증 (types.ts, registry.ts 제외)
    const isSpoke = fp.includes('src/data/spoke/');
    const isHub = fp.includes('src/data/hub/');
    if ((isSpoke || isHub) && fp.endsWith('.tsx') &&
        !fp.endsWith('types.ts') && !fp.endsWith('registry.ts') &&
        !fp.endsWith('index.ts') && !fp.endsWith('index.tsx')) {
      execSync(`node "${VERIFY}" "${fp}"`, { stdio: 'inherit', cwd: ROOT });
    }
  } catch {
    // PostToolUse — don't block, just report
    process.exit(0);
  }
});
