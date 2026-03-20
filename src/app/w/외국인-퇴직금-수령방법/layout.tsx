import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "외국인도 한국 퇴직금 받을 수 있을까요? 비자 무관 수급 조건부터 귀국 전 수령 절차까지 | 머니위키",
  description: "외국인 근로자도 1년 이상·주 15시간 이상 근무했다면 비자 종류 관계없이 퇴직금을 받을 수 있어요. IRP 계좌, 퇴직소득세, 본국 송금 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/외국인-퇴직금-수령방법" },
  openGraph: {
    title: "외국인도 한국 퇴직금 받을 수 있을까요? 비자 무관 수급 조건부터 귀국 전 수령 절차까지 | 머니위키",
    description: "외국인 근로자도 1년 이상·주 15시간 이상 근무했다면 비자 종류 관계없이 퇴직금을 받을 수 있어요. IRP 계좌, 퇴직소득세, 본국 송금 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/외국인-퇴직금-수령방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
