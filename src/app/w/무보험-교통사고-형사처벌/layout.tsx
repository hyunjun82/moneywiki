import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무보험 교통사고 형사처벌, 징역·벌금 기준과 대응 방법 | 머니위키",
  description: "무보험 운전 자체가 1년 이하 징역 또는 1천만원 벌금. 인명피해 시 5년 이하 금고. 합의와 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무보험-교통사고-형사처벌" },
  openGraph: { title: "무보험 교통사고 형사처벌 기준 | 머니위키", description: "무보험 운전 자체가 1년 이하 징역 또는 1천만원 벌금. 인명피해 시 5년 이하 금고.", url: "https://www.jjyu.co.kr/w/무보험-교통사고-형사처벌", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
