/**
 * IndexNow 색인 요청 스크립트
 * 네이버 서치어드바이저에 sitemap.xml의 URL들을 전송
 *
 * 사용법: node scripts/submit-indexnow.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ===== 설정 =====
const HOST = 'www.jjyu.co.kr';
const KEY = 'cf14d2ece5b0438e848760be86604782';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://searchadvisor.naver.com/indexnow';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

// ===== sitemap.xml에서 URL 추출 =====
function extractUrlsFromSitemap(sitemapContent) {
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;

  while ((match = regex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

// ===== IndexNow API 전송 =====
function submitToIndexNow(urlList) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList.slice(0, 10000) // 최대 10,000개
    });

    const url = new URL(ENDPOINT);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          body: body
        });
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ===== sitemap.xml 웹에서 가져오기 =====
function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

// ===== 메인 =====
async function main() {
  console.log('========================================');
  console.log('🔍 IndexNow 색인 요청 스크립트');
  console.log('========================================');
  console.log(`📍 Host: ${HOST}`);
  console.log(`🔑 Key: ${KEY}`);
  console.log(`📂 Key Location: ${KEY_LOCATION}`);
  console.log('');

  // sitemap.xml 가져오기
  console.log(`📥 Sitemap 가져오는 중: ${SITEMAP_URL}`);

  let sitemapContent;
  try {
    sitemapContent = await fetchSitemap(SITEMAP_URL);
  } catch (error) {
    console.error('❌ sitemap.xml을 가져올 수 없습니다:', error.message);
    process.exit(1);
  }

  const urls = extractUrlsFromSitemap(sitemapContent);

  console.log(`📄 sitemap.xml에서 ${urls.length}개 URL 추출`);
  console.log('');

  if (urls.length === 0) {
    console.error('❌ URL을 찾을 수 없습니다.');
    process.exit(1);
  }

  // 처음 5개 URL 미리보기
  console.log('📋 URL 미리보기 (처음 5개):');
  urls.slice(0, 5).forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`);
  });
  if (urls.length > 5) {
    console.log(`   ... 외 ${urls.length - 5}개`);
  }
  console.log('');

  // IndexNow 전송
  console.log('🚀 네이버 서치어드바이저에 전송 중...');

  try {
    const result = await submitToIndexNow(urls);

    console.log('');
    console.log('========================================');
    if (result.statusCode === 200 || result.statusCode === 202) {
      console.log(`✅ 성공! ${result.statusCode} ${result.statusMessage}`);
      console.log(`📊 전송된 URL: ${urls.length}개`);
    } else {
      console.log(`⚠️ 응답: ${result.statusCode} ${result.statusMessage}`);
      if (result.body) {
        console.log(`📝 Body: ${result.body}`);
      }
    }
    console.log('========================================');

  } catch (error) {
    console.error('❌ 전송 실패:', error.message);
    process.exit(1);
  }
}

main();
