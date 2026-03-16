import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "피보험기간 근무일수, 180일이 몇 개월? 계산 방법 | 머니위키",
  description: "실업급여 피보험기간 180일이 실제 몇 개월인지, 유급휴일 포함 여부와 여러 직장 합산 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/피보험기간-근무일수-계산-방법" },
  openGraph: {
    title: "피보험기간 근무일수, 180일이 몇 개월? 계산 방법 | 머니위키",
    description: "실업급여 피보험기간 180일이 실제 몇 개월인지, 유급휴일 포함 여부와 여러 직장 합산 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/피보험기간-근무일수-계산-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
