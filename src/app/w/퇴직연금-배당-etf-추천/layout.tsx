import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 배당 ETF 추천 | 머니위키",
  description: "퇴직연금에서 투자할 배당 ETF 추천해드려요. 분기마다 배당 받으면서 자산을 불려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-배당-etf-추천" },
  openGraph: { title: "퇴직연금 배당 ETF 추천 | 머니위키", description: "퇴직연금에서 투자할 배당 ETF 추천해드려요. 분기마다 배당 받으면서 자산을 불려요", url: "https://www.jjyu.co.kr/w/퇴직연금-배당-etf-추천", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
