import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재개발 세입자도 보상받을 수 있을까? 주거이전비 기준과 수령 방법",
  description: "재개발 구역 세입자가 받을 수 있는 주거이전비 기준을 정리했어요. 3개월 거주 요건, 가구원수별 4개월분 계산, 보상 대상 확인부터 수령 절차까지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재개발-세입자-보상-기준" },
  openGraph: {
    title: "재개발 세입자도 보상받을 수 있을까? 주거이전비 기준과 수령 방법 | 머니위키",
    description: "재개발 구역 세입자가 받을 수 있는 주거이전비 기준을 정리했어요. 3개월 거주 요건, 가구원수별 4개월분 계산, 보상 대상 확인부터 수령 절차까지 알려드려요.",
    url: "https://www.jjyu.co.kr/w/재개발-세입자-보상-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
