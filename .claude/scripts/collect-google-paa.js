#!/usr/bin/env node
/**
 * 구글 PAA (People Also Ask) 수집 스크립트
 *
 * 사용법:
 *   node collect-google-paa.js "5세대 실손보험"
 *   node collect-google-paa.js "5세대 실손보험" --check-wiki
 *
 * 기능:
 *   1. 구글 검색 → PAA 질문 수집
 *   2. V 클릭 반복 → 40~100개 질문 확장
 *   3. 기존 wiki 파일과 중복 체크
 *   4. 롱테일 타이틀로 변환
 */

const fs = require('fs');
const path = require('path');

// 기존 wiki 파일 목록 가져오기
function getExistingWikiKeywords() {
  const wikiDir = path.join(__dirname, '..', '..', 'content', 'wiki');
  const keywords = new Set();

  if (!fs.existsSync(wikiDir)) return keywords;

  const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(wikiDir, file), 'utf8');

      // title 추출
      const titleMatch = content.match(/^title:\s*["'](.+)["']/m);
      if (titleMatch) {
        keywords.add(titleMatch[1].toLowerCase());
      }

      // keywords 추출
      const keywordsMatch = content.match(/keywords:\s*\n((?:\s*-\s*.+\n?)+)/);
      if (keywordsMatch) {
        const kws = keywordsMatch[1]
          .split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.trim().replace(/^-\s*["']?/, '').replace(/["']$/g, '').toLowerCase());
        kws.forEach(k => keywords.add(k));
      }
    } catch(e) {}
  }

  return keywords;
}

// PAA 질문을 롱테일 타이틀로 변환
function paaToLongtailTitle(paaQuestion, baseKeyword) {
  // 물음표 제거
  let title = paaQuestion.replace(/\?$/, '').trim();

  // "~는 무엇인가요" → "~란"으로 변환 X (자연스럽게 유지)
  // 콜론 추가
  if (!title.includes(':')) {
    // 핵심 부분 추출
    const parts = title.split(/은|는|이|가/);
    if (parts.length >= 2) {
      const subject = parts[0].trim();
      const predicate = parts.slice(1).join('').trim();

      // 3-4단어인지 확인
      const wordCount = subject.split(/\s+/).length;
      if (wordCount >= 2 && wordCount <= 4) {
        title = `${subject}: ${predicate}`;
      }
    }
  }

  return title;
}

// 중복 체크
function checkDuplicates(paaQuestions, existingKeywords) {
  const results = {
    unique: [],
    duplicates: []
  };

  for (const q of paaQuestions) {
    const normalized = q.toLowerCase().replace(/\?$/, '').trim();

    let isDuplicate = false;
    for (const existing of existingKeywords) {
      // 유사도 체크 (80% 이상 겹치면 중복)
      if (normalized.includes(existing) || existing.includes(normalized)) {
        isDuplicate = true;
        results.duplicates.push({ question: q, existingKeyword: existing });
        break;
      }
    }

    if (!isDuplicate) {
      results.unique.push(q);
    }
  }

  return results;
}

// Hub & Spoke 구조로 분류
function classifyHubSpoke(paaQuestions, baseKeyword) {
  const hub = [];
  const spoke = [];

  for (const q of paaQuestions) {
    const normalized = q.toLowerCase();

    // 베이스 키워드가 포함되어 있으면 직접 관련 (Hub 후보)
    if (normalized.includes(baseKeyword.toLowerCase())) {
      hub.push(q);
    } else {
      spoke.push(q);
    }
  }

  return { hub, spoke };
}

// 메인 실행 (CLI용)
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('사용법: node collect-google-paa.js "키워드" [--check-wiki]');
    process.exit(1);
  }

  const keyword = args[0];
  const checkWiki = args.includes('--check-wiki');

  console.log(`\n🔍 구글 PAA 수집: "${keyword}"\n`);
  console.log('⚠️  Playwright MCP로 실행해야 합니다.');
  console.log('    아래 코드를 browser_run_code로 실행하세요:\n');

  // Playwright 코드 출력
  console.log(`
async (page) => {
  const allQuestions = [];

  // 1. 구글 검색
  await page.goto('https://www.google.com/search?q=${encodeURIComponent(keyword)}&hl=ko');
  await page.waitForTimeout(2000);

  // 2. 관련 질문 영역으로 스크롤
  await page.evaluate(() => {
    const el = document.evaluate("//div[contains(text(), '관련 질문')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);

  // 3. 20번 반복 클릭 → 확장
  for (let round = 0; round < 20; round++) {
    // 현재 보이는 모든 질문 수집
    const questions = await page.evaluate(() => {
      const qs = [];
      document.querySelectorAll('[data-sgrd] div[role="button"], g-accordion-expander').forEach(el => {
        const text = el.innerText || el.textContent;
        if (text && (text.includes('?') || text.includes('${keyword.split(' ')[0]}'))) {
          const firstLine = text.split('\\n')[0].trim();
          if (firstLine.length > 5 && firstLine.length < 100) {
            qs.push(firstLine);
          }
        }
      });
      return qs;
    });

    questions.forEach(q => {
      if (!allQuestions.includes(q)) allQuestions.push(q);
    });

    // 아직 클릭 안 된 질문 클릭
    const unclickedButtons = await page.locator('[data-sgrd] div[role="button"][aria-expanded="false"]').all();
    if (unclickedButtons.length > 0) {
      try {
        await unclickedButtons[0].click();
        await page.waitForTimeout(600);
      } catch(e) {}
    }
  }

  return {
    keyword: '${keyword}',
    count: allQuestions.length,
    questions: allQuestions
  };
}
`);

  if (checkWiki) {
    console.log('\n📋 기존 Wiki 키워드 목록:');
    const existingKeywords = getExistingWikiKeywords();
    console.log(`   총 ${existingKeywords.size}개 키워드 발견\n`);
  }
}

// 모듈 export (다른 스크립트에서 사용 가능)
module.exports = {
  getExistingWikiKeywords,
  paaToLongtailTitle,
  checkDuplicates,
  classifyHubSpoke
};

// CLI 실행
if (require.main === module) {
  main();
}
