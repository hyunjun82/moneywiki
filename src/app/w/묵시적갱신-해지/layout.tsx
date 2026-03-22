import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "묵시적갱신 해지 — 통보 방법과 3개월 효력 발생 기준 | 머니위키",
  description: "묵시적갱신 후 세입자는 언제든 해지 통보할 수 있어요. 통보 후 3개월 지나면 해지 효력이 생기고 보증금을 돌려받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/묵시적갱신-해지" },
  openGraph: {
    title: "묵시적갱신 해지 — 통보 방법과 3개월 효력 발생 기준 | 머니위키",
    description: "묵시적갱신 후 세입자는 언제든 해지 통보할 수 있어요. 통보 후 3개월 지나면 해지 효력이 생기고 보증금을 돌려받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/묵시적갱신-해지",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
