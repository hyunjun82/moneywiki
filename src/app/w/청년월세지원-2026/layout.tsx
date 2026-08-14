import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년월세지원 2026년 변경사항 — 계속사업 전환·청약통장 삭제",
  description: "2026년 청년월세지원은 한시사업에서 계속사업으로 바뀌었어요. 청약통장 요건도 삭제됐고 신청 기간은 3월 30일~5월 29일이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-2026" },
  openGraph: {
    title: "청년월세지원 2026년 변경사항 — 계속사업 전환·청약통장 삭제 | 머니위키",
    description: "2026년 청년월세지원은 한시사업에서 계속사업으로 바뀌었어요. 청약통장 요건도 삭제됐고 신청 기간은 3월 30일~5월 29일이에요.",
    url: "https://www.jjyu.co.kr/w/청년월세지원-2026",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
