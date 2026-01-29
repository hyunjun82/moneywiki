#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(process.cwd(), 'content', 'wiki');

const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

let orphanCount = 0;

for (const file of files) {
  const filePath = path.join(WIKI_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let hasChart = false;
  let hasChartConfig = false;

  for (const line of lines) {
    if (/^chart:\s*"/.test(line)) {
      hasChart = true;
    }
    if (/^chartConfig:/.test(line)) {
      hasChartConfig = true;
    }
  }

  if (hasChartConfig && !hasChart) {
    console.log(`❌ ${file}`);
    console.log(`   chartConfig 있음, chart 필드 없음!\n`);
    orphanCount++;
  }
}

if (orphanCount > 0) {
  console.log(`\n총 ${orphanCount}개 파일에서 orphan chartConfig 발견!\n`);
} else {
  console.log(`\n✅ 모든 chartConfig에 chart 필드가 있습니다!\n`);
}
