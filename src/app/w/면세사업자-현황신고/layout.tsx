import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "면세사업자라면 2월 10일까지 꼭 하세요 사업장 현황신고 방법과 가산세",
  description: "면세사업자(병의원, 학원, 주택임대 등)는 매년 2월 10일까지 사업장 현황신고를 해야 해요. 홈택스 신고 방법, 가산세(수입금액 0.5%), 대상 업종을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/면세사업자-현황신고",
  },
  openGraph: {
    title: "면세사업자라면 2월 10일까지 꼭 하세요 사업장 현황신고 방법과 가산세",
    description: "2월 10일 기한, 홈택스 신고법, 가산세 0.5% 정리.",
    url: "https://www.jjyu.co.kr/w/면세사업자-현황신고",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
