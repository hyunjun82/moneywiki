import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // IP 주소 가져오기
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "";

  // 차단된 IP 확인 (Edge에서는 직접 Redis 호출 대신 쿠키/헤더 기반으로 체크)
  // 실제 차단 로직은 track-click API에서 처리

  // 응답에 IP 헤더 추가 (디버깅용)
  const response = NextResponse.next();

  // 광고 페이지 접근 로깅 (옵션)
  if (request.nextUrl.pathname.startsWith("/w/")) {
    // 위키 페이지 접근 시 기본 처리
  }

  return response;
}

export const config = {
  matcher: [
    // 정적 파일 제외
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
