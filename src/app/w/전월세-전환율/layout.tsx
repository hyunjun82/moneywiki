import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전월세 전환율 계산 방법 보증금과 월세 전환 기준 | 머니위키",
  description: "전월세 전환율 계산 방법 보증금과 월세 전환 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전월세-전환율" },
  openGraph: { title: "전월세 전환율 계산 방법 보증금과 월세 전환 기준", description: "전월세 전환율 계산 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/전월세-전환율", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
