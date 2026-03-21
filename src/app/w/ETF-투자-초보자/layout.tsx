import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ETF 투자 초보자 가이드 — 첫 매수부터 장기 전략까지 | 머니위키",
  description: "KODEX 200, S&P500 ETF부터 시작하세요. 개별 주식 vs ETF 비교, 초보자 추천 상품, 5단계 투자 방법, 피해야 할 실수까지 정리해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/ETF-투자-초보자" },
  openGraph: {
    title: "ETF 투자 초보자 가이드 — 첫 매수부터 장기 전략까지 | 머니위키",
    description: "KODEX 200, S&P500 ETF부터 시작하세요. 개별 주식 vs ETF 비교, 초보자 추천 상품, 5단계 투자 방법, 피해야 할 실수까지 정리해드려요.",
    url: "https://www.jjyu.co.kr/w/ETF-투자-초보자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
