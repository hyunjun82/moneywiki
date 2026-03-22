import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아파트 발코니 금연구역 지정할 수 있나? 간접흡연 대응과 신청 방법 | 머니위키",
  description: "아파트 발코니 금연구역 지정할 수 있나? 간접흡연 대응과 신청 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-발코니-금연구역-지정-간접흡연" },
  openGraph: { title: "아파트 발코니 금연구역 지정할 수 있나? 간접흡연 대응과 신청 방법", description: "아파트 발코니 금연구역 지정할 수 있나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/아파트-발코니-금연구역-지정-간접흡연", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
