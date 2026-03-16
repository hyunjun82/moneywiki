import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1년 미만 퇴직금 계산, 정확한 방법과 청구 절차 | 머니위키",
  description: "1년 미만 근무자도 퇴직금 계산 공식은 동일해요. 근무 일수 기준 비례 계산법, 0원이 나오는 경우, 청구 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-계산-방법-1년-미만-기준" },
  openGraph: {
    title: "1년 미만 퇴직금 계산, 정확한 방법과 청구 절차 | 머니위키",
    description: "1년 미만 근무자도 퇴직금 계산 공식은 동일해요. 근무 일수 기준 비례 계산법, 0원이 나오는 경우, 청구 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-계산-방법-1년-미만-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
