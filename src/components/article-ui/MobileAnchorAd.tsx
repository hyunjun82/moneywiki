"use client";

import { useEffect, useState } from "react";
import AdSense, { AD_SLOTS } from "@/components/AdSense";

/**
 * 모바일 전용 상단 고정(앵커) 광고.
 * 768px 이하에서만 표시. 닫기 버튼 포함 (애드센스 정책 준수).
 * 레이아웃(layout.tsx 또는 ArticleLayout)에 1번만 배치.
 */
export function MobileAnchorAd() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setVisible(mq.matches);

    const handler = (e: MediaQueryListEvent) => setVisible(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "4px 4px 4px 4px",
      }}
    >
      <button
        onClick={() => setDismissed(true)}
        aria-label="광고 닫기"
        style={{
          position: "absolute",
          bottom: -28,
          right: 8,
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "1px solid #d1d5db",
          background: "#fff",
          cursor: "pointer",
          fontSize: 14,
          lineHeight: "22px",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        ✕
      </button>
      <AdSense slot={AD_SLOTS.ANCHOR} format="horizontal" />
    </div>
  );
}
