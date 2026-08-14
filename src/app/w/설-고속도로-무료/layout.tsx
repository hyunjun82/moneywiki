import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026 설 고속도로 무료, 언제부터 언제까지? 면제 기간과 절약 금액",
  description: "2026년 설 연휴 2월 15~18일 4일간 전국 고속도로 통행료 무료예요. 서울-부산 왕복 약 3만원 절약. 하이패스·일반 차로 모두 적용돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/설-고속도로-무료",
  },
  openGraph: {
    title: "2026 설 고속도로 무료, 언제부터 언제까지? 면제 기간과 절약 금액",
    description: "2월 15~18일 4일간 전국 무료. 서울-부산 왕복 3만원 절약.",
    url: "https://www.jjyu.co.kr/w/설-고속도로-무료",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
