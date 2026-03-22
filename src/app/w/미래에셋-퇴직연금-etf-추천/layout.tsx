import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "미래에셋 퇴직연금 ETF 추천 | 머니위키",
  description: "미래에셋증권 퇴직연금에서 투자할 수 있는 ETF 추천해드려요. ETF 라인업이 가장 다양해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/미래에셋-퇴직연금-etf-추천" },
  openGraph: { title: "미래에셋 퇴직연금 ETF 추천", description: "미래에셋증권 퇴직연금에서 투자할 수 있는 ETF 추천해드려요. ETF 라인업이 가장 다양해요", url: "https://www.jjyu.co.kr/w/미래에셋-퇴직연금-etf-추천", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
