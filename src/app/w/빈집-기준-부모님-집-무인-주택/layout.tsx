import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "빈집 기준 부모님 집 무인 주택",
  description: "부모님이 살던 집, 지금 아무도 안 살면 빈집일까요? 1년 이상 비어있으면 법적으로 빈집이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/빈집-기준-부모님-집-무인-주택" },
  openGraph: { title: "빈집 기준 부모님 집 무인 주택 | 머니위키", description: "부모님이 살던 집, 지금 아무도 안 살면 빈집일까요? 1년 이상 비어있으면 법적으로 빈집이에요.", url: "https://www.jjyu.co.kr/w/빈집-기준-부모님-집-무인-주택", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
