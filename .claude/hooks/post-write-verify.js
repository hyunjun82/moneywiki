#!/usr/bin/env node
/**
 * PreToolUse(Write) + PostToolUse(Edit) hook wrapper
 * stdin JSON에서 file_path 추출 → spoke/hub TSX면 verify-spoke-quality.js 실행
 *
 * PreToolUse Write: tool_input.content로 임시파일 생성 후 검증 (쓰기 전 차단)
 * PostToolUse Edit: 디스크 파일 검증 (편집 후 보고)
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, '../..');
const VERIFY = path.join(ROOT, '.claude/hooks/verify-spoke-quality.js');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(input);
  } catch {
    return; // invalid JSON — skip
  }

  const fp = data.tool_input?.file_path || '';

  const isSpoke = fp.includes('src/data/spoke/');
  const isHub = fp.includes('src/data/hub/');
  if (!(isSpoke || isHub) || !fp.endsWith('.tsx')) return;
  if (fp.endsWith('types.ts') || fp.endsWith('registry.ts') ||
      fp.endsWith('index.ts') || fp.endsWith('index.tsx')) return;

  const content = data.tool_input?.content;
  let verifyTarget = fp;
  let tmpFile = null;

  if (content !== undefined) {
    // Write (PreToolUse): 임시 파일에 content 저장 후 검증
    const typeDir = isSpoke ? 'spoke' : 'hub';
    const tmpDir = path.join(os.tmpdir(), 'mw-verify', typeDir);
    fs.mkdirSync(tmpDir, { recursive: true });
    tmpFile = path.join(tmpDir, path.basename(fp));
    fs.writeFileSync(tmpFile, content, 'utf8');
    verifyTarget = tmpFile;
  }

  try {
    execSync(`node "${VERIFY}" "${verifyTarget}"`, { stdio: 'inherit', cwd: ROOT });
  } finally {
    if (tmpFile) try { fs.unlinkSync(tmpFile); } catch {}
  }
  // catch 없음 — verify 실패 시 exit code 전파 → Write 차단 / Edit 경고
});
