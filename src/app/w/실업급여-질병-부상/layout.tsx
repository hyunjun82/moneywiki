import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받다가 다쳤다면? 상병급여 전환 조건과 신청 절차",
  description: "실업급여 수급 중 질병이나 부상으로 구직활동이 어려우면 상병급여로 전환할 수 있어요. 7일 기준, 진단서, 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-질병-부상" },
  openGraph: {
    title: "실업급여 받다가 다쳤다면? 상병급여 전환 조건과 신청 절차 | 머니위키",
    description: "실업급여 수급 중 질병이나 부상으로 구직활동이 어려우면 상병급여로 전환할 수 있어요. 7일 기준, 진단서, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-질병-부상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
