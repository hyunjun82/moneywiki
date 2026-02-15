#!/usr/bin/env node
/**
 * teammate-idle-check.js
 * TeammateIdle 훅: 팀원이 idle 상태로 가려 할 때 검증
 * 
 * - writer 팀원이 idle → 파일 작성 완료인지 확인
 * - 최근 작성된 파일에 ERROR가 있으면 exit 2 (idle 거부, 계속 작업)
 * 
 * 버전: 1.0 (2026-02-15)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// stdin 읽기
let stdinData = '';
try {
  stdinData = fs.readFileSync(0, 'utf8');
} catch (e) {
  process.exit(0);
}

// 최근 변경된 spoke/hub TSX 파일 찾기 (2분 이내)
function getRecentlyModifiedFiles() {
  const dirs = ['src/data/spoke', 'src/data/hub'];
  const excludes = ['types.ts', 'registry.ts', 'index.ts', 'index.tsx'];
  const files = [];
  const now = Date.now();
  const twoMinutes = 2 * 60 * 1000;

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      if (!entry.endsWith('.tsx') || excludes.includes(entry)) continue;
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (now - stat.mtimeMs < twoMinutes) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const recentFiles = getRecentlyModifiedFiles();

if (recentFiles.length === 0) {
  // 최근 작성된 파일 없음 → idle 허용
  process.exit(0);
}

// 최근 파일 검증
let hasErrors = false;
const errorMessages = [];

for (const file of recentFiles) {
  try {
    execSync(
      `node .claude/hooks/verify-spoke-quality.js "${file}"`,
      { encoding: 'utf8', timeout: 30000 }
    );
  } catch (e) {
    hasErrors = true;
    errorMessages.push(`${path.basename(file)}: ERROR 발견`);
  }
}

if (hasErrors) {
  const feedback = `아직 작업이 끝나지 않았어요! ${errorMessages.join(', ')} — ERROR를 수정한 후 idle로 전환하세요.`;
  process.stderr.write(feedback);
  process.exit(2);  // exit 2 = idle 거부, 팀원이 계속 작업
}

process.exit(0);
