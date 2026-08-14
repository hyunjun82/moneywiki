import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "예금자보호제도 한도 1억원 2026",
  description: "2025년 9월 1일부터 예금보호 한도가 1억원으로 상향됐어요. 어떤 상품이 보호되는지, 계산은 어떻게 하는지 쉽게 정리해드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/예금자보호제도-한도-1억원-2026" },
  openGraph: { title: "예금자보호제도 한도 1억원 2026 | 머니위키", description: "2025년 9월 1일부터 예금보호 한도가 1억원으로 상향됐어요. 어떤 상품이 보호되는지, 계산은 어떻게 하는지 쉽게 정리해드릴게요.", url: "https://www.jjyu.co.kr/w/예금자보호제도-한도-1억원-2026", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
