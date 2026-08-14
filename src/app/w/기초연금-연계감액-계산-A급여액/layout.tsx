import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민연금 많이 냈더니 기초연금이 줄었다면? 연계감액 계산과 A급여액",
  description: "국민연금을 많이 받으면 기초연금이 줄어드는 연계감액 구조와 A급여액 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-연계감액-계산-A급여액" },
  openGraph: {
    title: "국민연금 많이 냈더니 기초연금이 줄었다면? 연계감액 계산과 A급여액 | 머니위키",
    description: "국민연금을 많이 받으면 기초연금이 줄어드는 연계감액 구조와 A급여액 계산법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-연계감액-계산-A급여액",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
