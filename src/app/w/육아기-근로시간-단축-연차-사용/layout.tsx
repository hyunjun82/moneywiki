import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아기 단축근무 쓰면 연차 줄어들까? 법 개정 후 변화 | 머니위키",
  description: "2024년 10월 법 개정으로 육아기 근로시간 단축 기간도 출근으로 인정받아 연차가 줄어들지 않아요. 개정 전후 비교와 연차 사용법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-연차-사용" },
  openGraph: {
    title: "육아기 단축근무 쓰면 연차 줄어들까? 법 개정 후 변화 | 머니위키",
    description: "2024년 10월 법 개정으로 육아기 근로시간 단축 기간도 출근으로 인정받아 연차가 줄어들지 않아요.",
    url: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-연차-사용",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
