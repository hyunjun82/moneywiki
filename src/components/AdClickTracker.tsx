"use client";

import { useEffect } from "react";

// 광고 클릭 추적 컴포넌트
// 페이지에 포함하면 광고 영역 클릭 시 서버에 기록
export default function AdClickTracker() {
  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Google AdSense 광고 영역 클릭 감지
      // AdSense는 보통 ins.adsbygoogle 또는 iframe 내부
      const isAdClick =
        target.closest("ins.adsbygoogle") ||
        target.closest('iframe[src*="googleads"]') ||
        target.closest('iframe[src*="doubleclick"]') ||
        target.closest('[data-ad-slot]');

      if (isAdClick) {
        try {
          await fetch("/api/track-click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          // 실패해도 사용자 경험에 영향 없음
        }
      }
    };

    // 캡처 단계에서 이벤트 감지 (버블링 전)
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null; // UI 없음
}
