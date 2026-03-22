import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "행복주택 임대차계약서 작성 방법 자금지원과 입주 절차 | 머니위키",
  description: "행복주택 임대차계약서 작성 방법 자금지원과 입주 절차에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/행복주택-임대차계약서-작성-자금지원" },
  openGraph: { title: "행복주택 임대차계약서 작성 방법 자금지원과 입주 절차", description: "행복주택 임대차계약서 작성 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/행복주택-임대차계약서-작성-자금지원", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
