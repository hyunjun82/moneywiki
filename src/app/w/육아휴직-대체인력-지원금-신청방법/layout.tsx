import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차",
  description: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/육아휴직-대체인력-지원금-신청방법",
  },
  openGraph: {
    title: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차",
    description: "육아휴직 대체인력 지원금 신청 방법 | 중소기업 조건·금액·절차 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/육아휴직-대체인력-지원금-신청방법",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
