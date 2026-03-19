import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지급명세서 제출 방법 기한 홈택스 신고 가산세 | 머니위키",
  description: "근로소득 지급명세서 다음 연도 3월 10일까지 제출. 기타소득 2월 말까지. 미제출 시 지급금액의 1% 가산세. 홈택스 제출 절차 정리.",
  openGraph: {
    title: "지급명세서 제출 기한과 홈택스 신고 방법",
    description: "소득 종류별 제출 기한과 가산세율. 기한 후 3개월 내 제출 시 가산세 50% 감면.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
