/**
 * 네이버 서치어드바이저 API - 자동 색인 요청
 *
 * 사용법:
 * npx tsx scripts/submit-to-naver.ts https://www.jjyu.co.kr/w/퇴직금-계산
 *
 * 또는 여러 URL 한번에:
 * npx tsx scripts/submit-to-naver.ts url1 url2 url3
 */

import * as https from 'https';

interface NaverApiConfig {
  clientId: string;
  clientSecret: string;
}

// 환경변수에서 가져오거나 직접 입력
const NAVER_CONFIG: NaverApiConfig = {
  clientId: process.env.NAVER_CLIENT_ID || '', // 네이버 클라이언트 ID
  clientSecret: process.env.NAVER_CLIENT_SECRET || '', // 네이버 클라이언트 Secret
};

/**
 * 네이버 서치어드바이저에 URL 제출
 */
async function submitToNaver(url: string): Promise<void> {
  if (!NAVER_CONFIG.clientId || !NAVER_CONFIG.clientSecret) {
    console.error('❌ 네이버 API 키가 설정되지 않았습니다.');
    console.error('   환경변수 NAVER_CLIENT_ID, NAVER_CLIENT_SECRET 설정 필요');
    process.exit(1);
  }

  const options = {
    hostname: 'searchadvisor.naver.com',
    port: 443,
    path: '/indexing/url-submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': NAVER_CONFIG.clientId,
      'X-Naver-Client-Secret': NAVER_CONFIG.clientSecret,
    },
  };

  const data = JSON.stringify({
    url: url,
  });

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ 네이버 색인 요청 성공: ${url}`);
          resolve();
        } else {
          console.error(`❌ 네이버 색인 요청 실패 (${res.statusCode}): ${url}`);
          console.error(`   응답: ${body}`);
          reject(new Error(body));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ 네이버 API 요청 오류: ${error.message}`);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * 여러 URL 순차 제출
 */
async function submitMultipleUrls(urls: string[]): Promise<void> {
  console.log(`\n🚀 네이버 색인 요청 시작 (${urls.length}개 URL)\n`);

  for (const url of urls) {
    try {
      await submitToNaver(url);
      // API 호출 제한 방지 (0.5초 대기)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`⚠️ 건너뜀: ${url}`);
    }
  }

  console.log(`\n✅ 완료! 네이버가 24시간 내 크롤링 시작합니다.\n`);
}

// ===== CLI 실행 =====

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('사용법: npx tsx scripts/submit-to-naver.ts <URL1> [URL2] [URL3] ...');
  console.error('예시: npx tsx scripts/submit-to-naver.ts https://www.jjyu.co.kr/w/퇴직금-계산');
  process.exit(1);
}

submitMultipleUrls(args)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`❌ 실행 오류: ${error.message}`);
    process.exit(1);
  });
