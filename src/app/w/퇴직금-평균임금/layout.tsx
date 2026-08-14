import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 평균임금 계산법 | 산정 기준과 포함 항목 정리",
  description: "퇴직금 평균임금은 퇴직 전 3개월 총임금을 일수로 나눈 금액이에요. 수당·상여금 포함 여부와 낮게 나오는 이유까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-평균임금" },
  openGraph: {
    title: "퇴직금 평균임금 계산법 | 산정 기준과 포함 항목 정리 | 머니위키",
    description: "퇴직금 평균임금은 퇴직 전 3개월 총임금을 일수로 나눈 금액이에요. 수당·상여금 포함 여부와 낮게 나오는 이유까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-평균임금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
