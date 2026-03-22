import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금으로 미국 ETF 투자하려면? 추천 상품과 수수료 비교 | 머니위키",
  description: "퇴직연금 DC형·IRP에서 투자 가능한 미국 ETF 정리. S&P500, 나스닥100 국내상장 ETF 수수료 비교와 선택 기준.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/퇴직연금-미국-etf-추천",
  },
  openGraph: {
    title: "퇴직연금으로 미국 ETF 투자하려면? 추천 상품과 수수료 비교",
    description: "DC형·IRP에서 S&P500, 나스닥100 ETF 투자. 총보수 0.05~0.15% 비교.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-미국-etf-추천",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
