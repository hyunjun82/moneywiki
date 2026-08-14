import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기간제 교사 실업급여, 받을 수 있을까? 유형별 수급 조건",
  description: "교사도 실업급여를 받을 수 있죠. 공무원 교사는 안 되지만 사립학교 교사, 기간제 교사, 강사는 고용보험 가입 시 수급 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/교사-실업급여" },
  openGraph: {
    title: "기간제 교사 실업급여, 받을 수 있을까? 유형별 수급 조건 | 머니위키",
    description: "교사도 실업급여를 받을 수 있죠. 공무원 교사는 안 되지만 사립학교 교사, 기간제 교사, 강사는 고용보험 가입 시 수급 가능해요.",
    url: "https://www.jjyu.co.kr/w/교사-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
