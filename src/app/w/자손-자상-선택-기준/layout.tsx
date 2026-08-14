import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자손 자상 선택 기준과 보장 범위 비교",
  description: "자상은 치료비+위자료+휴업손해 전부 보장, 과실상계 없음. 자손보다 연 2~4만원 더 비싸지만 사고 시 보험금 차이 커요.",
  openGraph: {
    title: "자손 자상 선택 기준과 보장 범위 비교",
    description: "자동차보험 갱신 시 자손 vs 자상 선택법. 보장 항목 비교표와 상황별 추천.",
    url: "https://jjyu.co.kr/w/자손-자상-선택-기준",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/자손-자상-선택-기준",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
