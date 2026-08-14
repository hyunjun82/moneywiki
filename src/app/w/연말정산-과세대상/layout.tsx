import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 과세대상 완벽 가이드",
  description: "연말정산에서 과세되는 소득과 비과세되는 소득을 구분하는 방법을 알려드려요. 2025년 기준 과세대상 항목을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-과세대상" },
  openGraph: { title: "연말정산 과세대상 완벽 가이드 | 머니위키", description: "연말정산에서 과세되는 소득과 비과세되는 소득을 구분하는 방법을 알려드려요. 2025년 기준 과세대상 항목을 정리했어요.", url: "https://www.jjyu.co.kr/w/연말정산-과세대상", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
