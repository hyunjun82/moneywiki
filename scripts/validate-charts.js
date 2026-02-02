#!/usr/bin/env node

/**
 * 빌드 전 차트 참조 검증 스크립트
 * 존재하지 않는 차트 컴포넌트 참조를 자동으로 감지합니다.
 */

const fs = require('fs');
const path = require('path');

// 실제 존재하는 차트 컴포넌트
const VALID_CHARTS = [
  'ComparisonBarChart',
  'PensionBarChart',
  'BarChart'
];

// 금지된 차트 참조 (과거에 문제를 일으킨 것들)
const INVALID_CHARTS = [
  'barChart',
  'TimelineChart',
  'DonutChart',
  'AreaChart',
  'LineChart'
];

const WIKI_DIR = path.join(process.cwd(), 'content', 'wiki');

function validateChartReferences() {
  console.log('🔍 차트 참조 검증 시작...\n');

  let hasErrors = false;
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(WIKI_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // chart: "ChartName" 패턴 검사
      const chartMatch = line.match(/^chart:\s*"([^"]+)"/);
      if (chartMatch) {
        const chartName = chartMatch[1];

        // 금지된 차트인지 확인
        if (INVALID_CHARTS.includes(chartName)) {
          console.error(`❌ ${file}:${i + 1}`);
          console.error(`   존재하지 않는 차트: "${chartName}"`);
          console.error(`   → 이 줄을 제거하거나 유효한 차트로 변경하세요\n`);
          hasErrors = true;
        }
        // 유효한 차트가 아닌 경우
        else if (!VALID_CHARTS.includes(chartName)) {
          console.warn(`⚠️  ${file}:${i + 1}`);
          console.warn(`   알 수 없는 차트: "${chartName}"`);
          console.warn(`   유효한 차트: ${VALID_CHARTS.join(', ')}\n`);
          hasErrors = true;
        }
      }

      // chart: true (boolean) 검사
      if (/^chart:\s*(true|false)/.test(line)) {
        console.error(`❌ ${file}:${i + 1}`);
        console.error(`   chart 필드는 문자열이어야 합니다 (boolean 금지)`);
        console.error(`   → 이 줄을 제거하세요\n`);
        hasErrors = true;
      }

      // chart: { ... } (객체) 검사
      if (/^chart:\s*$/.test(line) && i + 1 < lines.length && /^\s+\w+:/.test(lines[i + 1])) {
        console.error(`❌ ${file}:${i + 1}`);
        console.error(`   chart 필드는 문자열이어야 합니다 (객체 금지)`);
        console.error(`   → chart 객체를 모두 제거하세요\n`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.error('\n❌ 검증 실패! 위 오류를 수정한 후 다시 빌드하세요.\n');
    console.error('💡 자동 수정 명령어:');
    console.error('   node scripts/fix-invalid-charts.js\n');
    process.exit(1);
  } else {
    console.log('✅ 모든 차트 참조가 유효합니다!\n');
    console.log(`📊 유효한 차트: ${VALID_CHARTS.join(', ')}\n`);
  }
}

validateChartReferences();
