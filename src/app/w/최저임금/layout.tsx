import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 최저임금 시급 10,320원 — 월급 환산·수습 감액·위반 처벌 | 머니위키",
  description: "2026년 최저임금 시급 10,320원, 월급 약 215만원이에요. 수습 감액 조건, 산입범위, 위반 시 3년 이하 징역·2천만원 벌금, 신고 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/최저임금" },
  openGraph: {
    title: "2026년 최저임금 시급 10,320원 — 월급 환산·수습 감액·위반 처벌 | 머니위키",
    description: "2026년 최저임금 시급 10,320원, 월급 약 215만원이에요. 수습 감액 조건, 산입범위, 위반 시 3년 이하 징역·2천만원 벌금, 신고 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/최저임금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
