import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "CMA 계좌 금리·혜택 — 은행 통장보다 유리한 이유 | 머니위키",
  description: "CMA는 매일 이자가 붙는 증권사 입출금 계좌로 연 2.5~3.0% 금리예요. 수수료 면제 조건, 예금자보호 여부, 개설 방법까지 정리해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/CMA계좌-금리-혜택" },
  openGraph: {
    title: "CMA 계좌 금리·혜택 — 은행 통장보다 유리한 이유 | 머니위키",
    description: "CMA는 매일 이자가 붙는 증권사 입출금 계좌로 연 2.5~3.0% 금리예요. 수수료 면제 조건, 예금자보호 여부, 개설 방법까지 정리해드려요.",
    url: "https://www.jjyu.co.kr/w/CMA계좌-금리-혜택",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
