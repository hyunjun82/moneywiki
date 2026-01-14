#!/usr/bin/env node
/**
 * 위기브 스타일 위반 일괄 수정
 * 1. 숫자 헤딩 제거
 * 2. 블로그 description 수정
 * 3. 이모지 제거
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

function fixStyleViolations(fileContent, data) {
  let { content: body } = matter(fileContent);
  let changes = [];

  // 1. 숫자 헤딩 제거
  const beforeHeading = body;
  body = body.replace(/^(#{2,})\s+\d+(\.\d+)*\.\s+/gm, '$1 ');
  if (body !== beforeHeading) {
    changes.push('numbered-heading');
  }

  // 2. 이모지 제거
  const beforeEmoji = body;
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  body = body.replace(emojiRegex, '');
  if (body !== beforeEmoji) {
    changes.push('emoji');
  }

  // 3. description 블로그 스타일 수정
  if (data.description) {
    const beforeDesc = data.description;
    data.description = data.description
      .replace(/을\s*알아봅니다$/, '을 정리했어요')
      .replace(/를\s*알아봅니다$/, '를 정리했어요')
      .replace(/에\s*대해\s*설명합니다$/, '에 대한 핵심 정보예요')
      .replace(/을\s*정리했습니다$/, '을 정리했어요')
      .replace(/를\s*정리했습니다$/, '를 정리했어요');

    if (data.description !== beforeDesc) {
      changes.push('description');
    }
  }

  return { body, data, changes };
}

function fixFile(filename) {
  const filepath = path.join(WIKI_DIR, filename);
  const fileContent = fs.readFileSync(filepath, 'utf-8');

  try {
    const { data } = matter(fileContent);
    const result = fixStyleViolations(fileContent, data);

    if (result.changes.length === 0) {
      return { status: 'skip' };
    }

    // 파일 저장
    const newContent = matter.stringify(result.body, result.data);
    fs.writeFileSync(filepath, newContent, 'utf-8');

    return {
      status: 'fixed',
      changes: result.changes
    };

  } catch (err) {
    return { status: 'error', error: err.message };
  }
}

function main() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  const results = {
    fixed: [],
    skipped: [],
    errors: [],
    stats: {
      numberedHeading: 0,
      emoji: 0,
      description: 0
    }
  };

  console.log('='.repeat(80));
  console.log('위기브 스타일 위반 일괄 수정...');
  console.log('='.repeat(80));

  files.forEach((filename, idx) => {
    const result = fixFile(filename);

    if (result.status === 'fixed') {
      results.fixed.push({ filename, changes: result.changes });

      // 통계 집계
      result.changes.forEach(change => {
        if (change === 'numbered-heading') results.stats.numberedHeading++;
        if (change === 'emoji') results.stats.emoji++;
        if (change === 'description') results.stats.description++;
      });

      if (results.fixed.length <= 10) {
        console.log(`✅ ${filename}: ${result.changes.join(', ')}`);
      }
    } else if (result.status === 'skip') {
      results.skipped.push(filename);
    } else {
      results.errors.push({ filename, error: result.error });
      console.log(`❌ ${filename}: ${result.error}`);
    }

    if ((idx + 1) % 100 === 0) {
      console.log(`진행중... ${idx + 1}/${files.length}`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('수정 완료');
  console.log('='.repeat(80));
  console.log(`✅ 수정: ${results.fixed.length}개`);
  console.log(`  - 숫자 헤딩: ${results.stats.numberedHeading}개`);
  console.log(`  - 이모지: ${results.stats.emoji}개`);
  console.log(`  - description: ${results.stats.description}개`);
  console.log(`⏭️  스킵: ${results.skipped.length}개`);
  console.log(`❌ 오류: ${results.errors.length}개`);

  if (results.fixed.length > 10) {
    console.log(`\n(상위 10개만 표시, 전체 ${results.fixed.length}개 수정됨)`);
  }

  fs.writeFileSync(
    path.join(__dirname, 'style-fix-result.json'),
    JSON.stringify(results, null, 2)
  );

  console.log(`\n📊 상세 결과: scripts/style-fix-result.json`);
}

main();
