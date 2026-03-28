import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 소송 증거 수집 방법 | 외도·폭력 증거 합법으로 모으는 법",
  description: "이혼 소송 증거 수집 방법 | 외도·폭력 증거 합법으로 모으는 법 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-소송-증거-수집-방법",
  },
  openGraph: {
    title: "이혼 소송 증거 수집 방법 | 외도·폭력 증거 합법으로 모으는 법",
    description: "이혼 소송 증거 수집 방법 | 외도·폭력 증거 합법으로 모으는 법 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-소송-증거-수집-방법",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
