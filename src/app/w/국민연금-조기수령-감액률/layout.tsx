import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 조기수령하면 얼마나 깎일까? 감액률과 손익분기점",
  description: "1년당 6%씩 감액, 5년 빨리 받으면 30% 줄어요. 손익분기점 11~12년, 신청 조건과 유불리 판단 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-조기수령-감액률" },
  openGraph: {
    title: "국민연금 조기수령하면 얼마나 깎일까? 감액률과 손익분기점 | 머니위키",
    description: "1년당 6%씩 감액, 5년 빨리 받으면 30% 줄어요. 손익분기점 11~12년, 신청 조건과 유불리 판단 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/국민연금-조기수령-감액률",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
