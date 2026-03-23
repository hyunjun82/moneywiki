import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "가압류 신청 송달료 금액 계산 및 납부 방법 | 머니위키",
  description: "가압류 신청할 때 송달료 얼마 내야 하는지, 당사자 수별로 달라지는지 알려드려요.",
  openGraph: { title: "가압류 신청 송달료 금액 계산 및 납부 방법 | 머니위키", description: "가압류 신청할 때 송달료 얼마 내야 하는지, 당사자 수별로 달라지는지 알려드려요.", url: "https://www.jjyu.co.kr/w/가압류-신청-송달료-금액", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/가압류-신청-송달료-금액" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
