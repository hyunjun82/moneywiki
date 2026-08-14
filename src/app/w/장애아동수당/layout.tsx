import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애아동수당 신청 자격과 월 지급액",
  description: "만 18세 미만 장애아동 수당 기초수급자 중증 월 22만원, 경증 11만원 지원 자격과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애아동수당" },
  openGraph: {
    title: "장애아동수당 신청 자격과 월 지급액 | 머니위키",
    description: "만 18세 미만 장애아동 수당 기초수급자 중증 월 22만원, 경증 11만원 지원 자격과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/장애아동수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
