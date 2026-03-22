import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "개표사무원 급여와 근무시간, 야간 수당 계산 | 머니위키",
  description: "개표사무원 일당은 7.5만원이에요. 투표 마감 후 야간 4~8시간 근무하면서 투표지 분류와 집계를 보조하죠. 근무 조건과 수당 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개표사무원-급여-근무시간-야간수당" },
  openGraph: {
    title: "개표사무원 급여와 근무시간, 야간 수당 계산 | 머니위키",
    description: "개표사무원 일당은 7.5만원이에요. 투표 마감 후 야간 4~8시간 근무하면서 투표지 분류와 집계를 보조하죠.",
    url: "https://www.jjyu.co.kr/w/개표사무원-급여-근무시간-야간수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
