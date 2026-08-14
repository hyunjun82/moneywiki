import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "빨리 취업하면 남은 급여 50%? 조기재취업수당 조건과 계산법",
  description: "소정급여일수의 절반 이상 남기고 취업하면 남은 급여의 50%를 한꺼번에 받을 수 있어요. 12개월 이상 고용 유지 후 신청하면 되죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-조기재취업수당" },
  openGraph: {
    title: "빨리 취업하면 남은 급여 50%? 조기재취업수당 조건과 계산법 | 머니위키",
    description: "소정급여일수의 절반 이상 남기고 취업하면 남은 급여의 50%를 한꺼번에 받을 수 있어요. 12개월 이상 고용 유지 후 신청하면 되죠.",
    url: "https://www.jjyu.co.kr/w/실업급여-조기재취업수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
