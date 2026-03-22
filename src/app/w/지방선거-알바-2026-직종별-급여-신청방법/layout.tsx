import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026 지방선거 알바, 하루 최대 19만원? 직종별 급여와 신청 방법 | 머니위키",
  description: "2026년 6월 지방선거 알바는 투표관리관 19만원, 투표사무원 13만원, 개표사무원 7.5만원이에요. 직종별 급여와 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지방선거-알바-2026-직종별-급여-신청방법" },
  openGraph: {
    title: "2026 지방선거 알바, 하루 최대 19만원? 직종별 급여와 신청 방법 | 머니위키",
    description: "2026년 6월 지방선거 알바는 투표관리관 19만원, 투표사무원 13만원, 개표사무원 7.5만원이에요. 직종별 급여와 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/지방선거-알바-2026-직종별-급여-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
