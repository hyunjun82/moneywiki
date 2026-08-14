import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 신청방법, 5단계 절차와 준비물",
  description: "실업급여 어디서 어떻게 신청하는지 알려드려요. 고용24 구직등록부터 고용센터 방문, 실업인정까지 전체 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-신청방법" },
  openGraph: {
    title: "실업급여 신청방법, 5단계 절차와 준비물 | 머니위키",
    description: "실업급여 어디서 어떻게 신청하는지 알려드려요. 고용24 구직등록부터 고용센터 방문, 실업인정까지 전체 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
