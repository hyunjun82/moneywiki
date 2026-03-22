import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "ISA 계좌 평균 수익률과 배당 수익 계산 방법 | 머니위키",
  description: "ISA 계좌 평균 수익률은 연 5-7%예요. 고배당 ETF는 배당 4% + 가격 상승 3% = 7%예요. 안 하면 수익 못 내요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/ISA계좌-수익률" },
  openGraph: {
    title: "ISA 계좌 평균 수익률과 배당 수익 계산 방법",
    description: "ISA 계좌 평균 수익률은 연 5-7%예요. 고배당 ETF는 배당 4% + 가격 상승 3% = 7%예요. 안 하면 수익 못 내요.",
    url: "https://www.jjyu.co.kr/w/ISA계좌-수익률",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
