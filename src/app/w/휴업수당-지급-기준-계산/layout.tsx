import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사가 쉬라고 했는데 월급은? 휴업수당 70% 계산과 청구법",
  description: "사용자 귀책사유 휴업 시 평균임금의 70% 이상 휴업수당을 받을 수 있어요. 근로기준법 제46조 기준 계산법과 고용노동부 청구 절차를 안내해요.",
  openGraph: {
    title: "회사가 쉬라고 했는데 월급은? 휴업수당 70% 계산과 청구법",
    description: "사용자 귀책사유 휴업 시 평균임금의 70% 이상 휴업수당을 받을 수 있어요. 근로기준법 제46조 기준 계산법과 고용노동부 청구 절차를 안내해요.",
    type: "article",
  },
  alternates: { canonical: "/w/휴업수당-지급-기준-계산" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
