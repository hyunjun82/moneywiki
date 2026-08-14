import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 주차장에서 차 옮기면 음주운전? 도로 해당 기준과 처벌 범위",
  description: "아파트 단지 내 주차장은 도로교통법상 도로가 아닐 수 있어요. 2025년 대법원 판례와 도로 해당 판단 기준, 행정처분과 형사처벌 차이를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/아파트-주차장-음주운전-기준",
  },
  openGraph: {
    title: "아파트 주차장에서 차 옮기면 음주운전? 도로 해당 기준과 처벌 범위",
    description: "폐쇄적 단지 주차장은 도로 아닐 수 있음. 판단 기준과 처벌 범위 정리.",
    url: "https://www.jjyu.co.kr/w/아파트-주차장-음주운전-기준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
