const fs = require('fs');

console.log('🔧 중복 이직확인서 DATA 제거...\n');

// 파일 읽기
const content = fs.readFileSync('./src/components/forms/FormPreview.tsx', 'utf-8');
const lines = content.split('\n');

console.log(`📊 현재 라인 수: ${lines.length}`);

// 17393~17926 라인 제거 (0-based index: 17392~17925)
const before = lines.slice(0, 17392);
const after = lines.slice(17926);

const result = [...before, ...after].join('\n');

// 저장
fs.writeFileSync('./src/components/forms/FormPreview.tsx', result, 'utf-8');

console.log(`✅ 중복 데이터 제거 완료!`);
console.log(`📊 최종 라인 수: ${result.split('\n').length}`);
console.log(`📉 제거된 라인 수: ${lines.length - result.split('\n').length}`);
