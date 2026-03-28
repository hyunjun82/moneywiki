import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "햇살론 부결 사유 | 재신청 가능한 타이밍과 해결 방법",
  description: "햇살론 부결 사유 | 재신청 가능한 타이밍과 해결 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/햇살론-부결-사유",
  },
  openGraph: {
    title: "햇살론 부결 사유 | 재신청 가능한 타이밍과 해결 방법",
    description: "햇살론 부결 사유 | 재신청 가능한 타이밍과 해결 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/햇살론-부결-사유",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
