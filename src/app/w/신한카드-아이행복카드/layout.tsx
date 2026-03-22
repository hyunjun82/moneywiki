import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "신한카드 아이행복카드 혜택은? 바우처 사용처와 신청 방법 | 머니위키",
  description: "신한카드 아이행복카드 혜택은? 바우처 사용처와 신청 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/신한카드-아이행복카드" },
  openGraph: { title: "신한카드 아이행복카드 혜택은? 바우처 사용처와 신청 방법", description: "신한카드 아이행복카드 혜택은? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/신한카드-아이행복카드", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
