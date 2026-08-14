import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "우리은행 퇴직연금 ETF 투자 방법과 포트폴리오 구성",
  description: "우리WON뱅킹 앱에서 DC형·IRP 퇴직연금 ETF를 직접 매수할 수 있어요. 안전자산 30% 규정, 추천 ETF, 매수 절차를 단계별로 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/우리은행-퇴직연금-etf-추천",
  },
  openGraph: {
    title: "우리은행 퇴직연금 ETF 투자 방법과 포트폴리오 구성",
    description: "우리WON뱅킹에서 S&P500·나스닥 ETF 매수. 안전자산 30% 규정 정리.",
    url: "https://www.jjyu.co.kr/w/우리은행-퇴직연금-etf-추천",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
