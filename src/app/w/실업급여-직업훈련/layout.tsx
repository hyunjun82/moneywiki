import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받으면서 직업훈련? 내일배움카드 조건과 신청까지 | 머니위키",
  description: "실업급여 수급 중 내일배움카드로 직업훈련을 받으면 훈련비 지원에 구직활동 면제까지 받을 수 있어요. 신청 방법과 훈련연장급여 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-직업훈련" },
  openGraph: {
    title: "실업급여 받으면서 직업훈련? 내일배움카드 조건과 신청까지 | 머니위키",
    description: "실업급여 수급 중 내일배움카드로 직업훈련을 받으면 훈련비 지원에 구직활동 면제까지 받을 수 있어요. 신청 방법과 훈련연장급여 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-직업훈련",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
