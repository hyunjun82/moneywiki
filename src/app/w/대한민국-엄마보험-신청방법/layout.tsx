import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "엄마보험 신청 방법과 보장 내용 가입 대상과 혜택",
  description: "엄마보험 신청 방법과 보장 내용 가입 대상과 혜택에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대한민국-엄마보험-신청방법" },
  openGraph: { title: "엄마보험 신청 방법과 보장 내용 가입 대상과 혜택", description: "엄마보험 신청 방법과 보장 내용 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/대한민국-엄마보험-신청방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
