import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 실업급여 하한액, 하루 66,048원 — 계산법과 상한액 비교",
  description: "2026년 실업급여 하한액은 1일 66,048원(월 약 198만원)이에요. 최저임금 80% x 8시간으로 계산하고, 상한액 68,100원과 비교해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-하한액" },
  openGraph: {
    title: "2026년 실업급여 하한액, 하루 66,048원 — 계산법과 상한액 비교 | 머니위키",
    description: "2026년 실업급여 하한액은 1일 66,048원(월 약 198만원)이에요. 최저임금 80% x 8시간으로 계산해요.",
    url: "https://www.jjyu.co.kr/w/실업급여-하한액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
