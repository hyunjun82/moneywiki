import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년미래적금 기여금 — 소득별 금액과 가입 방법 | 머니위키",
  description: "청년미래적금 정부 기여금은 소득에 따라 월 0.6만~2.4만원이에요. 5년 만기 시 비과세 이자와 함께 수령. 가입 조건 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년미래적금-기여금" },
  openGraph: { title: "청년미래적금 기여금 — 소득별 금액과 가입 방법", description: "소득별 기여금 비율과 5년 만기 조건.", url: "https://www.jjyu.co.kr/w/청년미래적금-기여금", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
