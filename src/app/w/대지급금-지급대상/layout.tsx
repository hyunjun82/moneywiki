import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "나도 대지급금 받을 수 있을까? 고용형태별 지급대상과 자격 요건 | 머니위키",
  description: "파트타이머, 외국인, 임원, 하청 근로자도 대지급금을 받을 수 있어요. 근로자성 판단 기준과 고용형태별 대상 여부를 2026년 기준으로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대지급금-지급대상" },
  openGraph: {
    title: "나도 대지급금 받을 수 있을까? 고용형태별 지급대상과 자격 요건 | 머니위키",
    description: "파트타이머, 외국인, 임원, 하청 근로자도 대지급금을 받을 수 있어요. 근로자성 판단 기준과 고용형태별 대상 여부를 2026년 기준으로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/대지급금-지급대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
