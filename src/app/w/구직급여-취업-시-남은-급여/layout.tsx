import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "구직급여 받다가 취업하면? 조기재취업수당 조건과 금액 계산법",
  description: "구직급여 받다가 취업하면 남은 급여의 절반을 조기재취업수당으로 받을 수 있어요. 대상 조건, 금액 계산법, 12개월 후 신청 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-취업-시-남은-급여" },
  openGraph: {
    title: "구직급여 받다가 취업하면? 조기재취업수당 조건과 금액 계산법 | 머니위키",
    description: "구직급여 받다가 취업하면 남은 급여의 절반을 조기재취업수당으로 받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/구직급여-취업-시-남은-급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
