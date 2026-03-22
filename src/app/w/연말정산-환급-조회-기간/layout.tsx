import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 환급금, 언제 들어오나? 조회 방법과 지급 시기 | 머니위키",
  description: "연말정산 환급금, 언제 들어오나? 조회 방법과 지급 시기에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-환급-조회-기간" },
  openGraph: { title: "연말정산 환급금, 언제 들어오나? 조회 방법과 지급 시기", description: "연말정산 환급금, 언제 들어오나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-환급-조회-기간", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
