import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 부부 감액 20%, 왜 깎일까? 감액 기준과 축소 계획",
  description: "부부가 함께 기초연금을 받으면 각각 20%씩 감액돼요. 감액 기준과 축소 논의를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-부부감액-20-기준-축소계획" },
  openGraph: {
    title: "기초연금 부부 감액 20%, 왜 깎일까? 감액 기준과 축소 계획 | 머니위키",
    description: "부부가 함께 기초연금을 받으면 각각 20%씩 감액돼요. 감액 기준과 축소 논의를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-부부감액-20-기준-축소계획",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
