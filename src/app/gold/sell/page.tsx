import type { Metadata } from "next";
import SellView from "@/components/gold/SellView";

/** /gold/sell — 금 팔 때 */

export const metadata: Metadata = {
  title: "금 팔 때 가격 — 오늘 순금·18K·14K 매입가",
  description:
    "보유한 금을 매장에 매도할 때 받는 금액입니다. 순도별 매입가를 1돈·1g 기준으로, 순금 대비 매입률과 함께 확인하세요.",
  keywords: ["금 팔 때", "금 매입가", "금 파는 가격", "18K 매입", "14K 매입", "금 시세 매입"],
  alternates: { canonical: "/gold/sell" },
  openGraph: {
    type: "website",
    url: "/gold/sell",
    title: "금 팔 때 가격 — 오늘 순금·18K·14K 매입가",
    description: "순도별 매입가를 1돈·1g 기준으로 보여드립니다.",
  },
};

export default function GoldSellPage() {
  return <SellView />;
}
