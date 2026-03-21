import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 출산휴가급여, 상한액이 또 올랐어요 — 신청방법·배우자휴가까지 | 머니위키",
  description: "2026년 출산전후휴가 급여 상한액 월 220만원, 배우자출산휴가 20일. 대기업·중소기업 지급 방식 차이와 신청 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026년-출산휴가급여" },
  openGraph: {
    title: "2026년 출산휴가급여, 상한액이 또 올랐어요 — 신청방법·배우자휴가까지 | 머니위키",
    description: "2026년 출산전후휴가 급여 상한액 월 220만원, 배우자출산휴가 20일. 대기업·중소기업 지급 방식 차이와 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026년-출산휴가급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
