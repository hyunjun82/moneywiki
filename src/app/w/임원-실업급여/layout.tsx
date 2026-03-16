import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임원도 실업급여 받을까? 등기·비등기 자격 기준 | 머니위키",
  description: "대표이사와 등기이사는 원칙적으로 실업급여 대상이 아니에요. 비등기이사는 근로자로 인정되면 받을 수 있죠. 임원의 고용보험 가입과 실업급여 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임원-실업급여" },
  openGraph: {
    title: "임원도 실업급여 받을까? 등기·비등기 자격 기준 | 머니위키",
    description: "대표이사와 등기이사는 원칙적으로 실업급여 대상이 아니에요. 비등기이사는 근로자로 인정되면 받을 수 있죠. 임원의 고용보험 가입과 실업급여 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임원-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
