import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 계산기, 내 금액은 얼마? 2026년 자동 계산법 | 머니위키",
  description: "2026년 고용24 공식 기준 반영 실업급여 계산기예요. 나이, 고용보험 가입기간, 퇴직 전 월급을 입력하면 예상 총액과 수급기간이 자동으로 나와요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-계산기" },
  openGraph: {
    title: "실업급여 계산기, 내 금액은 얼마? 2026년 자동 계산법 | 머니위키",
    description: "2026년 고용24 공식 기준 반영 실업급여 계산기예요. 나이, 고용보험 가입기간, 퇴직 전 월급을 입력하면 예상 총액과 수급기간이 자동으로 나와요.",
    url: "https://www.jjyu.co.kr/w/실업급여-계산기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
