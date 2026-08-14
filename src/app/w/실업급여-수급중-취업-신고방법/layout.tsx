import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 수급 중 취업 신고방법, 고용24 온라인 절차와 기한",
  description: "실업급여 받는 중 취업하면 다음 날까지 신고해야 해요. 고용24 온라인 신고 절차 4단계와 미신고 시 부정수급 처벌 내용을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급중-취업-신고방법" },
  openGraph: {
    title: "실업급여 수급 중 취업 신고방법, 고용24 온라인 절차와 기한 | 머니위키",
    description: "실업급여 받는 중 취업하면 다음 날까지 신고해야 해요. 고용24 온라인 신고 절차와 부정수급 처벌을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-수급중-취업-신고방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
