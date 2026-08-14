import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "배달 중 사고, 산재보험 받을 수 있을까? 신청 방법과 급여 종류",
  description: "배달기사도 산재보험 의무가입 대상이에요. 산재 인정 기준, 근로복지공단 신청 절차, 요양급여·휴업급여 종류까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배달앱종사자-산재처리" },
  openGraph: {
    title: "배달 중 사고, 산재보험 받을 수 있을까? 신청 방법과 급여 종류 | 머니위키",
    description: "배달기사도 산재보험 의무가입 대상이에요. 산재 인정 기준, 근로복지공단 신청 절차, 요양급여·휴업급여 종류까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/배달앱종사자-산재처리",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
