import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 한 달에 얼마 받을까? 2026년 월 수령액과 상·하한 | 머니위키",
  description: "2026년 실업급여 한달 최대 약 204만원, 최소 약 198만원이에요. 퇴직 전 평균임금의 60%로 계산하며, 월급별 예상 금액과 상한액·하한액 기준을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-한달-얼마-받나요" },
  openGraph: {
    title: "실업급여 한 달에 얼마 받을까? 2026년 월 수령액과 상·하한 | 머니위키",
    description: "2026년 실업급여 한달 최대 약 204만원, 최소 약 198만원이에요. 퇴직 전 평균임금의 60%로 계산하며, 월급별 예상 금액과 상한액·하한액 기준을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/실업급여-한달-얼마-받나요",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
