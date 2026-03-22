import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역가입자 건강보험료, 2026년 소득별 보험료표 | 머니위키",
  description: "2026년 지역가입자 건강보험료를 소득별로 정리했어요. 보험료율 7.19%, 점수당 211.5원 기준. 재산·자동차 반영 기준과 경감 방법까지 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지역가입자-건강보험료-표" },
  openGraph: {
    title: "지역가입자 건강보험료, 2026년 소득별 보험료표 | 머니위키",
    description: "2026년 지역가입자 건강보험료를 소득별로 정리했어요. 보험료율 7.19%, 점수당 211.5원 기준. 재산·자동차 반영 기준과 경감 방법까지 확인하세요.",
    url: "https://www.jjyu.co.kr/w/지역가입자-건강보험료-표",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
