import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 중 아프면 어떡해? 상병급여 조건과 금액 계산법",
  description: "실업급여 수급 중 질병이나 부상으로 구직활동을 못하면 상병급여로 전환돼요. 14일 이상 취업 불가 시 신청 가능하고, 금액은 구직급여와 동일해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-상병급여" },
  openGraph: {
    title: "실업급여 중 아프면 어떡해? 상병급여 조건과 금액 계산법 | 머니위키",
    description: "실업급여 수급 중 질병이나 부상으로 구직활동을 못하면 상병급여로 전환돼요. 14일 이상 취업 불가 시 신청 가능하고, 금액은 구직급여와 동일해요.",
    url: "https://www.jjyu.co.kr/w/실업급여-상병급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
