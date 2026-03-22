import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세금 반환보증, 어떻게 신청하나? 가입 조건과 보험료 | 머니위키",
  description: "전세금 반환보증, 어떻게 신청하나? 가입 조건과 보험료에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세금-반환보증-신청" },
  openGraph: { title: "전세금 반환보증, 어떻게 신청하나? 가입 조건과 보험료", description: "전세금 반환보증, 어떻게 신청하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/전세금-반환보증-신청", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
