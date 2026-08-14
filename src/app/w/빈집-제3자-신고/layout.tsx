import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "위험한 빈집, 집주인 아니어도 신고 가능? 제3자 신고 조건과 방법",
  description: "빈집 제3자 신고는 누구든지 가능해요. 특정빈집 4가지 조건, 정부24 온라인 신고 방법, 현장조사 30일 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/빈집-제3자-신고" },
  openGraph: {
    title: "위험한 빈집, 집주인 아니어도 신고 가능? 제3자 신고 조건과 방법 | 머니위키",
    description: "빈집 제3자 신고는 누구든지 가능해요. 특정빈집 4가지 조건, 정부24 온라인 신고 방법, 현장조사 30일 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/빈집-제3자-신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
