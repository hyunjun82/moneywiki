import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "외국인근로자 근무처 변경, 신청 방법과 횟수 제한 기준 | 머니위키",
  description: "E-9 비자 외국인근로자는 정당한 사유가 있으면 근무처를 변경할 수 있어요. 3회 제한, 1개월 신청 기한, 고용센터·출입국관리사무소 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/외국인근로자-근무처-변경" },
  openGraph: {
    title: "외국인근로자 근무처 변경, 신청 방법과 횟수 제한 기준 | 머니위키",
    description: "E-9 비자 외국인근로자는 정당한 사유가 있으면 근무처를 변경할 수 있어요. 3회 제한, 1개월 신청 기한, 고용센터·출입국관리사무소 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/외국인근로자-근무처-변경",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
