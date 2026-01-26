const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('📊 대출이자 계산기 검증 시작...\n');

  // 실제 사이트 접속
  await page.goto('https://jjyu.co.kr/calculators/loan-interest');
  await page.waitForTimeout(2000);

  // 테스트 케이스 1: 1억원, 5%, 36개월, 단리
  console.log('=== 테스트 1: 1억원, 5%, 36개월, 단리 ===');

  // 단리 선택
  await page.click('text=단리');

  // 대출금액 입력
  await page.fill('input[placeholder="대출금액"]', '100000000');

  // 금리 입력
  await page.fill('input[type="number"][step="0.1"]', '5');

  // 기간 선택
  await page.selectOption('select', { value: '36' });

  await page.waitForTimeout(1000);

  // 결과 확인
  const simpleInterest = await page.textContent('.text-red-600');
  console.log('단리 총 이자:', simpleInterest);
  console.log('예상값: 15,000,000원 (1,500만원)\n');

  // 테스트 케이스 2: 복리로 전환
  console.log('=== 테스트 2: 1억원, 5%, 36개월, 복리 ===');

  await page.click('text=복리 (월복리)');
  await page.waitForTimeout(1000);

  const compoundInterest = await page.textContent('.text-red-600');
  console.log('복리 총 이자:', compoundInterest);
  console.log('예상값: 16,147,223원 (1,615만원)\n');

  console.log('✅ 브라우저를 열어두었습니다. 수동으로 확인하세요.');
  console.log('확인 후 브라우저를 닫으면 스크립트가 종료됩니다.');

  // 30초 대기
  await page.waitForTimeout(30000);

  await browser.close();
})();
