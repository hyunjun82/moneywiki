import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 공제신고서 작성 방법 항목별 작성 요령 | 머니위키",
  description: "연말정산 공제신고서 작성 방법 항목별 작성 요령에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-공제신고서" },
  openGraph: { title: "연말정산 공제신고서 작성 방법 항목별 작성 요령", description: "연말정산 공제신고서 작성 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-공제신고서", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
