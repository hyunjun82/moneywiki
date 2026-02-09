#!/usr/bin/env node
/**
 * SubagentStop 훅용 - 최근 수정된 wiki 파일 일괄 검증
 *
 * 사용법:
 *   node validate-recent-wiki.js [분] [경로]
 *   node validate-recent-wiki.js 5 content/wiki
 *
 * 작동:
 *   - 지정된 시간(기본 5분) 내 수정된 .md 파일 검색
 *   - verify-wiki-quality.js로 각 파일 검증
 *   - 실패 파일 목록 출력 및 로깅
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 설정
const DEFAULT_MINUTES = 5;
const DEFAULT_PATH = 'content/wiki';
const VERIFY_SCRIPT = path.join(__dirname, 'verify-wiki-quality.js');
const LOG_FILE = path.join(__dirname, '..', 'state', 'failed-wiki-validations.log');

// 인자 파싱
const minutes = parseInt(process.argv[2]) || DEFAULT_MINUTES;
const searchPath = process.argv[3] || DEFAULT_PATH;
const failExitCode = parseInt(process.argv[4]) || 1; // TaskCompleted 훅: 2 전달 시 완료 차단

console.log('');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║      🔍 서브에이전트 완료 후 Wiki 품질 검증              ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📁 검색 경로: ${searchPath}`);
console.log(`⏱️ 검색 범위: 최근 ${minutes}분 내 수정된 파일`);
console.log('');

// 최근 수정된 파일 찾기
function findRecentFiles(dirPath, minutesAgo) {
  const now = Date.now();
  const threshold = now - (minutesAgo * 60 * 1000);
  const results = [];

  try {
    const absolutePath = path.resolve(dirPath);
    if (!fs.existsSync(absolutePath)) {
      console.log(`⚠️ 디렉토리 없음: ${absolutePath}`);
      return results;
    }

    const files = fs.readdirSync(absolutePath);

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const filePath = path.join(absolutePath, file);
      const stats = fs.statSync(filePath);

      if (stats.mtime.getTime() > threshold) {
        results.push({
          path: filePath,
          name: file,
          modified: stats.mtime
        });
      }
    }
  } catch (err) {
    console.error(`⚠️ 파일 검색 오류: ${err.message}`);
  }

  return results.sort((a, b) => b.modified - a.modified);
}

// 파일 검증
function validateFile(filePath) {
  try {
    execSync(`node "${VERIFY_SCRIPT}" "${filePath}"`, {
      stdio: 'pipe',
      timeout: 20000
    });
    return { valid: true, errors: [] };
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : '';
    const stdout = err.stdout ? err.stdout.toString() : '';
    const output = stderr + stdout;

    // 오류 메시지 추출
    const errors = [];
    const lines = output.split('\n');
    for (const line of lines) {
      if (line.includes('❌') || line.includes('🔴')) {
        errors.push(line.trim());
      }
    }

    return { valid: false, errors, output };
  }
}

// 로그 기록
function logFailure(filePath, errors) {
  try {
    const logDir = path.dirname(LOG_FILE);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const errorSummary = errors.slice(0, 3).join(' | ');
    const logEntry = `${timestamp} | SubagentStop | ${filePath} | ${errorSummary}\n`;

    fs.appendFileSync(LOG_FILE, logEntry);
  } catch (e) {
    // 로깅 실패해도 계속 진행
  }
}

// 메인 실행
const recentFiles = findRecentFiles(searchPath, minutes);

if (recentFiles.length === 0) {
  console.log('✅ 최근 수정된 wiki 파일 없음 - 검증 스킵');
  process.exit(0);
}

console.log(`📋 검증 대상: ${recentFiles.length}개 파일`);
console.log('');

let passCount = 0;
let failCount = 0;
const failedFiles = [];

for (const file of recentFiles) {
  const relativePath = path.relative(process.cwd(), file.path);
  process.stdout.write(`   ${file.name}... `);

  const result = validateFile(file.path);

  if (result.valid) {
    console.log('✅ PASS');
    passCount++;
  } else {
    console.log('❌ FAIL');
    failCount++;
    failedFiles.push({
      path: relativePath,
      name: file.name,
      errors: result.errors
    });
    logFailure(relativePath, result.errors);
  }
}

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log(`📊 결과: ${passCount} PASS / ${failCount} FAIL`);
console.log('═══════════════════════════════════════════════════════════');

if (failCount > 0) {
  console.log('');
  console.log('🔴 검증 실패 파일:');
  for (const failed of failedFiles) {
    console.log(`   - ${failed.name}`);
    for (const err of failed.errors.slice(0, 2)) {
      console.log(`     ${err}`);
    }
  }
  console.log('');
  console.log('⚠️ 위 파일들을 수정하고 다시 검증하세요.');
  console.log('   실행: node .claude/scripts/verify-wiki-quality.js [파일경로]');
  console.log('');

  // 실패 시 exit(failExitCode) - SubagentStop: 1, TaskCompleted: 2 (완료 차단)
  process.exit(failExitCode);
}

console.log('');
console.log('✅ 모든 파일 검증 통과!');
process.exit(0);
