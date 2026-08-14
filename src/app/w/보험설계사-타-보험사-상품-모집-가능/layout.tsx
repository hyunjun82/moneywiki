import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보험설계사 타 보험사 상품 모집 가능 여부, 교차모집 조건",
  description: "전속 설계사는 교차모집으로 다른 종목 1개사까지 가능. GA는 복수 보험사 자유 판매. 교차모집 조건과 전속 vs GA 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험설계사-타-보험사-상품-모집-가능" },
  openGraph: { title: "보험설계사 타 보험사 상품 모집 가능 여부 | 머니위키", description: "전속 설계사는 교차모집으로 다른 종목 1개사까지 가능. GA는 복수 보험사 자유 판매.", url: "https://www.jjyu.co.kr/w/보험설계사-타-보험사-상품-모집-가능", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
