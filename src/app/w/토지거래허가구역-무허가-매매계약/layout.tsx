import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "토지거래허가구역에서 허가 없이 계약했다면? 유동적 무효와 허가 신청 방법 | 머니위키",
  description: "허가 없이 체결한 매매계약은 '유동적 무효' 상태예요. 허가를 받으면 소급 유효, 불허가 시 확정 무효가 돼요. 2026년 서울 전역이 지정 대상이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/토지거래허가구역-무허가-매매계약",
  },
  openGraph: {
    title: "토지거래허가구역에서 허가 없이 계약했다면?",
    description: "유동적 무효 개념, 허가 신청 절차, 서울 전역 지정 현황까지 정리.",
    url: "https://www.jjyu.co.kr/w/토지거래허가구역-무허가-매매계약",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
