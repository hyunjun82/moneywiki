#!/usr/bin/env node
/**
 * 네이버/구글/다음/빙 연관검색어 수집
 * 
 * 사용법:
 *   node collect-related-keywords.js "근로장려금"
 * 
 * 출력:
 *   .claude/data/paa-results/근로장려금-related.json
 */

const fs = require('fs');
const path = require('path');

// 결과 저장 디렉토리
const DATA_DIR = path.join(__dirname, '..', 'data', 'paa-results');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Playwright MCP로 네이버 연관검색어 수집
 */
function generateNaverCode(keyword) {
  return `async (page) => {
  const keywords = new Set();
  
  // 네이버 검색
  await page.goto('https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}');
  await page.waitForTimeout(2000);
  
  // 연관검색어 수집
  const related = await page.evaluate(() => {
    const results = [];
    
    // 방법 1: 연관검색어 영역
    document.querySelectorAll('.relate_keyword a, .relkwd a, .keyword a').forEach(el => {
      const text = el.textContent.trim();
      if (text.length > 0) results.push(text);
    });
    
    // 방법 2: 자동완성
    document.querySelectorAll('.autocomplete li, .suggest li').forEach(el => {
      const text = el.textContent.trim();
      if (text.length > 0) results.push(text);
    });
    
    return results;
  });
  
  return { source: 'naver', keywords: related };
}`;
}

/**
 * 구글 연관검색어 수집
 */
function generateGoogleCode(keyword) {
  return `async (page) => {
  // 구글 검색
  await page.goto('https://www.google.com/search?q=${encodeURIComponent(keyword)}&hl=ko');
  await page.waitForTimeout(2000);
  
  // 페이지 하단으로 스크롤 (연관검색어 영역)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  // 연관검색어 수집
  const related = await page.evaluate(() => {
    const results = [];
    
    // "관련 검색어" 영역
    document.querySelectorAll('.k8XOCe, .s75CSd, .AJLUJb').forEach(el => {
      const text = el.textContent.trim();
      if (text.length > 0 && !text.includes('관련 검색')) {
        results.push(text);
      }
    });
    
    return results;
  });
  
  return { source: 'google', keywords: related };
}`;
}

/**
 * 다음 연관검색어 수집
 */
function generateDaumCode(keyword) {
  return `async (page) => {
  // 다음 검색
  await page.goto('https://search.daum.net/search?q=${encodeURIComponent(keyword)}');
  await page.waitForTimeout(2000);
  
  // 연관검색어 수집
  const related = await page.evaluate(() => {
    const results = [];
    
    // 연관검색어 영역
    document.querySelectorAll('.rel_search a, .relate_keyword a').forEach(el => {
      const text = el.textContent.trim();
      if (text.length > 0) results.push(text);
    });
    
    return results;
  });
  
  return { source: 'daum', keywords: related };
}`;
}

/**
 * 빙 연관검색어 수집
 */
function generateBingCode(keyword) {
  return `async (page) => {
  // 빙 검색
  await page.goto('https://www.bing.com/search?q=${encodeURIComponent(keyword)}');
  await page.waitForTimeout(2000);
  
  // 페이지 하단으로 스크롤
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  // 연관검색어 수집
  const related = await page.evaluate(() => {
    const results = [];
    
    // "관련 검색" 영역
    document.querySelectorAll('.b_rs a, .sa_tm a').forEach(el => {
      const text = el.textContent.trim();
      if (text.length > 0) results.push(text);
    });
    
    return results;
  });
  
  return { source: 'bing', keywords: related };
}`;
}

/**
 * 중복 제거
 */
function deduplicateKeywords(keywordsBySource) {
  const uniqueKeywords = new Map();
  
  for (const [source, keywords] of Object.entries(keywordsBySource)) {
    keywords.forEach(kw => {
      const normalized = kw.toLowerCase().trim();
      if (!uniqueKeywords.has(normalized)) {
        uniqueKeywords.set(normalized, {
          keyword: kw,
          sources: [source]
        });
      } else {
        uniqueKeywords.get(normalized).sources.push(source);
      }
    });
  }
  
  return Array.from(uniqueKeywords.values());
}

/**
 * 결과 저장
 */
function saveResults(keyword, keywordsBySource) {
  const unique = deduplicateKeywords(keywordsBySource);
  
  const result = {
    keyword,
    collectedAt: new Date().toISOString().split('T')[0],
    sources: {
      naver: keywordsBySource.naver?.length || 0,
      google: keywordsBySource.google?.length || 0,
      daum: keywordsBySource.daum?.length || 0,
      bing: keywordsBySource.bing?.length || 0
    },
    totalUnique: unique.length,
    keywords: unique
  };
  
  const filename = keyword.replace(/\s+/g, '-') + '-related.json';
  const filepath = path.join(DATA_DIR, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(result, null, 2), 'utf8');
  
  return { filepath, result };
}

// CLI 실행
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('연관검색어 수집기');
    console.log('================');
    console.log('');
    console.log('사용법:');
    console.log('  node collect-related-keywords.js "키워드"');
    console.log('');
    console.log('Playwright MCP 실행 순서:');
    console.log('  1. browser_run_code로 generateNaverCode() 실행');
    console.log('  2. browser_run_code로 generateGoogleCode() 실행');
    console.log('  3. browser_run_code로 generateDaumCode() 실행');
    console.log('  4. browser_run_code로 generateBingCode() 실행');
    console.log('  5. 모든 결과 합쳐서 저장');
    process.exit(0);
  }
  
  const command = args[0];
  
  if (command === 'codes') {
    const keyword = args[1] || '근로장려금';
    console.log('=== 네이버 ===');
    console.log(generateNaverCode(keyword));
    console.log('\n=== 구글 ===');
    console.log(generateGoogleCode(keyword));
    console.log('\n=== 다음 ===');
    console.log(generateDaumCode(keyword));
    console.log('\n=== 빙 ===');
    console.log(generateBingCode(keyword));
  }
}

module.exports = {
  generateNaverCode,
  generateGoogleCode,
  generateDaumCode,
  generateBingCode,
  deduplicateKeywords,
  saveResults
};
