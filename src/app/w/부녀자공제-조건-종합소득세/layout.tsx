import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부녀자공제: 종합소득 3천만원 이하 여성 50만원 공제 | 머니위키",
  description: "부녀자공제 받을 수 있는지 궁금하시죠? 종합소득 3천만원 이하 여성이면 연 50만원 공제받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부녀자공제-조건-종합소득세" },
  openGraph: {
    title: "부녀자공제: 종합소득 3천만원 이하 여성 50만원 공제",
    description: "부녀자공제 받을 수 있는지 궁금하시죠? 종합소득 3천만원 이하 여성이면 연 50만원 공제받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/부녀자공제-조건-종합소득세",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
