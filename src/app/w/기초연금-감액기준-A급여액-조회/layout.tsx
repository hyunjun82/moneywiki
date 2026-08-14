import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 얼마나 깎이는 걸까? 감액 기준과 A급여액 조회",
  description: "기초연금이 깎이는 3가지 사유와 A급여액 조회 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-감액기준-A급여액-조회" },
  openGraph: {
    title: "기초연금 얼마나 깎이는 걸까? 감액 기준과 A급여액 조회 | 머니위키",
    description: "기초연금이 깎이는 3가지 사유와 A급여액 조회 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-감액기준-A급여액-조회",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
