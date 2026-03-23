export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자손 자상 보상 방식, 뭐가 다를까? 보장 항목과 금액 차이 비교 | 머니위키",
  description: "자손은 급수별 한도 내 치료비만 보상하고, 자상은 위자료와 휴업손해까지 전액 보장돼요. 보상 방식 차이를 항목별로 비교해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/자손-자상-보상-방식-차이",
  },
  openGraph: {
    title: "자손 자상 보상 방식, 뭐가 다를까? 보장 항목과 금액 차이 비교",
    description: "자손은 치료비만, 자상은 위자료+휴업손해까지. 보상 방식 비교.",
    url: "https://www.jjyu.co.kr/w/자손-자상-보상-방식-차이",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
