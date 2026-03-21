import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택임대차 최소 기간 2년, 1년 계약해도 보장받을 수 있을까? | 머니위키",
  description: "계약서에 1년이라고 써도 법으로 2년 거주를 보장받아요. 주택임대차보호법 제4조 기준, 계약 갱신과 종료 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택임대차-최소-기간-2년" },
  openGraph: {
    title: "주택임대차 최소 기간 2년, 1년 계약해도 보장받을 수 있을까? | 머니위키",
    description: "계약서에 1년이라고 써도 법으로 2년 거주를 보장받아요. 주택임대차보호법 제4조 기준, 계약 갱신과 종료 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/주택임대차-최소-기간-2년",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
