const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000  // 1초마다 천천히 실행
  });

  console.log('🚀 계산기 검증 시작...\n');

  // ========================================
  // 1. 국민연금공단 사이트에서 4대보험 요율 확인
  // ========================================
  console.log('=== 1단계: 국민연금공단 사이트 접속 ===');
  const page1 = await browser.newPage();
  await page1.goto('https://www.4insure.or.kr/pbiz/ntcn/inscSmlCalcView.do');
  await page1.waitForTimeout(3000);

  console.log('✅ 국민연금공단 계산기 페이지 열림');
  console.log('👀 수동으로 2026년 요율 확인하세요:');
  console.log('   - 국민연금: 4.5%');
  console.log('   - 건강보험: 3.595%');
  console.log('   - 장기요양: 건강보험의 12.95%');
  console.log('   - 고용보험: 0.9%');
  console.log('');

  await page1.waitForTimeout(10000);

  // ========================================
  // 2. 내 사이트 연봉 실수령액 계산기 확인
  // ========================================
  console.log('=== 2단계: jjyu.co.kr 연봉 실수령액 계산기 접속 ===');
  const page2 = await browser.newPage();
  await page2.goto('https://jjyu.co.kr/w/연봉-실수령액-계산기');
  await page2.waitForTimeout(3000);

  console.log('✅ 내 사이트 연봉 실수령액 계산기 열림');
  console.log('📝 테스트 케이스: 연봉 5,000만원 (4대보험 요율 확인)');
  console.log('');

  await page2.waitForTimeout(5000);

  // ========================================
  // 3. 퇴직금 계산기 검증
  // ========================================
  console.log('\n=== 3단계: 고용노동부 퇴직금 계산기 접속 ===');
  const page3 = await browser.newPage();
  await page3.goto('https://www.moel.go.kr/retirementpayCal.do');
  await page3.waitForTimeout(3000);

  console.log('✅ 고용노동부 퇴직금 계산기 열림');
  console.log('📝 테스트 케이스: 월급 300만원, 3년 근무');

  await page3.waitForTimeout(5000);

  // ========================================
  // 4. 내 사이트 퇴직금 계산기
  // ========================================
  console.log('\n=== 4단계: jjyu.co.kr 퇴직금 계산기 접속 ===');
  const page4 = await browser.newPage();
  await page4.goto('https://jjyu.co.kr/w/퇴직금-계산기');
  await page4.waitForTimeout(3000);

  console.log('✅ 내 사이트 퇴직금 계산기 열림');

  await page4.waitForTimeout(5000);

  // ========================================
  // 5. 실업급여 계산기 검증
  // ========================================
  console.log('\n=== 5단계: 고용24 실업급여 계산기 접속 ===');
  const page5 = await browser.newPage();
  await page5.goto('https://www.work.go.kr/seekWelfare/unemployment/unemploymentView.do');
  await page5.waitForTimeout(3000);

  console.log('✅ 고용24 실업급여 페이지 열림');

  await page5.waitForTimeout(5000);

  // ========================================
  // 6. 내 사이트 실업급여 계산기
  // ========================================
  console.log('\n=== 6단계: jjyu.co.kr 실업급여 계산기 접속 ===');
  const page6 = await browser.newPage();
  await page6.goto('https://jjyu.co.kr/w/실업급여-계산기');
  await page6.waitForTimeout(3000);

  console.log('✅ 내 사이트 실업급여 계산기 열림');
  console.log('📝 테스트 케이스: 월급 300만원, 3~5년 가입');

  await page6.waitForTimeout(5000);

  console.log('\n');
  console.log('='.repeat(60));
  console.log('🎯 검증 완료! 모든 탭이 열려있습니다.');
  console.log('👀 각 탭을 확인하면서 오차를 직접 비교하세요.');
  console.log('📊 비교 완료 후 브라우저를 닫으면 스크립트가 종료됩니다.');
  console.log('='.repeat(60));

  // 60초 대기 (사용자가 확인할 시간)
  await page1.waitForTimeout(60000);

  await browser.close();
  console.log('\n✅ 검증 완료!');
})();
