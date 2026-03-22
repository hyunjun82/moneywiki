import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무보험 차에 치이면 어떡하나요? 무보험차 상해 특약 보장 범위와 가입법 | 머니위키",
  description: "무보험차 상해 특약은 무보험 차량, 뺑소니, 전동킥보드 사고 시 최대 2억원까지 보상해요. 보험료는 연간 1만원 미만이고 가족까지 보장돼요. 자동차보험 갱신 때 꼭 확인하세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/무보험차-상해-특약",
  },
  openGraph: {
    title: "무보험 차에 치이면 어떡하나요? 무보험차 상해 특약 보장 범위와 가입법",
    description: "최대 2억 보장, 보험료 1만원 미만. 뺑소니·킥보드 사고 포함.",
    url: "https://www.jjyu.co.kr/w/무보험차-상해-특약",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
