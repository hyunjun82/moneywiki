import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구 절차와 비용",
  description: "소액사건 소장 작성 | 3,000만원 이하 금전 청구 절차와 비용 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/소액사건-소장-작성",
  },
  openGraph: {
    title: "소액사건 소장 작성 | 3,000만원 이하 금전 청구 절차와 비용",
    description: "소액사건 소장 작성 | 3,000만원 이하 금전 청구 절차와 비용 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/소액사건-소장-작성",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
