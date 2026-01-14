#!/usr/bin/env node
/**
 * 블로그 스타일 description 수정
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

function fixDescription(description) {
  if (!description) return { changed: false, description };

  const before = description;

  // 블로그 스타일 패턴 제거
  let fixed = description
    .replace(/을\s*알아봅니다/g, '을 정리했어요')
    .replace(/를\s*알아봅니다/g, '를 정리했어요')
    .replace(/을\s*정리합니다/g, '을 정리했어요')
    .replace(/를\s*정리합니다/g, '를 정리했어요')
    .replace(/에\s*대해\s*설명합니다/g, '에 대한 핵심 정보예요')
    .replace(/을\s*정리했습니다/g, '을 정리했어요')
    .replace(/를\s*정리했습니다/g, '를 정리했어요');

  return {
    changed: fixed !== before,
    description: fixed
  };
}

function fixFile(filename) {
  const filepath = path.join(WIKI_DIR, filename);
  const fileContent = fs.readFileSync(filepath, 'utf-8');

  try {
    const { data, content: body } = matter(fileContent);

    const result = fixDescription(data.description);

    if (!result.changed) {
      return { status: 'skip' };
    }

    data.description = result.description;

    // 파일 저장
    const newContent = matter.stringify(body, data);
    fs.writeFileSync(filepath, newContent, 'utf-8');

    return { status: 'fixed' };

  } catch (err) {
    return { status: 'error', error: err.message };
  }
}

function main() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  const results = {
    fixed: [],
    skipped: [],
    errors: []
  };

  console.log('='.repeat(80));
  console.log('블로그 스타일 description 수정...');
  console.log('='.repeat(80));

  files.forEach((filename, idx) => {
    const result = fixFile(filename);

    if (result.status === 'fixed') {
      results.fixed.push(filename);
      if (results.fixed.length <= 10) {
        console.log(`✅ ${filename}`);
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
  console.log(`⏭️  스킵: ${results.skipped.length}개`);
  console.log(`❌ 오류: ${results.errors.length}개`);

  if (results.fixed.length > 10) {
    console.log(`\n(상위 10개만 표시, 전체 ${results.fixed.length}개 수정됨)`);
  }
}

main();
