import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산이란? 세금 돌려받는 구조와 공제 항목 가이드",
  description: "연말정산은 1년간 낸 세금을 정산해서 환급받거나 추가 납부하는 절차예요. 소득공제와 세액공제 차이, 절차, 주요 공제 항목을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산이란" },
  openGraph: { title: "연말정산이란? 세금 돌려받는 구조 | 머니위키", description: "연말정산은 1년간 낸 세금을 정산해서 환급받거나 추가 납부하는 절차예요.", url: "https://www.jjyu.co.kr/w/연말정산이란", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
