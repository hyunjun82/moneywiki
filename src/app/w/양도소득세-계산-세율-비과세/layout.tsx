import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "양도소득세 계산·세율·비과세 2026년 기준 완전 정리",
  description: "양도소득세 세율은 6%~42%예요. 1세대 1주택은 9억원까지 비과세, 다주택자 중과 유예는 2026년 5월 9일까지예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/양도소득세-계산-세율-비과세" },
  openGraph: {
    title: "양도소득세 계산·세율·비과세 2026년 기준 완전 정리 | 머니위키",
    description: "양도소득세 세율은 6%~42%예요. 1세대 1주택은 9억원까지 비과세, 다주택자 중과 유예는 2026년 5월 9일까지예요.",
    url: "https://www.jjyu.co.kr/w/양도소득세-계산-세율-비과세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
