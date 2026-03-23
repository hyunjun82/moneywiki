import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고용보험 가입기간 합산 방법 여러 직장 기간 합치기 | 머니위키",
  description: "고용보험 가입기간 합산 방법 여러 직장 기간 합치기에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고용보험-가입기간-합산" },
  openGraph: { title: "고용보험 가입기간 합산 방법 여러 직장 기간 합치기", description: "고용보험 가입기간 합산 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/고용보험-가입기간-합산", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
