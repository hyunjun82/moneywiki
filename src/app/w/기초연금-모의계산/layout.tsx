import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금 모의계산, 내 소득·재산으로 얼마 받을까? 수령액 확인 | 머니위키",
  description: "출생연도, 소득, 재산을 입력하면 2026년 기초연금 예상 수령액을 바로 계산해요. 선정기준액 단독 247만원, 부부 395만 2천원 기준.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-모의계산" },
  openGraph: {
    title: "기초연금 모의계산, 내 소득·재산으로 얼마 받을까? 수령액 확인 | 머니위키",
    description: "출생연도, 소득, 재산을 입력하면 2026년 기초연금 예상 수령액을 바로 계산해요. 선정기준액 단독 247만원, 부부 395만 2천원 기준.",
    url: "https://www.jjyu.co.kr/w/기초연금-모의계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
