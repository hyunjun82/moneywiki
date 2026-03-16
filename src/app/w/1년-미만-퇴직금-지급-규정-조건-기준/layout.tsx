import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1년 미만 퇴직금 지급 규정, 정확한 조건은? | 머니위키",
  description: "근로자퇴직급여보장법은 1년 미만 근무자에게 퇴직금 의무를 두지 않아요. 하지만 예외 사유와 소멸시효 3년 규정을 알면 받을 수 있는 경우도 있죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/1년-미만-퇴직금-지급-규정-조건-기준" },
  openGraph: {
    title: "1년 미만 퇴직금 지급 규정, 정확한 조건은? | 머니위키",
    description: "근로자퇴직급여보장법은 1년 미만 근무자에게 퇴직금 의무를 두지 않아요. 하지만 예외 사유와 소멸시효 3년 규정을 알면 받을 수 있는 경우도 있죠.",
    url: "https://www.jjyu.co.kr/w/1년-미만-퇴직금-지급-규정-조건-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
