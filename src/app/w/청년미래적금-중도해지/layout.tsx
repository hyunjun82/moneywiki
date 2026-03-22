import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년미래적금 중도해지 시 기여금 반환과 이자 손실 | 머니위키",
  description: "청년미래적금 중도해지하면 기여금 일부만 받거나 못 받아요. 1년 미만 0%, 2년 미만 50%, 3년 만기 100%예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년미래적금-중도해지" },
  openGraph: { title: "청년미래적금 중도해지 시 기여금 반환과 이자 손실", description: "청년미래적금 중도해지하면 기여금 일부만 받거나 못 받아요. 1년 미만 0%, 2년 미만 50%, 3년 만기 100%예요.", url: "https://www.jjyu.co.kr/w/청년미래적금-중도해지", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
