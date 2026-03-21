import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "4대보험 공제액 계산: 2026년 요율과 실수령액 | 머니위키",
  description: "2026년 국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%예요. 월급 300만원이면 34만원이 공제돼요. 요율표와 계산 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/4대보험-공제액-계산" },
  openGraph: {
    title: "4대보험 공제액 계산: 2026년 요율과 실수령액 | 머니위키",
    description: "2026년 국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%예요. 월급 300만원이면 34만원이 공제돼요. 요율표와 계산 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/4대보험-공제액-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
