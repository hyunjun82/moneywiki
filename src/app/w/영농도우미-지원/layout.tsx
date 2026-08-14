import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "영농도우미 지원 신청 방법과 이용 조건",
  description: "농번기·부상·질병 시 영농도우미 인력 파견, 저소득 농업인 무료 이용 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/영농도우미-지원" },
  openGraph: {
    title: "영농도우미 지원 신청 방법과 이용 조건 | 머니위키",
    description: "농번기·부상·질병 시 영농도우미 인력 파견, 저소득 농업인 무료 이용 신청 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/영농도우미-지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
