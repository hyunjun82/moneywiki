import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "봉사료·팁이 임금에 해당할까? 판단 기준과 세금 | 머니위키",
  description: "봉사료와 팁이 임금인지 여부에 따라 퇴직금·4대보험·세금이 달라져요. 지급 주체별 판단 기준, 세법상 원천징수 조건까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/봉사료-팁-임금-해당" },
  openGraph: {
    title: "봉사료·팁이 임금에 해당할까? 판단 기준과 세금 | 머니위키",
    description: "봉사료와 팁이 임금인지 여부에 따라 퇴직금·4대보험·세금이 달라져요. 지급 주체별 판단 기준, 세법상 원천징수 조건까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/봉사료-팁-임금-해당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
