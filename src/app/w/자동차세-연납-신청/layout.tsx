import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자동차세 연납, 1월에 신청하면 얼마 아낄까? 할인율과 신청 방법 | 머니위키",
  description: "1월에 자동차세 연납 신청하면 약 4.58% 할인이에요. 위택스 신청 방법, 월별 할인율 비교, 매도 시 환급까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자동차세-연납-신청" },
  openGraph: {
    title: "자동차세 연납, 1월에 신청하면 얼마 아낄까? 할인율과 신청 방법 | 머니위키",
    description: "1월에 자동차세 연납 신청하면 약 4.58% 할인이에요. 위택스 신청 방법, 월별 할인율 비교, 매도 시 환급까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/자동차세-연납-신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
