import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금이 뭔지 모르겠다면? 기본 개념과 수령 조건",
  description: "퇴직금은 1년 이상 근무한 근로자가 퇴직할 때 받는 법정 급여로, 근로자퇴직급여보장법에 따라 사업주가 반드시 지급해야 합니다. 기본 개념부터 수령 조건, 금액 계산, 지급 시기까지 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금" },
  openGraph: {
    title: "퇴직금이 뭔지 모르겠다면? 기본 개념과 수령 조건 | 머니위키",
    description: "퇴직금은 1년 이상 근무한 근로자가 퇴직할 때 받는 법정 급여로, 근로자퇴직급여보장법에 따라 사업주가 반드시 지급해야 합니다.",
    url: "https://www.jjyu.co.kr/w/퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
