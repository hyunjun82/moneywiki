import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대출 상환 방식 비교, 원금균등·원리금균등·만기일시 차이",
  description: "원금균등은 총 이자가 적지만 초반 부담이 크고, 원리금균등은 매달 같은 금액이라 관리가 편해요. 1억원 30년 기준 이자 차이는 약 168만원이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대출-상환-방식-비교" },
  openGraph: {
    title: "대출 상환 방식 비교, 원금균등·원리금균등·만기일시 차이 | 머니위키",
    description: "원금균등은 총 이자가 적지만 초반 부담이 크고, 원리금균등은 매달 같은 금액이라 관리가 편해요. 1억원 30년 기준 이자 차이는 약 168만원이에요.",
    url: "https://www.jjyu.co.kr/w/대출-상환-방식-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
