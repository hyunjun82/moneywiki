import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 ETF 추천 안전자산 30% 국채 채권혼합 월배당",
  description: "퇴직연금 안전자산 30%: 국채 ETF 연 3~4%, 채권혼합형 연 5~7%, 월배당 ETF 연 6~8%. 배당세 면제 혜택과 나이별 포트폴리오 전략.",
  openGraph: {
    title: "퇴직연금 ETF 안전자산 30% 상품 선택법",
    description: "국채 ETF, 채권혼합형, 월배당 ETF 비교. 나이별 추천 포트폴리오와 배당세 혜택.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
