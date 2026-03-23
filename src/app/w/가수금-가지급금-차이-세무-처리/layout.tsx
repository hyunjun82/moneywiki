import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "가수금과 가지급금 차이는? 세무 처리와 인정이자 | 머니위키",
  description: "가수금과 가지급금 차이는? 세무 처리와 인정이자에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가수금-가지급금-차이-세무-처리" },
  openGraph: { title: "가수금과 가지급금 차이는? 세무 처리와 인정이자", description: "가수금과 가지급금 차이는? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/가수금-가지급금-차이-세무-처리", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
