import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "예술인 실업급여, 얼마 받을까? 기준보수와 계산 방법",
  description: "예술인도 고용보험에 가입하면 실업급여를 받을 수 있어요. 가입 대상, 수급자격 조건(24개월 중 9개월), 급여 계산법, 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/예술인-실업급여" },
  openGraph: {
    title: "예술인 실업급여, 얼마 받을까? 기준보수와 계산 방법 | 머니위키",
    description: "예술인도 고용보험에 가입하면 실업급여를 받을 수 있어요. 가입 대상, 수급자격 조건(24개월 중 9개월), 급여 계산법, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/예술인-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
