export const dynamic = "force-dynamic";
import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재개발 분양신청 안하면 보상금 | 머니위키",
  description: "재개발 구역인데 분양 안 받으면 현금청산으로 토지와 건물 값 보상받아요. 이주비와 이사비도 따로 나와요.",
  openGraph: { title: "재개발 분양신청 안하면 보상금 | 머니위키", description: "재개발 구역인데 분양 안 받으면 현금청산으로 토지와 건물 값 보상받아요. 이주비와 이사비도 따로 나와요.", url: "https://www.jjyu.co.kr/w/재개발-분양신청-안하면-보상", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/재개발-분양신청-안하면-보상" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
