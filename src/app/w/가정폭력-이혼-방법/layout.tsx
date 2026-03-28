import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가정폭력 이혼 방법 | 신고부터 이혼 소송·위자료까지",
  description: "가정폭력 이혼 방법 | 신고부터 이혼 소송·위자료까지 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/가정폭력-이혼-방법",
  },
  openGraph: {
    title: "가정폭력 이혼 방법 | 신고부터 이혼 소송·위자료까지",
    description: "가정폭력 이혼 방법 | 신고부터 이혼 소송·위자료까지 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/가정폭력-이혼-방법",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
