import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받으면서 알바, 되나요? 가능 조건과 신고 방법 | 머니위키",
  description: "실업급여 수급 중 알바는 월 60시간 미만, 계약기간 3개월 미만이면 가능해요. 고용24 신고 방법과 미신고 시 5배 추징 기준까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-알바-가능여부" },
  openGraph: {
    title: "실업급여 받으면서 알바, 되나요? 가능 조건과 신고 방법 | 머니위키",
    description: "실업급여 수급 중 알바는 월 60시간 미만, 계약기간 3개월 미만이면 가능해요. 고용24 신고 방법과 미신고 시 5배 추징 기준까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-알바-가능여부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
