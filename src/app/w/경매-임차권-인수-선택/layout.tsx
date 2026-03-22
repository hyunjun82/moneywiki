import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매 임차권 인수 선택 기준 | 머니위키",
  description: "경매로 집 샀는데 세입자가 있다고요, 인수해야 하는지 말소되는지 궁금하시죠",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-임차권-인수-선택" },
  openGraph: { title: "경매 임차권 인수 선택 기준 | 머니위키", description: "경매로 집 샀는데 세입자가 있다고요, 인수해야 하는지 말소되는지 궁금하시죠", url: "https://www.jjyu.co.kr/w/경매-임차권-인수-선택", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
