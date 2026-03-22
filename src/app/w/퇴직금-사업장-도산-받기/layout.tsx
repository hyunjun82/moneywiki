import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직금 사업장 도산 시 수령: 임금채권보장기금 신청 방법 | 머니위키",
  description: "회사가 망했는데 퇴직금 못 받는다는 거 아시나요? 도산대지급금 제도로 정부가 대신 지급해드려요. 신청 방법과 보장 한도를 정리해드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-사업장-도산-받기" },
  openGraph: { title: "퇴직금 사업장 도산 시 수령: 임금채권보장기금 신청 방법 | 머니위키", description: "회사가 망했는데 퇴직금 못 받는다는 거 아시나요? 도산대지급금 제도로 정부가 대신 지급해드려요. 신청 방법과 보장 한도를 정리해드려요", url: "https://www.jjyu.co.kr/w/퇴직금-사업장-도산-받기", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
