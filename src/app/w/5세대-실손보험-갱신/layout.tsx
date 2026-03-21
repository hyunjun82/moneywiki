import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "5세대 실손보험 갱신, 어떻게 진행되나요? 자동 전환 시기와 보험료 변화 | 머니위키",
  description: "2026년 7월부터 갱신일 순서대로 5세대 실손보험으로 자동 전환돼요. 별도 신청과 건강 심사 없이 약관만 바뀌어요. 전환 일정과 보험료 변화를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-갱신" },
  openGraph: {
    title: "5세대 실손보험 갱신, 어떻게 진행되나요? 자동 전환 시기와 보험료 변화 | 머니위키",
    description: "2026년 7월부터 갱신일 순서대로 5세대로 자동 전환돼요. 별도 신청 없이 약관만 바뀌고, 건강 심사도 없어요.",
    url: "https://www.jjyu.co.kr/w/5세대-실손보험-갱신",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
