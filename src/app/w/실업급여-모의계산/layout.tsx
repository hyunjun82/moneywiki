import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 얼마 받을까? 월급별 예상 금액 계산법 | 머니위키",
  description: "실업급여 예상 수령액을 월급, 나이, 가입기간으로 바로 계산해보세요. 2026년 기준 상한액 68,100원, 하한액 66,048원 적용 계산기 제공.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-모의계산" },
  openGraph: {
    title: "실업급여 얼마 받을까? 월급별 예상 금액 계산법 | 머니위키",
    description: "실업급여 예상 수령액을 월급, 나이, 가입기간으로 바로 계산해보세요. 2026년 기준 상한액 68,100원, 하한액 66,048원 적용 계산기 제공.",
    url: "https://www.jjyu.co.kr/w/실업급여-모의계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
