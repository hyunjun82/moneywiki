import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "집 있어도 기초연금 받을 수 있을까? 기본재산액 공제와 지역별 기준",
  description: "부동산이 있어도 기초연금을 받을 수 있는 기본재산액 공제와 지역별 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-기본재산액-공제-지역별기준" },
  openGraph: {
    title: "집 있어도 기초연금 받을 수 있을까? 기본재산액 공제와 지역별 기준 | 머니위키",
    description: "부동산이 있어도 기초연금을 받을 수 있는 기본재산액 공제와 지역별 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-기본재산액-공제-지역별기준",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
