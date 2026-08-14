import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직급여, 매달 얼마 받을까? 2026년 금액과 신청 방법",
  description: "육아휴직급여는 통상임금의 80%, 월 최대 250만원까지 받아요. 6+6 부모육아휴직제로 첫 6개월 450만원, 사후지급금 폐지로 전액 즉시 수령 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직급여" },
  openGraph: {
    title: "육아휴직급여, 매달 얼마 받을까? 2026년 금액과 신청 방법 | 머니위키",
    description: "육아휴직급여는 통상임금의 80%, 월 최대 250만원까지 받아요. 6+6 부모육아휴직제로 첫 6개월 450만원까지 가능해요.",
    url: "https://www.jjyu.co.kr/w/육아휴직급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
