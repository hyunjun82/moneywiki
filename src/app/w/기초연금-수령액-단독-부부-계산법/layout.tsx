import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2026년 기초연금, 한 달에 얼마 받을까? 단독·부부 수령액과 계산법 | 머니위키",
  description: "2026년 기초연금 기준연금액은 월 349,360원이에요. 단독·부부 수령액과 감액 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-수령액-단독-부부-계산법" },
  openGraph: {
    title: "2026년 기초연금, 한 달에 얼마 받을까? 단독·부부 수령액과 계산법 | 머니위키",
    description: "2026년 기초연금 기준연금액은 월 349,360원이에요. 단독·부부 수령액과 감액 계산법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-수령액-단독-부부-계산법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
