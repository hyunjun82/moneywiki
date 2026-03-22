import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "대지급금과 우선변제 차이 | 임금채권 대위권 변제 순위 구조 | 머니위키",
  description: "회사 도산 시 대지급금과 임금채권 우선변제권을 동시에 활용할 수 있다는 거 아시나요? 대위권이 어떻게 작동하는지 변제 순위까지 알려드려요.",
  openGraph: { title: "대지급금과 우선변제 차이 | 임금채권 대위권 변제 순위 구조 | 머니위키", description: "회사 도산 시 대지급금과 임금채권 우선변제권을 동시에 활용할 수 있다는 거 아시나요? 대위권이 어떻게 작동하는지 변제 순위까지 알려드려요.", url: "https://www.jjyu.co.kr/w/대지급금-임금채권-우선변제-차이", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/대지급금-임금채권-우선변제-차이" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
