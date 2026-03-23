import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "내항화물운송 유류세 보조금 제출 서류 | 머니위키",
  description: "내항화물운송사업자가 유류세 보조금 받으려면 어떤 서류를 내야 하는지 궁금하시죠? 신청 절차와 필요 서류를 쉽게 알려드려요.",
  openGraph: { title: "내항화물운송 유류세 보조금 제출 서류 | 머니위키", description: "내항화물운송사업자가 유류세 보조금 받으려면 어떤 서류를 내야 하는지 궁금하시죠? 신청 절차와 필요 서류를 쉽게 알려드려요.", url: "https://www.jjyu.co.kr/w/내항화물운송-유류세-보조금-제출서류", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/내항화물운송-유류세-보조금-제출서류" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
