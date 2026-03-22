import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "채권 투자 수익률은 얼마? 국채 금리와 투자 방법 | 머니위키",
  description: "2026년 개인투자용 국채 10년물 연평균 5.4% 수익률. 채권 종류, 수익률 계산, 직접 매수와 ETF 투자 방법을 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/채권-투자-수익률" },
  openGraph: {
    title: "채권 투자 수익률은 얼마? 국채 금리와 투자 방법 | 머니위키",
    description: "2026년 개인투자용 국채 10년물 연평균 5.4% 수익률. 채권 종류, 수익률 계산, 직접 매수와 ETF 투자 방법을 비교했어요.",
    url: "https://www.jjyu.co.kr/w/채권-투자-수익률",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
