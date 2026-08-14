import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "차 있으면 기초연금 탈락? 자동차 재산 기준과 고급차 폐지",
  description: "자동차를 소유하고 있을 때 기초연금 재산 기준에 어떻게 반영되는지, 고급차 기준 폐지 내용을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-자동차-재산기준-고급차" },
  openGraph: {
    title: "차 있으면 기초연금 탈락? 자동차 재산 기준과 고급차 폐지 | 머니위키",
    description: "자동차를 소유하고 있을 때 기초연금 재산 기준에 어떻게 반영되는지, 고급차 기준 폐지 내용을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-자동차-재산기준-고급차",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
