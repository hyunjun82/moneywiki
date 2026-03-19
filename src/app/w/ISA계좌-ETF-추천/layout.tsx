import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌 ETF 추천 고배당으로 비과세 극대화 | 머니위키",
  description: "ISA 계좌에 넣으면 좋은 ETF 5선. KODEX 고배당 4.5%, TIGER 배당귀족 3.0%. 배당 ETF로 비과세 혜택 최대로 받는 포트폴리오 전략.",
  openGraph: {
    title: "ISA 계좌 ETF 추천 고배당으로 비과세 극대화",
    description: "KODEX 고배당, TIGER 배당귀족 등 ISA에 맞는 ETF와 포트폴리오 전략.",
    url: "https://jjyu.co.kr/w/ISA계좌-ETF-추천",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ISA계좌-ETF-추천",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
