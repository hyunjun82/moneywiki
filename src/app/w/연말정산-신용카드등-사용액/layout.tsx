import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신용카드 소득공제 — 공제율·한도·계산법 완전 정리",
  description: "신용카드 15%, 체크카드 30%, 전통시장 40% 공제율이에요. 총급여 25% 초과분부터 공제받는 계산법과 절세 전략을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-신용카드등-사용액" },
  openGraph: {
    title: "신용카드 소득공제 — 공제율·한도·계산법 완전 정리 | 머니위키",
    description: "신용카드 15%, 체크카드 30%, 전통시장 40% 공제율이에요. 총급여 25% 초과분부터 공제받는 계산법과 절세 전략을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-신용카드등-사용액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
