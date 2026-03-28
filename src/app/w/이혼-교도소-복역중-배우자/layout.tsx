import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 교도소 복역중 배우자 | 협의이혼과 재판이혼 절차",
  description: "이혼 교도소 복역중 배우자 | 협의이혼과 재판이혼 절차 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-교도소-복역중-배우자",
  },
  openGraph: {
    title: "이혼 교도소 복역중 배우자 | 협의이혼과 재판이혼 절차",
    description: "이혼 교도소 복역중 배우자 | 협의이혼과 재판이혼 절차 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-교도소-복역중-배우자",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
