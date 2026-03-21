import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 피보험기간 180일 계산법과 이전 직장 합산 조건",
  description: "피보험기간은 퇴직 전 18개월 내 180일 이상이어야 실업급여를 받을 수 있어요. 이전 직장 기간 합산 조건과 수급일수 결정 방법을 정리했어요.",
  alternates: {
    canonical: "/w/실업급여-피보험기간",
  },
  openGraph: {
    title: "실업급여 피보험기간 180일 계산법과 이전 직장 합산 조건",
    description: "피보험기간은 퇴직 전 18개월 내 180일 이상이어야 실업급여를 받을 수 있어요. 이전 직장 기간 합산 조건과 수급일수 결정 방법을 정리했어요.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
