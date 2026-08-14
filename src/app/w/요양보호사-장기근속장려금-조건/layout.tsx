import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "요양보호사 장기근속장려금 조건, 월 6~10만원 신청 방법",
  description: "같은 기관 36개월 이상, 월 60시간 이상 근무한 요양보호사에게 월 6~10만원 장려금. 자격 조건과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/요양보호사-장기근속장려금-조건" },
  openGraph: { title: "요양보호사 장기근속장려금 조건과 신청 | 머니위키", description: "36개월 이상 근무 시 월 6~10만원 장려금.", url: "https://www.jjyu.co.kr/w/요양보호사-장기근속장려금-조건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
