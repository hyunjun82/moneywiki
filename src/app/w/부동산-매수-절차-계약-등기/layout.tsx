import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산 매수 절차, 계약부터 등기까지 6단계",
  description: "부동산 처음 매수할 때 등기부등본 확인부터 소유권이전등기까지 6단계 절차를 순서대로 정리했어요. 2026년 변경사항도 포함돼 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산-매수-절차-계약-등기" },
  openGraph: {
    title: "부동산 매수 절차, 계약부터 등기까지 6단계 | 머니위키",
    description: "부동산 처음 매수할 때 등기부등본 확인부터 소유권이전등기까지 6단계 절차를 순서대로 정리했어요. 2026년 변경사항도 포함돼 있어요.",
    url: "https://www.jjyu.co.kr/w/부동산-매수-절차-계약-등기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
