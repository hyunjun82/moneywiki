import type { Metadata } from "next";
import BanksView from "@/components/fx/BanksView";

/** /fx/banks — 은행 환율 비교 */

export const metadata: Metadata = {
  title: "은행 환율 비교 — 어디서 환전하면 더 받을까",
  description:
    "은행연합회가 공시하는 환전수수료율과 우대율을 적용해 은행별로 실제 받는 금액을 비교합니다. 같은 금액을 환전할 때 은행 간 차액을 확인하세요.",
  keywords: ["은행 환율 비교", "환전 우대율", "환전 수수료", "달러 환전", "환전 잘하는 법"],
  alternates: { canonical: "/fx/banks" },
  openGraph: {
    type: "website",
    url: "/fx/banks",
    title: "은행 환율 비교 — 어디서 환전하면 더 받을까",
    description: "환전수수료율과 우대율을 적용한 은행별 실수령액 비교.",
  },
};

export default function FxBanksPage() {
  return <BanksView />;
}
