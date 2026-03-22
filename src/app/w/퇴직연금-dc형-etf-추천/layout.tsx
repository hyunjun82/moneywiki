import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 DC형, ETF로 어떻게 굴릴까? 안전자산 30% 포트폴리오 | 머니위키",
  description: "DC형 퇴직연금에서 ETF 투자하는 방법이에요. 위험자산 70%, 안전자산 30% 규정 지키면서 S&P500, 채권 ETF로 포트폴리오 짜는 법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-dc형-etf-추천" },
  openGraph: {
    title: "퇴직연금 DC형, ETF로 어떻게 굴릴까? 안전자산 30% 포트폴리오 | 머니위키",
    description: "DC형 퇴직연금에서 ETF 투자하는 방법이에요. 위험자산 70%, 안전자산 30% 규정 지키면서 S&P500, 채권 ETF로 포트폴리오 짜는 법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-dc형-etf-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
