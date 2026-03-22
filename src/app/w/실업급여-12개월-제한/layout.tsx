import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 12개월, 받는 기간이 아니에요 신청 기한과 실제 수급일수 정리 | 머니위키",
  description: "실업급여 12개월은 신청 기한이에요. 실제 수급일수는 120~270일이고, 퇴직 후 12개월 안에 반드시 신청해야 해요. 수급일수표, 연장 사유, 2026년 반복수급 제재를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업급여-12개월-제한",
  },
  openGraph: {
    title: "실업급여 12개월, 받는 기간이 아니에요 신청 기한과 실제 수급일수 정리",
    description: "12개월은 신청 기한. 실제 수급 120~270일. 수급일수표와 연장 방법 정리.",
    url: "https://www.jjyu.co.kr/w/실업급여-12개월-제한",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
