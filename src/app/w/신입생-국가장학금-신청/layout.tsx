import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신입생 국가장학금 신청 시기, 성적 면제 조건과 가구원 동의 | 머니위키",
  description: "신입생은 첫 학기 성적 기준 면제로 소득구간만 충족하면 장학금을 받을 수 있어요. 2차 신청 기간, 가구원 동의 방법, 준비물을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/신입생-국가장학금-신청" },
  openGraph: {
    title: "신입생 국가장학금 신청 시기, 성적 면제 조건과 가구원 동의 | 머니위키",
    description: "신입생은 첫 학기 성적 기준 면제로 소득구간만 충족하면 장학금을 받을 수 있어요. 2차 신청 기간, 가구원 동의 방법, 준비물을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/신입생-국가장학금-신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
