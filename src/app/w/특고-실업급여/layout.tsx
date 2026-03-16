import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "특고 실업급여, 배달·대리기사도 될까? 14개 직종 수급 기준 | 머니위키",
  description: "특수형태근로종사자(특고)도 고용보험에 가입하면 실업급여를 받을 수 있어요. 배달기사, 대리운전, 학습지교사 등 대상 직종과 수급 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/특고-실업급여" },
  openGraph: {
    title: "특고 실업급여, 배달·대리기사도 될까? 14개 직종 수급 기준 | 머니위키",
    description: "특수형태근로종사자(특고)도 고용보험에 가입하면 실업급여를 받을 수 있어요. 배달기사, 대리운전, 학습지교사 등 대상 직종과 수급 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/특고-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
