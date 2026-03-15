"use client";

import AdSense, { AD_SLOTS } from "@/components/AdSense";

interface Props {
  /** 광고 위치: "intro" = 서론 아래 / "mid" = 섹션 2 뒤 (버튼 아래) */
  position: "intro" | "mid";
}

export function ArticleAd({ position }: Props) {
  const slot = position === "intro" ? AD_SLOTS.HORIZONTAL : AD_SLOTS.VERTICAL;
  const format = position === "intro" ? "horizontal" : "auto";

  return (
    <div
      style={{
        margin: "24px 0",
        minHeight: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AdSense slot={slot} format={format} />
    </div>
  );
}
