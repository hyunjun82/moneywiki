import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인",
  description: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/우선지원대상기업-조건",
  },
  openGraph: {
    title: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인",
    description: "대체인력 지원금 대상 조건 | 우선지원대상기업 해당 여부 확인 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/우선지원대상기업-조건",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
