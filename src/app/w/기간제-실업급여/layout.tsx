import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기간제 근로자 실업급여, 얼마 받을까? 수급액 계산법",
  description: "기간제 근로자도 계약기간 만료로 퇴직하면 실업급여를 받을 수 있죠. 수급 조건, 2년 무기계약 전환, 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기간제-실업급여" },
  openGraph: {
    title: "기간제 근로자 실업급여, 얼마 받을까? 수급액 계산법 | 머니위키",
    description: "기간제 근로자도 계약기간 만료로 퇴직하면 실업급여를 받을 수 있죠. 수급 조건, 2년 무기계약 전환, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기간제-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
