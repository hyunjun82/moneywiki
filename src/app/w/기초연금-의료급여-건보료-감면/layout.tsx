import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금 받으면 병원비 혜택도? 의료급여 연계와 건보료 감면 | 머니위키",
  description: "기초연금 수급자는 건강보험료 감면과 의료급여 연계 혜택을 받을 수 있어요. 감면 조건과 의료비 절약 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-의료급여-건보료-감면" },
  openGraph: {
    title: "기초연금 받으면 병원비 혜택도? 의료급여 연계와 건보료 감면 | 머니위키",
    description: "기초연금 수급자는 건강보험료 감면과 의료급여 연계 혜택을 받을 수 있어요. 감면 조건과 의료비 절약 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-의료급여-건보료-감면",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
