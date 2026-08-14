import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "단시간 근로자 실업급여, 주 15시간 기준과 수급 자격",
  description: "주 15시간 미만 초단시간 근로자도 3개월 이상 일했으면 고용보험 가입 대상이에요. 피보험기간 계산법, 여러 직장 합산, 하한액 보장까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/단시간-근로자-실업급여" },
  openGraph: {
    title: "단시간 근로자 실업급여, 주 15시간 기준과 수급 자격 | 머니위키",
    description: "주 15시간 미만 초단시간 근로자도 3개월 이상 일했으면 고용보험 가입 대상이에요. 피보험기간 계산법, 여러 직장 합산, 하한액 보장까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/단시간-근로자-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
