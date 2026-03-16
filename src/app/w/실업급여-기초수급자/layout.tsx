import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초수급자도 실업급여 받을까? 생계급여 중복과 수급 기준 | 머니위키",
  description: "기초생활수급자도 고용보험 가입 이력이 있으면 실업급여를 받을 수 있어요. 생계급여와 중복 수급 시 소득 반영 방식과 신고 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-기초수급자" },
  openGraph: {
    title: "기초수급자도 실업급여 받을까? 생계급여 중복과 수급 기준 | 머니위키",
    description: "기초생활수급자도 고용보험 가입 이력이 있으면 실업급여를 받을 수 있어요. 생계급여와 중복 수급 시 소득 반영 방식과 신고 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-기초수급자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
