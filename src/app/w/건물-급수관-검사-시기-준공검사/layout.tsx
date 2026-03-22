import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "급수관 검사 언제 해야 하나? 검사 의무 시기와 비용 | 머니위키",
  description: "급수관 검사 언제 해야 하나? 검사 의무 시기와 비용에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건물-급수관-검사-시기-준공검사" },
  openGraph: { title: "급수관 검사 언제 해야 하나? 검사 의무 시기와 비용", description: "급수관 검사 언제 해야 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/건물-급수관-검사-시기-준공검사", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
