import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 수급기간: 120일~270일 계산 및 연장 방법 | 머니위키",
  description: "실업급여 얼마 동안 받을 수 있는지 궁금하시죠? 120일~270일까지 나이와 가입기간으로 계산해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-기간" },
  openGraph: { title: "실업급여 수급기간: 120일~270일 계산 및 연장 방법", description: "실업급여 얼마 동안 받을 수 있는지 궁금하시죠? 120일~270일까지 나이와 가입기간으로 계산해요.", url: "https://www.jjyu.co.kr/w/실업급여-기간", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
