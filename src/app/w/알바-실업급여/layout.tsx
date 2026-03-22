import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "알바 실업급여 — 고용보험 가입 요건과 수급자격 기준 | 머니위키",
  description: "알바도 고용보험에 가입돼 있으면 실업급여를 받을 수 있어요. 주 15시간 이상 근무, 180일 가입, 비자발적 퇴사 요건과 미가입 시 소급 가입 방법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/알바-실업급여",
  },
  openGraph: {
    title: "알바 실업급여 — 고용보험 가입 요건과 수급자격 기준",
    description: "알바도 고용보험 가입 180일 이상이면 정규직과 동일하게 실업급여 수급 가능해요.",
    url: "https://www.jjyu.co.kr/w/알바-실업급여",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
