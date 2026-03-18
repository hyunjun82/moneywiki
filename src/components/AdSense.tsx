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

// 사전 정의된 광고 슬롯
export const AD_SLOTS = {
  SQUARE: "6190024232",    // 사각 - 사이드바용
  HORIZONTAL: "1269427864", // jjyu 반응 - 본문 상단
  VERTICAL: "1269427864",   // jjyu 반응 - 본문 중간
} as const;
