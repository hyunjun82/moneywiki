import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "예술인 국민연금 보험료 지원 신청 방법",
  description: "예술인 국민연금 보험료 50% 지원 월 최대 4.5만원, 예술활동증명 필수 조건과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/예술인-국민연금-보험료-지원" },
  openGraph: {
    title: "예술인 국민연금 보험료 지원 신청 방법 | 머니위키",
    description: "예술인 국민연금 보험료 50% 지원 월 최대 4.5만원, 예술활동증명 필수 조건과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/예술인-국민연금-보험료-지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
