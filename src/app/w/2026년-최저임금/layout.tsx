import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 최저임금 시급 10,320원 — 월급·실수령액·위반 신고까지 | 머니위키",
  description: "2026년 최저임금은 시급 10,320원, 월급 약 215만원이에요. 4대보험 공제 후 실수령액과 수습 감액, 위반 신고 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026년-최저임금" },
  openGraph: {
    title: "2026년 최저임금 시급 10,320원 — 월급·실수령액·위반 신고까지 | 머니위키",
    description: "2026년 최저임금은 시급 10,320원, 월급 약 215만원이에요. 4대보험 공제 후 실수령액과 수습 감액, 위반 신고 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026년-최저임금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
