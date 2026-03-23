import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고객 폭언으로 우울증, 산재 되나? 정신질환 산재 인정 기준 | 머니위키",
  description: "고객 폭언으로 우울증, 산재 되나? 정신질환 산재 인정 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고객-폭언-우울증-산재인정" },
  openGraph: { title: "고객 폭언으로 우울증, 산재 되나? 정신질환 산재 인정 기준", description: "고객 폭언으로 우울증, 산재 되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/고객-폭언-우울증-산재인정", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
