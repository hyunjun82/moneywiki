import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무보험 교통사고 과실: 과실 비율 인정 및 책임 배상 기준 | 머니위키",
  description: "무보험 차량과 사고 났는데 내 과실도 있다면 어떻게 될까요? 과실 비율은 일반 사고와 똑같이 적용되고, 정부 보상 한도 내에서 과실 상계돼요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무보험-교통사고-과실" },
  openGraph: { title: "무보험 교통사고 과실: 과실 비율 인정 및 책임 배상 기준 | 머니위키", description: "무보험 차량과 사고 났는데 내 과실도 있다면 어떻게 될까요? 과실 비율은 일반 사고와 똑같이 적용되고, 정부 보상 한도 내에서 과실 상계돼요", url: "https://www.jjyu.co.kr/w/무보험-교통사고-과실", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
