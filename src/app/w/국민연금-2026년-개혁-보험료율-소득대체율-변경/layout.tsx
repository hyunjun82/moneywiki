import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 국민연금 개혁 보험료율·소득대체율 변경",
  description: "2026년부터 보험료율 9%→9.5% 인상, 소득대체율 41.5%→43% 즉시 인상. 내 월급 기준 추가 납부액 계산기 제공.",
  openGraph: {
    title: "2026년 국민연금 개혁: 보험료율·소득대체율 변경",
    description: "추가 납부액 계산기로 내 부담이 얼마인지 바로 확인하세요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
