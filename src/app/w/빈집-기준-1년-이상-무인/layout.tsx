import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "빈집 기준 1년 이상 무인 주택",
  description: "부모님 집 비어있으면 빈집일까요? 1년 이상 아무도 안 살면 빈집으로 분류돼요.",
  openGraph: { title: "빈집 기준 1년 이상 무인 주택 | 머니위키", description: "부모님 집 비어있으면 빈집일까요? 1년 이상 아무도 안 살면 빈집으로 분류돼요.", url: "https://www.jjyu.co.kr/w/빈집-기준-1년-이상-무인", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/빈집-기준-1년-이상-무인" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
