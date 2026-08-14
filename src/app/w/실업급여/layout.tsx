import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 수급자격: 고용보험 가입기간 및 비자발적 퇴사 기준",
  description: "실업급여 받을 수 있는 조건이 궁금하시죠. 고용보험 가입기간, 퇴사 사유, 구직 의사가 핵심이에요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여" },
  openGraph: { title: "실업급여 수급자격: 고용보험 가입기간 및 비자발적 퇴사 기준 | 머니위키", description: "실업급여 받을 수 있는 조건이 궁금하시죠. 고용보험 가입기간, 퇴사 사유, 구직 의사가 핵심이에요", url: "https://www.jjyu.co.kr/w/실업급여", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
