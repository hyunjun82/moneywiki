import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "햇살론 특례보증 금리 12.5%, 신청 자격과 방법 | 머니위키",
  description: "저신용자 대상 정부 보증 대출, 2026년 금리 12.5%로 인하. 배려대상자 9.9%, 최대 2,000만원 한도와 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/햇살론-특례보증-금리-신청방법" },
  openGraph: {
    title: "햇살론 특례보증 금리 12.5%, 신청 자격과 방법 | 머니위키",
    description: "저신용자 대상 정부 보증 대출, 2026년 금리 12.5%로 인하. 배려대상자 9.9%, 최대 2,000만원 한도와 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/햇살론-특례보증-금리-신청방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
