import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건강보험료가 또 올랐는데, 왜? 2026년 보험료율 7.19% 인상 배경",
  description: "2026년 건강보험료율 7.19%로 3년 만에 인상됐어요. 직장가입자 월평균 2,235원, 지역가입자 1,280원 인상. 재정 적자 전환 전망과 급여외소득 추가 부과 기준까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/건강보험료-인상-이유",
  },
  openGraph: {
    title: "건강보험료가 또 올랐는데, 왜? 2026년 보험료율 7.19% 인상 배경",
    description: "3년 만에 인상. 직장 +2,235원, 지역 +1,280원. 재정 적자 전망과 인상 배경.",
    url: "https://www.jjyu.co.kr/w/건강보험료-인상-이유",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
