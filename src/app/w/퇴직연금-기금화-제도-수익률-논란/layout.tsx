import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 기금화 제도 및 수익률 개선 방법 | 머니위키",
  description: "퇴직연금 기금화는 국민연금처럼 통합 운용하는 제도예요. 수익률 개선 vs 선택권 박탈 논란 정리해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-기금화-제도-수익률-논란" },
  openGraph: { title: "퇴직연금 기금화 제도 및 수익률 개선 방법", description: "퇴직연금 기금화는 국민연금처럼 통합 운용하는 제도예요. 수익률 개선 vs 선택권 박탈 논란 정리해드려요.", url: "https://www.jjyu.co.kr/w/퇴직연금-기금화-제도-수익률-논란", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
