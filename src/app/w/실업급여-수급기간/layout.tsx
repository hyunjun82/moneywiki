import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 수급기간: 나이 및 가입기간에 따른 지급일수 기준 | 머니위키",
  description: "실업급여 몇 개월 받을 수 있는지 궁금하시죠. 나이와 가입기간에 따라 120일~270일까지 받을 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급기간" },
  openGraph: { title: "실업급여 수급기간: 나이 및 가입기간에 따른 지급일수 기준", description: "실업급여 몇 개월 받을 수 있는지 궁금하시죠. 나이와 가입기간에 따라 120일~270일까지 받을 수 있어요", url: "https://www.jjyu.co.kr/w/실업급여-수급기간", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
