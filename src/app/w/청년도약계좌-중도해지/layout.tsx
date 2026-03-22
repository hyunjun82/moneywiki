import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년도약계좌 중도해지 불이익: 정부기여금 환수 및 3년 유지 혜택 | 머니위키",
  description: "청년도약계좌 중도해지 시 정부기여금 환수, 비과세 혜택 상실, 3년 유지 시 60% 지급 조건까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년도약계좌-중도해지" },
  openGraph: {
    title: "청년도약계좌 중도해지 불이익: 정부기여금 환수 및 3년 유지 혜택",
    description: "청년도약계좌 중도해지 시 정부기여금 환수, 비과세 혜택 상실, 3년 유지 시 60% 지급 조건까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년도약계좌-중도해지",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
