import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 평균임금 산정 방법 | 공식과 포함 항목 기준 | 머니위키",
  description: "퇴직금 평균임금 산정은 퇴직 전 3개월 임금 총액을 역일수로 나눠 구해요. 산정 공식, 포함 항목, 이의제기 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-평균임금-산정" },
  openGraph: {
    title: "퇴직금 평균임금 산정 방법 | 공식과 포함 항목 기준 | 머니위키",
    description: "퇴직금 평균임금 산정은 퇴직 전 3개월 임금 총액을 역일수로 나눠 구해요. 산정 공식, 포함 항목, 이의제기 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-평균임금-산정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
