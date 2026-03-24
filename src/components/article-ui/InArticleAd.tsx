"use client";

import AdSense, { AD_SLOTS } from "@/components/AdSense";

/**
 * H2 섹션 사이에 삽입하는 인아티클 광고.
 * H2 2개마다 1개씩 배치 권장 (과다 노출 방지).
 * Calculator/Steps 직전에는 사용 금지 (사용자 흐름 끊김).
 */
export function InArticleAd() {
  return (
    <div style={{ margin: "32px 0", minHeight: "90px" }}>
      <AdSense slot={AD_SLOTS.MID} format="auto" />
    </div>
  );
}
