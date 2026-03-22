import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택 임대차 계약기간 1년 2년 차이 | 머니위키",
  description: "집 계약서에 1년이라고 써도 법으로 2년 보장받아요. 임차인 유리한 주택임대차보호법 규정이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-임대차-계약기간-1년-2년" },
  openGraph: { title: "주택 임대차 계약기간 1년 2년 차이 | 머니위키", description: "집 계약서에 1년이라고 써도 법으로 2년 보장받아요. 임차인 유리한 주택임대차보호법 규정이에요.", url: "https://www.jjyu.co.kr/w/주택-임대차-계약기간-1년-2년", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
