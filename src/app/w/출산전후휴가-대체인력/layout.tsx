import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산전후휴가 대체인력 지원금 | 육아휴직과 동시 신청 가능한가",
  description: "출산전후휴가 대체인력 지원금 | 육아휴직과 동시 신청 가능한가 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/출산전후휴가-대체인력",
  },
  openGraph: {
    title: "출산전후휴가 대체인력 지원금 | 육아휴직과 동시 신청 가능한가",
    description: "출산전후휴가 대체인력 지원금 | 육아휴직과 동시 신청 가능한가 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/출산전후휴가-대체인력",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
