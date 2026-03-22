import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산 중 실업급여, 끊기나요? 실업인정 유예 신청 방법 | 머니위키",
  description: "실업급여 받다가 출산하면 구직활동 없이도 계속 받을 수 있어요. 출산 전후 90일간 실업인정 유예 제도와 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/출산-실업인정-예외" },
  openGraph: {
    title: "출산 중 실업급여, 끊기나요? 실업인정 유예 신청 방법 | 머니위키",
    description: "실업급여 받다가 출산하면 구직활동 없이도 계속 받을 수 있어요. 출산 전후 90일간 실업인정 유예 제도와 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/출산-실업인정-예외",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
