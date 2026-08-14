import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "소액사건 소송 비용 얼마? 인지대와 송달료 계산법",
  description: "소액사건 소송 비용 얼마? 인지대와 송달료 계산법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소액사건-인지대-송달료-계산" },
  openGraph: { title: "소액사건 소송 비용 얼마? 인지대와 송달료 계산법", description: "소액사건 소송 비용 얼마? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/소액사건-인지대-송달료-계산", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
