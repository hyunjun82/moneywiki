import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 개정세법 주요 변경 사항",
  description: "2025년 귀속 연말정산 개정세법 내용이에요. 주요 세액공제 한도 변경, 소득공제 조정 등 달라진 내용을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-개정세법" },
  openGraph: { title: "연말정산 개정세법 주요 변경 사항 | 머니위키", description: "2025년 귀속 연말정산 개정세법 내용이에요. 주요 세액공제 한도 변경, 소득공제 조정 등 달라진 내용을 알려드려요.", url: "https://www.jjyu.co.kr/w/연말정산-개정세법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
