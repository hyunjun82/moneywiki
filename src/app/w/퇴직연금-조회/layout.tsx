import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 조회 방법 잔액 확인 통합포털 | 머니위키",
  description: "금융감독원 통합연금포털에서 퇴직연금 잔액·수익률 조회. DB/DC/IRP 한번에 확인. 은행앱 조회도 가능.",
  openGraph: { title: "퇴직연금 조회 방법 잔액 확인", description: "통합포털 한번에 조회, DB/DC 차이.", url: "https://jjyu.co.kr/w/퇴직연금-조회" },
  alternates: { canonical: "https://jjyu.co.kr/w/퇴직연금-조회" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
