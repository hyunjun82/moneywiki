import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "알바 퇴직금 지급 기준, 주 15시간과 1년 조건",
  description: "알바 퇴직금 지급 기준은 주 15시간 이상과 1년 이상 근무예요. 4주 평균 계산법과 방학 기간 합산 여부를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/알바-퇴직금-지급기준" },
  openGraph: {
    title: "알바 퇴직금 지급 기준, 주 15시간과 1년 조건 | 머니위키",
    description: "알바 퇴직금 지급 기준은 주 15시간 이상과 1년 이상 근무예요. 4주 평균 계산법과 방학 기간 합산 여부를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/알바-퇴직금-지급기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
