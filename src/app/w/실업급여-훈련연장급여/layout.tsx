import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "훈련 중이면 수급기간 늘어난다고? 훈련연장급여 기간과 금액 | 머니위키",
  description: "직업훈련 중 실업급여 수급기간이 끝나도 훈련연장급여로 훈련 종료까지 계속 받을 수 있어요. 조건, 금액, 출석률 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-훈련연장급여" },
  openGraph: {
    title: "훈련 중이면 수급기간 늘어난다고? 훈련연장급여 기간과 금액 | 머니위키",
    description: "직업훈련 중 실업급여 수급기간이 끝나도 훈련연장급여로 훈련 종료까지 계속 받을 수 있어요. 조건, 금액, 출석률 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-훈련연장급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
