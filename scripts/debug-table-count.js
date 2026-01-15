const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../content/wiki/대항력-발생-시점.md');
let content = fs.readFileSync(filePath, 'utf-8');

// Windows 줄바꿈(\r\n)을 Unix 줄바꿈(\n)으로 정규화
content = content.replace(/\r\n/g, '\n');

console.log('=== 파일 분석: 대항력-발생-시점.md ===\n');

// Frontmatter 추출
const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatterMatch) {
  console.log('❌ Frontmatter 추출 실패');
  process.exit(1);
}

const frontmatter = frontmatterMatch[1];
const body = content.slice(frontmatterMatch[0].length);

console.log(`Frontmatter 길이: ${frontmatter.length} 문자`);
console.log(`Body 길이: ${body.length} 문자\n`);

// 테이블 개수 체크
const lines = body.split('\n');
let tableCount = 0;
let inTable = false;
let tableStarts = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.match(/^\|.*\|/)) {
    if (!inTable) {
      tableCount++;
      tableStarts.push(i + 1); // 1-based line number
      inTable = true;
    }
  } else {
    inTable = false;
  }
}

console.log(`테이블 블록 개수: ${tableCount}개\n`);
console.log(`테이블 시작 라인 (본문 기준):`);
tableStarts.forEach((line, idx) => {
  console.log(`  ${idx + 1}. 본문 ${line}번째 줄`);
});

console.log(`\n위반 여부: ${tableCount > 2 ? '❌ 위반 (2개 초과)' : '✅ 통과'}`);
