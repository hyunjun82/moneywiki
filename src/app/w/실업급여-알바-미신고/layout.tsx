import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 알바 미신고 처벌, 5배 환수와 자진신고 감면",
  description: "실업급여 받으면서 알바 미신고하면 부정수급으로 최대 5배 환수돼요. 처벌 기준, 적발 방식, 자진신고 감면 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-알바-미신고" },
  openGraph: {
    title: "실업급여 알바 미신고 처벌, 5배 환수와 자진신고 감면 | 머니위키",
    description: "실업급여 받으면서 알바 미신고하면 부정수급으로 최대 5배 환수돼요. 처벌 기준, 적발 방식, 자진신고 감면 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-알바-미신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
