const fs = require('fs');

console.log('🔧 중복 간병퇴사 DATA 제거...\n');

// 파일 읽기
const content = fs.readFileSync('./src/components/forms/FormPreview.tsx', 'utf-8');
const lines = content.split('\n');

console.log(`📊 현재 라인 수: ${lines.length}`);

// 14942~14995 라인 제거 (0-based index: 14941~14994)
// 14942 comment부터 14995까지 제거 (// 2. 이직확인서-간병퇴사 ~ ];까지)
const before = lines.slice(0, 14941);
const after = lines.slice(14995);

const result = [...before, ...after].join('\n');

// 저장
fs.writeFileSync('./src/components/forms/FormPreview.tsx', result, 'utf-8');

console.log(`✅ 중복 간병퇴사 데이터 제거 완료!`);
console.log(`📊 최종 라인 수: ${result.split('\n').length}`);
console.log(`📉 제거된 라인 수: ${lines.length - result.split('\n').length}`);
