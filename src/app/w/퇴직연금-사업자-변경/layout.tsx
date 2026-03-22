import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 금융사 바꾸고 싶다면? IRP 이전 절차와 실물이전 제도 | 머니위키",
  description: "IRP는 자유롭게 금융사 변경이 가능하고, 2024년 10월부터 실물이전도 돼요. IRP 이전 5단계 절차, DC형 변경 제한, 수수료·세금 없음 등 핵심을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-사업자-변경" },
  openGraph: {
    title: "퇴직연금 금융사 바꾸고 싶다면? IRP 이전 절차와 실물이전 제도 | 머니위키",
    description: "IRP는 자유롭게 금융사 변경이 가능하고, 2024년 10월부터 실물이전도 돼요. IRP 이전 5단계 절차, DC형 변경 제한, 수수료·세금 없음 등 핵심을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-사업자-변경",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
