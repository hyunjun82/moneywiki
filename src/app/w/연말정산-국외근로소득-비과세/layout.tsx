import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국외근로소득 비과세 — 월 500만원 한도와 적용 조건",
  description: "2025년 귀속부터 일반 국외근로소득 비과세 한도가 월 500만원으로 상향됐어요. 근무 유형별 한도, 대상 요건, 신고 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-국외근로소득-비과세",
  },
  openGraph: {
    title: "국외근로소득 비과세 — 월 500만원 한도와 적용 조건",
    description: "해외 상주 근무자 대상 비과세 한도, 대상 요건, 2025년 변경사항 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-국외근로소득-비과세",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
