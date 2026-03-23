export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "내 과실 사고에서 자손·자상 보험금을 받을 수 있나요? 과실 비율과 보상 범위 | 머니위키",
  description: "자손(자기신체사고)은 내 과실에도 보상돼요. 자상(자동차상해)도 과실과 관계없이 보상 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자손-자상-내-과실-보상" },
  openGraph: { title: "내 과실 사고에서 자손·자상 보험금을 받을 수 있나요? 과실 비율과 보상 범위 | 머니위키", description: "자손(자기신체사고)은 내 과실에도 보상돼요. 자상(자동차상해)도 과실과 관계없이 보상 가능해요.", url: "https://www.jjyu.co.kr/w/자손-자상-내-과실-보상", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
