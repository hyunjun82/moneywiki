import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 받으니까 오히려 손해? 소득역전 방지 감액 기준 | 머니위키",
  description: "기초연금을 받았더니 소득 역전이 생기는 경우, 감액 기준과 계산 방식을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-소득역전방지-감액기준" },
  openGraph: {
    title: "기초연금 받으니까 오히려 손해? 소득역전 방지 감액 기준 | 머니위키",
    description: "기초연금을 받았더니 소득 역전이 생기는 경우, 감액 기준과 계산 방식을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-소득역전방지-감액기준",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
