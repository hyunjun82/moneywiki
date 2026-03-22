import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "평균임금 산정 방법: 3개월 계산 공식 및 포함 항목 | 머니위키",
  description: "퇴직금 받을 때 평균임금이 중요하다는 거 아시나요? 3개월 임금 총액 기준으로 계산하는 방법과 포함되는 항목, 제외되는 기간을 명확히 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/평균임금-산정-방법" },
  openGraph: { title: "평균임금 산정 방법: 3개월 계산 공식 및 포함 항목", description: "퇴직금 받을 때 평균임금이 중요하다는 거 아시나요? 3개월 임금 총액 기준으로 계산하는 방법과 포함되는 항목, 제외되는 기간을 명확히 알려드려요", url: "https://www.jjyu.co.kr/w/평균임금-산정-방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
