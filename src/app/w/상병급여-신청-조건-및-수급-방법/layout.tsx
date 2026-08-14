import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상병급여 신청, 어떤 조건이 필요할까? 수급 기간과 금액",
  description: "실업급여 수급 중 질병, 부상, 출산으로 구직활동이 어려우면 상병급여를 받을 수 있어요. 신청 조건, 기한, 필요 서류, 금액까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상병급여-신청-조건-및-수급-방법" },
  openGraph: {
    title: "상병급여 신청, 어떤 조건이 필요할까? 수급 기간과 금액 | 머니위키",
    description: "실업급여 수급 중 질병, 부상, 출산으로 구직활동이 어려우면 상병급여를 받을 수 있어요. 신청 조건, 기한, 필요 서류, 금액까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/상병급여-신청-조건-및-수급-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
