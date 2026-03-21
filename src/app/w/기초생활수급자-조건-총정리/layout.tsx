import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초생활수급자 소득 기준과 신청 방법 2026 | 머니위키",
  description: "소득인정액이 기준 중위소득 32% 이하면 생계급여를 받을 수 있어요. 2026년 기준액과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초생활수급자-조건-총정리" },
  openGraph: {
    title: "기초생활수급자 소득 기준과 신청 방법 2026 | 머니위키",
    description: "소득인정액이 기준 중위소득 32% 이하면 생계급여를 받을 수 있어요. 2026년 기준액과 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초생활수급자-조건-총정리",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
