import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "과천 주택 공급 9800가구 — 경마장·군부대 이전 부지 위치와 청약 일정",
  description: "2026년 1월 국토교통부가 발표한 과천 9800가구 공급 계획. 경마장과 기무사 부지 143만㎡에 들어서는 대단지 위치와 청약 준비 사항을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/과천-주택-공급-9800가구" },
  openGraph: {
    title: "과천 주택 공급 9800가구 — 경마장·군부대 이전 부지 위치와 청약 일정 | 머니위키",
    description: "2026년 1월 국토교통부가 발표한 과천 9800가구 공급 계획. 경마장과 기무사 부지 143만㎡에 들어서는 대단지 위치와 청약 준비 사항을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/과천-주택-공급-9800가구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
