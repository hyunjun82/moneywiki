import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약직 2년 넘기면 자동 전환? 무기계약 전환 기준과 대처법 | 머니위키",
  description: "기간제 근로자가 2년을 초과 근무하면 자동으로 무기계약 전환돼요. 예외 사유와 회사 거부 시 대처법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기간제근로자-무기계약-전환-시기" },
  openGraph: {
    title: "계약직 2년 넘기면 자동 전환? 무기계약 전환 기준과 대처법 | 머니위키",
    description: "기간제 근로자가 2년을 초과 근무하면 자동으로 무기계약 전환돼요. 예외 사유와 회사 거부 시 대처법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기간제근로자-무기계약-전환-시기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
