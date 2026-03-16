import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금에 상여금 포함되나요? | 포함 기준과 계산법 정리 | 머니위키",
  description: "정기 상여금은 퇴직금 평균임금에 포함돼요. 포함되는 상여금과 제외되는 상여금 기준, 불규칙 상여금 처리 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-상여금-포함" },
  openGraph: {
    title: "퇴직금에 상여금 포함되나요? | 포함 기준과 계산법 정리 | 머니위키",
    description: "정기 상여금은 퇴직금 평균임금에 포함돼요. 포함되는 상여금과 제외되는 상여금 기준, 불규칙 상여금 처리 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-상여금-포함",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
