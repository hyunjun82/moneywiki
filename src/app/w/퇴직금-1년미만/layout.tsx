import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1년 미만 근무, 퇴직금을 받을 수 있나요?",
  description: "1년 미만 근무자는 원칙적으로 퇴직금 대상이 아니에요. 하지만 계약 갱신이나 회사 귀책사유가 있으면 받을 수 있는 경우도 있죠. 기준과 청구법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-1년미만" },
  openGraph: {
    title: "1년 미만 근무, 퇴직금을 받을 수 있나요? | 머니위키",
    description: "1년 미만 근무자는 원칙적으로 퇴직금 대상이 아니에요. 하지만 계약 갱신이나 회사 귀책사유가 있으면 받을 수 있는 경우도 있죠. 기준과 청구법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-1년미만",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
