import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "여성청소년 생리용품 바우처 신청 방법",
  description: "만 9~24세 저소득 여성청소년 생리용품 바우처 월 최대 12,000원 지원 자격과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/여성청소년-생리용품-지원" },
  openGraph: {
    title: "여성청소년 생리용품 바우처 신청 방법 | 머니위키",
    description: "만 9~24세 저소득 여성청소년 생리용품 바우처 월 최대 12,000원 지원 자격과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/여성청소년-생리용품-지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
