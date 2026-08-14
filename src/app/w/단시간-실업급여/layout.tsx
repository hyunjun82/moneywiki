import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "단시간 근로자도 실업급여 받을까? 주 15시간 기준과 수급 조건",
  description: "주 15시간 이상 근무하면 단시간 근로자도 실업급여를 받을 수 있어요. 주 15시간 기준, 수급 조건 비교, 금액 계산, 초단시간 대안까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/단시간-실업급여" },
  openGraph: {
    title: "단시간 근로자도 실업급여 받을까? 주 15시간 기준과 수급 조건 | 머니위키",
    description: "주 15시간 이상 근무하면 단시간 근로자도 실업급여를 받을 수 있어요. 주 15시간 기준, 수급 조건 비교, 금액 계산, 초단시간 대안까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/단시간-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
