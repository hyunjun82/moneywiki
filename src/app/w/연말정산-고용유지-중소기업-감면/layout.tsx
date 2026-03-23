import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고용유지 중소기업 세액감면 조건 감면율과 신청 방법 | 머니위키",
  description: "고용유지 중소기업 세액감면 조건 감면율과 신청 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-고용유지-중소기업-감면" },
  openGraph: { title: "고용유지 중소기업 세액감면 조건 감면율과 신청 방법", description: "고용유지 중소기업 세액감면 조건 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-고용유지-중소기업-감면", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
