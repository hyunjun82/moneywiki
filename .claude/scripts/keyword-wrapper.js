#!/usr/bin/env node
/**
 * /키워드 명령어 Wrapper
 * Claude에서 "/키워드 전세보증금 --count 10" 실행 시
 * Python 스크립트를 자동으로 호출
 */

const { spawn } = require('child_process');
const path = require('path');

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('사용법: node keyword-wrapper.js "키워드" [--count 10]');
    console.log('또는 Claude에서: /키워드 전세보증금 --count 10');
    process.exit(1);
  }
  
  const keyword = args[0];
  const countArg = args.find(a => a.startsWith('--count'));
  const count = countArg ? countArg.split('=')[1] || args[args.indexOf(countArg) + 1] : '3';
  
  console.log(`\n🚀 키워드 수집 시작: "${keyword}" (${count}개)\n`);
  
  // Python 스크립트 실행
  const pythonScript = path.join(__dirname, 'keyword-pipeline.py');
  const py = spawn('py', [pythonScript, keyword, '--count', count], {
    cwd: path.join(__dirname, '..', '..'),
    stdio: 'inherit'
  });
  
  py.on('close', (code) => {
    if (code === 0) {
      console.log(`\n✅ 완료! 결과: .claude/data/keywords/${keyword}.json`);
    } else {
      console.log(`\n❌ 오류 발생 (종료 코드: ${code})`);
    }
    process.exit(code);
  });
  
  py.on('error', (err) => {
    console.error(`\n❌ 실행 오류: ${err.message}`);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}
