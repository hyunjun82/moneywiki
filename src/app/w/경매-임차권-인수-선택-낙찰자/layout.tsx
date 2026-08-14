import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매 임차권 인수 선택 낙찰자 의무",
  description: "경매로 집 샀는데 세입자가 있어요. 보증금 돌려줘야 하나요? 인수되는 임차권 확인 필수예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-임차권-인수-선택-낙찰자" },
  openGraph: {
    title: "경매 임차권 인수 선택 낙찰자 의무",
    description: "경매로 집 샀는데 세입자가 있어요. 보증금 돌려줘야 하나요? 인수되는 임차권 확인 필수예요.",
    url: "https://www.jjyu.co.kr/w/경매-임차권-인수-선택-낙찰자",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
