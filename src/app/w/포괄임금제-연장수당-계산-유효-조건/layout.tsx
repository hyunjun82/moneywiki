import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "포괄임금제, 우리 회사도 합법일까? 유효 조건과 연장수당 청구 방법 | 머니위키",
  description: "사무직 포괄임금제는 대부분 무효. 유효 3요건, 무효 시 3년분 수당 청구 방법, 2026년 금지법 추진 현황을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/포괄임금제-연장수당-계산-유효-조건" },
  openGraph: {
    title: "포괄임금제, 우리 회사도 합법일까? 유효 조건과 연장수당 청구 방법 | 머니위키",
    description: "사무직 포괄임금제는 대부분 무효. 유효 3요건, 무효 시 3년분 수당 청구 방법, 2026년 금지법 추진 현황을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/포괄임금제-연장수당-계산-유효-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
