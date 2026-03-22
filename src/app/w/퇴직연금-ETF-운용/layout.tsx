import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금으로 ETF 투자하는 방법 운용 방법과 제한 사항 | 머니위키",
  description: "퇴직연금으로 ETF 투자하는 방법 운용 방법과 제한 사항에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-ETF-운용" },
  openGraph: { title: "퇴직연금으로 ETF 투자하는 방법 운용 방법과 제한 사항", description: "퇴직연금으로 ETF 투자하는 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/퇴직연금-ETF-운용", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
