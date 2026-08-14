import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연금소득세 나이에 따라 달라지나? 나이별 세율과 분리과세",
  description: "연금소득세 나이에 따라 달라지나? 나이별 세율과 분리과세에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연금소득세-나이별-세율" },
  openGraph: { title: "연금소득세 나이에 따라 달라지나? 나이별 세율과 분리과세", description: "연금소득세 나이에 따라 달라지나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연금소득세-나이별-세율", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
