import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농업인 건강보험료·연금보험료 지원 자격",
  description: "농업인 건강보험료 22% + 국민연금 보험료 50% 지원 자격과 농업경영체 등록 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농업인-건강연금보험료-지원" },
  openGraph: {
    title: "농업인 건강보험료·연금보험료 지원 자격 | 머니위키",
    description: "농업인 건강보험료 22% + 국민연금 보험료 50% 지원 자격과 농업경영체 등록 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/농업인-건강연금보험료-지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
