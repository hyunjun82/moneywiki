"use client";

import AdSense, { AD_SLOTS } from "@/components/AdSense";

interface Props {
  /** 광고 위치: "intro" = 서론 아래 / "mid" = H2 사이 / "bottom" = FAQ 아래 */
  position: "intro" | "mid" | "bottom";
}

export function ArticleAd({ position }: Props) {
  const slotMap = {
    intro: AD_SLOTS.TOP,
    mid: AD_SLOTS.MID,
    bottom: AD_SLOTS.BOTTOM,
  } as const;

  return (
    <div style={{ margin: "24px 0" }}>
      <AdSense slot={slotMap[position]} format="auto" />
    </div>
  );
}
