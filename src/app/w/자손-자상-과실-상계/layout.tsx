export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자손 자상, 과실 50%면 보험금이 절반? 과실 상계 적용 방식과 보상 차이 | 머니위키",
  description: "자손은 내 과실만큼 치료비가 깎이고, 자상은 과실과 관계없이 100% 보상돼요. 자손 과실 상계 적용 방식과 자상과의 보상 차이를 구체적 사례로 비교해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/자손-자상-과실-상계",
  },
  openGraph: {
    title: "자손 자상, 과실 50%면 보험금이 절반? 과실 상계 적용 방식과 보상 차이",
    description: "자손은 과실만큼 깎이고, 자상은 100% 보상. 과실 상계 비교.",
    url: "https://www.jjyu.co.kr/w/자손-자상-과실-상계",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
