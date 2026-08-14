import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "법인지방소득세 신고납부 기한·방법 | 12월 결산법인 4월 30일까지 | 머니위키",
  description:
    "법인지방소득세는 사업연도 종료일이 속한 달의 말일부터 4개월 이내에 신고·납부합니다. 12월 결산법인 기준 기한, 위택스(서울은 이택스) 신고 방법, 무신고 가산세까지 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/법인지방소득세" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
