import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금이랑 국민연금 뭐가 다를까? 차이 비교와 핵심 정리",
  description: "기초연금은 세금으로 65세 이상에게 주는 연금이고, 국민연금은 본인이 낸 보험료로 받는 연금이에요. 두 제도의 차이를 한눈에 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-국민연금-차이비교-핵심정리" },
  openGraph: { title: "기초연금이랑 국민연금 뭐가 다를까? 차이 비교와 핵심 정리 | 머니위키", description: "기초연금은 세금으로 65세 이상에게 주는 연금이고, 국민연금은 본인이 낸 보험료로 받는 연금이에요. 두 제도의 차이를 한눈에 비교했어요.", url: "https://www.jjyu.co.kr/w/기초연금-국민연금-차이비교-핵심정리", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
