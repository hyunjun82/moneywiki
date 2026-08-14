import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "예금 금리 비교 2026",
  description: "2026년 은행별 정기예금 금리 비교. 저축은행 0.5~1%p 추가, 우대금리 조건으로 최고 4%대. 예금자보호 1억원 안내.",
  openGraph: {
    title: "예금 금리 비교 2026",
    description: "금융감독원 금융상품한눈에로 실시간 비교. 우대금리 최대 활용법.",
    url: "https://jjyu.co.kr/w/예금-금리-비교",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/예금-금리-비교",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
