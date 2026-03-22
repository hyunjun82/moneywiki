import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아기 근로시간 단축, 급여는 얼마? 2026년 상한액과 신청 조건 | 머니위키",
  description: "2026년 육아기 근로시간 단축 급여 상한액이 250만원으로 인상됐어요. 급여 계산법, 신청 조건, 사용 기간까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아기-근로시간-단축" },
  openGraph: {
    title: "육아기 근로시간 단축, 급여는 얼마? 2026년 상한액과 신청 조건 | 머니위키",
    description: "2026년 육아기 근로시간 단축 급여 상한액이 250만원으로 인상됐어요. 급여 계산법, 신청 조건, 사용 기간까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/육아기-근로시간-단축",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
