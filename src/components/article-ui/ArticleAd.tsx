"use client";

import { AdSlot } from "@/components/AdSlot";

interface Props {
  /** intro=서론 아래(money1) / mid=본문 중간(money2) / bottom=FAQ 아래(money3) / anchor=하단 sticky(money4) */
  position: "intro" | "mid" | "bottom" | "anchor";
}

const POSITION_MAP = {
  intro: "top",
  mid: "hero",
  bottom: "bottom",
  anchor: "anchor",
} as const;

export function ArticleAd({ position }: Props) {
  return <AdSlot slot={POSITION_MAP[position]} />;
}
