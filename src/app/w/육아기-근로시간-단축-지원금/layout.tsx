import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아기 근로시간 단축 지원금, 2026년 상한액 250만원 신청법 | 머니위키",
  description: "2026년부터 육아기 근로시간 단축 급여 상한액이 250만원으로 올랐어요. 주 10시간 단축 시 통상임금 100%, 신청 방법과 10시 출근제까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-지원금" },
  openGraph: {
    title: "육아기 근로시간 단축 지원금, 2026년 상한액 250만원 신청법 | 머니위키",
    description: "2026년부터 육아기 근로시간 단축 급여 상한액이 250만원으로 올랐어요. 주 10시간 단축 시 통상임금 100%, 신청 방법과 10시 출근제까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-지원금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
