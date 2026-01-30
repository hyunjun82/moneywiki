import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'cf14d2ece5b0438e848760be86604782';
const HOST = 'jjyu.co.kr';

// IndexNow 제출 함수
async function submitToIndexNow(urls: string[]) {
  const indexNowEndpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const results = await Promise.allSettled(
    indexNowEndpoints.map(endpoint =>
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    )
  );

  return results;
}

// POST: URL 목록 제출
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'urls 배열이 필요합니다' },
        { status: 400 }
      );
    }

    // IndexNow에 제출
    const results = await submitToIndexNow(urls);

    const responses = results.map((result, index) => ({
      endpoint: index === 0 ? 'indexnow.org' : 'bing.com',
      status: result.status === 'fulfilled' ? 'success' : 'failed',
      statusCode: result.status === 'fulfilled' ? result.value.status : null,
    }));

    return NextResponse.json({
      success: true,
      submitted: urls.length,
      urls,
      responses,
    });
  } catch (error) {
    console.error('IndexNow 제출 오류:', error);
    return NextResponse.json(
      { error: '제출 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// GET: sitemap에서 모든 URL 가져와서 제출
export async function GET() {
  try {
    // sitemap.xml 가져오기
    const sitemapUrl = `https://${HOST}/sitemap.xml`;
    const response = await fetch(sitemapUrl);
    const xml = await response.text();

    // URL 추출 (간단한 정규식)
    const urlMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
    const urls = Array.from(urlMatches).map(match => match[1]);

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'sitemap에서 URL을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // IndexNow에 제출 (최대 10000개)
    const urlsToSubmit = urls.slice(0, 10000);
    const results = await submitToIndexNow(urlsToSubmit);

    const responses = results.map((result, index) => ({
      endpoint: index === 0 ? 'indexnow.org' : 'bing.com',
      status: result.status === 'fulfilled' ? 'success' : 'failed',
      statusCode: result.status === 'fulfilled' ? result.value.status : null,
    }));

    return NextResponse.json({
      success: true,
      total: urls.length,
      submitted: urlsToSubmit.length,
      responses,
    });
  } catch (error) {
    console.error('IndexNow 자동 제출 오류:', error);
    return NextResponse.json(
      { error: '자동 제출 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
