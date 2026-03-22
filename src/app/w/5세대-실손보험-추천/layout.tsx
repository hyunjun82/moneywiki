import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "5세대 실손보험 4세대와 차이점, 가입 전 확인사항 | 머니위키",
  description: "5세대 실손보험은 비급여 특약이 분리돼서 보험료가 낮아졌어요. 4세대와 보장 차이, 가입 전 확인할 점을 정리했어요.",
  openGraph: { title: "5세대 실손보험 4세대와 차이점, 가입 전 확인사항 | 머니위키", description: "5세대 실손보험과 4세대 차이를 비교했어요.", url: "https://www.jjyu.co.kr/w/5세대-실손보험-추천", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-추천" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
