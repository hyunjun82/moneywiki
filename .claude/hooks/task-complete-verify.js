#!/usr/bin/env node
/**
 * task-complete-verify.js
 * TaskCompleted 훅: 팀원이 태스크 완료 시 자동 검증
 * 
 * - stdin으로 TaskCompleted JSON을 받음
 * - 최근 변경된 spoke/hub TSX 파일을 찾아 verify-spoke-quality.js 실행
 * - ERROR 있으면 exit 2 (완료 거부 + 피드백)
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
  // stdin 없으면 스킵
  process.exit(0);
}

// 최근 변경된 spoke/hub TSX 파일 찾기
function getRecentlyModifiedFiles() {
  const dirs = ['src/data/spoke', 'src/data/hub'];
  const excludes = ['types.ts', 'registry.ts', 'index.ts', 'index.tsx'];
  const files = [];
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      if (!entry.endsWith('.tsx') || excludes.includes(entry)) continue;
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      // 최근 5분 내 변경된 파일만
      if (now - stat.mtimeMs < fiveMinutes) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const recentFiles = getRecentlyModifiedFiles();

if (recentFiles.length === 0) {
  // 최근 변경된 spoke/hub 파일 없음 → 글쓰기 태스크가 아닌 것으로 판단, 통과
  process.exit(0);
}

// 각 파일에 대해 verify-spoke-quality.js 실행
let totalErrors = 0;
const errorMessages = [];

for (const file of recentFiles) {
  try {
    const result = execSync(
      `node .claude/hooks/verify-spoke-quality.js "${file}"`,
      { encoding: 'utf8', timeout: 30000 }
    );
    // exit 0 = 통과
    console.log(result);
  } catch (e) {
    // exit 1 또는 에러 = ERROR 발견
    totalErrors++;
    const output = (e.stdout || '') + (e.stderr || '');
    errorMessages.push(`${path.basename(file)}: ${output.trim()}`);
    console.log(e.stdout || '');
  }
}

if (totalErrors > 0) {
  const feedback = `검증 실패: ${totalErrors}개 파일에서 ERROR 발견\n${errorMessages.join('\n')}\nERROR를 수정한 후 다시 완료 요청하세요.`;
  process.stderr.write(feedback);
  process.exit(2);  // exit 2 = 태스크 완료 거부 + 피드백
}

// 전부 통과
console.log(`\n✅ ${recentFiles.length}개 파일 모두 검증 통과`);
process.exit(0);
