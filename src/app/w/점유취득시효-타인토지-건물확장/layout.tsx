import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "점유취득시효 타인 토지 건물 확장 30년 소유권 취득 | 머니위키",
  description: "30년 전 집 앞 공터에 집을 확장했는데 타인 토지였다면, 점유취득시효로 소유권을 얻을 수 있을까요?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/점유취득시효-타인토지-건물확장" },
  openGraph: {
    title: "점유취득시효 타인 토지 건물 확장 30년 소유권 취득",
    description: "30년 전 집 앞 공터에 집을 확장했는데 타인 토지였다면, 점유취득시효로 소유권을 얻을 수 있을까요?",
    url: "https://www.jjyu.co.kr/w/점유취득시효-타인토지-건물확장",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
