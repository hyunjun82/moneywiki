import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "ETF 투자 초보자 가이드, 매수 방법·수수료·세금",
  description: "ETF는 주식처럼 사고파는 펀드. 1주부터 소액 투자, 수수료 연 0.05~0.5%. 계좌 개설부터 매수까지 초보자 가이드를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/etf-투자-방법-초보자" },
  openGraph: { title: "ETF 투자 초보자 가이드 | 머니위키", description: "ETF는 주식처럼 사고파는 펀드. 1주부터 소액 투자 가능.", url: "https://www.jjyu.co.kr/w/etf-투자-방법-초보자", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
