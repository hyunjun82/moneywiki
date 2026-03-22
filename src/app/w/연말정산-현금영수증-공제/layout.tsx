import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "현금영수증 공제율과 한도 30% 소득공제 활용법 | 머니위키",
  description: "현금영수증 공제율과 한도 30% 소득공제 활용법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-현금영수증-공제" },
  openGraph: { title: "현금영수증 공제율과 한도 30% 소득공제 활용법", description: "현금영수증 공제율과 한도 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-현금영수증-공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
