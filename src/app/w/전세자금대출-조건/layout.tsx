import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세자금대출, 나도 받을 수 있을까? 2026년 조건·금리·한도 비교 | 머니위키",
  description: "버팀목·청년·신혼부부 전세대출 조건과 금리를 비교해요. 기금 전세대출은 연 1.2~3.5%, 시중은행은 연 3~5% 수준이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전세자금대출-조건",
  },
  openGraph: {
    title: "전세자금대출, 나도 받을 수 있을까? 2026년 조건·금리·한도 비교",
    description: "버팀목·청년·신혼부부 전세대출 조건과 금리 비교.",
    url: "https://www.jjyu.co.kr/w/전세자금대출-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
