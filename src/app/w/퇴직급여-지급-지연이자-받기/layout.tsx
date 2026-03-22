import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 14일 안에 안 줬다면? 연 20% 지연이자 계산과 청구법",
  description: "퇴사 후 14일 넘기면 연 20% 지연이자가 자동 발생해요. 근로자퇴직급여보장법 제9조 기준 계산법과 고용노동부 신고 절차를 안내해요.",
  openGraph: {
    title: "퇴직금 14일 안에 안 줬다면? 연 20% 지연이자 계산과 청구법",
    description: "퇴사 후 14일 넘기면 연 20% 지연이자가 자동 발생해요. 근로자퇴직급여보장법 제9조 기준 계산법과 고용노동부 신고 절차를 안내해요.",
    type: "article",
  },
  alternates: { canonical: "/w/퇴직급여-지급-지연이자-받기" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
