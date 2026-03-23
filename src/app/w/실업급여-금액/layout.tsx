import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 얼마 받을 수 있나? 일일 수급액과 수급 기간 | 머니위키",
  description: "실업급여 얼마 받을 수 있나? 일일 수급액과 수급 기간에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-금액" },
  openGraph: { title: "실업급여 얼마 받을 수 있나? 일일 수급액과 수급 기간", description: "실업급여 얼마 받을 수 있나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/실업급여-금액", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
