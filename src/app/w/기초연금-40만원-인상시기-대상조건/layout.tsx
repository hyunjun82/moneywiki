import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 40만원 인상, 언제부터? 인상 시기와 대상 조건 | 머니위키",
  description: "기초연금 40만원 인상 계획과 현재 기준연금액을 정리했어요. 2028년 목표 시기와 단계적 인상 구조예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-40만원-인상시기-대상조건" },
  openGraph: {
    title: "기초연금 40만원 인상, 언제부터? 인상 시기와 대상 조건 | 머니위키",
    description: "기초연금 40만원 인상 계획과 현재 기준연금액을 정리했어요. 2028년 목표 시기와 단계적 인상 구조예요.",
    url: "https://www.jjyu.co.kr/w/기초연금-40만원-인상시기-대상조건",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
