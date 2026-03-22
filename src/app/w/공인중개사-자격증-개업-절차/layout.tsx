import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "공인중개사 자격증 개업 절차, 사무소 개설 5단계 | 머니위키",
  description: "공인중개사 합격 후 실무교육 28시간, 보증보험 1억원, 개설등록까지 전체 절차. 필요 서류와 비용을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공인중개사-자격증-개업-절차" },
  openGraph: { title: "공인중개사 자격증 개업 절차, 사무소 개설 5단계 | 머니위키", description: "공인중개사 합격 후 실무교육 28시간, 보증보험 1억원, 개설등록까지 전체 절차.", url: "https://www.jjyu.co.kr/w/공인중개사-자격증-개업-절차", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
