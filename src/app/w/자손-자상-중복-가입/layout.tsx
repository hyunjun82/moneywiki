import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자동차보험 자손·자상, 둘 다 가입해야 하나요? 중복 가입 여부와 보상 범위",
  description: "자손(자기신체사고)과 자상(자동차상해)은 보상 범위가 달라요. 중복 가입 시 장단점을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자손-자상-중복-가입" },
  openGraph: { title: "자동차보험 자손·자상, 둘 다 가입해야 하나요? 중복 가입 여부와 보상 범위 | 머니위키", description: "자손(자기신체사고)과 자상(자동차상해)은 보상 범위가 달라요. 중복 가입 시 장단점을 정리했어요.", url: "https://www.jjyu.co.kr/w/자손-자상-중복-가입", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
