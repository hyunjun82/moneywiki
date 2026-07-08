"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// money1=top(서론 아래), money2=hero(본문 중간), money3=bottom(FAQ 아래), money4=anchor(하단 sticky)
type AdSlotType = "top" | "hero" | "bottom" | "anchor";

const AD_CLIENT = "ca-pub-2442517902625121";

const AD_CONFIG: Record<AdSlotType, Record<string, string>> = {
  top: {
    "data-ad-slot": "7568653380",
    "data-ad-format": "rectangle",  // auto+full-width-responsive가 뷰포트 전체 높이로 렌더링되는 버그 발견(2026-07-08) — 사각형 고정 포맷으로 제한
  },
  hero: {
    "data-ad-slot": "9332237757",
    "data-ad-format": "rectangle",
  },
  bottom: {
    "data-ad-slot": "2683158216",
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
  },
  anchor: {
    "data-ad-slot": "4634534132",
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
  },
};

export function AdSlot({ slot = "top" }: { slot?: AdSlotType }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const config = AD_CONFIG[slot];

  if (slot === "anchor") {
    // MobileStickyBar(z-50 mobile / z-40 PC, 64px / 52px)와 충돌 방지: 그 위에 쌓음
    return (
      <div
        className="ad-anchor-fixed"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 64,
          zIndex: 30,
          background: "#ffffff",
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .ad-anchor-fixed { bottom: 52px !important; }
          }
        `}</style>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          {...config}
        />
      </div>
    );
  }

  return (
    <div
      className="ad-slot"
      style={{
        margin: "24px 0",
        overflow: "hidden",
        minHeight: slot === "bottom" ? 200 : 100,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        {...config}
      />
    </div>
  );
}
