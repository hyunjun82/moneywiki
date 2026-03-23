import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 못 낸 기간, 나중에 낼 수 있을까? 추납제도 조건과 신청 방법 | 머니위키",
  description: "납부예외 기간 보험료를 나중에 내는 추후납부 제도예요. 최대 119개월까지 추납 가능하고, 분할납부는 60회까지 이자 없이 돼요. 조건, 보험료 계산, 신청 방법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/국민연금-추납제도",
  },
  openGraph: {
    title: "국민연금 못 낸 기간, 나중에 낼 수 있을까? 추납제도 조건과 신청 방법",
    description: "추납하면 가입기간이 늘어나 연금이 많아져요. 조건, 계산, 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/국민연금-추납제도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
