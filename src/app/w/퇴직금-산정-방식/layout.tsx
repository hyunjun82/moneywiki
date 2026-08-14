import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 산정 방식, 평균임금과 통상임금 기준 비교",
  description: "퇴직금 산정은 평균임금이 원칙이고 통상임금이 하한이에요. 산정 제외 기간, 회사별 차이, 이의 제기 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-산정-방식" },
  openGraph: {
    title: "퇴직금 산정 방식, 평균임금과 통상임금 기준 비교 | 머니위키",
    description: "퇴직금 산정은 평균임금이 원칙이고 통상임금이 하한이에요. 산정 제외 기간, 회사별 차이, 이의 제기 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-산정-방식",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
