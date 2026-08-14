import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 실업급여, 얼마나 받을 수 있을까? 상한액·하한액·월 수령액 계산법",
  description: "2026년 실업급여 상한액 일 68,100원, 하한액 66,048원. 평균임금별 수령액 계산기와 소정급여일수까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026년-실업급여" },
  openGraph: {
    title: "2026년 실업급여, 얼마나 받을 수 있을까? 상한액·하한액·월 수령액 계산법 | 머니위키",
    description: "2026년 실업급여 상한액 일 68,100원, 하한액 66,048원. 평균임금별 수령액 계산기와 소정급여일수까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026년-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
