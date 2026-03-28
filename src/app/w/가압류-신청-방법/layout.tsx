import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가압류 신청 방법 | 비용·절차·재산 유형별 신청",
  description: "가압류 신청 방법 | 비용·절차·재산 유형별 신청 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/가압류-신청-방법",
  },
  openGraph: {
    title: "가압류 신청 방법 | 비용·절차·재산 유형별 신청",
    description: "가압류 신청 방법 | 비용·절차·재산 유형별 신청 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/가압류-신청-방법",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
