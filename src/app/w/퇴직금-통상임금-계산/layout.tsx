import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 통상임금 계산법 | 평균임금과 차이·유리한 쪽 적용 | 머니위키",
  description: "퇴직금 통상임금은 정기적·일률적·고정적 임금이에요. 평균임금보다 높으면 통상임금 기준으로 받을 수 있죠. 계산법과 적용 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-통상임금-계산" },
  openGraph: {
    title: "퇴직금 통상임금 계산법 | 평균임금과 차이·유리한 쪽 적용 | 머니위키",
    description: "퇴직금 통상임금은 정기적·일률적·고정적 임금이에요. 평균임금보다 높으면 통상임금 기준으로 받을 수 있죠. 계산법과 적용 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-통상임금-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
