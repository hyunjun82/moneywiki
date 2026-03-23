import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약직 실업급여, 계약만료면 받을 수 있나? 180일 조건과 재계약 거부 기준 | 머니위키",
  description: "계약만료는 비자발적 퇴사로 실업급여 대상이에요. 피보험기간 180일 충족 여부와 재계약 거부 시 수급 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약직-실업급여" },
  openGraph: {
    title: "계약직 실업급여, 계약만료면 받을 수 있나? 180일 조건과 재계약 거부 기준 | 머니위키",
    description: "계약만료는 비자발적 퇴사로 실업급여 대상이에요. 피보험기간 180일 충족 여부와 재계약 거부 시 수급 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
