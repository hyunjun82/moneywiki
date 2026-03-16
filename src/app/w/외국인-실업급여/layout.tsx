import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "외국인도 실업급여 받을까? 비자별 자격 조건과 신청 서류 | 머니위키",
  description: "외국인도 고용보험에 가입돼 있으면 실업급여를 받을 수 있어요. F-2, F-5, H-2 등 비자별 가입 대상과 E-9 출국만기보험 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/외국인-실업급여" },
  openGraph: {
    title: "외국인도 실업급여 받을까? 비자별 자격 조건과 신청 서류 | 머니위키",
    description: "외국인도 고용보험에 가입돼 있으면 실업급여를 받을 수 있어요. F-2, F-5, H-2 등 비자별 가입 대상과 E-9 출국만기보험 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/외국인-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
