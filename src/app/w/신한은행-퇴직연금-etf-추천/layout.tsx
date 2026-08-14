import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신한은행 퇴직연금 ETF 추천, 신한SOL 앱 매수 방법",
  description: "신한은행 DC형·IRP에서 ETF 투자하는 방법이에요. 신한SOL 앱 매수 절차, S&P500·나스닥100 추천 포트폴리오, 위험자산 70% 한도를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/신한은행-퇴직연금-etf-추천" },
  openGraph: {
    title: "신한은행 퇴직연금 ETF 추천, 신한SOL 앱 매수 방법 | 머니위키",
    description: "신한은행 DC형·IRP에서 ETF 투자하는 방법이에요. 신한SOL 앱 매수 절차, S&P500·나스닥100 추천 포트폴리오, 위험자산 70% 한도를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/신한은행-퇴직연금-etf-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
