import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받다가 빨리 취업했다면? 조기재취업수당 조건과 계산법 | 머니위키",
  description: "소정급여일수의 절반 이상 남기고 재취업하면 남은 급여의 50%를 한꺼번에 받아요. 12개월 근무 후 고용24에서 신청하세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업급여-재취업-조건",
  },
  openGraph: {
    title: "조기재취업수당 조건과 계산법",
    description: "남은 급여의 50%를 한번에. 12개월 근무 후 신청.",
    url: "https://www.jjyu.co.kr/w/실업급여-재취업-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
