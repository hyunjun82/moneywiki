import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "피보험단위기간 180일 계산, 어떻게? 유급·무급 포함 기준",
  description: "피보험단위기간은 실제 근무일과 유급휴일을 합친 일수예요. 6개월 일해도 180일이 안 되는 이유와 정확한 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-피보험단위기간" },
  openGraph: {
    title: "피보험단위기간 180일 계산, 어떻게? 유급·무급 포함 기준 | 머니위키",
    description: "피보험단위기간은 실제 근무일과 유급휴일을 합친 일수예요. 6개월 일해도 180일이 안 되는 이유와 정확한 계산법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-피보험단위기간",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
