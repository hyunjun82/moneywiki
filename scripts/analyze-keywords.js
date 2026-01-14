#!/usr/bin/env node
/**
 * 모든 .md 파일의 keywords 분석
 * - keywords 5개 초과 파일 찾기
 * - title과 무관한 keywords 찾기
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

function analyzeKeywords() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  const results = {
    over5: [],
    unrelated: [],
    ok: []
  };

  files.forEach(filename => {
    const filepath = path.join(WIKI_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf-8');

    try {
      const { data } = matter(content);
      const title = data.title || '';
      const keywords = data.keywords || [];

      const keywordCount = keywords.length;

      // keywords 5개 초과
      if (keywordCount > 5) {
        results.over5.push({
          file: filename,
          title,
          count: keywordCount,
          keywords
        });
      }

      // title과 무관한 keywords 찾기 (간단한 휴리스틱)
      const titleWords = title.toLowerCase().split(/[\s-]/);
      const unrelatedKeywords = keywords.filter(kw => {
        const kwLower = kw.toLowerCase();
        // title의 주요 단어가 하나도 포함 안 되면 무관
        return !titleWords.some(word => kwLower.includes(word) || word.includes(kwLower.split(/[\s-]/)[0]));
      });

      if (unrelatedKeywords.length > 0) {
        results.unrelated.push({
          file: filename,
          title,
          count: keywordCount,
          unrelated: unrelatedKeywords
        });
      }

      if (keywordCount <= 5 && unrelatedKeywords.length === 0) {
        results.ok.push(filename);
      }

    } catch (err) {
      console.error(`Error parsing ${filename}:`, err.message);
    }
  });

  return results;
}

function printReport(results) {
  console.log('='.repeat(80));
  console.log('Keywords 분석 리포트');
  console.log('='.repeat(80));

  console.log(`\n📊 전체 통계:`);
  console.log(`  - 전체 파일: ${results.over5.length + results.unrelated.length + results.ok.length}개`);
  console.log(`  - Keywords 5개 초과: ${results.over5.length}개`);
  console.log(`  - Title과 무관한 keywords: ${results.unrelated.length}개`);
  console.log(`  - OK: ${results.ok.length}개`);

  console.log(`\n\n🔴 Keywords 5개 초과 (상위 20개):`);
  console.log('='.repeat(80));

  results.over5
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .forEach((item, idx) => {
      console.log(`\n${idx + 1}. ${item.file}`);
      console.log(`   Title: "${item.title}"`);
      console.log(`   Keywords: ${item.count}개`);
      console.log(`   ${item.keywords.map((k, i) => `${i + 1}. ${k}`).join('\n   ')}`);
    });

  console.log(`\n\n⚠️ Title과 무관한 keywords (상위 10개):`);
  console.log('='.repeat(80));

  results.unrelated
    .slice(0, 10)
    .forEach((item, idx) => {
      console.log(`\n${idx + 1}. ${item.file}`);
      console.log(`   Title: "${item.title}"`);
      console.log(`   무관한 keywords: ${item.unrelated.join(', ')}`);
    });

  // JSON 파일로 저장
  fs.writeFileSync(
    path.join(__dirname, 'keyword-analysis.json'),
    JSON.stringify(results, null, 2)
  );

  console.log(`\n\n✅ 상세 리포트 저장: scripts/keyword-analysis.json`);
}

const results = analyzeKeywords();
printReport(results);
