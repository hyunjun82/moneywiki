import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌 납입 한도 연간 2000만원 누적 1억원 정리 | 머니위키",
  description: "ISA 납입 한도: 연간 2,000만원, 누적 1억원. 미사용 한도 이월 없음. 월 166만원씩 넣으면 연간 한도 거의 채워요.",
  openGraph: {
    title: "ISA 계좌 납입 한도: 연간 2,000만원, 이월 안 돼요",
    description: "연간 한도 2,000만원, 누적 1억원. 월 납입별 비교표와 한도 활용 전략.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
