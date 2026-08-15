import type { Metadata } from "next";
import BuyView from "@/components/gold/BuyView";

/** /gold/buy — 금 살 때 */

export const metadata: Metadata = {
  title: "금 살 때 가격 — 오늘 순금 한 돈 사는 값",
  description:
    "소비자가 매장에서 금을 구입할 때 지불하는 가격입니다. 순금 24K·백금·은의 1돈과 1g 판매가를 오늘 고시가로 확인하세요.",
  keywords: ["금 살 때", "금 사는 가격", "금 판매가", "순금 살 때", "금 구매 시세"],
  alternates: { canonical: "/gold/buy" },
  openGraph: {
    type: "website",
    url: "/gold/buy",
    title: "금 살 때 가격 — 오늘 순금 한 돈 사는 값",
    description: "품목별 살 때 가격을 1돈·1g 기준으로 보여드립니다.",
  },
};

export default function GoldBuyPage() {
  return <BuyView />;
}
