#!/usr/bin/env node
/**
 * Keywords 자동 최적화 - 4-5개로 축소
 * 계약갱신청구권-기간.md 패턴 적용
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

function extractTitleWords(title) {
  // title에서 핵심 단어 추출
  return title
    .toLowerCase()
    .replace(/[0-9]+년/g, '') // "2026년" 제거
    .split(/[\s-]/)
    .filter(word => word.length > 1);
}

function scoreKeyword(keyword, titleWords, title) {
  const kwLower = keyword.toLowerCase();

  // 1. title과 완전 일치 = Primary
  if (kwLower === title.toLowerCase()) {
    return 1000;
  }

  // 2. title의 모든 주요 단어 포함
  const matchCount = titleWords.filter(word =>
    kwLower.includes(word) || word.includes(kwLower.split(/[\s-]/)[0])
  ).length;

  if (matchCount === titleWords.length) {
    return 100 + keyword.length; // 길수록 구체적
  }

  // 3. title의 일부 단어 포함
  if (matchCount > 0) {
    return 50 + matchCount * 10;
  }

  // 4. 무관
  return 0;
}

function optimizeKeywords(title, keywords) {
  if (keywords.length <= 5) {
    return keywords; // 이미 5개 이하면 유지
  }

  const titleWords = extractTitleWords(title);

  // 각 키워드에 점수 부여
  const scored = keywords.map(kw => ({
    keyword: kw,
    score: scoreKeyword(kw, titleWords, title)
  }));

  // 점수순 정렬 (높은 순)
  scored.sort((a, b) => b.score - a.score);

  // 상위 4-5개 선택 (무관한 키워드 제외)
  const selected = scored
    .filter(item => item.score > 0)
    .slice(0, 5)
    .map(item => item.keyword);

  // 최소 4개 보장 (무관하더라도)
  if (selected.length < 4 && keywords.length >= 4) {
    const remaining = scored
      .filter(item => !selected.includes(item.keyword))
      .slice(0, 4 - selected.length)
      .map(item => item.keyword);
    selected.push(...remaining);
  }

  return selected;
}

function fixFile(filename) {
  const filepath = path.join(WIKI_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf-8');

  try {
    const { data, content: body } = matter(content);

    const originalCount = (data.keywords || []).length;
    if (originalCount <= 5) {
      return { status: 'skip', originalCount, newCount: originalCount };
    }

    const optimized = optimizeKeywords(data.title, data.keywords || []);

    // frontmatter 업데이트
    data.keywords = optimized;

    // 파일 저장
    const newContent = matter.stringify(body, data);
    fs.writeFileSync(filepath, newContent, 'utf-8');

    return {
      status: 'fixed',
      originalCount,
      newCount: optimized.length,
      removed: originalCount - optimized.length
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
    errors: []
  };

  console.log('='.repeat(80));
  console.log('Keywords 자동 최적화 시작...');
  console.log('='.repeat(80));

  files.forEach((filename, idx) => {
    const result = fixFile(filename);

    if (result.status === 'fixed') {
      results.fixed.push({ filename, ...result });
      if (results.fixed.length <= 10) {
        console.log(`✅ ${filename}: ${result.originalCount}개 → ${result.newCount}개 (-${result.removed})`);
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
  console.log('최적화 완료');
  console.log('='.repeat(80));
  console.log(`✅ 수정: ${results.fixed.length}개`);
  console.log(`⏭️  스킵 (5개 이하): ${results.skipped.length}개`);
  console.log(`❌ 오류: ${results.errors.length}개`);

  if (results.fixed.length > 10) {
    console.log(`\n(상위 10개만 표시, 전체 ${results.fixed.length}개 수정됨)`);
  }

  // 통계 저장
  fs.writeFileSync(
    path.join(__dirname, 'keyword-fix-result.json'),
    JSON.stringify(results, null, 2)
  );

  console.log(`\n📊 상세 결과: scripts/keyword-fix-result.json`);
}

main();
