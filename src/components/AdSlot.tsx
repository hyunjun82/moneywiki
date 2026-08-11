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
    if (pushed.current || slot === "anchor") return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const config = AD_CONFIG[slot];

  if (slot === "anchor") {
    // 자체 fixed 앵커는 auto 반응형이 384px 대형 광고를 반환해 모바일 화면 절반을
    // 덮는 정책 위반 소지가 있어 비활성화. 앵커가 필요하면 AdSense 자동광고의
    // 공식 앵커(높이 제한·닫기 버튼 내장)를 사용할 것.
    return null;
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
