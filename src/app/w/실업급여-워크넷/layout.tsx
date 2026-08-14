import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 받으려면 워크넷 등록부터 구직 등록과 실업인정",
  description: "실업급여 받으려면 워크넷 등록부터 구직 등록과 실업인정에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-워크넷" },
  openGraph: { title: "실업급여 받으려면 워크넷 등록부터 구직 등록과 실업인정", description: "실업급여 받으려면 워크넷 등록부터 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/실업급여-워크넷", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
