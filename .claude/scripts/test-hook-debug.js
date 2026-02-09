#!/usr/bin/env node
// 간단한 훅 테스트 - 무조건 차단하고 로그 저장
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'state', 'hook-debug.log');

// state 디렉토리 생성
const logDir = path.dirname(logFile);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

let inputData = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  const timestamp = new Date().toISOString();
  const logEntry = `\n=== ${timestamp} ===\nInput received:\n${inputData}\n`;

  fs.appendFileSync(logFile, logEntry);

  console.error('HOOK BLOCKED: Test hook always blocks');
  process.exit(2); // 무조건 차단
});

// 타임아웃
setTimeout(() => {
  fs.appendFileSync(logFile, `\n=== ${new Date().toISOString()} === TIMEOUT (no stdin)\n`);
  process.exit(2);
}, 3000);
