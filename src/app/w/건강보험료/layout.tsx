import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건강보험료 얼마나 내나? 직장 지역가입자 보험료 기준 | 머니위키",
  description: "건강보험료 얼마나 내나? 직장 지역가입자 보험료 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건강보험료" },
  openGraph: { title: "건강보험료 얼마나 내나? 직장 지역가입자 보험료 기준", description: "건강보험료 얼마나 내나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/건강보험료", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
