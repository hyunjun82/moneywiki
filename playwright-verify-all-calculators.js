const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  console.log('🚀 전체 계산기 실시간 검증 시작...\n');

  // ========================================
  // 1. 대출상환 계산기
  // ========================================
  console.log('=== 대출상환 계산기 검증 ===');
  const page1 = await browser.newPage();
  await page1.goto('https://jjyu.co.kr/w/대출상환-계산기');
  await page1.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 1억원, 5%, 12개월, 원리금균등');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page1.waitForTimeout(3000);

  // ========================================
  // 2. 예금이자 계산기
  // ========================================
  console.log('=== 예금이자 계산기 검증 ===');
  const page2 = await browser.newPage();
  await page2.goto('https://jjyu.co.kr/w/예금이자-계산기');
  await page2.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 1,000만원, 4%, 12개월, 단리');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page2.waitForTimeout(3000);

  // ========================================
  // 3. 적금 계산기
  // ========================================
  console.log('=== 적금 계산기 검증 ===');
  const page3 = await browser.newPage();
  await page3.goto('https://jjyu.co.kr/w/적금-계산기');
  await page3.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 월 100만원, 4%, 12개월');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page3.waitForTimeout(3000);

  // ========================================
  // 4. 양도소득세 계산기
  // ========================================
  console.log('=== 양도소득세 계산기 검증 ===');
  const page4 = await browser.newPage();
  await page4.goto('https://jjyu.co.kr/w/양도소득세-계산기');
  await page4.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 양도차익 5,000만원');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page4.waitForTimeout(3000);

  // ========================================
  // 5. 취득세 계산기
  // ========================================
  console.log('=== 취득세 계산기 검증 ===');
  const page5 = await browser.newPage();
  await page5.goto('https://jjyu.co.kr/w/취득세-계산기');
  await page5.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 주택 6억원, 1주택자');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page5.waitForTimeout(3000);

  // ========================================
  // 6. 자동차세 계산기
  // ========================================
  console.log('=== 자동차세 계산기 검증 ===');
  const page6 = await browser.newPage();
  await page6.goto('https://jjyu.co.kr/w/자동차세-계산기');
  await page6.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 승용차 2000cc, 3년');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page6.waitForTimeout(3000);

  // ========================================
  // 7. 재산세 계산기
  // ========================================
  console.log('=== 재산세 계산기 검증 ===');
  const page7 = await browser.newPage();
  await page7.goto('https://jjyu.co.kr/w/재산세-계산기');
  await page7.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 주택 공시가격 3억원');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page7.waitForTimeout(3000);

  // ========================================
  // 8. 종합부동산세 계산기
  // ========================================
  console.log('=== 종합부동산세 계산기 검증 ===');
  const page8 = await browser.newPage();
  await page8.goto('https://jjyu.co.kr/w/종합부동산세-계산기');
  await page8.waitForTimeout(2000);
  console.log('✅ 내 사이트 열림');
  console.log('📝 테스트: 공시가격 12억원, 1주택자');
  console.log('📌 수동으로 입력하고 결과 확인하세요\n');
  await page8.waitForTimeout(3000);

  console.log('\n');
  console.log('='.repeat(60));
  console.log('🎯 8개 계산기 탭 열림!');
  console.log('👀 각 탭에서 테스트 값 입력하고 결과 확인하세요');
  console.log('📊 오차 발견하면 알려주세요');
  console.log('='.repeat(60));

  // 60초 대기
  await page1.waitForTimeout(60000);

  await browser.close();
  console.log('\n✅ 검증 완료!');
})();
