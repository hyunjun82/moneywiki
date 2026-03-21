import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "실업급여 180일 피보험기간 계산법과 합산 기준 | 머니위키",
  description: "실업급여 수급 요건 180일의 정확한 계산법, 여러 직장 합산 기준, 수급 기간과 자발적 퇴사 조건을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-180일" },
  openGraph: {
    title: "실업급여 180일 피보험기간 계산법 | 머니위키",
    description: "실업급여 수급 요건 180일 계산법, 합산 기준, 수급 기간을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/실업급여-180일",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
