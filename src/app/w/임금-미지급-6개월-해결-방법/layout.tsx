import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임금 체불 6개월, 어떻게 해결하나? 진정과 소송 절차 | 머니위키",
  description: "임금 체불 6개월, 어떻게 해결하나? 진정과 소송 절차에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금-미지급-6개월-해결-방법" },
  openGraph: { title: "임금 체불 6개월, 어떻게 해결하나? 진정과 소송 절차", description: "임금 체불 6개월, 어떻게 해결하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/임금-미지급-6개월-해결-방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
