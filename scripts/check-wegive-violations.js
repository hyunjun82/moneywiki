const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '../content/wiki');

// 위반 유형
const violations = {
  description: [],
  h1_in_body: [],
  h2_numbered: [],
  too_many_tables: [],
  summary_not_array: [],
  keywords_too_many: []
};

function checkFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const fileViolations = [];

  // Windows 줄바꿈(\r\n)을 Unix 줄바꿈(\n)으로 정규화
  content = content.replace(/\r\n/g, '\n');

  // Frontmatter 추출
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;

  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length);

  // 1. Description 체크
  const descMatch = frontmatter.match(/description:\s*['"]?(.*?)['"]?\n/);
  if (descMatch && (descMatch[1].includes('알아봅니다') || descMatch[1].includes('정리합니다'))) {
    fileViolations.push('description');
    violations.description.push(fileName);
  }

  // 2. H1 in body 체크
  if (body.match(/^# /m)) {
    fileViolations.push('h1_in_body');
    violations.h1_in_body.push(fileName);
  }

  // 3. H2 numbered 체크
  if (body.match(/^## \d+\./m)) {
    fileViolations.push('h2_numbered');
    violations.h2_numbered.push(fileName);
  }

  // 4. 테이블 개수 체크 (3개 이상)
  // 테이블 구분: 연속된 테이블 줄을 하나의 블록으로 계산
  const lines = body.split('\n');
  let tableCount = 0;
  let inTable = false;
  for (const line of lines) {
    if (line.match(/^\|.*\|/)) {
      if (!inTable) {
        tableCount++;
        inTable = true;
      }
    } else {
      // 테이블이 아닌 모든 줄에서 inTable을 false로 (빈 줄, 텍스트 모두)
      inTable = false;
    }
  }
  if (tableCount > 2) { // 한도: 2개
    fileViolations.push(`too_many_tables(${tableCount})`);
    violations.too_many_tables.push(`${fileName} (${tableCount}개)`);
  }

  // 5. Summary 배열 체크
  if (frontmatter.includes('summary:') && !frontmatter.match(/summary:\s*\n\s*-/)) {
    fileViolations.push('summary_not_array');
    violations.summary_not_array.push(fileName);
  }

  // 6. Keywords 개수 체크 (5개 초과)
  const keywordsMatch = frontmatter.match(/keywords:\s*\n((?:\s*-.*\n)*)/);
  if (keywordsMatch) {
    const keywordCount = (keywordsMatch[1].match(/-/g) || []).length;
    if (keywordCount > 5) {
      fileViolations.push('keywords_too_many');
      violations.keywords_too_many.push(fileName);
    }
  }

  return fileViolations.length > 0 ? { fileName, violations: fileViolations } : null;
}

// 전체 파일 검증
const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
const violatedFiles = [];

files.forEach(file => {
  const result = checkFile(path.join(WIKI_DIR, file));
  if (result) violatedFiles.push(result);
});

// 결과 출력
console.log('=== 위기브 스타일 위반 검증 결과 ===\n');
console.log(`총 파일 수: ${files.length}개`);
console.log(`위반 파일 수: ${violatedFiles.length}개\n`);

console.log('## 위반 유형별 통계\n');
console.log(`1. Description 패턴 위반: ${violations.description.length}개`);
console.log(`2. H1 본문 사용: ${violations.h1_in_body.length}개`);
console.log(`3. H2 숫자 사용: ${violations.h2_numbered.length}개`);
console.log(`4. 테이블 과다 (3개+): ${violations.too_many_tables.length}개`);
console.log(`5. Summary 배열 아님: ${violations.summary_not_array.length}개`);
console.log(`6. Keywords 과다 (5개+): ${violations.keywords_too_many.length}개\n`);

console.log('## 위반 파일 목록\n');
violatedFiles.slice(0, 50).forEach(({ fileName, violations }) => {
  console.log(`- ${fileName}: [${violations.join(', ')}]`);
});

if (violatedFiles.length > 50) {
  console.log(`\n... 외 ${violatedFiles.length - 50}개 파일`);
}

// JSON 파일로 저장
const report = {
  total: files.length,
  violated: violatedFiles.length,
  violations,
  files: violatedFiles
};

fs.writeFileSync(
  path.join(__dirname, 'wegive-violations-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n결과가 scripts/wegive-violations-report.json에 저장되었습니다.');
