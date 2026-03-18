import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "다문화가족 자녀 교육활동비 지원 자격 | 머니위키",
  description: "다문화가족 자녀 초등학생 연 20만원, 중학생 30만원 교육활동비 지원 자격과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/다문화가족-자녀-교육활동비" },
  openGraph: {
    title: "다문화가족 자녀 교육활동비 지원 자격 | 머니위키",
    description: "다문화가족 자녀 초등학생 연 20만원, 중학생 30만원 교육활동비 지원 자격과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/다문화가족-자녀-교육활동비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
