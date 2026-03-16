import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 기준, 1년 이상 근무하면 무조건 받나요? | 머니위키",
  description: "퇴직금은 1년 이상 근무하고 주 15시간 이상 일했다면 받을 수 있어요. 근무 기간 계산법, 주 15시간 기준, 예외 사유까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기준" },
  openGraph: {
    title: "퇴직금 지급 기준, 1년 이상 근무하면 무조건 받나요? | 머니위키",
    description: "퇴직금은 1년 이상 근무하고 주 15시간 이상 일했다면 받을 수 있어요. 근무 기간 계산법, 주 15시간 기준, 예외 사유까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
