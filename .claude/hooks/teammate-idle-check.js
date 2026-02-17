#!/usr/bin/env node
/**
 * teammate-idle-check.js
 * TeammateIdle 훅: 팀원이 idle 상태로 가려 할 때 검증
 *
 * - writer 팀원이 idle → 파일 작성 완료인지 확인
 * - 최근 git에서 실제 변경된 파일에 ERROR가 있으면 exit 2 (idle 거부)
 * - 기존 파일(git tracked + 내용 미변경)은 검증 제외
 *
 * 버전: 2.0 (2026-02-17) — 기존 파일 오탐 무한루프 수정
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

// git에서 실제로 변경된 파일 목록 가져오기
function getGitChangedFiles() {
  try {
    const diffOutput = execSync('git diff --name-only HEAD 2>/dev/null || git diff --name-only', {
      encoding: 'utf8', timeout: 10000
    }).trim();
    const stagedOutput = execSync('git diff --cached --name-only', {
      encoding: 'utf8', timeout: 10000
    }).trim();
    const untrackedOutput = execSync('git ls-files --others --exclude-standard', {
      encoding: 'utf8', timeout: 10000
    }).trim();

    const allChanged = new Set();
    [diffOutput, stagedOutput, untrackedOutput].forEach(output => {
      output.split('\n').filter(Boolean).forEach(f => allChanged.add(f));
    });
    return allChanged;
  } catch (e) {
    return null;
  }
}

// 최근 변경된 spoke/hub TSX 파일 찾기 (git 변경분 + 2분 이내)
function getRecentlyModifiedFiles() {
  const dirs = ['src/data/spoke', 'src/data/hub'];
  const excludes = ['types.ts', 'registry.ts', 'index.ts', 'index.tsx'];
  const files = [];
  const now = Date.now();
  const twoMinutes = 2 * 60 * 1000;

  const gitChanged = getGitChangedFiles();

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      if (!entry.endsWith('.tsx') || excludes.includes(entry)) continue;
      const fullPath = path.join(dir, entry);
      const relativePath = fullPath.replace(/\\/g, '/');

      // git 변경 목록이 있으면: git에서 실제 변경된 파일만
      if (gitChanged) {
        const matchesGit = [...gitChanged].some(f =>
          relativePath.endsWith(f) || f.endsWith(entry)
        );
        if (!matchesGit) continue;
      }

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
