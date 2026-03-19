import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금 수급 자격과 2026년 소득·재산 기준 | 머니위키",
  description: "2026년 기초연금 선정기준액: 단독 월 247만원, 부부 월 395만2천원 이하. 소득인정액 계산 방법과 신청 절차 정리.",
  openGraph: {
    title: "기초연금 2026년 수급 자격과 소득 기준",
    description: "집 있어도 받을 수 있어요. 소득인정액 계산법과 신청 방법 정리.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
