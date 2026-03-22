import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "햇살론 일반보증 특례보증 금리 조건, 통합 변경사항 | 머니위키",
  description: "햇살론이 2026년 1월 통합됐어요. 일반보증은 금리 최대 12.5%, 특례보증은 12.5% 고정이에요. 모든 금융사에서 신청 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/햇살론-일반보증-특례보증-금리-조건" },
  openGraph: {
    title: "햇살론 일반보증 특례보증 금리 조건, 통합 변경사항",
    description: "햇살론이 2026년 1월 통합됐어요. 일반보증은 금리 최대 12.5%, 특례보증은 12.5% 고정이에요. 모든 금융사에서 신청 가능해요.",
    url: "https://www.jjyu.co.kr/w/햇살론-일반보증-특례보증-금리-조건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
