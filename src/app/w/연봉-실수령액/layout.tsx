import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연봉 실수령액, 얼마나 빠지나? 4대보험과 세금 공제 계산",
  description: "연봉 실수령액, 얼마나 빠지나? 4대보험과 세금 공제 계산에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연봉-실수령액" },
  openGraph: { title: "연봉 실수령액, 얼마나 빠지나? 4대보험과 세금 공제 계산", description: "연봉 실수령액, 얼마나 빠지나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연봉-실수령액", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
