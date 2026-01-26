const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const errors = [];

  console.log('🚀 계산기 자동 검증 시작...\n');

  // ========================================
  // 1. 대출이자 계산기
  // ========================================
  console.log('=== 대출이자 계산기 ===');
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/대출이자-계산기');
    await page.waitForTimeout(2000);

    // 단리 선택
    await page.click('text=단리');
    await page.waitForTimeout(500);

    // 1억원 입력
    await page.fill('input[placeholder="대출금액"]', '100000000');
    await page.waitForTimeout(500);

    // 금리 5%
    await page.fill('input[type="number"][step="0.1"]', '5');
    await page.waitForTimeout(500);

    // 36개월 선택
    await page.selectOption('select', '36');
    await page.waitForTimeout(1000);

    // 결과 확인
    const result = await page.textContent('.text-red-600');
    console.log('결과:', result);

    // 예상값: 15,000,000원
    if (result.includes('15,000,000')) {
      console.log('✅ 정확\n');
    } else {
      console.log('❌ 오차 발견:', result);
      errors.push('대출이자 계산기 - 단리');
    }

    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('대출이자 계산기 - 에러');
  }

  // ========================================
  // 2. 복리 계산기
  // ========================================
  console.log('=== 복리 계산기 ===');
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/복리-계산기');
    await page.waitForTimeout(2000);

    // 1,000만원 입력
    const principalInput = await page.$('input[type="text"]');
    await principalInput.fill('10000000');
    await page.waitForTimeout(500);

    // 금리 5%
    const rateInput = await page.$('input[type="number"]');
    await rateInput.fill('5');
    await page.waitForTimeout(500);

    // 10년
    const yearsInput = await page.$$('input[type="number"]');
    if (yearsInput[1]) {
      await yearsInput[1].fill('10');
      await page.waitForTimeout(1000);
    }

    // 결과 확인 (예상: 16,288,946원)
    const resultText = await page.textContent('body');
    if (resultText.includes('16,288,946') || resultText.includes('16,289')) {
      console.log('✅ 정확\n');
    } else {
      console.log('⚠️ 결과 확인 필요');
      console.log('페이지 텍스트 일부:', resultText.substring(0, 500));
      errors.push('복리 계산기 - 확인 필요');
    }

    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('복리 계산기 - 에러');
  }

  // ========================================
  // 3. 예금이자 계산기
  // ========================================
  console.log('=== 예금이자 계산기 ===');
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/예금이자-계산기');
    await page.waitForTimeout(2000);

    // 단리 선택
    await page.click('text=단리');
    await page.waitForTimeout(500);

    // 1,000만원
    await page.fill('input[type="text"]', '10000000');
    await page.waitForTimeout(500);

    // 4%
    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('4');
    await page.waitForTimeout(500);

    // 12개월
    if (inputs[1]) await inputs[1].fill('12');
    await page.waitForTimeout(1000);

    // 결과: 400,000원
    const resultText = await page.textContent('body');
    if (resultText.includes('400,000')) {
      console.log('✅ 정확\n');
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('예금이자 계산기 - 확인 필요');
    }

    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('예금이자 계산기 - 에러');
  }

  // ========================================
  // 4. 적금 계산기
  // ========================================
  console.log('=== 적금 계산기 ===');
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/적금-계산기');
    await page.waitForTimeout(2000);

    // 월 100만원
    await page.fill('input[type="text"]', '1000000');
    await page.waitForTimeout(500);

    // 4%
    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('4');
    await page.waitForTimeout(500);

    // 12개월
    if (inputs[1]) await inputs[1].fill('12');
    await page.waitForTimeout(1000);

    // 결과: 260,000원
    const resultText = await page.textContent('body');
    if (resultText.includes('260,000')) {
      console.log('✅ 정확\n');
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('적금 계산기 - 확인 필요');
    }

    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('적금 계산기 - 에러');
  }

  // ========================================
  // 최종 결과
  // ========================================
  console.log('\n' + '='.repeat(60));
  if (errors.length === 0) {
    console.log('✅ 모든 계산기 검증 완료!');
  } else {
    console.log('⚠️ 오차 발견:', errors.length + '개');
    errors.forEach(err => console.log('  - ' + err));
  }
  console.log('='.repeat(60));

  await browser.close();
})();
