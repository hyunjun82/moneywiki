import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "5세대 실손보험 자기부담금 — 비급여 50% 부담, 계산법과 비교 | 머니위키",
  description: "5세대 실손보험 비급여 자기부담률 50%, 4세대(30%) 대비 20%p 올랐어요. 치료비별 부담 비교와 계산 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-자기부담금" },
  openGraph: {
    title: "5세대 실손보험 자기부담금 — 비급여 50% 부담, 계산법과 비교 | 머니위키",
    description: "5세대 실손보험 비급여 자기부담률 50%, 4세대(30%) 대비 20%p 올랐어요. 치료비별 부담 비교와 계산 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/5세대-실손보험-자기부담금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
