import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받다가 군입대하면? 수급 중단과 재개 절차",
  description: "실업급여 수급 중 군입대하면 수급기간이 군복무 기간만큼 연장돼요. 입대 전 신고 절차와 전역 후 복귀 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-군입대" },
  openGraph: {
    title: "실업급여 받다가 군입대하면? 수급 중단과 재개 절차 | 머니위키",
    description: "실업급여 수급 중 군입대하면 수급기간이 군복무 기간만큼 연장돼요. 입대 전 신고 절차와 전역 후 복귀 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-군입대",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
