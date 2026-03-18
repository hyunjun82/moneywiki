import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애수당 신청 자격과 월 지급액 | 머니위키",
  description: "장애인으로 등록해도 장애수당은 따로 신청해야 받아요. 월 최대 6만원, 신청 자격과 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애수당" },
  openGraph: { title: "장애수당 신청 자격과 월 지급액 | 머니위키", description: "장애인으로 등록해도 장애수당은 따로 신청해야 받아요. 월 최대 6만원, 신청 자격과 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/장애수당", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
