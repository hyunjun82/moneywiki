import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임신 사전건강관리 지원 무료 검사 항목",
  description: "임신 계획 여성 풍진·B형간염·빈혈 등 12가지 무료 검사 항목과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임신-사전건강관리-지원사업" },
  openGraph: {
    title: "임신 사전건강관리 지원 무료 검사 항목 | 머니위키",
    description: "임신 계획 여성 풍진·B형간염·빈혈 등 12가지 무료 검사 항목과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/임신-사전건강관리-지원사업",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
