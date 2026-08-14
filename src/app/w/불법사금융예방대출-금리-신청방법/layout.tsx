import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "불법사금융예방대출 금리 12.5%, 이자 절반 환급 신청 방법",
  description: "2026년 불법사금융예방대출 금리가 12.5%로 인하됐어요. 이자 50% 페이백으로 실질 6.25%. 신청 조건, 방법, 햇살론 차이까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/불법사금융예방대출-금리-신청방법" },
  openGraph: {
    title: "불법사금융예방대출 금리 12.5%, 이자 절반 환급 신청 방법 | 머니위키",
    description: "2026년 불법사금융예방대출 금리가 12.5%로 인하됐어요. 이자 50% 페이백으로 실질 6.25%. 신청 조건, 방법, 햇살론 차이까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/불법사금융예방대출-금리-신청방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
