import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5세대 실손보험 갱신, 전환 판단과 절차 | 머니위키",
  description: "5세대 실손보험 핵심 변경점, 기존 실손과 보험료 비교, 전환 유불리 판단 기준과 절차를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-갱신" },
  openGraph: {
    title: "5세대 실손보험 갱신, 전환 판단과 절차 | 머니위키",
    description: "5세대 실손보험 핵심 변경점, 기존 실손과 보험료 비교, 전환 유불리 판단 기준과 절차를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/5세대-실손보험-갱신",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
