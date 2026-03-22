import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주말농장 농지 매입, 서울 사는데 살 수 있나요? 면적·조건 정리 | 머니위키",
  description: "세대당 1,000㎡(약 302평) 미만이면 전국 어디든 주말농장용 농지를 살 수 있어요. 농업진흥지역은 불가하고, 연간 30일 이상 경작 의무가 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/주말농장-농지-매입-조건",
  },
  openGraph: {
    title: "주말농장 농지 매입, 서울 사는데 살 수 있나요?",
    description: "1,000㎡ 미만, 농업진흥지역 제외, 연 30일 이상 경작 의무.",
    url: "https://www.jjyu.co.kr/w/주말농장-농지-매입-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
