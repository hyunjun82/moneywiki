import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가족요양비 지원 자격 — 월 233,400원 신청 조건과 절차",
  description: "가족이 노인을 직접 돌보면 월 233,400원을 받을 수 있어요. 장기요양 1~5등급 대상, 자격 조건과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가족요양비-지원-자격" },
  openGraph: {
    title: "가족요양비 지원 자격 — 월 233,400원 신청 조건과 절차 | 머니위키",
    description: "가족이 노인을 직접 돌보면 월 233,400원을 받을 수 있어요. 장기요양 1~5등급 대상, 자격 조건과 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/가족요양비-지원-자격",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
