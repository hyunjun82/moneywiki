import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "해고됐는데 퇴직금 받을 수 있을까? 조건부터 구제신청까지 | 머니위키",
  description: "해고여도 1년 이상 근무했다면 퇴직금은 반드시 받을 수 있어요. 해고예고수당 조건, 부당해고 구제신청 기한과 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-해고" },
  openGraph: {
    title: "해고됐는데 퇴직금 받을 수 있을까? 조건부터 구제신청까지 | 머니위키",
    description: "해고여도 1년 이상 근무했다면 퇴직금은 반드시 받을 수 있어요. 해고예고수당 조건, 부당해고 구제신청 기한과 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-해고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
