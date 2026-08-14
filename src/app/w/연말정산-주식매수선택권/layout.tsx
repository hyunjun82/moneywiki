import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "스톡옵션 행사 연말정산 반영 방법 과세 시점과 세율",
  description: "스톡옵션 행사 연말정산 반영 방법 과세 시점과 세율에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-주식매수선택권" },
  openGraph: { title: "스톡옵션 행사 연말정산 반영 방법 과세 시점과 세율", description: "스톡옵션 행사 연말정산 반영 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-주식매수선택권", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
