import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "조기재취업수당, 얼마나 받을까? 자격 조건과 금액 계산법 | 머니위키",
  description: "실업급여 절반 남기고 취업하면 남은 금액의 50%를 돌려받아요. 2026년 기준 자격 조건 6가지, 금액 계산 공식, 고용24 신청 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/조기재취업수당-조건-금액" },
  openGraph: {
    title: "조기재취업수당, 얼마나 받을까? 자격 조건과 금액 계산법 | 머니위키",
    description: "실업급여 절반 남기고 취업하면 남은 금액의 50%를 돌려받아요. 2026년 기준 자격 조건 6가지, 금액 계산 공식, 고용24 신청 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/조기재취업수당-조건-금액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
