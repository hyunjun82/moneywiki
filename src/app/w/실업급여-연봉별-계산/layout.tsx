import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여, 내 연봉이면 얼마 받을까? 상한·하한액과 계산 공식 | 머니위키",
  description: "퇴직 전 3개월 평균임금의 60%가 1일 구직급여예요. 2026년 상한액 66,000원, 하한액 63,104원 기준으로 연봉별 예상 금액을 계산해 드려요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업급여-연봉별-계산",
  },
  openGraph: {
    title: "실업급여, 내 연봉이면 얼마 받을까? 상한·하한액과 계산 공식",
    description: "연봉 4,000만원 이상은 상한액 66,000원 적용. 계산기로 내 예상 금액 확인.",
    url: "https://www.jjyu.co.kr/w/실업급여-연봉별-계산",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
