import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택 증축 대수선 정의 차이 허가 절차 | 머니위키",
  description: "집을 고치려는데 증축인지 대수선인지 헷갈리시죠? 둘은 전혀 다른 개념이에요.",
  openGraph: { title: "주택 증축 대수선 정의 차이 허가 절차", description: "집을 고치려는데 증축인지 대수선인지 헷갈리시죠? 둘은 전혀 다른 개념이에요.", url: "https://jjyu.co.kr/w/주택-증축-대수선-정의-차이" },
  alternates: { canonical: "https://jjyu.co.kr/w/주택-증축-대수선-정의-차이" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
