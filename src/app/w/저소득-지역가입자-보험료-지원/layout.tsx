import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "저소득 지역가입자 건강보험료 지원 자격 | 머니위키",
  description: "프리랜서·자영업자 등 저소득 지역가입자 건강보험료 50% 지원 자격과 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/저소득-지역가입자-보험료-지원" },
  openGraph: {
    title: "저소득 지역가입자 건강보험료 지원 자격 | 머니위키",
    description: "프리랜서·자영업자 등 저소득 지역가입자 건강보험료 50% 지원 자격과 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/저소득-지역가입자-보험료-지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
