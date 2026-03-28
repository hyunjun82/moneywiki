import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "업무분담 지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법",
  description: "업무분담 지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/업무분담-지원금",
  },
  openGraph: {
    title: "업무분담 지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법",
    description: "업무분담 지원금 신청 방법 | 대체인력 없이 월 20만원 받는 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/업무분담-지원금",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
