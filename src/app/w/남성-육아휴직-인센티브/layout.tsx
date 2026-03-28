import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "남성 육아휴직 인센티브 | 중소기업 월 10만원 추가 지원",
  description: "남성 육아휴직 인센티브 | 중소기업 월 10만원 추가 지원 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/남성-육아휴직-인센티브",
  },
  openGraph: {
    title: "남성 육아휴직 인센티브 | 중소기업 월 10만원 추가 지원",
    description: "남성 육아휴직 인센티브 | 중소기업 월 10만원 추가 지원 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/남성-육아휴직-인센티브",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
