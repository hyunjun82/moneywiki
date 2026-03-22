import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아기 단축근무 급여 계산법과 신청 방법 | 머니위키",
  description: "최초 10시간 통상임금 100%(월 250만원 상한), 초과분 80%(월 160만원 상한). 계산 공식과 고용24 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-급여-계산" },
  openGraph: {
    title: "육아기 단축근무 급여 계산법과 신청 방법 | 머니위키",
    description: "최초 10시간 통상임금 100%(월 250만원 상한), 초과분 80%(월 160만원 상한). 계산 공식과 고용24 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-급여-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
