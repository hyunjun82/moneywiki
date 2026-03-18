import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴소청소년 자립지원수당 신청 자격 | 머니위키",
  description: "청소년복지시설 퇴소 후 자립지원금 월 30만원 5년간 지원 자격과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청소년복지시설-퇴소청소년-자립지원수당" },
  openGraph: {
    title: "퇴소청소년 자립지원수당 신청 자격 | 머니위키",
    description: "청소년복지시설 퇴소 후 자립지원금 월 30만원 5년간 지원 자격과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/청소년복지시설-퇴소청소년-자립지원수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
