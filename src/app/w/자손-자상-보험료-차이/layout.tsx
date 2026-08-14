import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자손 자상 보험료 차이: 얼마나 비싸나요",
  description: "자손과 자상 보험료 차이가 궁금하시죠? 연간 3만~5만원 차이지만 보장 범위는 2배 이상 달라요. 과실 비율, 위자료, 휴업손해까지 정확히 비교해드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자손-자상-보험료-차이" },
  openGraph: {
    title: "자손 자상 보험료 차이: 얼마나 비싸나요",
    description: "자손과 자상 보험료 차이가 궁금하시죠? 연간 3만~5만원 차이지만 보장 범위는 2배 이상 달라요. 과실 비율, 위자료, 휴업손해까지 정확히 비교해드려요",
    url: "https://www.jjyu.co.kr/w/자손-자상-보험료-차이",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
