import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 수급 중 취업, 조기재취업수당은 얼마? 신고 방법 | 머니위키",
  description: "실업급여 받다가 취업하면 2개월 이내에 재취업 신고를 해야 해요. 조기재취업수당 조건과 금액, 미신고 시 불이익을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급중-취업" },
  openGraph: {
    title: "실업급여 수급 중 취업, 조기재취업수당은 얼마? 신고 방법 | 머니위키",
    description: "실업급여 받다가 취업하면 2개월 이내에 재취업 신고를 해야 해요. 조기재취업수당 조건과 금액, 미신고 시 불이익을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-수급중-취업",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
