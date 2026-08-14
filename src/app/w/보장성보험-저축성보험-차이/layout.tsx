import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보장성보험 vs 저축성보험, 뭐가 다른가요? 차이점과 선택 기준",
  description: "보장성은 위험 대비, 저축성은 목돈 마련이 목적이에요. 보험료 공제 차이와 선택 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보장성보험-저축성보험-차이" },
  openGraph: { title: "보장성보험 vs 저축성보험, 뭐가 다른가요? 차이점과 선택 기준 | 머니위키", description: "보장성은 위험 대비, 저축성은 목돈 마련이 목적이에요. 보험료 공제 차이와 선택 기준을 정리했어요.", url: "https://www.jjyu.co.kr/w/보장성보험-저축성보험-차이", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
