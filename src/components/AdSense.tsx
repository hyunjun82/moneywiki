"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  className?: string;
}

export default function AdSense({ slot, format = "auto", className = "" }: AdSenseProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-2442517902625121"
      data-ad-slot={slot}
      data-ad-format={format}
    />
  );
}

// 사전 정의된 광고 슬롯 (위치별 고유 ID)
export const AD_SLOTS = {
  SQUARE: "6190024232",     // 사이드바 300×250
  TOP: "4668535254",        // jjyu-top: 본문 서론 아래
  MID: "6074083868",        // jjyu-mid: 본문 중간 (H2 사이)
  BOTTOM: "3483312647",     // jjyu-bottom: FAQ 아래
  ANCHOR: "1943000263",     // jjyu-anchor: 모바일 하단 고정
  // 하위 호환용 (기존 코드 깨지지 않도록)
  HORIZONTAL: "4668535254", // → TOP으로 대체
  VERTICAL: "6074083868",   // → MID로 대체
} as const;
