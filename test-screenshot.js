const { chromium } = require('playwright');

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.setViewportSize({ width: 1200, height: 800 });

  // 1. 4대보험 계산기 - 300만원
  console.log('4대보험 계산기 스크린샷 캡처...');
  await page.goto('https://www.jjyu.co.kr/w/4%EB%8C%80%EB%B3%B4%ED%97%98%EB%A3%8C-%EA%B3%84%EC%82%B0%EA%B8%B0');
  await page.waitForTimeout(2000);
  await page.click('button:has-text("300만")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-insurance-300.png', fullPage: true });
  console.log('  → test-insurance-300.png 저장됨');

  // 2. 실업급여 계산기 - 기본값
  console.log('실업급여 계산기 스크린샷 캡처...');
  await page.goto('https://www.jjyu.co.kr/w/%EC%8B%A4%EC%97%85%EA%B8%89%EC%97%AC-%EA%B3%84%EC%82%B0%EA%B8%B0');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test-unemployment-300.png', fullPage: true });
  console.log('  → test-unemployment-300.png 저장됨');

  // 3. 주휴수당 계산기
  console.log('주휴수당 계산기 스크린샷 캡처...');
  await page.goto('https://www.jjyu.co.kr/w/%EC%A3%BC%ED%9C%B4%EC%88%98%EB%8B%B9-%EA%B3%84%EC%82%B0%EA%B8%B0');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test-weekly-holiday.png', fullPage: true });
  console.log('  → test-weekly-holiday.png 저장됨');

  // 값들 직접 확인
  console.log('\n=== 실제 계산 결과 확인 ===');

  // 4대보험
  await page.goto('https://www.jjyu.co.kr/w/4%EB%8C%80%EB%B3%B4%ED%97%98%EB%A3%8C-%EA%B3%84%EC%82%B0%EA%B8%B0');
  await page.waitForTimeout(2000);
  await page.click('button:has-text("300만")');
  await page.waitForTimeout(1000);

  const insuranceResults = await page.$$eval('table tbody tr td', tds => {
    return tds.map(td => td.textContent.trim());
  });
  console.log('\n4대보험 (300만원):');
  console.log('  결과 테이블:', insuranceResults.slice(0,12).join(' | '));

  // 실업급여
  await page.goto('https://www.jjyu.co.kr/w/%EC%8B%A4%EC%97%85%EA%B8%89%EC%97%AC-%EA%B3%84%EC%82%B0%EA%B8%B0');
  await page.waitForTimeout(2000);

  const unemploymentResults = await page.evaluate(() => {
    // 결과 영역에서 값 추출
    const resultDiv = document.querySelector('.bg-gradient-to-r.from-emerald-50');
    if (!resultDiv) return { error: '결과 영역 못찾음' };

    const totalText = resultDiv.querySelector('.text-4xl')?.textContent;
    const subText = resultDiv.querySelector('.text-sm.text-neutral-500')?.textContent;

    // 카드들에서 값 추출
    const cards = resultDiv.querySelectorAll('.bg-white.rounded-xl.p-4');
    const cardValues = {};
    cards.forEach(card => {
      const label = card.querySelector('.text-xs')?.textContent;
      const value = card.querySelector('.text-xl')?.textContent;
      if (label && value) cardValues[label] = value;
    });

    return { totalText, subText, cardValues };
  });
  console.log('\n실업급여 (기본값 300만원):');
  console.log('  총 예상 수령액:', unemploymentResults.totalText);
  console.log('  계산식:', unemploymentResults.subText);
  console.log('  세부값:', JSON.stringify(unemploymentResults.cardValues));

  await browser.close();
  console.log('\n스크린샷 저장 완료!');
}

takeScreenshots().catch(console.error);
