import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "요양보호사 자격시험 응시 방법: 응시 조건 및 신청 절차 | 머니위키",
  description: "요양보호사 자격증 취득하려면 어떻게 해야 할지 궁금하시죠? 2026년 CBT 시험 방식부터 응시 조건, 신청 절차, 응시료까지 한 번에 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/요양보호사-자격시험-응시-방법" },
  openGraph: {
    title: "요양보호사 자격시험 응시 방법: 응시 조건 및 신청 절차",
    description: "요양보호사 자격증 취득하려면 어떻게 해야 할지 궁금하시죠? 2026년 CBT 시험 방식부터 응시 조건, 신청 절차, 응시료까지 한 번에 알려드려요",
    url: "https://www.jjyu.co.kr/w/요양보호사-자격시험-응시-방법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
