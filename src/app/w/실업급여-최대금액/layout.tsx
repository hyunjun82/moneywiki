import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 최대 금액, 하루 얼마까지? 2026년 상한액 기준 | 머니위키",
  description: "2026년 실업급여 최대 수령액은 약 1,782만원이에요. 1일 상한액 66,048원에 최대 수급일수 270일을 곱한 금액이죠. 나이별, 가입기간별 최대금액을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-최대금액" },
  openGraph: {
    title: "실업급여 최대 금액, 하루 얼마까지? 2026년 상한액 기준 | 머니위키",
    description: "2026년 실업급여 최대 수령액은 약 1,782만원이에요. 1일 상한액 66,048원에 최대 수급일수 270일을 곱한 금액이죠. 나이별, 가입기간별 최대금액을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-최대금액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
