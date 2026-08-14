import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "LTV 계산 방법 한도 2026",
  description: "LTV는 집 가격 대비 대출 비율이에요. 규제지역 40%, 비규제 70% 계산법 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/LTV-계산-방법" },
  openGraph: { title: "LTV 계산 방법 한도 2026 | 머니위키", description: "LTV는 집 가격 대비 대출 비율이에요. 규제지역 40%, 비규제 70% 계산법 알려드릴게요.", url: "https://www.jjyu.co.kr/w/LTV-계산-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
