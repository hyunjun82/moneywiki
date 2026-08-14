import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "위기청소년 특별지원 신청 방법과 대상",
  description: "가출·학교폭력·가정해체 등 위기청소년 생활비·의료비 월 최대 65만원 지원 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/위기청소년-특별지원" },
  openGraph: {
    title: "위기청소년 특별지원 신청 방법과 대상 | 머니위키",
    description: "가출·학교폭력·가정해체 등 위기청소년 생활비·의료비 월 최대 65만원 지원 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/위기청소년-특별지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
