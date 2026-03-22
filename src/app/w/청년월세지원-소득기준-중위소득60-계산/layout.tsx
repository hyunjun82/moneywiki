import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 소득 기준, 중위소득 60% 어떻게 계산할까? | 머니위키",
  description: "청년월세지원 소득 기준인 중위소득 60%를 직접 계산하는 방법을 정리했어요. 가구원수별 기준 금액과 소득인정액 계산법까지 알려줘요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-소득기준-중위소득60-계산" },
  openGraph: { title: "청년월세지원 소득 기준, 중위소득 60% 어떻게 계산할까? | 머니위키", description: "청년월세지원 소득 기준인 중위소득 60%를 직접 계산하는 방법을 정리했어요. 가구원수별 기준 금액과 소득인정액 계산법까지 알려줘요.", url: "https://www.jjyu.co.kr/w/청년월세지원-소득기준-중위소득60-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
