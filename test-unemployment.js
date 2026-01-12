const { chromium } = require('playwright');

async function testUnemployment() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('=== 실업급여 계산기 정밀 테스트 ===\n');

  await page.goto('https://www.jjyu.co.kr/w/%EC%8B%A4%EC%97%85%EA%B8%89%EC%97%AC-%EA%B3%84%EC%82%B0%EA%B8%B0');
  await page.waitForTimeout(3000);

  // 현재 기본값(300만원) 결과 확인
  console.log('【테스트 1】 기본값 300만원 (하한액 적용 케이스)');

  let result = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      dailyWage: text.match(/1일 평균임금.*?(\d{1,3}(,\d{3})*)/)?.[1],
      dailyBenefit: text.match(/1일 구직급여.*?(\d{1,3}(,\d{3})*)/)?.[1],
      monthly: text.match(/월 예상 수령액.*?(\d{1,3}(,\d{3})*)/)?.[1],
      total: text.match(/총 예상 수령액\n(\d{1,3}(,\d{3})*)/)?.[1],
      hasLowerLimit: text.includes('하한액 적용'),
      hasUpperLimit: text.includes('상한액 적용')
    };
  });

  console.log('  1일 평균임금: ' + result.dailyWage + '원');
  console.log('  1일 구직급여: ' + result.dailyBenefit + '원');
  console.log('  하한액 적용: ' + (result.hasLowerLimit ? '예' : '아니오'));
  console.log('  상한액 적용: ' + (result.hasUpperLimit ? '예' : '아니오'));

  // 300만원 검증
  // 1일 평균임금: 300만/30 = 100,000원
  // 1일 구직급여: 100,000 × 60% = 60,000원 → 하한액 66,048원 적용
  console.log('\n  [검증]');
  console.log('  예상 1일 평균임금: 100,000원 (300만÷30)');
  console.log('  예상 1일 구직급여: 60,000원 → 하한액 66,048원 적용');
  console.log('  예상 180일 총액: 11,888,640원');

  // 월급 500만원 입력 (상한액 적용 케이스)
  console.log('\n【테스트 2】 500만원 입력 (상한액 적용 케이스)');

  // 기존 값 지우고 새 값 입력
  const input = await page.$('input[type="text"]');
  await input.click({ clickCount: 3 });
  await page.keyboard.press('Backspace');
  await input.type('5000000');
  await page.waitForTimeout(1000);

  result = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      dailyWage: text.match(/1일 평균임금.*?(\d{1,3}(,\d{3})*)/)?.[1],
      dailyBenefit60: text.match(/60%\)\n(\d{1,3}(,\d{3})*)/)?.[1],
      hasUpperLimit: text.includes('상한액 적용'),
      upperLimitValue: text.match(/상한액 적용.*?68,100/)?.[0]
    };
  });

  console.log('  1일 평균임금: ' + result.dailyWage + '원');
  console.log('  1일 구직급여(60%): ' + result.dailyBenefit60 + '원');
  console.log('  상한액 적용: ' + (result.hasUpperLimit ? '예 (68,100원)' : '아니오'));

  // 500만원 검증
  // 1일 평균임금: 500만/30 = 166,667원
  // 1일 구직급여: 166,667 × 60% = 100,000원 → 상한액 68,100원 적용
  console.log('\n  [검증]');
  console.log('  예상 1일 평균임금: 166,667원 (500만÷30)');
  console.log('  예상 1일 구직급여: 100,000원 → 상한액 68,100원 적용');
  console.log('  예상 180일 총액: 12,258,000원');

  // 화면에서 실제 총액 확인
  const totalAmount = await page.evaluate(() => {
    const match = document.body.innerText.match(/총 예상 수령액\n(\d{1,3}(,\d{3})*)/);
    return match ? match[1] : 'not found';
  });
  console.log('  실제 총액: ' + totalAmount + '원');

  await browser.close();
  console.log('\n=== 테스트 완료 ===');
}

testUnemployment().catch(console.error);
