import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 받으면 건강보험료 줄어드나? 감면 조건과 신청 방법 | 머니위키",
  description: "실업급여 받으면 건강보험료 줄어드나? 감면 조건과 신청 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-건강보험-감면" },
  openGraph: { title: "실업급여 받으면 건강보험료 줄어드나? 감면 조건과 신청 방법", description: "실업급여 받으면 건강보험료 줄어드나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/실업급여-건강보험-감면", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
