import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직급여 수급 요건, 1년 미만 근무자도 받을 수 있나요 | 머니위키",
  description: "퇴직급여는 1년 이상 근무 시 의무적으로 받을 수 있어요. 계속근로기간 계산법과 수급 조건 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직급여-수급-요건" },
  openGraph: {
    title: "퇴직급여 수급 요건, 1년 미만 근무자도 받을 수 있나요",
    description: "퇴직급여는 1년 이상 근무 시 의무적으로 받을 수 있어요. 계속근로기간 계산법과 수급 조건 알려드려요.",
    url: "https://www.jjyu.co.kr/w/퇴직급여-수급-요건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
