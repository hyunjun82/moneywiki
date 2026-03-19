import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년월세지원 소득기준 — 중위소득 60% 금액 계산 | 머니위키",
  description: "청년월세지원 소득 기준은 청년가구 중위소득 60% 이하예요. 1인·2인·3인 가구별 기준 금액과 내 소득이 해당되는지 확인하는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-소득기준" },
  openGraph: {
    title: "청년월세지원 소득기준 — 중위소득 60% 금액 계산 | 머니위키",
    description: "청년월세지원 소득 기준은 청년가구 중위소득 60% 이하예요. 1인·2인·3인 가구별 기준 금액과 내 소득이 해당되는지 확인하는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년월세지원-소득기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
