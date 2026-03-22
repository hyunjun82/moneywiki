import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자동차상해 특약 vs 자기신체사고 차이, 보상 범위와 청구법 | 머니위키",
  description: "자동차상해 특약은 과실 100%여도 보상돼요. 자기신체사고와 보장 범위, 보험료, 청구 방법 차이를 비교했어요.",
  openGraph: {
    title: "자동차상해 특약 vs 자기신체사고 차이, 보상 범위와 청구법 | 머니위키",
    description: "자동차상해 특약과 자기신체사고 보장 차이를 비교했어요.",
    url: "https://www.jjyu.co.kr/w/자동차보험-자동차상해-특약",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/자동차보험-자동차상해-특약" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
