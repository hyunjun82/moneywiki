import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청소년 한부모 아동양육비·자립지원 금액 | 머니위키",
  description: "만 24세 이하 청소년 한부모 아동양육비 월 35만원 + 자립지원수당 월 10만원 지원 자격과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/저소득-청소년한부모-아동양육-자립지원" },
  openGraph: {
    title: "청소년 한부모 아동양육비·자립지원 금액 | 머니위키",
    description: "만 24세 이하 청소년 한부모 아동양육비 월 35만원 + 자립지원수당 월 10만원 지원 자격과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/저소득-청소년한부모-아동양육-자립지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
