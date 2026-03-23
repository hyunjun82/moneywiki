import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "5세대 실손보험 보장 내용 — 비급여 자기부담률과 변경 사항 | 머니위키",
  description: "5세대 실손보험은 비급여 자기부담률 50%, 도수치료 제외, 중증질환 상한 500만원 신설. 4세대와 보장 차이를 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-보장-내용" },
  openGraph: { title: "5세대 실손보험 보장 내용", description: "4세대 대비 변경 사항과 보험료 인하 효과.", url: "https://www.jjyu.co.kr/w/5세대-실손보험-보장-내용", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
