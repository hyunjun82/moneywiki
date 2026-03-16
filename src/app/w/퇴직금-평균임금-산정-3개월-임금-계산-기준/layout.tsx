import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 평균임금 3개월 계산 기준 | 급여 변동·제외 기간 정리 | 머니위키",
  description: "퇴직금 평균임금 3개월 기준은 퇴직일 직전 3개월 역일 기준이에요. 급여 변동, 제외 기간, 불리할 때 대처법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-평균임금-산정-3개월-임금-계산-기준" },
  openGraph: {
    title: "퇴직금 평균임금 3개월 계산 기준 | 급여 변동·제외 기간 정리 | 머니위키",
    description: "퇴직금 평균임금 3개월 기준은 퇴직일 직전 3개월 역일 기준이에요. 급여 변동, 제외 기간, 불리할 때 대처법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-평균임금-산정-3개월-임금-계산-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
