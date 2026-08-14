import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "예금자보호제도 1억원 한도 — 보호 대상·계산 방법 완전 정리",
  description: "2025년 9월부터 예금 보호 한도가 1억원으로 올랐어요. 어떤 상품이 보호되는지, 원리금 합산 계산법, 부부 분리 예치 방법까지 정리해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/예금자보호제도" },
  openGraph: {
    title: "예금자보호제도 1억원 한도 — 보호 대상·계산 방법 완전 정리 | 머니위키",
    description: "2025년 9월부터 예금 보호 한도가 1억원으로 올랐어요. 어떤 상품이 보호되는지, 원리금 합산 계산법, 부부 분리 예치 방법까지 정리해드려요.",
    url: "https://www.jjyu.co.kr/w/예금자보호제도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
