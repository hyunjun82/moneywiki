import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 달라지는 제도 — 최저임금부터 세금·복지까지 | 머니위키",
  description: "2026년 최저임금 10,320원, 국민연금 9.5%, 법인세 1%p 인상, 실업급여 상한 68,100원. 내 월급·세금에 영향 주는 변경사항을 항목별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026년-달라지는-제도" },
  openGraph: {
    title: "2026년 달라지는 제도 — 최저임금부터 세금·복지까지 | 머니위키",
    description: "2026년 최저임금 10,320원, 국민연금 9.5%, 법인세 1%p 인상, 실업급여 상한 68,100원. 내 월급·세금에 영향 주는 변경사항을 항목별로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026년-달라지는-제도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
