import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "면세사업자 사업장 현황신고 방법 기한 2월 10일",
  description: "면세사업자 매년 2월 10일까지 사업장 현황신고 의무. 홈택스 전자신고 방법, 미신고 가산세 0.5%.",
  openGraph: { title: "면세사업자 사업장 현황신고 방법 기한", description: "2월 10일 기한, 홈택스 신고 방법.", url: "https://jjyu.co.kr/w/면세사업자-사업장-현황신고" },
  alternates: { canonical: "https://jjyu.co.kr/w/면세사업자-사업장-현황신고" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
