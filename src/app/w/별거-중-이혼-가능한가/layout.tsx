import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "별거 중인데 이혼이 가능한가요 | 재판 청구 조건·기간·유책 판단 기준",
  description: "별거 중인데 이혼이 가능한가요 | 재판 청구 조건·기간·유책 판단 기준 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/별거-중-이혼-가능한가",
  },
  openGraph: {
    title: "별거 중인데 이혼이 가능한가요 | 재판 청구 조건·기간·유책 판단 기준",
    description: "별거 중인데 이혼이 가능한가요 | 재판 청구 조건·기간·유책 판단 기준 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/별거-중-이혼-가능한가",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
