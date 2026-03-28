import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무보험 교통사고 처리 | 피해자 보상 방법과 과실 처리",
  description: "무보험 교통사고 처리 | 피해자 보상 방법과 과실 처리 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/무보험-교통사고-처리",
  },
  openGraph: {
    title: "무보험 교통사고 처리 | 피해자 보상 방법과 과실 처리",
    description: "무보험 교통사고 처리 | 피해자 보상 방법과 과실 처리 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/무보험-교통사고-처리",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
