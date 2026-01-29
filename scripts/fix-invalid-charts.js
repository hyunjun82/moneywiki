#!/usr/bin/env node

/**
 * 잘못된 차트 참조 자동 수정 스크립트
 * 존재하지 않는 차트 참조를 자동으로 제거합니다.
 */

const fs = require('fs');
const path = require('path');

// 실제 존재하는 차트 컴포넌트
const VALID_CHARTS = [
  'ComparisonBarChart',
  'PensionBarChart'
];

const WIKI_DIR = path.join(process.cwd(), 'content', 'wiki');

function fixInvalidCharts() {
  console.log('🔧 잘못된 차트 참조 자동 수정 시작...\n');

  let fixedCount = 0;
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(WIKI_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let modified = false;
    const newLines = [];
    let skipNext = false;

    for (let i = 0; i < lines.length; i++) {
      if (skipNext) {
        // 객체 형태의 chart 필드 스킵
        if (/^\s+\w+:/.test(lines[i])) {
          continue;
        } else {
          skipNext = false;
        }
      }

      const line = lines[i];

      // chart: "InvalidChart" 제거
      const chartMatch = line.match(/^chart:\s*"([^"]+)"/);
      if (chartMatch) {
        const chartName = chartMatch[1];
        if (!VALID_CHARTS.includes(chartName)) {
          console.log(`  ✓ ${file}: chart: "${chartName}" 제거`);
          modified = true;
          fixedCount++;
          continue; // 이 줄을 출력하지 않음
        }
      }

      // chart: true/false 제거
      if (/^chart:\s*(true|false)/.test(line)) {
        console.log(`  ✓ ${file}: chart: boolean 제거`);
        modified = true;
        fixedCount++;
        continue;
      }

      // chart: {...} 객체 제거
      if (/^chart:\s*$/.test(line)) {
        console.log(`  ✓ ${file}: chart 객체 제거 시작`);
        modified = true;
        fixedCount++;
        skipNext = true;
        continue;
      }

      newLines.push(line);
    }

    if (modified) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
    }
  }

  if (fixedCount > 0) {
    console.log(`\n✅ ${fixedCount}개 파일 수정 완료!\n`);
    console.log('💡 다음 단계:');
    console.log('   1. git status로 변경 사항 확인');
    console.log('   2. npm run validate-charts로 재검증');
    console.log('   3. npm run build로 빌드 테스트\n');
  } else {
    console.log('\n✅ 수정할 내용이 없습니다.\n');
  }
}

fixInvalidCharts();
