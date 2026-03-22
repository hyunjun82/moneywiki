import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상가임대차보호법 적용 대상과 환산보증금, 내 상가가 보호되는지 확인하는 법 | 머니위키",
  description: "상가임대차보호법 보호 대상은 환산보증금으로 판단해요. 서울 9억원, 수도권 과밀억제권역 6.9억원 이하일 때 우선변제권을 받을 수 있어요. 계산 방법과 지역별 기준을 정리했어요.",
  openGraph: {
    title: "상가임대차보호법 적용 대상과 환산보증금, 내 상가가 보호되는지 확인하는 법 | 머니위키",
    description: "환산보증금 계산법과 지역별 보호 기준금액을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/상가임대차보호법-적용대상-환산보증금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가임대차보호법-적용대상-환산보증금" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
