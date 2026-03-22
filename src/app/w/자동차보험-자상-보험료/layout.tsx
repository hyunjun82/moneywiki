import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자동차보험 자상 보험료, 자손과 얼마나 다를까? | 머니위키",
  description: "자동차상해(자상)는 자기신체사고(자손)보다 연 3~5만원 비싸지만, 과실 무관 전액 보상이에요. 보험료 차이와 보장 비교를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/자동차보험-자상-보험료",
  },
  openGraph: {
    title: "자동차보험 자상 보험료, 자손과 얼마나 다를까?",
    description: "연 3~5만원 차이로 보상이 수천만원 달라져요. 보험료와 보장 범위를 비교했어요.",
    url: "https://www.jjyu.co.kr/w/자동차보험-자상-보험료",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
