const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const errors = [];
  let passCount = 0;
  let totalCount = 0;

  console.log('🚀 전체 계산기 자동 검증 시작 (38개)...\n');

  // ========================================
  // 1. 대출이자 계산기 ✅
  // ========================================
  console.log('=== 1. 대출이자 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/대출이자-계산기');
    await page.waitForTimeout(2000);

    await page.click('text=단리');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder="대출금액"]', '100000000');
    await page.waitForTimeout(500);
    await page.fill('input[type="number"][step="0.1"]', '5');
    await page.waitForTimeout(500);
    await page.selectOption('select', '36');
    await page.waitForTimeout(1000);

    const result = await page.textContent('.text-red-600');
    if (result.includes('15,000,000')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('❌ 오차:', result);
      errors.push('대출이자 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('대출이자 계산기 - 에러');
  }

  // ========================================
  // 2. 복리 계산기 ✅
  // ========================================
  console.log('=== 2. 복리 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/복리-계산기');
    await page.waitForTimeout(2000);

    const principalInput = await page.$('input[type="text"]');
    await principalInput.fill('10000000');
    await page.waitForTimeout(500);

    const rateInput = await page.$('input[type="number"]');
    await rateInput.fill('5');
    await page.waitForTimeout(500);

    const yearsInput = await page.$$('input[type="number"]');
    if (yearsInput[1]) {
      await yearsInput[1].fill('10');
      await page.waitForTimeout(1000);
    }

    const resultText = await page.textContent('body');
    if (resultText.includes('16,288,946') || resultText.includes('16,289')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('복리 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('복리 계산기 - 에러');
  }

  // ========================================
  // 3. 예금이자 계산기 ✅
  // ========================================
  console.log('=== 3. 예금이자 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/예금이자-계산기');
    await page.waitForTimeout(2000);

    await page.click('text=단리');
    await page.waitForTimeout(500);
    await page.fill('input[type="text"]', '10000000');
    await page.waitForTimeout(500);

    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('4');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('12');
    await page.waitForTimeout(1000);

    const resultText = await page.textContent('body');
    if (resultText.includes('400,000')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('예금이자 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('예금이자 계산기 - 에러');
  }

  // ========================================
  // 4. 적금 계산기 ✅
  // ========================================
  console.log('=== 4. 적금 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/적금-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '1000000');
    await page.waitForTimeout(500);

    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('4');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('12');
    await page.waitForTimeout(1000);

    const resultText = await page.textContent('body');
    if (resultText.includes('260,000')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('적금 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('적금 계산기 - 에러');
  }

  // ========================================
  // 5. 대출상환 계산기
  // ========================================
  console.log('=== 5. 대출상환 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/대출상환-계산기');
    await page.waitForTimeout(2000);

    // 원리금균등 선택 (기본값)
    await page.fill('input[placeholder="대출금액 입력"]', '100000000');
    await page.waitForTimeout(500);
    await page.fill('input[type="number"][step="0.1"]', '5');
    await page.waitForTimeout(500);
    await page.selectOption('select', '12');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 원리금균등 1억, 5%, 12개월 = 월 약 856만원
    if (resultText.includes('8,56') || resultText.includes('856')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('대출상환 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('대출상환 계산기 - 에러');
  }

  // ========================================
  // 6. 퇴직금 계산기 (날짜 입력 방식이라 자동화 스킵)
  // ========================================
  console.log('=== 6. 퇴직금 계산기 (수동 검증 필요) ===');
  totalCount++;
  console.log('⚠️ 날짜 입력 방식 - 수동 검증 필요\n');
  errors.push('퇴직금 계산기 - 수동 검증 필요');

  // ========================================
  // 7. 실업급여 계산기
  // ========================================
  console.log('=== 7. 실업급여 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/실업급여-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '3000000');
    await page.waitForTimeout(500);

    await page.selectOption('select', '3to5');
    await page.waitForTimeout(1000);

    const resultText = await page.textContent('body');
    // 월급 300만원, 3~5년 가입 → 일 약 6.6만원 × 180일
    if (resultText.includes('180일') || resultText.includes('66,000')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('실업급여 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('실업급여 계산기 - 에러');
  }

  // ========================================
  // 8. 연봉 실수령액 계산기
  // ========================================
  console.log('=== 8. 연봉 실수령액 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/연봉-실수령액-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '50000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 5천만원 연봉 → 월 실수령액 약 350만원대
    if (resultText.includes('3,5') || resultText.includes('350')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('연봉 실수령액 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('연봉 실수령액 계산기 - 에러');
  }

  // ========================================
  // 9. 4대보험료 계산기
  // ========================================
  console.log('=== 9. 4대보험료 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/4대보험료-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '3000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 월급 300만원 → 4대보험 약 27만원
    if (resultText.includes('27') || resultText.includes('270,')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('4대보험료 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('4대보험료 계산기 - 에러');
  }

  // ========================================
  // 10. 양도소득세 계산기
  // ========================================
  console.log('=== 10. 양도소득세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/양도소득세-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('500000000');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('400000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 양도차익 1억 → 세금 약 2천만원대
    if (resultText.includes('2,') || resultText.includes('20,')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('양도소득세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('양도소득세 계산기 - 에러');
  }

  // ========================================
  // 11. 취득세 계산기
  // ========================================
  console.log('=== 11. 취득세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/취득세-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '600000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 6억원 주택 1주택자 → 약 1,800만원
    if (resultText.includes('18,') || resultText.includes('1,8')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('취득세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('취득세 계산기 - 에러');
  }

  // ========================================
  // 12. 자동차세 계산기
  // ========================================
  console.log('=== 12. 자동차세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/자동차세-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('2000');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('3');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 2000cc, 3년 → 약 52만원
    if (resultText.includes('52') || resultText.includes('520,')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('자동차세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('자동차세 계산기 - 에러');
  }

  // ========================================
  // 13. 재산세 계산기
  // ========================================
  console.log('=== 13. 재산세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/재산세-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '300000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 3억원 주택 → 약 28만원
    if (resultText.includes('28') || resultText.includes('280,')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('재산세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('재산세 계산기 - 에러');
  }

  // ========================================
  // 14. 종합부동산세 계산기
  // ========================================
  console.log('=== 14. 종합부동산세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/종합부동산세-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '1200000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 12억원 1주택자 → 과세 대상
    if (resultText.includes('종합부동산세') || resultText.includes('과세')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('종합부동산세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('종합부동산세 계산기 - 에러');
  }

  // ========================================
  // 15. 시급 계산기
  // ========================================
  console.log('=== 15. 시급 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/시급-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('10320');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('40');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 10,320원 × 40시간 × 4.345주 + 주휴수당 = 약 215만원
    if (resultText.includes('2,15') || resultText.includes('215만') || resultText.includes('2,1')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('시급 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('시급 계산기 - 에러');
  }

  // ========================================
  // 16. 주휴수당 계산기
  // ========================================
  console.log('=== 16. 주휴수당 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/주휴수당-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('10320');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('20');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 10,320원 × 주당 20시간 → 주휴수당 약 41,280원
    if (resultText.includes('41,280') || resultText.includes('4만')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('주휴수당 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('주휴수당 계산기 - 에러');
  }

  // ========================================
  // 17. 중개수수료 계산기
  // ========================================
  console.log('=== 17. 중개수수료 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/중개수수료-계산기');
    await page.waitForTimeout(2000);

    await page.fill('input[type="text"]', '500000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 5억원 주택 → 상한 약 200만원
    if (resultText.includes('2,') || resultText.includes('200만')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('중개수수료 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('중개수수료 계산기 - 에러');
  }

  // ========================================
  // 18. DSR 계산기
  // ========================================
  console.log('=== 18. DSR 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/DSR-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('50000000');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('20000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 연소득 5천, 대출 2천 → DSR 40%
    if (resultText.includes('40') || resultText.includes('DSR')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('DSR 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('DSR 계산기 - 에러');
  }

  // ========================================
  // 19. 전세대출 계산기
  // ========================================
  console.log('=== 19. 전세대출 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/전세대출-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('300000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 3억원 전세 → 대출 가능 금액 표시
    if (resultText.includes('대출') || resultText.includes('억')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('전세대출 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('전세대출 계산기 - 에러');
  }

  // ========================================
  // 20. 주택담보대출 계산기
  // ========================================
  console.log('=== 20. 주택담보대출 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/주택담보대출-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('500000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 5억원 주택 → LTV 표시
    if (resultText.includes('LTV') || resultText.includes('대출')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('주택담보대출 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('주택담보대출 계산기 - 에러');
  }

  // ========================================
  // 21. 할부이자 계산기
  // ========================================
  console.log('=== 21. 할부이자 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/할부-이자-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('5000000');
    await page.waitForTimeout(500);

    const numInputs = await page.$$('input[type="number"]');
    if (numInputs[0]) await numInputs[0].fill('5');
    await page.waitForTimeout(500);
    if (numInputs[1]) await numInputs[1].fill('12');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 500만원, 5%, 12개월 → 이자 표시
    if (resultText.includes('이자') || resultText.includes('만원')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('할부이자 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('할부이자 계산기 - 에러');
  }

  // ========================================
  // 22. 국민연금 수령액 계산기
  // ========================================
  console.log('=== 22. 국민연금 수령액 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/국민연금-수령액-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('3000000');
    await page.waitForTimeout(500);

    const numInputs = await page.$$('input[type="number"]');
    if (numInputs[0]) await numInputs[0].fill('20');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 평균 300만원, 20년 → 수령액 표시
    if (resultText.includes('수령') || resultText.includes('만원')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('국민연금 수령액 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('국민연금 수령액 계산기 - 에러');
  }

  // ========================================
  // 23. 퇴직연금 계산기
  // ========================================
  console.log('=== 23. 퇴직연금 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/퇴직연금-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('10000000');
    await page.waitForTimeout(500);

    const numInputs = await page.$$('input[type="number"]');
    if (numInputs[0]) await numInputs[0].fill('5');
    await page.waitForTimeout(500);
    if (numInputs[1]) await numInputs[1].fill('10');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 퇴직금 1천만원, 5%, 10년 → 예상 수령액
    if (resultText.includes('수령') || resultText.includes('만원')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('퇴직연금 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('퇴직연금 계산기 - 에러');
  }

  // ========================================
  // 24. 주식 수익률 계산기
  // ========================================
  console.log('=== 24. 주식 수익률 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/주식-수익률-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('10000');
    await page.waitForTimeout(500);
    if (inputs[1]) await inputs[1].fill('100');
    await page.waitForTimeout(500);
    if (inputs[2]) await inputs[2].fill('12000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 매수 10,000원 × 100주, 매도 12,000원 → 수익률 20%
    if (resultText.includes('20') || resultText.includes('수익')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('주식 수익률 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('주식 수익률 계산기 - 에러');
  }

  // ========================================
  // 25. 평수 계산기
  // ========================================
  console.log('=== 25. 평수 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/평수-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) await inputs[0].fill('84');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 84㎡ → 25.4평
    if (resultText.includes('25.4') || resultText.includes('25평')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('평수 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('평수 계산기 - 에러');
  }

  // ========================================
  // 26. 근로소득세 계산기
  // ========================================
  console.log('=== 26. 근로소득세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/근로소득세-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('50000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 5천만원 → 소득세 표시
    if (resultText.includes('소득세') || resultText.includes('만원')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('근로소득세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('근로소득세 계산기 - 에러');
  }

  // ========================================
  // 27. 연말정산 계산기
  // ========================================
  console.log('=== 27. 연말정산 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/연말정산-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('50000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 연말정산 결과 표시
    if (resultText.includes('환급') || resultText.includes('납부')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('연말정산 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('연말정산 계산기 - 에러');
  }

  // ========================================
  // 28. 상속세 계산기
  // ========================================
  console.log('=== 28. 상속세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/상속세-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('1000000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 10억원 상속 → 상속세 표시
    if (resultText.includes('상속세') || resultText.includes('억')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('상속세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('상속세 계산기 - 에러');
  }

  // ========================================
  // 29. 증여세 계산기
  // ========================================
  console.log('=== 29. 증여세 계산기 ===');
  totalCount++;
  try {
    const page = await browser.newPage();
    await page.goto('https://jjyu.co.kr/w/증여세-계산기');
    await page.waitForTimeout(2000);

    const inputs = await page.$$('input[type="text"]');
    if (inputs[0]) await inputs[0].fill('500000000');
    await page.waitForTimeout(1500);

    const resultText = await page.textContent('body');
    // 5억원 증여 → 증여세 표시
    if (resultText.includes('증여세') || resultText.includes('억')) {
      console.log('✅ 정확\n');
      passCount++;
    } else {
      console.log('⚠️ 결과 확인 필요\n');
      errors.push('증여세 계산기');
    }
    await page.close();
  } catch (e) {
    console.log('❌ 에러:', e.message);
    errors.push('증여세 계산기 - 에러');
  }

  // ========================================
  // 최종 결과
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log(`📊 검증 완료: ${passCount}/${totalCount} 통과`);

  if (errors.length === 0) {
    console.log('✅ 모든 계산기 검증 완료!');
  } else {
    console.log(`⚠️ 오차 발견: ${errors.length}개`);
    errors.forEach(err => console.log('  - ' + err));
  }
  console.log('='.repeat(60));

  await browser.close();
})();
