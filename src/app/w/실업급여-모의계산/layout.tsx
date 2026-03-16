import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 모의계산, 월급별 예상 금액과 상한·하한 기준 | 머니위키",
  description: "월급, 나이, 고용보험 가입기간을 입력하면 실업급여 예상 수령액을 바로 계산해요. 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-모의계산" },
  openGraph: {
    title: "실업급여 모의계산, 월급별 예상 금액과 상한·하한 기준 | 머니위키",
    description: "월급, 나이, 고용보험 가입기간을 입력하면 실업급여 예상 수령액을 바로 계산해요. 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용.",
    url: "https://www.jjyu.co.kr/w/실업급여-모의계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
