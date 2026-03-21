import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 건강보험료, 얼마나 올랐을까? 요율·계산법·상한액 정리 | 머니위키",
  description: "2026년 건강보험료율 7.19%, 장기요양보험료율 13.14%. 월급별 보험료 계산기와 전년 대비 인상액까지 한 번에 계산해보세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026년-건강보험료" },
  openGraph: {
    title: "2026년 건강보험료, 얼마나 올랐을까? 요율·계산법·상한액 정리 | 머니위키",
    description: "2026년 건강보험료율 7.19%, 장기요양보험료율 13.14%. 월급별 보험료 계산기와 전년 대비 인상액까지 한 번에 계산해보세요.",
    url: "https://www.jjyu.co.kr/w/2026년-건강보험료",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
