import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재개발 정비구역 영업보상 받을 수 있나? 보상 대상과 금액 기준 | 머니위키",
  description: "재개발 정비구역 영업보상 받을 수 있나? 보상 대상과 금액 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재개발-정비구역-영업보상" },
  openGraph: { title: "재개발 정비구역 영업보상 받을 수 있나? 보상 대상과 금액 기준", description: "재개발 정비구역 영업보상 받을 수 있나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/재개발-정비구역-영업보상", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
