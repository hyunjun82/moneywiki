import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "봉사료(팁)는 임금에 포함되나? 팁의 법적 성격과 세금 | 머니위키",
  description: "봉사료(팁)는 임금에 포함되나? 팁의 법적 성격과 세금에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/봉사료-팁-임금-포함-여부" },
  openGraph: { title: "봉사료(팁)는 임금에 포함되나? 팁의 법적 성격과 세금", description: "봉사료(팁)는 임금에 포함되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/봉사료-팁-임금-포함-여부", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
