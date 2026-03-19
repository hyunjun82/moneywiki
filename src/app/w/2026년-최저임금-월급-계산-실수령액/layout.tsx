import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 최저임금 월급 계산 4대보험 공제 후 실수령액 | 머니위키",
  description: "2026년 최저시급 10,320원. 월 209시간 기준 기본급 2,156,880원, 4대보험 공제 후 실수령액 약 195만원. 주휴수당 포함 계산법 정리.",
  openGraph: {
    title: "2026년 최저임금 월급 계산과 4대보험 공제 후 실수령액",
    description: "시급 10,320원 기준 월급과 4대보험 공제액, 주휴수당 포함 실수령액을 계산해요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
