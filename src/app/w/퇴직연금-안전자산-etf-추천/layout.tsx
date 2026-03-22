import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 안전자산 30% — 예금보다 나은 ETF 선택법 | 머니위키",
  description: "퇴직연금 안전자산 30%를 채권 ETF, TDF, 채권혼합형으로 채우는 방법이에요. 단기·중기·장기 채권 비교, 포트폴리오 예시까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-안전자산-etf-추천" },
  openGraph: {
    title: "퇴직연금 안전자산 30% — 예금보다 나은 ETF 선택법 | 머니위키",
    description: "퇴직연금 안전자산 30%를 채권 ETF, TDF, 채권혼합형으로 채우는 방법이에요. 단기·중기·장기 채권 비교, 포트폴리오 예시까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-안전자산-etf-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
