const fs = require('fs');

console.log('🔧 이직확인서 DATA 정확한 교체 시작...\n');

// 1. 백업에서 복구
fs.copyFileSync('./src/components/forms/FormPreview.tsx.backup', './src/components/forms/FormPreview.tsx');
console.log('✅ 백업에서 복구 완료');

// 2. 파일 읽기
let content = fs.readFileSync('./src/components/forms/FormPreview.tsx', 'utf-8');
const lines = content.split('\n');

// 3. 기존 부정확한 DATA들 찾기 (14890~15162 범위)
const startLine = 14889; // 0-based index: 14890 - 1
let endLine = startLine;

// 다음 export const를 찾을 때까지
for (let i = startLine + 1; i < lines.length; i++) {
  if (lines[i].startsWith('export const ') && !lines[i].includes('이직확인서_')) {
    endLine = i - 1;
    break;
  }
}

console.log(`🔍 기존 DATA 범위: ${startLine + 1} ~ ${endLine + 1} 라인`);

// 4. 새로운 DATA 읽기
const newData = fs.readFileSync('./이직확인서-10개-DATA.ts', 'utf-8');
const newDataLines = newData.split('\n').slice(3); // import 라인 제거

// 5. 교체
const before = lines.slice(0, startLine + 1);
const after = lines.slice(endLine + 1);
const result = [...before, ...newDataLines, ...after].join('\n');

// 6. 저장
fs.writeFileSync('./src/components/forms/FormPreview.tsx', result, 'utf-8');

console.log('✅ 9개 이직확인서 DATA 교체 완료!');
console.log(`📊 최종 라인 수: ${result.split('\n').length}`);
