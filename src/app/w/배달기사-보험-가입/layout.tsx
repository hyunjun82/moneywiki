import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "배달기사 보험, 꼭 가입해야 하나? 의무보험과 선택보험 | 머니위키",
  description: "배달기사 보험, 꼭 가입해야 하나? 의무보험과 선택보험에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배달기사-보험-가입" },
  openGraph: { title: "배달기사 보험, 꼭 가입해야 하나? 의무보험과 선택보험", description: "배달기사 보험, 꼭 가입해야 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/배달기사-보험-가입", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
