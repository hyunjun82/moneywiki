#!/usr/bin/env node

/**
 * Vercel Analytics URL 디코딩 도구
 *
 * 사용법:
 *   node scripts/decode-analytics-url.js "/w/%EA%B7%BC%EB%A1%9C%EC%86%8C%EB%93%9D%EC%84%B8"
 *
 * 또는 여러 URL을 한번에:
 *   node scripts/decode-analytics-url.js "url1" "url2" "url3"
 */

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📊 Vercel Analytics URL 디코더

사용법:
  node scripts/decode-analytics-url.js "<URL>"

예시:
  node scripts/decode-analytics-url.js "/w/%EA%B7%BC%EB%A1%9C%EC%86%8C%EB%93%9D%EC%84%B8"

  결과: /w/근로소득세
`);
  process.exit(0);
}

console.log('\n=== URL 디코딩 결과 ===\n');

args.forEach((url, index) => {
  try {
    const decoded = decodeURIComponent(url);
    console.log(`${index + 1}. ${decoded}`);
    if (decoded.startsWith('/w/')) {
      const slug = decoded.replace('/w/', '');
      console.log(`   → 슬러그: ${slug}`);
      console.log(`   → 파일: content/wiki/${slug}.md`);
    }
    console.log('');
  } catch (e) {
    console.log(`${index + 1}. ${url} (디코딩 실패)`);
    console.log('');
  }
});
