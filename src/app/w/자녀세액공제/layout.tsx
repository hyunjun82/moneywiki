import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자녀세액공제 조건 및 금액: 자녀수별 공제액·출생입양 추가공제 | 머니위키",
  description: "자녀세액공제 얼마나 받는지 궁금하시죠. 자녀 1명 15만원, 2명 35만원, 3명 이상은 추가 인원당 30만원씩 받아요",
  openGraph: { title: "자녀세액공제 조건 및 금액: 자녀수별 공제액·출생입양 추가공제", description: "자녀세액공제 얼마나 받는지 궁금하시죠. 자녀 1명 15만원, 2명 35만원, 3명 이상은 추가 인원당 30만원씩 받아요", url: "https://jjyu.co.kr/w/자녀세액공제" },
  alternates: { canonical: "https://jjyu.co.kr/w/자녀세액공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
