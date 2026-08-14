import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민은행 퇴직연금 ETF 추천",
  description: "국민은행 퇴직연금에서 투자할 수 있는 ETF 추천해드려요. KB스타뱅킹에서 매수해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민은행-퇴직연금-etf-추천" },
  openGraph: { title: "국민은행 퇴직연금 ETF 추천 | 머니위키", description: "국민은행 퇴직연금에서 투자할 수 있는 ETF 추천해드려요. KB스타뱅킹에서 매수해요", url: "https://www.jjyu.co.kr/w/국민은행-퇴직연금-etf-추천", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
