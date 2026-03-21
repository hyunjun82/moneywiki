import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청약저축 청약예금 전환 방법과 조건, 2026년 9월 기한 전에 바꾸는 법 | 머니위키",
  description: "청약저축·청약예금을 주택청약종합저축으로 전환하는 방법이에요. 기존 납입금·횟수는 그대로 유지되고 민영+국민주택 모두 청약 가능해져요. 기한은 2026년 9월 30일이에요.",
  openGraph: {
    title: "청약저축 청약예금 전환 방법과 조건, 2026년 9월 기한 전에 바꾸는 법 | 머니위키",
    description: "청약저축·청약예금을 주택청약종합저축으로 전환하는 절차와 조건을 정리했어요. 납입금은 그대로 유지돼요.",
    url: "https://www.jjyu.co.kr/w/청약저축-청약예금-전환-방법-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/청약저축-청약예금-전환-방법-조건" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
