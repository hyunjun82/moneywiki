import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고용촉진장려금 신청 자격과 지원 금액",
  description: "취업 취약계층 채용 시 사업주에게 월 최대 60만원 최대 1년 지원하는 고용촉진장려금 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고용촉진장려금" },
  openGraph: {
    title: "고용촉진장려금 신청 자격과 지원 금액 | 머니위키",
    description: "취업 취약계층 채용 시 사업주에게 월 최대 60만원 최대 1년 지원하는 고용촉진장려금 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/고용촉진장려금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
