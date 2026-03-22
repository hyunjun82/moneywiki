import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애인 등록증 발급 절차: 신청 서류 및 발급 기간 | 머니위키",
  description: "장애인 등록증 받으려면 어떻게 해야 할지 막막하신가요? 복지로 온라인 신청부터 주민센터 방문까지, 서류 준비부터 발급까지 전체 과정을 알려드려요",
  openGraph: { title: "장애인 등록증 발급 절차: 신청 서류 및 발급 기간", description: "장애인 등록증 받으려면 어떻게 해야 할지 막막하신가요? 복지로 온라인 신청부터 주민센터 방문까지, 서류 준비부터 발급까지 전체 과정을 알려드려요", url: "https://jjyu.co.kr/w/장애인-등록증-발급-방법" },
  alternates: { canonical: "https://jjyu.co.kr/w/장애인-등록증-발급-방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
