import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 평균임금, 어떻게 계산해? 퇴직 전 3개월 산정 기준 | 머니위키",
  description: "실업급여 평균임금은 퇴직 전 3개월 임금 총액을 총 일수로 나눠서 계산해요. 포함 항목, 상여금 처리, 계산 예시까지 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-평균임금-계산" },
  openGraph: {
    title: "실업급여 평균임금, 어떻게 계산해? 퇴직 전 3개월 산정 기준 | 머니위키",
    description: "실업급여 평균임금은 퇴직 전 3개월 임금 총액을 총 일수로 나눠서 계산해요. 포함 항목, 상여금 처리, 계산 예시까지 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/실업급여-평균임금-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
