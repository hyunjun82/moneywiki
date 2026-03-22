import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 주택청약 공제 | 머니위키",
  description: "청약통장 넣으면 연말정산 때 최대 23만원 돌려받아요. 월 20만원 납입이 가장 효율적이에요",
  openGraph: { title: "연말정산 주택청약 공제", description: "청약통장 넣으면 연말정산 때 최대 23만원 돌려받아요. 월 20만원 납입이 가장 효율적이에요", url: "https://jjyu.co.kr/w/연말정산-주택청약-공제" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-주택청약-공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
