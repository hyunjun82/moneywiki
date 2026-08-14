import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임대차 건물 양도 임대인 지위 승계 2026",
  description: "임대 중인 건물 팔았어요. 세입자한테 통보해야 하나요? 새 주인이 자동으로 임대인 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차-건물-양도-임대인-지위" },
  openGraph: { title: "임대차 건물 양도 임대인 지위 승계 2026", description: "임대 중인 건물 팔았어요. 세입자한테 통보해야 하나요? 새 주인이 자동으로 임대인 돼요.", url: "https://www.jjyu.co.kr/w/임대차-건물-양도-임대인-지위", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
