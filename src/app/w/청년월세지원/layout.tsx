import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년월세지원 2026 — 월 최대 20만원 24개월 자격·신청",
  description: "만 19~34세 청년에게 월세 최대 20만원을 24개월 지원해요. 중위소득 60% 이하, 무주택 조건, 2026년 3월 30일~5월 29일 신청. 자격 확인부터 복지로 신청까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원" },
  openGraph: {
    title: "청년월세지원 2026 — 월 최대 20만원 24개월 자격·신청 | 머니위키",
    description: "만 19~34세 청년에게 월세 최대 20만원을 24개월 지원해요. 중위소득 60% 이하, 무주택 조건, 2026년 3월 30일~5월 29일 신청. 자격 확인부터 복지로 신청까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년월세지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
