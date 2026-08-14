import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무급휴무일 때문에 180일 미달? 피보험기간 계산 기준",
  description: "무급휴무일이 많으면 6개월 다녀도 피보험기간 180일이 안 될 수 있어요. 유급휴일만 포함되는 계산법과 이전 직장 합산 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무급휴무일-180일-미달" },
  openGraph: {
    title: "무급휴무일 때문에 180일 미달? 피보험기간 계산 기준 | 머니위키",
    description: "무급휴무일이 많으면 6개월 다녀도 피보험기간 180일이 안 될 수 있어요. 유급휴일만 포함되는 계산법과 이전 직장 합산 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/무급휴무일-180일-미달",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
