import type { Metadata } from "next";
import CalculatorView from "@/components/gold/CalculatorView";

/** /gold/calculator — 금 계산기 */

export const metadata: Metadata = {
  title: "금 계산기 — 돈·그램으로 오늘 금액 계산",
  description:
    "순도와 중량을 넣으면 오늘 시세 기준 살 때·팔 때 금액을 바로 계산합니다. 1돈 3.75g 기준, 그램 입력도 지원합니다.",
  keywords: ["금 계산기", "금값 계산", "금 시세 계산기", "금 그램 계산", "18K 계산"],
  alternates: { canonical: "/gold/calculator" },
  openGraph: {
    type: "website",
    url: "/gold/calculator",
    title: "금 계산기 — 돈·그램으로 오늘 금액 계산",
    description: "순도와 중량을 넣으면 오늘 시세로 살 때·팔 때 금액을 계산합니다.",
  },
};

export default function GoldCalculatorPage() {
  return <CalculatorView />;
}
