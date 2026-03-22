import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "일하면서 기초연금 받을 수 있을까? 근로소득 공제 기준과 계산 | 머니위키",
  description: "일하면서 기초연금을 받을 수 있는 근로소득 공제 기준(112만원+30%)과 계산 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-근로소득-공제기준-계산" },
  openGraph: {
    title: "일하면서 기초연금 받을 수 있을까? 근로소득 공제 기준과 계산 | 머니위키",
    description: "일하면서 기초연금을 받을 수 있는 근로소득 공제 기준(112만원+30%)과 계산 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-근로소득-공제기준-계산",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
