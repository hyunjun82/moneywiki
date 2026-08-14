import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보험설계사 타사 보험 모집 가능 여부, 교차모집과 GA",
  description: "보험설계사는 소속사 상품만 판매 가능해요. GA 소속이거나 교차모집 등록하면 타사 상품도 판매할 수 있고, 조건과 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험설계사-타사보험-모집" },
  openGraph: { title: "보험설계사 타사 보험 모집 가능 여부, 교차모집과 GA | 머니위키", description: "보험설계사는 소속사 상품만 판매 가능해요. GA 소속이거나 교차모집 등록하면 타사 상품도 판매할 수 있어요.", url: "https://www.jjyu.co.kr/w/보험설계사-타사보험-모집", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
