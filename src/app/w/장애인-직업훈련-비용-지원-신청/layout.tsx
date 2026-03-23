export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애인 직업훈련·비용 지원·신청 | 머니위키",
  description: "장애인이 취업에 필요한 직무능력을 키울 수 있도록 국가에서 훈련비와 훈련수당을 지원해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-직업훈련-비용-지원-신청" },
  openGraph: { title: "장애인 직업훈련·비용 지원·신청 | 머니위키", description: "장애인이 취업에 필요한 직무능력을 키울 수 있도록 국가에서 훈련비와 훈련수당을 지원해요.", url: "https://www.jjyu.co.kr/w/장애인-직업훈련-비용-지원-신청", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
