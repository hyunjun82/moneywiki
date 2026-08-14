import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 보훈급여금 월 지급액표",
  description: "2026년 보훈급여금 전년 대비 5% 인상. 국가유공자·독립유공자·참전유공자·고엽제 유형별 월 지급액 한눈에 확인하세요.",
  openGraph: {
    title: "2026년 보훈급여금 월 지급액표",
    description: "국가유공자·독립유공자·참전유공자 유형별 2026년 월 지급액 정리.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
