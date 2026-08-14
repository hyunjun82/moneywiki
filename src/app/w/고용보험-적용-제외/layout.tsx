import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고용보험 적용 제외, 나도 해당될까? 7가지 대상 기준",
  description: "65세 이후 신규 취업자, 주 15시간 미만 근로자, 공무원 등 고용보험 적용 제외 대상과 예외 규정을 정리했어요. 본인이 해당되는지 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고용보험-적용-제외" },
  openGraph: {
    title: "고용보험 적용 제외, 나도 해당될까? 7가지 대상 기준 | 머니위키",
    description: "65세 이후 신규 취업자, 주 15시간 미만 근로자, 공무원 등 고용보험 적용 제외 대상과 예외 규정을 정리했어요. 본인이 해당되는지 확인하세요.",
    url: "https://www.jjyu.co.kr/w/고용보험-적용-제외",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
