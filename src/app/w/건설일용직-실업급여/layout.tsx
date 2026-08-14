import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건설일용직 실업급여 신청 조건 | 피보험기간 180일 계산 방법",
  description: "건설일용직도 180일만 일하면 실업급여 받는다는 거 아시나요? 피보험기간 계산 방법과 신청 조건을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건설일용직-실업급여" },
  openGraph: {
    title: "건설일용직 실업급여 신청 조건 | 피보험기간 180일 계산 방법",
    description: "건설일용직도 180일만 일하면 실업급여 받는다는 거 아시나요? 피보험기간 계산 방법과 신청 조건을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/건설일용직-실업급여",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
