import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산 경매 권리분석 목적과 말소기준권리 이해하기",
  description: "부동산 경매 권리분석이 왜 필요한지, 말소기준권리로 인수와 말소를 구분하는 방법을 3단계로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산-경매-권리분석-목적" },
  openGraph: {
    title: "부동산 경매 권리분석 목적과 말소기준권리 이해하기 | 머니위키",
    description: "부동산 경매 권리분석이 왜 필요한지, 말소기준권리로 인수와 말소를 구분하는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부동산-경매-권리분석-목적",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
