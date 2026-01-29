#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(process.cwd(), 'content', 'wiki');

const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(WIKI_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let hasChart = false;
  let hasChartConfig = false;

  // 먼저 chart 필드 확인
  for (const line of lines) {
    if (/^chart:\s*"/.test(line)) {
      hasChart = true;
    }
    if (/^chartConfig:/.test(line)) {
      hasChartConfig = true;
    }
  }

  // chartConfig만 있고 chart가 없으면 제거
  if (hasChartConfig && !hasChart) {
    const newLines = [];
    let inChartConfig = false;
    let skippedAnyConfig = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // chartConfig 시작
      if (/^chartConfig:/.test(line)) {
        inChartConfig = true;
        skippedAnyConfig = true;
        continue;
      }

      // chartConfig 블록 내부
      if (inChartConfig) {
        // 다음 top-level 필드가 나타나거나 frontmatter 끝
        if (/^[a-zA-Z]/.test(line) && !/^\s/.test(line)) {
          inChartConfig = false;
          newLines.push(line);
        } else if (line === '---') {
          inChartConfig = false;
          newLines.push(line);
        }
        // chartConfig 블록 내부는 스킵
        continue;
      }

      newLines.push(line);
    }

    if (skippedAnyConfig) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
      console.log(`✓ ${file} - chartConfig 제거됨`);
      fixedCount++;
    }
  }
}

if (fixedCount > 0) {
  console.log(`\n✅ 총 ${fixedCount}개 파일 수정 완료!\n`);
} else {
  console.log(`\n✅ 수정할 파일이 없습니다.\n`);
}
