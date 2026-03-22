import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2026년 국민연금 개혁 보험료율 인상 소득대체율 변화 | 머니위키",
  description: "2026년부터 국민연금 보험료가 0.5%p 올라가고, 소득대체율도 43%로 인상돼요. 더 내고 더 받는 구조로 바뀌었어요.",
  openGraph: { title: "2026년 국민연금 개혁 보험료율 인상 소득대체율 변화 | 머니위키", description: "2026년부터 국민연금 보험료가 0.5%p 올라가고, 소득대체율도 43%로 인상돼요. 더 내고 더 받는 구조로 바뀌었어요.", url: "https://www.jjyu.co.kr/w/국민연금-2026-개혁", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-2026-개혁" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
