import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 사업소득자",
  description: "사업소득자는 연말정산 대신 5월 종합소득세 신고를 해요. 근로소득과 사업소득이 함께 있으면 합산해서 신고하죠.",
  openGraph: { title: "연말정산 사업소득자", description: "사업소득자는 연말정산 대신 5월 종합소득세 신고를 해요. 근로소득과 사업소득이 함께 있으면 합산해서 신고하죠.", url: "https://jjyu.co.kr/w/연말정산-사업소득자" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-사업소득자" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
