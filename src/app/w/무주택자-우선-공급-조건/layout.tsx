import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무주택자 우선 공급 조건 — 자격 확인부터 가점 계산까지 | 머니위키",
  description: "무주택세대구성원이면 가점제(84점 만점)와 추첨제(75% 우선)로 분양 기회를 먼저 받아요. 무주택 판정 기준과 가점 구조를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/무주택자-우선-공급-조건",
  },
  openGraph: {
    title: "무주택자 우선 공급 조건 — 자격 확인부터 가점 계산까지",
    description: "가점제 84점 만점 구조, 무주택세대구성원 판정 기준, 청약 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/무주택자-우선-공급-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
