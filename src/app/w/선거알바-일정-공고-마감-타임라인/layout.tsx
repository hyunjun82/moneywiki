import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026 지방선거 알바 일정, 공고부터 급여 지급까지 | 머니위키",
  description: "2026년 6월 3일 지방선거 알바 일정을 타임라인으로 정리했어요. 공고 시작, 접수 마감, 교육, 근무일, 급여 입금까지 한눈에 볼 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/선거알바-일정-공고-마감-타임라인" },
  openGraph: {
    title: "2026 지방선거 알바 일정, 공고부터 급여 지급까지 | 머니위키",
    description: "2026년 6월 3일 지방선거 알바 일정을 타임라인으로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/선거알바-일정-공고-마감-타임라인",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
