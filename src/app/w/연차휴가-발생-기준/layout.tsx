import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차휴가 발생 기준 | 연차수당 계산·보상·촉진제도",
  description: "연차휴가 발생 기준 | 연차수당 계산·보상·촉진제도 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/연차휴가-발생-기준",
  },
  openGraph: {
    title: "연차휴가 발생 기준 | 연차수당 계산·보상·촉진제도",
    description: "연차휴가 발생 기준 | 연차수당 계산·보상·촉진제도 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/연차휴가-발생-기준",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
