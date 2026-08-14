import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "유연근무제 신청 및 해제: 유연근무제 신청 절차 및 유연근무제 해제 방법",
  description: "유연근무제를 해제하고 싶을 때 어떻게 해야 하는지 알려드려요. 신청 서식부터 절차까지 한눈에 확인하세요",
  openGraph: { title: "유연근무제 신청 및 해제: 유연근무제 신청 절차 및 유연근무제 해제 방법 | 머니위키", description: "유연근무제를 해제하고 싶을 때 어떻게 해야 하는지 알려드려요. 신청 서식부터 절차까지 한눈에 확인하세요", url: "https://www.jjyu.co.kr/w/유연근무제-신청-해제-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/유연근무제-신청-해제-방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
