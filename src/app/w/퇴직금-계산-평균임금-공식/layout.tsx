import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 평균임금 공식, 3개월 기준 정확히 적용하는 법 | 머니위키",
  description: "퇴직금 평균임금 공식은 퇴직 전 3개월 임금 총액을 총 일수로 나눈 금액이에요. 불규칙 수당 처리법, 통상임금 비교까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-계산-평균임금-공식" },
  openGraph: {
    title: "퇴직금 평균임금 공식, 3개월 기준 정확히 적용하는 법 | 머니위키",
    description: "퇴직금 평균임금 공식은 퇴직 전 3개월 임금 총액을 총 일수로 나눈 금액이에요. 불규칙 수당 처리법, 통상임금 비교까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-계산-평균임금-공식",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
