import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "급수관 검사 시기 — 준공검사·정기검사 시기와 절차 | 머니위키",
  description: "급수관 검사는 준공 전 필수이고, 사용 중인 건물은 준공 5년 후 + 2년 주기로 받아요. 검사 항목·비용·합격 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/급수관-검사-시기" },
  openGraph: {
    title: "급수관 검사 시기 — 준공검사·정기검사 시기와 절차 | 머니위키",
    description: "급수관 검사는 준공 전 필수이고, 사용 중인 건물은 준공 5년 후 + 2년 주기로 받아요. 검사 항목·비용·합격 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/급수관-검사-시기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
