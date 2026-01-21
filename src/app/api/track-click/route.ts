import { NextRequest, NextResponse } from "next/server";
import { recordAdClick, blockIP, isBlocked, CLICK_LIMIT } from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    // IP 주소 가져오기
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (ip === "unknown") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // 이미 차단된 IP인지 확인
    const blocked = await isBlocked(ip);
    if (blocked) {
      return NextResponse.json({ blocked: true }, { status: 403 });
    }

    // 클릭 기록 및 카운트
    const clickCount = await recordAdClick(ip);

    // 한도 초과 시 차단
    if (clickCount > CLICK_LIMIT) {
      await blockIP(ip, `Exceeded ${CLICK_LIMIT} clicks on ${new Date().toISOString()}`);
      console.log(`[무효트래픽] IP 차단: ${ip}, 클릭수: ${clickCount}`);
      return NextResponse.json({ blocked: true, reason: "limit_exceeded" }, { status: 403 });
    }

    return NextResponse.json({ success: true, count: clickCount });
  } catch (error) {
    console.error("[track-click] Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
