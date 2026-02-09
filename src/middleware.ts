import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { staticRedirects, getPatternRedirect, getTopicFallback } from "./lib/redirect-config";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // www 없는 도메인 → www로 301 리다이렉트 (SEO)
  if (host === "jjyu.co.kr") {
    const url = request.nextUrl.clone();
    url.host = "www.jjyu.co.kr";
    return NextResponse.redirect(url, 301);
  }

  // robots.txt 동적 처리 (User-Agent 기반)
  if (pathname === '/robots.txt') {
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

    // 기본 robots.txt (Google용)
    let robotsTxt = `# robots.txt for 머니위키
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.jjyu.co.kr/sitemap.xml`;

    // Daum 봇이거나 다음 웹마스터 검증 요청인 경우에만 인증 코드 추가
    if (userAgent.includes('daumoa') ||
        userAgent.includes('daum') ||
        request.headers.get('referer')?.includes('webmaster.daum')) {
      robotsTxt += `

# Daum Webmaster Tool Verification
DaumWebMasterTool:8f277e6a15ecca107afcea48a37bb3aa62fde6892c1349fc8bd43ce576745cd2:XNG90a1IomEQ6b3Rh86ohQ==`;
    }

    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600', // 1시간 캐시
      },
    });
  }

  // === 404 리다이렉트 처리 ===

  // 1단계: 정적 리다이렉트 (로마자, 중첩경로, 카테고리)
  const decodedPathname = decodeURIComponent(pathname);
  const staticTarget = staticRedirects[decodedPathname] || staticRedirects[pathname];
  if (staticTarget) {
    return NextResponse.redirect(new URL(staticTarget, request.url), 301);
  }

  // 2단계: 패턴 매칭 (공백→검색, .md제거, 중첩경로, opengraph-image)
  const patternTarget = getPatternRedirect(decodedPathname);
  if (patternTarget) {
    return NextResponse.redirect(new URL(patternTarget, request.url), 301);
  }

  // 3단계: /w/slug가 미존재 확인된 URL → 카테고리 fallback
  if (decodedPathname.startsWith('/w/')) {
    const slug = decodedPathname.replace('/w/', '');
    const fallback = getTopicFallback(slug);
    if (fallback) {
      return NextResponse.redirect(new URL(fallback, request.url), 301);
    }
  }

  // IP 주소 가져오기
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "";

  // 차단된 IP 확인 (Edge에서는 직접 Redis 호출 대신 쿠키/헤더 기반으로 체크)
  // 실제 차단 로직은 track-click API에서 처리

  // 응답에 IP 헤더 추가 (디버깅용)
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    // robots.txt 동적 처리
    '/robots.txt',
    // 정적 파일 제외
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
