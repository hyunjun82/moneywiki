import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 실업신고, 어떻게 하나? 고용센터 신고 절차 | 머니위키",
  description: "실업급여 실업신고, 어떻게 하나? 고용센터 신고 절차에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-실업신고" },
  openGraph: { title: "실업급여 실업신고, 어떻게 하나? 고용센터 신고 절차", description: "실업급여 실업신고, 어떻게 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/실업급여-실업신고", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
