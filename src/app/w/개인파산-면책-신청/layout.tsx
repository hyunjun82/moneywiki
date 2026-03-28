import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "개인파산 면책 신청 | 비용·절차·면책 안 되는 빚",
  description: "개인파산 면책 신청 | 비용·절차·면책 안 되는 빚 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/개인파산-면책-신청",
  },
  openGraph: {
    title: "개인파산 면책 신청 | 비용·절차·면책 안 되는 빚",
    description: "개인파산 면책 신청 | 비용·절차·면책 안 되는 빚 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/개인파산-면책-신청",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
