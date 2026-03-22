import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "하루 4시간 일해도 실업급여 받을 수 있을까? 주 15시간 기준 | 머니위키",
  description: "주 15시간 이상 근무하면 고용보험 가입 대상이고 실업급여를 받을 수 있어요. 주 15시간 미만 초단시간 근로자는 국민취업지원제도로 월 50만원까지 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/4시간-미만-단시간-실업급여",
  },
  openGraph: {
    title: "하루 4시간 일해도 실업급여 받을 수 있을까? 주 15시간 기준",
    description: "주 15시간 이상이면 실업급여 가능, 미만이면 국민취업지원제도 월 50만원.",
    url: "https://www.jjyu.co.kr/w/4시간-미만-단시간-실업급여",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
