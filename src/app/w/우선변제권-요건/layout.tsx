import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "우선변제권 요건 — 보증금 먼저 돌려받는 3가지 조건",
  description: "우선변제권은 전입신고+확정일자+실제거주 3가지로 확보해요. 경매 시 보증금을 먼저 배당받을 수 있는 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/우선변제권-요건" },
  openGraph: { title: "우선변제권 요건 — 보증금 보호 3가지 조건", description: "전입신고+확정일자+점유로 우선변제권 확보.", url: "https://www.jjyu.co.kr/w/우선변제권-요건", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
