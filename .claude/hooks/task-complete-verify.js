#!/usr/bin/env node
/**
 * task-complete-verify.js
 * TaskCompleted 훅: 팀원이 태스크 완료 시 자동 검증
 *
 * - stdin으로 TaskCompleted JSON을 받음
 * - 최근 새로 생성된 spoke/hub TSX 파일만 verify-spoke-quality.js 실행
 * - ERROR 있으면 exit 2 (완료 거부 + 피드백)
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
  // stdin 없으면 스킵
  process.exit(0);
}

// git에서 실제로 변경된 파일 목록 가져오기 (staged + unstaged)
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
    return null; // git 실패 시 fallback
  }
}

// 최근 변경된 spoke/hub TSX 파일 찾기 (git 변경분만!)
function getRecentlyModifiedFiles() {
  const dirs = ['src/data/spoke', 'src/data/hub'];
  const excludes = ['types.ts', 'registry.ts', 'index.ts', 'index.tsx'];
  const files = [];
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  // git 변경 파일 목록 (없으면 시간 기반 fallback)
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
