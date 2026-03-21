import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "적금 금리 비교, 우대금리까지 챙기는 방법 | 머니위키",
  description: "2026년 적금 금리 높은 곳 찾는 법이에요. 저축은행 vs 시중은행 차이, 우대금리 조건, 예금자보호 한도까지 가입 전 꼭 알아야 할 것들 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/적금-금리-비교" },
  openGraph: {
    title: "적금 금리 비교, 우대금리까지 챙기는 방법 | 머니위키",
    description: "2026년 적금 금리 높은 곳 찾는 법이에요. 저축은행 vs 시중은행 차이, 우대금리 조건, 예금자보호 한도까지 가입 전 꼭 알아야 할 것들 정리했어요.",
    url: "https://www.jjyu.co.kr/w/적금-금리-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
