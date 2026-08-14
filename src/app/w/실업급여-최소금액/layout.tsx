import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 최소 금액, 하한액이 유리할 때? 총액 계산법",
  description: "2026년 실업급여 최소금액은 약 770만원이에요. 하한액 66,048원에 최소 수급일수 120일을 곱한 금액이죠. 가입기간별 총액과 계산 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-최소금액" },
  openGraph: {
    title: "실업급여 최소 금액, 하한액이 유리할 때? 총액 계산법 | 머니위키",
    description: "2026년 실업급여 최소금액은 약 770만원이에요. 하한액 66,048원에 최소 수급일수 120일을 곱한 금액이죠. 가입기간별 총액과 계산 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-최소금액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
