import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애인연금 신청 자격과 월 최대 42만원 | 머니위키",
  description: "중증 장애인이라면 월 최대 42만원 장애인연금을 받을 수 있죠. 기초급여와 부가급여 구조, 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인연금" },
  openGraph: { title: "장애인연금 신청 자격과 월 최대 42만원 | 머니위키", description: "중증 장애인이라면 월 최대 42만원 장애인연금을 받을 수 있죠. 기초급여와 부가급여 구조, 신청 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/장애인연금", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
