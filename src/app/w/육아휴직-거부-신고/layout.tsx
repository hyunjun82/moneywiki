import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "중소기업 육아휴직 거부 신고 | 사업주 과태료와 신고 방법",
  description: "중소기업 육아휴직 거부 신고 | 사업주 과태료와 신고 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/육아휴직-거부-신고",
  },
  openGraph: {
    title: "중소기업 육아휴직 거부 신고 | 사업주 과태료와 신고 방법",
    description: "중소기업 육아휴직 거부 신고 | 사업주 과태료와 신고 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/육아휴직-거부-신고",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
