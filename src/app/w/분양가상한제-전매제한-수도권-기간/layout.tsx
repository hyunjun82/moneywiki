import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "분양가상한제 전매제한 기간, 수도권 지역별 기간과 확인 방법 | 머니위키",
  description: "수도권 분양가상한제 적용주택의 전매제한 기간을 알려드려요. 공공택지 3년, 과밀억제권역 1년, 그 외 6개월로 지역마다 달라요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/분양가상한제-전매제한-수도권-기간" },
  openGraph: {
    title: "분양가상한제 전매제한 기간, 수도권 지역별 기간과 확인 방법 | 머니위키",
    description: "수도권 분양가상한제 적용주택의 전매제한 기간을 알려드려요. 공공택지 3년, 과밀억제권역 1년, 그 외 6개월로 지역마다 달라요.",
    url: "https://www.jjyu.co.kr/w/분양가상한제-전매제한-수도권-기간",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
