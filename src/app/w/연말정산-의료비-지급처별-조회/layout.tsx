import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 의료비 지급처별 조회 완벽 가이드 | 머니위키",
  description: "의료비 지급처별 조회는 간소화서비스에서 병원·약국·의료기관별로 의료비를 확인할 수 있어요. 2025년 기준 조회 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-의료비-지급처별-조회" },
  openGraph: { title: "연말정산 의료비 지급처별 조회 완벽 가이드", description: "의료비 지급처별 조회는 간소화서비스에서 병원·약국·의료기관별로 의료비를 확인할 수 있어요. 2025년 기준 조회 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/연말정산-의료비-지급처별-조회", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
