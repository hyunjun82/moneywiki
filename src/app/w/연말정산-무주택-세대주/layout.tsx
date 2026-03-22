import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무주택 세대주 공제 혜택은? 주택자금 소득공제 조건 | 머니위키",
  description: "무주택 세대주 공제 혜택은? 주택자금 소득공제 조건에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-무주택-세대주" },
  openGraph: { title: "무주택 세대주 공제 혜택은? 주택자금 소득공제 조건", description: "무주택 세대주 공제 혜택은? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-무주택-세대주", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
