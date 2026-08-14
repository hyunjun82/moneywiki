import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 받을 수 있는 조건은? 수급 자격과 피보험기간",
  description: "실업급여 받을 수 있는 조건은? 수급 자격과 피보험기간에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-조건" },
  openGraph: { title: "실업급여 받을 수 있는 조건은? 수급 자격과 피보험기간", description: "실업급여 받을 수 있는 조건은? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/실업급여-조건", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
