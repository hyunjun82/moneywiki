#!/usr/bin/env node
/**
 * PAA (People Also Ask) 수집 워크플로우
 *
 * Playwright MCP를 통해 구글 PAA를 수집하고
 * Hub & Spoke 구조로 분류하여 저장
 *
 * 사용법:
 *   1. Playwright MCP가 활성화된 상태에서
 *   2. browser_run_code로 collectPAA 함수 실행
 */

const fs = require('fs');
const path = require('path');

// PAA 결과 저장 디렉토리
const PAA_DATA_DIR = path.join(__dirname, '..', 'data', 'paa-results');

// 디렉토리 생성
if (!fs.existsSync(PAA_DATA_DIR)) {
  fs.mkdirSync(PAA_DATA_DIR, { recursive: true });
}

/**
 * PAA 질문을 Hub/Spoke로 분류
 */
function classifyQuestions(questions, baseKeyword) {
  const hub = [];
  const spoke = [];
  const irrelevant = [];

  const keywordParts = baseKeyword.toLowerCase().split(' ');

  for (const q of questions) {
    const qLower = q.toLowerCase();

    // 베이스 키워드 단어 중 하나라도 포함되면 관련 질문
    const isRelated = keywordParts.some(part => qLower.includes(part));

    if (isRelated) {
      // 베이스 키워드가 직접 포함되면 Hub
      if (qLower.includes(baseKeyword.toLowerCase())) {
        hub.push(q);
      } else {
        spoke.push(q);
      }
    } else {
      irrelevant.push(q);
    }
  }

  return { hub, spoke, irrelevant };
}

/**
 * PAA 질문을 롱테일 타이틀로 변환
 */
function paaToTitle(paaQuestion, baseKeyword) {
  // 물음표 제거
  let title = paaQuestion.replace(/\?$/, '').trim();

  // "~은/는" 패턴 찾기
  const patterns = [
    /(.+)(은|는)\s*(어떻게|얼마|언제|무엇|뭔가요)/,
    /(.+)(이|가)\s*(뭔가요|무엇인가요|어떻게)/
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) {
      const subject = match[1].trim();
      // 이미 베이스 키워드가 있는지 확인
      if (!subject.includes(baseKeyword)) {
        title = `${baseKeyword} ${subject}`;
      }
      break;
    }
  }

  return title;
}

/**
 * PAA 결과를 JSON 파일로 저장
 */
function savePAAResults(keyword, questions) {
  const classified = classifyQuestions(questions, keyword);

  const result = {
    keyword,
    collectedAt: new Date().toISOString().split('T')[0],
    totalCount: questions.length,
    hubCount: classified.hub.length,
    spokeCount: classified.spoke.length,
    hubQuestions: classified.hub,
    spokeQuestions: classified.spoke,
    irrelevantQuestions: classified.irrelevant
  };

  const filename = keyword.replace(/\s+/g, '-') + '-paa.json';
  const filepath = path.join(PAA_DATA_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(result, null, 2), 'utf8');

  return { filepath, result };
}

/**
 * Playwright MCP용 PAA 수집 코드 생성
 */
function generatePlaywrightCode(keyword) {
  return `async (page) => {
  const allQuestions = new Set();

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
      document.querySelectorAll('[data-sgrd] div[role="button"], g-accordion-expander, [jsname="Cpkphb"]').forEach(el => {
        const text = el.innerText || el.textContent;
        if (text) {
          const firstLine = text.split('\\n')[0].trim();
          if (firstLine.length > 5 && firstLine.length < 150 && firstLine.includes('?')) {
            qs.push(firstLine);
          }
        }
      });
      return qs;
    });

    questions.forEach(q => allQuestions.add(q));

    // 아직 클릭 안 된 질문 버튼 클릭
    try {
      const unclickedButtons = await page.locator('[data-sgrd] div[role="button"][aria-expanded="false"]').all();
      if (unclickedButtons.length > 0) {
        await unclickedButtons[0].click();
        await page.waitForTimeout(800);
      } else {
        break;
      }
    } catch(e) {}
  }

  return {
    keyword: '${keyword}',
    count: allQuestions.size,
    questions: Array.from(allQuestions)
  };
}`;
}

// CLI 실행
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('PAA 수집 워크플로우');
    console.log('==================');
    console.log('');
    console.log('사용법:');
    console.log('  node paa-workflow.js generate "키워드"  → Playwright 코드 생성');
    console.log('  node paa-workflow.js save "키워드" \'["질문1", "질문2"]\'  → 결과 저장');
    console.log('');
    console.log('Playwright MCP에서 직접 실행:');
    console.log('  1. browser_navigate로 google.com 접속');
    console.log('  2. browser_run_code로 generatePlaywrightCode() 결과 실행');
    process.exit(0);
  }

  const command = args[0];

  if (command === 'generate') {
    const keyword = args[1] || '개인파산 면책';
    console.log(generatePlaywrightCode(keyword));
  } else if (command === 'save') {
    const keyword = args[1];
    const questions = JSON.parse(args[2]);
    const { filepath, result } = savePAAResults(keyword, questions);
    console.log(`✅ 저장 완료: ${filepath}`);
    console.log(`   Hub: ${result.hubCount}개, Spoke: ${result.spokeCount}개`);
  }
}

module.exports = {
  classifyQuestions,
  paaToTitle,
  savePAAResults,
  generatePlaywrightCode,
  PAA_DATA_DIR
};
