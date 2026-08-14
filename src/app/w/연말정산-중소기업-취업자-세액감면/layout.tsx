import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "중소기업 취업자 소득세 감면, 나도 되나? 감면 조건과 신청 방법",
  description: "중소기업 취업자 소득세 감면, 나도 되나? 감면 조건과 신청 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-중소기업-취업자-세액감면" },
  openGraph: { title: "중소기업 취업자 소득세 감면, 나도 되나? 감면 조건과 신청 방법", description: "중소기업 취업자 소득세 감면, 나도 되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-중소기업-취업자-세액감면", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
