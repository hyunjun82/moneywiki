import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 법인세율 인상 개정 세율표 | 머니위키",
  description: "2026년부터 법인세율 전 구간 1%p 인상. 2억 이하 10%, 3천억 초과 25%. 과세표준별 세금 변화와 중소기업 특례, 절세 체크리스트까지.",
  openGraph: {
    title: "2026년 법인세율 인상 개정 세율표",
    description: "2026년부터 법인세율 전 구간 1%p 인상. 과세표준별 세율 비교와 절세 전략.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
