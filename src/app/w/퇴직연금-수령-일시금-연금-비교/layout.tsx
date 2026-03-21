import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 일시금 vs 연금 수령 — 세금 차이와 선택 기준 | 머니위키",
  description: "연금으로 받으면 퇴직소득세 30% 절약, 5,000만원 기준 350만원 차이 나요. 일시금과 연금 수령 조건·세금·신청 방법을 비교해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-수령-일시금-연금-비교" },
  openGraph: {
    title: "퇴직연금 일시금 vs 연금 수령 — 세금 차이와 선택 기준 | 머니위키",
    description: "연금으로 받으면 퇴직소득세 30% 절약, 5,000만원 기준 350만원 차이 나요. 일시금과 연금 수령 조건·세금·신청 방법을 비교해드려요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-수령-일시금-연금-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
