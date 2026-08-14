import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고령자 고용지원금, 얼마 받을까? 신청 조건부터 계산까지",
  description: "60세 이상 근로자 증가 시 1명당 분기 30만원, 최대 2년간 240만원 지원받아요. 중소기업·중견기업 대상 신청 조건과 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고령자-고용지원금" },
  openGraph: {
    title: "고령자 고용지원금, 얼마 받을까? 신청 조건부터 계산까지 | 머니위키",
    description: "60세 이상 근로자 증가 시 1명당 분기 30만원, 최대 2년간 240만원 지원받아요. 중소기업·중견기업 대상 신청 조건과 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/고령자-고용지원금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
